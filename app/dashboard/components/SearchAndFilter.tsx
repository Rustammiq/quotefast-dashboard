"use client";
import { useState, useCallback, useMemo } from "react";
import { Search, Filter, X, Calendar, DollarSign, User, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";
import { usePerformance } from "../../../hooks/usePerformance";
import { debounce } from "../../../lib/performance";

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface SearchAndFilterProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  onDateRangeChange?: (start: Date | null, end: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchAndFilter({
  onSearch,
  onFilterChange,
  onDateRangeChange,
  placeholder = "Zoek offertes, klanten, bedragen...",
  className = ""
}: SearchAndFilterProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  // Performance monitoring
  usePerformance('SearchAndFilter');

  // Filter options
  const filterOptions: FilterOption[] = useMemo(() => [
    {
      id: "high-value",
      label: "Hoge waarde",
      icon: <DollarSign className="h-4 w-4" />,
      count: 12
    },
    {
      id: "vip-customers",
      label: "VIP klanten",
      icon: <User className="h-4 w-4" />,
      count: 8
    },
    {
      id: "pending",
      label: "In behandeling",
      icon: <FileText className="h-4 w-4" />,
      count: 15
    },
    {
      id: "overdue",
      label: "Achterstallig",
      icon: <Calendar className="h-4 w-4" />,
      count: 3
    }
  ], []);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      if (onSearch) {
        onSearch(query);
      }
    }, 300),
    [onSearch]
  );

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  }, [debouncedSearch]);

  // Handle filter toggle
  const handleFilterToggle = useCallback((filterId: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId];
      
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      
      return newFilters;
    });
  }, [onFilterChange]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedFilters([]);
    setSearchQuery("");
    if (onFilterChange) {
      onFilterChange([]);
    }
    if (onSearch) {
      onSearch("");
    }
  }, [onFilterChange, onSearch]);

  // Handle date range change
  const handleDateRangeChange = useCallback((field: 'start' | 'end', value: string) => {
    const newDateRange = {
      ...dateRange,
      [field]: value ? new Date(value) : null
    };
    setDateRange(newDateRange);
    
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange.start, newDateRange.end);
    }
  }, [dateRange, onDateRangeChange]);

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={placeholder}
              className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/15 transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  if (onSearch) onSearch("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/15 transition-all duration-200 flex items-center gap-2 ${
              selectedFilters.length > 0 ? 'bg-purple-500/20 border-purple-400/50' : ''
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedFilters.length > 0 && (
              <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {selectedFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="space-y-4">
                {/* Filter Options */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Categorieën</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleFilterToggle(option.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedFilters.includes(option.id)
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {option.icon}
                        {option.label}
                        {option.count && (
                          <span className="text-xs opacity-75">({option.count})</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Datum bereik</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Van</label>
                      <input
                        type="date"
                        value={dateRange.start ? dateRange.start.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleDateRangeChange('start', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Tot</label>
                      <input
                        type="date"
                        value={dateRange.end ? dateRange.end.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleDateRangeChange('end', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedFilters.length > 0 || searchQuery || dateRange.start || dateRange.end) && (
                  <div className="flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Alle filters wissen
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
