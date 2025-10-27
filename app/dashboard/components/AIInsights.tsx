"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, ChevronRight, RefreshCw, Sparkles } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { usePerformance } from "../../../hooks/usePerformance";
import { debounce } from "../../../lib/performance";

interface AIInsight {
  id: string;
  type: "opportunity" | "warning" | "trend" | "recommendation";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  actionable: boolean;
  confidence: number; // 0-100
  category: string;
  priority: number; // 1-10
  lastUpdated: Date;
  action?: {
    label: string;
    href: string;
  };
}

interface AIInsightsProps {
  refreshTrigger?: number;
  onInsightClick?: (insight: AIInsight) => void;
}

export default function AIInsights({ refreshTrigger, onInsightClick }: AIInsightsProps = {}) {
  const { theme } = useTheme();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Performance monitoring
  usePerformance('AIInsights');

  // Enhanced mock AI insights with more realistic data
  const generateMockInsights = useCallback((): AIInsight[] => {
    const now = new Date();
    return [
      {
        id: "1",
        type: "opportunity",
        title: "Upsell Potentieel Gedetecteerd",
        description: "3 VIP klanten hebben een aankoopgeschiedenis die duidt op interesse in premium diensten. Gemiddelde upsell waarde: €2,500",
        impact: "high",
        actionable: true,
        confidence: 87,
        category: "Sales",
        priority: 9,
        lastUpdated: new Date(now.getTime() - 5 * 60000), // 5 minutes ago
        action: {
          label: "Bekijk klanten",
          href: "/dashboard/contactpersoon?filter=vip"
        }
      },
      {
        id: "2", 
        type: "trend",
        title: "Offerte Acceptatie Stijgt",
        description: "Acceptatie ratio is met 15% gestegen ten opzichte van vorige maand. Huidige ratio: 42.5%",
        impact: "medium",
        actionable: false,
        confidence: 92,
        category: "Analytics",
        priority: 6,
        lastUpdated: new Date(now.getTime() - 15 * 60000), // 15 minutes ago
      },
      {
        id: "3",
        type: "warning", 
        title: "Trage Betalingen Gedetecteerd",
        description: "5 facturen zijn langer dan 30 dagen open. Totaal bedrag: €15,750",
        impact: "high",
        actionable: true,
        confidence: 95,
        category: "Finance",
        priority: 10,
        lastUpdated: new Date(now.getTime() - 2 * 60000), // 2 minutes ago
        action: {
          label: "Bekijk facturen",
          href: "/dashboard/facturatie?filter=overdue"
        }
      },
      {
        id: "4",
        type: "recommendation",
        title: "Optimaliseer Offerte Templates",
        description: "AI analyse suggereert dat het toevoegen van social proof de acceptatie met 8% kan verhogen",
        impact: "medium",
        actionable: true,
        confidence: 78,
        category: "Optimization",
        priority: 7,
        lastUpdated: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
        action: {
          label: "Optimaliseer templates",
          href: "/dashboard/settings/templates"
        }
      },
      {
        id: "5",
        type: "opportunity",
        title: "Nieuwe Markt Kans",
        description: "AI detecteert groeiende interesse in jouw sector. Potentiële nieuwe klanten: 12 bedrijven",
        impact: "high",
        actionable: true,
        confidence: 73,
        category: "Growth",
        priority: 8,
        lastUpdated: new Date(now.getTime() - 45 * 60000), // 45 minutes ago
        action: {
          label: "Bekijk leads",
          href: "/dashboard/leads"
        }
      }
    ];
  }, []);

  // AI insights fetching function
  const fetchInsights = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // Simulate AI processing delay with more realistic timing
      await new Promise(resolve => setTimeout(resolve, isRefresh ? 800 : 1200));
      
      // In production, this would call a real AI API
      const newInsights = generateMockInsights();
      setInsights(newInsights);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden bij het ophalen van AI inzichten');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [generateMockInsights]);

  // Debounced refresh function
  const debouncedRefresh = useMemo(
    () => debounce(() => fetchInsights(true), 300),
    [fetchInsights]
  );

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  // Refresh when trigger changes
  useEffect(() => {
    if (refreshTrigger) {
      debouncedRefresh();
    }
  }, [refreshTrigger, debouncedRefresh]);

  // Memoized functions for better performance
  const getInsightIcon = useCallback((type: AIInsight["type"]) => {
    switch (type) {
      case "opportunity":
        return <Target className="h-5 w-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "trend":
        return <TrendingUp className="h-5 w-5 text-blue-400" />;
      case "recommendation":
        return <Lightbulb className="h-5 w-5 text-purple-400" />;
      default:
        return <Brain className="h-5 w-5 text-gray-400" />;
    }
  }, []);

  const getImpactColor = useCallback((impact: AIInsight["impact"]) => {
    switch (impact) {
      case "high":
        return theme === 'dark' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200';
      case "medium":
        return theme === 'dark' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-700 border-amber-200';
      case "low":
        return theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200';
      default:
        return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }, [theme]);

  const getConfidenceColor = useCallback((confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  }, []);

  const formatTimeAgo = useCallback((date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Zojuist';
    if (diffInMinutes < 60) return `${diffInMinutes}m geleden`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}u geleden`;
    return `${Math.floor(diffInMinutes / 1440)}d geleden`;
  }, []);

  // Sort insights by priority and impact
  const sortedInsights = useMemo(() => {
    return [...insights].sort((a, b) => {
      // First by priority (higher first)
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      // Then by impact (high > medium > low)
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    });
  }, [insights]);

  const handleInsightClick = useCallback((insight: AIInsight) => {
    if (onInsightClick) {
      onInsightClick(insight);
    }
  }, [onInsightClick]);

  if (error) {
    return (
      <div className={`rounded-xl p-6 border ${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-red-500/30' 
          : 'bg-white border-red-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
          }`}>
            <AlertTriangle className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              AI Inzichten Fout
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {error}
            </p>
          </div>
        </div>
        <button
          onClick={() => fetchInsights(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            theme === 'dark' 
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          Opnieuw proberen
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`rounded-xl p-6 border ${
        theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700/30' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            </motion.div>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              AI Inzichten
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              AI analyseert je data...
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              className="animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`h-24 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            </motion.div>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              AI Inzichten
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Slimme aanbevelingen voor jouw bedrijf
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
          }`}>
            {insights.length} inzichten
          </div>
          <button
            onClick={() => fetchInsights(true)}
            disabled={isRefreshing}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Vernieuw inzichten"
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {sortedInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
              theme === 'dark' 
                ? 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => handleInsightClick(insight)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getInsightIcon(insight.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {insight.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(insight.impact)}`}>
                    {insight.impact === 'high' ? 'Hoog' : insight.impact === 'medium' ? 'Medium' : 'Laag'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    theme === 'dark' ? 'bg-gray-600/50 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {insight.category}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {insight.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span className={`${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}% zekerheid
                      </span>
                    </div>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatTimeAgo(insight.lastUpdated)}
                    </span>
                  </div>
                  
                  {insight.actionable && insight.action && (
                    <a
                      href={insight.action.href}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                        theme === 'dark' 
                          ? 'text-purple-400 hover:text-purple-300' 
                          : 'text-purple-600 hover:text-purple-700'
                      }`}
                    >
                      {insight.action.label}
                      <ChevronRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className={`mt-6 pt-4 border-t ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Laatste AI analyse: {insights.length > 0 ? formatTimeAgo(insights[0].lastUpdated) : 'Onbekend'}
            </span>
            <div className={`w-2 h-2 rounded-full ${
              isRefreshing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
            }`}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {insights.filter(i => i.priority >= 8).length} hoge prioriteit
            </span>
            <button 
              onClick={() => fetchInsights(true)}
              disabled={isRefreshing}
              className={`font-medium transition-colors ${
                theme === 'dark' 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-purple-600 hover:text-purple-700'
              } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRefreshing ? 'Vernieuwen...' : 'Vernieuw inzichten'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}