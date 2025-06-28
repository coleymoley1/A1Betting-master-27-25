import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Filter,
  ChevronDown,
  Check,
  X,
  RotateCcw,
  Zap,
  Globe,
  TrendingUp,
} from 'lucide-react';

export interface SportOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'major' | 'secondary' | 'international' | 'combat' | 'esports';
}

export interface TimeFrameOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  value: number; // hours
}

export interface FilterState {
  sports: string[];
  timeFrame: string;
  regions: string[];
  advanced: {
    minConfidence: number;
    onlyLive: boolean;
    includeProps: boolean;
    dataQuality: 'all' | 'high' | 'premium';
  };
}

interface QuantumFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
  showAdvanced?: boolean;
}

const SPORTS_OPTIONS: SportOption[] = [
  // Major Sports
  { id: 'nba', name: 'NBA Basketball', icon: '🏀', color: 'text-orange-400', category: 'major' },
  { id: 'nfl', name: 'NFL Football', icon: '🏈', color: 'text-green-400', category: 'major' },
  { id: 'mlb', name: 'MLB Baseball', icon: '⚾', color: 'text-blue-400', category: 'major' },
  { id: 'nhl', name: 'NHL Hockey', icon: '🏒', color: 'text-cyan-400', category: 'major' },

  // Secondary Sports
  {
    id: 'ncaab',
    name: 'College Basketball',
    icon: '🎓',
    color: 'text-purple-400',
    category: 'secondary',
  },
  {
    id: 'ncaaf',
    name: 'College Football',
    icon: '🎓',
    color: 'text-yellow-400',
    category: 'secondary',
  },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'text-green-400', category: 'secondary' },
  { id: 'golf', name: 'Golf', icon: '⛳', color: 'text-emerald-400', category: 'secondary' },

  // International Sports
  {
    id: 'soccer',
    name: 'Soccer/Football',
    icon: '⚽',
    color: 'text-white',
    category: 'international',
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    color: 'text-amber-400',
    category: 'international',
  },
  { id: 'rugby', name: 'Rugby', icon: '🏉', color: 'text-red-400', category: 'international' },
  { id: 'f1', name: 'Formula 1', icon: '🏎️', color: 'text-red-500', category: 'international' },

  // Combat Sports
  { id: 'ufc', name: 'UFC/MMA', icon: '🥊', color: 'text-red-400', category: 'combat' },
  { id: 'boxing', name: 'Boxing', icon: '🥊', color: 'text-yellow-500', category: 'combat' },

  // Esports
  { id: 'lol', name: 'League of Legends', icon: '🎮', color: 'text-blue-500', category: 'esports' },
  { id: 'csgo', name: 'CS:GO', icon: '🎯', color: 'text-orange-500', category: 'esports' },
  { id: 'dota', name: 'Dota 2', icon: '⚔️', color: 'text-purple-500', category: 'esports' },
];

const TIME_FRAME_OPTIONS: TimeFrameOption[] = [
  {
    id: 'live',
    name: 'Live Now',
    description: 'Currently active games',
    icon: '🔴',
    color: 'text-red-400',
    value: 0,
  },
  {
    id: 'today',
    name: 'Today',
    description: 'Next 24 hours',
    icon: '📅',
    color: 'text-electric-400',
    value: 24,
  },
  {
    id: 'tomorrow',
    name: 'Tomorrow',
    description: 'Next day only',
    icon: '🌅',
    color: 'text-yellow-400',
    value: 48,
  },
  {
    id: 'week',
    name: 'This Week',
    description: 'Next 7 days',
    icon: '📊',
    color: 'text-blue-400',
    value: 168,
  },
  {
    id: 'weekend',
    name: 'Weekend',
    description: 'Sat-Sun games',
    icon: '🎉',
    color: 'text-purple-400',
    value: 72,
  },
  {
    id: 'month',
    name: 'This Month',
    description: 'Next 30 days',
    icon: '📈',
    color: 'text-green-400',
    value: 720,
  },
  {
    id: 'season',
    name: 'Full Season',
    description: 'All upcoming games',
    icon: '🏆',
    color: 'text-cyan-400',
    value: 8760,
  },
];

const REGION_OPTIONS = [
  { id: 'us', name: 'United States', icon: '🇺🇸', color: 'text-blue-400' },
  { id: 'eu', name: 'Europe', icon: '🇪🇺', color: 'text-yellow-400' },
  { id: 'uk', name: 'United Kingdom', icon: '🇬🇧', color: 'text-red-400' },
  { id: 'ca', name: 'Canada', icon: '🇨🇦', color: 'text-red-500' },
  { id: 'au', name: 'Australia', icon: '🇦🇺', color: 'text-green-400' },
  { id: 'asia', name: 'Asia', icon: '🌏', color: 'text-purple-400' },
];

