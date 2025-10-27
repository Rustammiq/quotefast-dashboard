"use client";
import DashboardCard from "./components/DashboardCard";
import LoadingCard from "./components/LoadingCard";
import RevenueChart from "./components/RevenueChart";
import CustomerActivityChart from "./components/CustomerActivityChart";
import OfferStatusChart from "./components/OfferStatusChart";
import AIInsights from "./components/AIInsights";
import SearchAndFilter from "./components/SearchAndFilter";
import { Zap, FileText, Users, Euro, Target, BarChart3, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";

import { customersApi, invoicesApi } from "../../lib/api-service";
import { DashboardData, Invoice } from "../../types/dashboard";
import { motion } from "framer-motion";
import GradientText from "../../components/ui/GradientText";
import { usePerformance } from "../../hooks/usePerformance";
import { usePerformanceMonitoring } from "../../lib/performance";

const AiSphere = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="relative w-96 h-96">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute inset-8 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-3000"></div>
    </div>
  </div>
);

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [data, setData] = useState<DashboardData>({
    offersSent: 0,
    avgOfferValue: "€0",
    activeCustomers: 0,
    aiGenerations: 45
  });

  // Performance monitoring
  usePerformance('DashboardPage');
  const performanceMetrics = usePerformanceMonitoring();

  // Memoized data fetching function
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Parallel data fetching voor betere performance
      const [customersResponse, invoicesResponse] = await Promise.all([
        customersApi.getAll(),
        invoicesApi.getAll()
      ]);
      
      // Controleer op fouten
      if (customersResponse.error) {
        setError(customersResponse.error);
        setIsLoading(false);
        return;
      }
      
      if (invoicesResponse.error) {
        setError(invoicesResponse.error);
        setIsLoading(false);
        return;
      }
      
      // Bereken dashboard metrics
      const activeCustomers = customersResponse.data?.length || 0;
      const invoices = invoicesResponse.data || [];
      const offersSent = invoices.length;
      
      // Bereken gemiddelde factuurwaarde met proper typing
      const totalValue = invoices.reduce((sum: number, invoice: Invoice) => {
        return sum + (invoice.total || 0);
      }, 0);
      
      const avgValue = offersSent > 0 ? totalValue / offersSent : 0;
      const formattedAvgValue = `€${avgValue.toFixed(0)}`;
      
      // Update state
      setData({
        offersSent,
        avgOfferValue: formattedAvgValue,
        activeCustomers,
        aiGenerations: 45 // TODO: Implementeer AI generaties API
      });
      
      setIsLoading(false);
    } catch (err: unknown) {
      console.error("Error fetching dashboard data:", err);
      const errorMessage = err instanceof Error ? err.message : "Er is een fout opgetreden bij het ophalen van de dashboard gegevens";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  // Memoized refresh function
  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
    
    // Refresh data elke 30 seconden - alleen als component mounted is
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  // Memoized dashboard cards for better performance
  const dashboardCards = useMemo(() => [
    {
      icon: <FileText className="h-6 w-6 text-blue-400" />,
      title: "Verstuurde Offertes",
      value: data.offersSent,
      description: "Totaal aantal",
      growth: "+12% deze maand",
      trend: "up" as const,
      delay: 100
    },
    {
      icon: <Euro className="h-6 w-6 text-emerald-400" />,
      title: "Gem. Offerte Waarde",
      value: data.avgOfferValue,
      description: "Laatste 30 dagen",
      growth: "+8% vs vorige maand",
      trend: "up" as const,
      delay: 200
    },
    {
      icon: <Users className="h-6 w-6 text-purple-400" />,
      title: "Actieve Klanten",
      value: data.activeCustomers,
      description: "Leads en contacten",
      growth: "+15 nieuwe deze week",
      trend: "up" as const,
      delay: 300
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-400" />,
      title: "AI Generaties",
      value: data.aiGenerations,
      description: "Slimme content",
      growth: "+3 vandaag",
      trend: "up" as const,
      delay: 400
    }
  ], [data]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl px-4">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-2xl w-full backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-500 mb-2">Er is een fout opgetreden</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <button 
                onClick={() => fetchDashboardData()} 
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label="Vernieuw dashboard gegevens"
              >
                Vernieuwen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <AiSphere />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center mb-10 mt-8"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4 shadow-lg hover:bg-white/10 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
          </motion.div>
          <span className="text-sm font-medium text-gray-300">AI-Powered Dashboard</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3"
        >
          <GradientText className="text-3xl sm:text-4xl md:text-5xl font-bold">
            QuoteFast Dashboard
          </GradientText>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed px-4 sm:px-0"
        >
          Visualiseer en plan je bedrijfsactiviteiten met AI-aangedreven inzichten en interactieve doelstellingen.
        </motion.p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl mb-8 lg:mb-10">
        {dashboardCards.map((card, index) => (
          <DashboardCard 
            key={card.title}
            icon={card.icon} 
            title={card.title} 
            value={card.value} 
            description={card.description} 
            growth={card.growth}
            trend={card.trend}
            delay={card.delay}
          />
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="relative z-10 w-full max-w-7xl mb-6">
        <SearchAndFilter
          onSearch={(query) => {
            console.log('Search query:', query);
            // Implement search functionality
          }}
          onFilterChange={(filters) => {
            console.log('Active filters:', filters);
            // Implement filter functionality
          }}
          onDateRangeChange={(start, end) => {
            console.log('Date range:', { start, end });
            // Implement date range functionality
          }}
        />
      </div>

      {/* Charts Section */}
      <div className="relative z-10 w-full max-w-7xl mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart />
          <CustomerActivityChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OfferStatusChart />
          <div className="lg:col-span-2">
            <AIInsights 
              refreshTrigger={refreshTrigger}
              onInsightClick={(insight) => {
                console.log('Insight clicked:', insight);
                // Handle insight click - could navigate to specific pages
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full max-w-7xl">
        <Link
          href="/dashboard/offertes"
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-lg backdrop-blur-md text-white hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25 hover:scale-105 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Bekijk alle offertes</span>
            <span className="sm:hidden">Offertes</span>
          </div>
        </Link>
        <Link
          href="/dashboard/contactpersoon"
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Klanten beheren</span>
            <span className="sm:hidden">Klanten</span>
          </div>
        </Link>
        <button
          onClick={handleRefresh}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Vernieuwen</span>
            <span className="sm:hidden">↻</span>
          </div>
        </button>
      </div>
    </div>
  );
}



