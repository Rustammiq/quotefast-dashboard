"use client";
import { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from "../../../contexts/ThemeContext";
import { useAIPersonalization } from "../../../contexts/AIPersonalizationContext";
import { getPersonalizedTemplates } from "../../../lib/aiPersonalization";
import { generateQuotationWithAI, chatWithGPT5 } from "../../../lib/github-models";
import DashboardCard from "../components/DashboardCard";
import PageHeader from "../components/PageHeader";
import { logger } from '../../../lib/logger';
import { mockOffers, getOffersStats, type Offer } from "../../../lib/mockData/offersData";
import { FileText, Euro, Target, Clock, Users, Zap, X } from 'lucide-react';

// Lazy load heavy components
const DataTable = lazy(() => import("../components/DataTable"));
const OfferStatusChart = lazy(() => import("../components/OfferStatusChart"));
const OfferTimelineChart = lazy(() => import("../components/OfferTimelineChart"));
const OfferDetailsModal = lazy(() => import("../components/OfferDetailsModal"));
const AIOfferModal = lazy(() => import("../components/AIOfferModal"));

export default function OffertesPage() {
  const { theme } = useTheme();
  const { onboardingData } = useAIPersonalization();
  const [offers, setOffers] = useState(mockOffers);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingOffer, setIsGeneratingOffer] = useState(false);
  const [generatedOffer, setGeneratedOffer] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAIOfferModal, setShowAIOfferModal] = useState(false);

  const stats = getOffersStats();
  
  // Get personalized templates based on onboarding data
  const personalizedTemplates = onboardingData ? getPersonalizedTemplates(onboardingData) : [];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      label: 'Offerte ID',
      sortable: true,
      width: '120px'
    },
    {
      key: 'title',
      label: 'Titel',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.client}</p>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Bedrag',
      sortable: true,
      render: (value: number) => new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
      }).format(value)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    },
    {
      key: 'createdDate',
      label: 'Aangemaakt',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('nl-NL')
    },
    {
      key: 'dueDate',
      label: 'Vervaldatum',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('nl-NL')
    }
  ];

  const bulkActions = [
    { label: 'Exporteer geselecteerde', action: 'export', icon: <FileText className="w-4 h-4" /> },
    { label: 'Verstuur herinnering', action: 'remind', icon: <Clock className="w-4 h-4" /> },
    { label: 'Markeer als verzonden', action: 'send', icon: <Zap className="w-4 h-4" /> }
  ];

  const handleRowClick = (offer: any) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleBulkAction = (action: string, selectedRows: any[]) => {
    logger.info(`Bulk action: ${action}`, 'offertes', { selectedRows });
    // Implement bulk actions
  };

  const handleCreateOffer = () => {
    logger.info('Create new offer', 'offertes');
    // Implement create offer
  };

  const handleGenerateOfferWithAI = async (template: any) => {
    if (!onboardingData) {
      setAiError('Geen onboarding data beschikbaar');
      return;
    }

    setIsGeneratingOffer(true);
    setAiError(null);

    try {
      logger.info('Generating offer with AI', 'offertes', { template });

      const offerContent = await generateQuotationWithAI(
        onboardingData.companyName,
        template.description,
        onboardingData.industry
      );

      setGeneratedOffer(offerContent);
      setShowAIOfferModal(true);
      logger.info('AI offer generated successfully', 'offertes', { length: offerContent.length });

    } catch (error) {
      console.error('AI offer generation failed:', error);
      setAiError('Fout bij het genereren van de AI-offerte. Controleer je GitHub Models configuratie.');
      logger.error('AI offer generation failed', 'offertes', { error });
    } finally {
      setIsGeneratingOffer(false);
    }
  };

  const handleChatWithAI = async (message: string) => {
    setIsGeneratingOffer(true);
    setAiError(null);

    try {
      const response = await chatWithGPT5(message, [], {
        model: "gpt-4o",
        temperature: 0.7,
        maxTokens: 1500
      });

      return response;
    } catch (error) {
      console.error('AI chat failed:', error);
      setAiError('Fout bij het communiceren met AI. Controleer je GitHub Models configuratie.');
      throw error;
    } finally {
      setIsGeneratingOffer(false);
    }
  };

  const handleSaveAIOffer = (content: string) => {
    // Create a new offer with AI content
    const newOffer: Offer = {
      id: `AI-${Date.now()}`,
      title: `AI Offerte - ${onboardingData?.companyName || 'Nieuw'}`,
      client: onboardingData?.companyName || 'Nieuwe Klant',
      clientEmail: onboardingData?.email || 'contact@example.com',
      amount: 0, // Will be parsed from content
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      description: content,
      items: [],
      version: 1,
      createdBy: 'AI Assistant'
    };

    setOffers(prev => [newOffer, ...prev]);
    logger.info('AI offer saved as new offer', 'offertes', { offerId: newOffer.id });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Offertes"
        description="Beheer je offertes en prijsvoorstellen"
        showCreateButton={true}
        createButtonText="Nieuwe Offerte"
        onCreateClick={handleCreateOffer}
        showSearch={true}
        searchPlaceholder="Zoek offertes..."
        onSearchChange={setSearchTerm}
        showFilters={true}
        onFilterClick={() => logger.info('Filter clicked', 'offertes')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard
          title="Totaal Offertes"
          value={stats.total}
          growth="15%"
          icon={<FileText className="h-5 w-5" />}
          progress={75}
          delay={0}
        />
        <DashboardCard
          title="Geaccepteerd"
          value={stats.accepted}
          growth="22%"
          icon={<Target className="h-5 w-5" />}
          progress={stats.acceptanceRate}
          delay={100}
        />
        <DashboardCard
          title="Verzonden"
          value={stats.sent}
          growth="8%"
          icon={<Clock className="h-5 w-5" />}
          progress={60}
          delay={200}
        />
        <DashboardCard
          title="Concept"
          value={stats.draft}
          growth="-5%"
          trend="down"
          icon={<FileText className="h-5 w-5" />}
          progress={40}
          delay={300}
        />
        <DashboardCard
          title="Gem. Waarde"
          value={`€${stats.avgValue.toLocaleString()}`}
          growth="12%"
          icon={<Euro className="h-5 w-5" />}
          progress={68}
          delay={400}
        />
        <DashboardCard
          title="Acceptatie Ratio"
          value={`${stats.acceptanceRate}%`}
          growth="8%"
          icon={<Target className="h-5 w-5" />}
          progress={stats.acceptanceRate}
          delay={500}
        />
      </div>

      {/* AI Personalisatie Sectie */}
      {onboardingData && personalizedTemplates.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Aanbevolen Templates voor {onboardingData.companyName}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Gebaseerd op je bedrijfstype ({onboardingData.industry}) en teamgrootte ({onboardingData.teamSize})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Test AI Button */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-gray-900 dark:text-white">Test GPT-5.0</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Test de AI functionaliteit met een demo offerte
              </p>
              <button
                onClick={() => handleGenerateOfferWithAI({
                  id: 'test',
                  name: 'Demo Offerte',
                  description: 'Demo offerte voor software development project',
                  industry: 'it',
                  category: 'development',
                  estimatedTime: '5 min',
                  complexity: 'intermediate'
                })}
                disabled={isGeneratingOffer}
                className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-lg transition-colors"
                title="Test GPT-5.0"
              >
                {isGeneratingOffer ? 'AI Test Bezig...' : 'Test AI Nu'}
              </button>
            </div>

            {personalizedTemplates.slice(0, 2).map((template, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {template.category}
                  </span>
                  <button
                    onClick={() => handleGenerateOfferWithAI(template)}
                    disabled={isGeneratingOffer}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Generate AI Offer"
                  >
                    {isGeneratingOffer ? 'AI Genereert...' : 'AI Genereer'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <OfferStatusChart />
        <OfferTimelineChart />
      </div>

      {/* Offers Table */}
      <DataTable
        data={filteredOffers}
        columns={columns}
        onRowClick={handleRowClick}
        onBulkAction={handleBulkAction}
        bulkActions={bulkActions}
        selectable={true}
        emptyMessage="Geen offertes gevonden"
      />

      {/* Offer Details Modal */}
      <OfferDetailsModal
        offer={selectedOffer}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOffer(null);
        }}
        onEdit={(offer) => logger.info('Edit offer', 'offertes', { offer })}
        onSend={(offer) => logger.info('Send offer', 'offertes', { offer })}
        onDownload={(offer) => logger.info('Download offer', 'offertes', { offer })}
      />

      {/* AI Offer Modal */}
      <AIOfferModal
        isOpen={showAIOfferModal}
        onClose={() => {
          setShowAIOfferModal(false);
          setGeneratedOffer(null);
        }}
        offerContent={generatedOffer || ''}
        onSave={handleSaveAIOffer}
      />

      {/* AI Error Display */}
      {aiError && (
        <div className="fixed bottom-4 right-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-4 shadow-lg max-w-sm z-50">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                AI Fout
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {aiError}
              </p>
            </div>
            <button
              onClick={() => setAiError(null)}
              className="flex-shrink-0 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              type="button"
              aria-label="Sluit AI foutmelding"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