const QuantumFilters: React.FC<QuantumFiltersProps> = ({
  filters,
  onFiltersChange,
  className = '',
  showAdvanced = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'sports' | 'time' | 'regions' | 'advanced'>('sports');

  // Group sports by category
  const sportsByCategory = SPORTS_OPTIONS.reduce(
    (acc, sport) => {
      if (!acc[sport.category]) acc[sport.category] = [];
      acc[sport.category].push(sport);
      return acc;
    },
    {} as Record<string, SportOption[]>
  );

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleSport = (sportId: string) => {
    const updatedSports = filters.sports.includes(sportId)
      ? filters.sports.filter(id => id !== sportId)
      : [...filters.sports, sportId];
    updateFilters({ sports: updatedSports });
  };

  const selectTimeFrame = (timeFrameId: string) => {
    updateFilters({ timeFrame: timeFrameId });
  };

  const toggleRegion = (regionId: string) => {
    const updatedRegions = filters.regions.includes(regionId)
      ? filters.regions.filter(id => id !== regionId)
      : [...filters.regions, regionId];
    updateFilters({ regions: updatedRegions });
  };

  const resetFilters = () => {
    onFiltersChange({
      sports: ['nba', 'nfl', 'mlb', 'nhl'],
      timeFrame: 'today',
      regions: ['us'],
      advanced: {
        minConfidence: 80,
        onlyLive: false,
        includeProps: true,
        dataQuality: 'all',
      },
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.sports.length > 0) count++;
    if (filters.timeFrame !== 'today') count++;
    if (filters.regions.length > 1) count++;
    if (filters.advanced.minConfidence > 80) count++;
    if (filters.advanced.onlyLive) count++;
    if (!filters.advanced.includeProps) count++;
    if (filters.advanced.dataQuality !== 'all') count++;
    return count;
  };

  const CategoryIcon = ({ category }: { category: string }) => {
    const icons = {
      major: '⭐',
      secondary: '🎯',
      international: '🌍',
      combat: '🥊',
      esports: '🎮',
    };
    return <span className='text-lg'>{icons[category as keyof typeof icons] || '📊'}</span>;
  };

  return (
    <motion.div
      className={`quantum-card rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filter Header */}
      <div className='p-4 border-b border-white/10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='relative'>
              <Filter className='w-5 h-5 text-electric-400' />
              {getActiveFiltersCount() > 0 && (
                <div className='absolute -top-2 -right-2 w-4 h-4 bg-electric-400 text-black text-xs rounded-full flex items-center justify-center font-bold'>
                  {getActiveFiltersCount()}
                </div>
              )}
            </div>
            <h3 className='text-lg font-bold text-white font-cyber'>QUANTUM FILTERS</h3>
          </div>

          <div className='flex items-center space-x-2'>
            <button
              onClick={resetFilters}
              className='p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10'
              title='Reset Filters'
            >
              <RotateCcw className='w-4 h-4' />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='flex items-center space-x-2 px-3 py-2 bg-electric-500/20 text-electric-400 rounded-lg hover:bg-electric-500/30 transition-all'
            >
              <span className='font-mono text-sm'>{isExpanded ? 'Collapse' : 'Expand'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className='flex flex-wrap gap-2 mt-4'>
          {filters.sports.slice(0, 3).map(sportId => {
            const sport = SPORTS_OPTIONS.find(s => s.id === sportId);
            return sport ? (
              <div
                key={sportId}
                className='flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-full text-xs'
              >
                <span>{sport.icon}</span>
                <span className='text-gray-300'>{sport.name.split(' ')[0]}</span>
              </div>
            ) : null;
          })}
          {filters.sports.length > 3 && (
            <div className='px-2 py-1 bg-electric-500/20 text-electric-400 rounded-full text-xs font-mono'>
              +{filters.sports.length - 3} more
            </div>
          )}
          <div className='flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs'>
            <Clock className='w-3 h-3' />
            <span>{TIME_FRAME_OPTIONS.find(t => t.id === filters.timeFrame)?.name}</span>
          </div>
        </div>
      </div>

      {/* Expanded Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            {/* Filter Tabs */}
            <div className='flex border-b border-white/10'>
              {[
                { id: 'sports', label: 'Sports', icon: TrendingUp },
                { id: 'time', label: 'Time', icon: Calendar },
                { id: 'regions', label: 'Regions', icon: Globe },
                ...(showAdvanced ? [{ id: 'advanced', label: 'Advanced', icon: Zap }] : []),
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 transition-all ${
                      activeTab === tab.id
                        ? 'bg-electric-500/20 text-electric-400 border-b-2 border-electric-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                    <span className='font-mono text-sm'>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Filter Content */}
            <div className='p-4'>
              {/* Sports Tab */}
              {activeTab === 'sports' && (
                <div className='space-y-6'>
                  {Object.entries(sportsByCategory).map(([category, sports]) => (
                    <div key={category}>
                      <div className='flex items-center space-x-2 mb-3'>
                        <CategoryIcon category={category} />
                        <h4 className='text-sm font-bold text-gray-300 uppercase tracking-wider font-cyber'>
                          {category.replace('_', ' ')} Sports
                        </h4>
                      </div>
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                        {sports.map(sport => (
                          <motion.button
                            key={sport.id}
                            onClick={() => toggleSport(sport.id)}
                            className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                              filters.sports.includes(sport.id)
                                ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                                : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className='text-lg'>{sport.icon}</span>
                            <div className='flex-1 text-left'>
                              <div className='text-sm font-bold'>{sport.name.split(' ')[0]}</div>
                              <div className='text-xs opacity-75'>
                                {sport.name.split(' ').slice(1).join(' ')}
                              </div>
                            </div>
                            {filters.sports.includes(sport.id) && (
                              <Check className='w-4 h-4 text-electric-400' />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Time Frame Tab */}
              {activeTab === 'time' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {TIME_FRAME_OPTIONS.map(timeFrame => (
                    <motion.button
                      key={timeFrame.id}
                      onClick={() => selectTimeFrame(timeFrame.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        filters.timeFrame === timeFrame.id
                          ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className='flex items-center space-x-3 mb-2'>
                        <span className='text-xl'>{timeFrame.icon}</span>
                        <span className='font-bold font-cyber'>{timeFrame.name}</span>
                        {filters.timeFrame === timeFrame.id && (
                          <Check className='w-4 h-4 text-electric-400 ml-auto' />
                        )}
                      </div>
                      <div className='text-sm opacity-75 font-mono'>{timeFrame.description}</div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Regions Tab */}
              {activeTab === 'regions' && (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {REGION_OPTIONS.map(region => (
                    <motion.button
                      key={region.id}
                      onClick={() => toggleRegion(region.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                        filters.regions.includes(region.id)
                          ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className='text-lg'>{region.icon}</span>
                      <div className='flex-1 text-left'>
                        <div className='text-sm font-bold'>{region.name}</div>
                      </div>
                      {filters.regions.includes(region.id) && (
                        <Check className='w-4 h-4 text-electric-400' />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && showAdvanced && (
                <div className='space-y-6'>
                  {/* Confidence Slider */}
                  <div>
                    <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                      MINIMUM CONFIDENCE: {filters.advanced.minConfidence}%
                    </label>
                    <input
                      type='range'
                      min='50'
                      max='99'
                      value={filters.advanced.minConfidence}
                      onChange={e =>
                        updateFilters({
                          advanced: {
                            ...filters.advanced,
                            minConfidence: parseInt(e.target.value),
                          },
                        })
                      }
                      className='w-full h-2 bg-gray-700 rounded-lg appearance-none slider-thumb'
                    />
                  </div>

                  {/* Toggle Options */}
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 quantum-card rounded-xl'>
                      <div>
                        <div className='font-bold text-white font-cyber'>Live Games Only</div>
                        <div className='text-sm text-gray-400 font-mono'>
                          Show only currently active games
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          updateFilters({
                            advanced: { ...filters.advanced, onlyLive: !filters.advanced.onlyLive },
                          })
                        }
                        className={`w-12 h-6 rounded-full transition-all ${
                          filters.advanced.onlyLive ? 'bg-electric-400' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            filters.advanced.onlyLive ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className='flex items-center justify-between p-4 quantum-card rounded-xl'>
                      <div>
                        <div className='font-bold text-white font-cyber'>Include Props</div>
                        <div className='text-sm text-gray-400 font-mono'>
                          Show player prop predictions
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          updateFilters({
                            advanced: {
                              ...filters.advanced,
                              includeProps: !filters.advanced.includeProps,
                            },
                          })
                        }
                        className={`w-12 h-6 rounded-full transition-all ${
                          filters.advanced.includeProps ? 'bg-electric-400' : 'bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            filters.advanced.includeProps ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Data Quality */}
                  <div>
                    <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                      DATA QUALITY FILTER
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { id: 'all', label: 'All Data', desc: 'Include all sources' },
                        { id: 'high', label: 'High Quality', desc: 'Verified sources only' },
                        { id: 'premium', label: 'Premium', desc: 'Premium feeds only' },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFilters({
                              advanced: { ...filters.advanced, dataQuality: option.id as any },
                            })
                          }
                          className={`p-3 rounded-lg border text-center transition-all ${
                            filters.advanced.dataQuality === option.id
                              ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                              : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <div className='font-bold text-sm'>{option.label}</div>
                          <div className='text-xs opacity-75'>{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuantumFilters;
export type { FilterState, SportOption, TimeFrameOption };
