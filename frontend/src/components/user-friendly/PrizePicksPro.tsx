import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, DollarSign, TrendingUp, RefreshCw, Settings } from 'lucide-react';

interface PlayerProp {
  id: string;
  player: string;
  team: string;
  stat: string;
  line: number;
  sport: string;
  confidence: number;
  edge: number;
  recent_form: number[];
  risk: 'low' | 'medium' | 'high';
}

interface SelectedPick {
  id: string;
  player: string;
  stat: string;
  line: number;
  choice: 'over' | 'under';
  confidence: number;
  edge: number;
}

interface PrizePicksStats {
  totalLineups: number;
  winRate: number;
  profit: number;
  avgConfidence: number;
  bestStreak: number;
  currentStreak: number;
}

interface HealthStatus {
  status: 'online' | 'offline' | 'maintenance';
  accuracy: number;
  activePredictions: number;
  uptime: number;
  lastUpdate: string;
}

const PrizePicksPro: React.FC = () => {
  const [playerProps, setPlayerProps] = useState<PlayerProp[]>([]);
  const [selectedPicks, setSelectedPicks] = useState<SelectedPick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [entryFee, setEntryFee] = useState<number>(5);
  const [filterSport, setFilterSport] = useState<string>('all');
  const [filterConfidence, setFilterConfidence] = useState<number>(70);
  const [sortBy, setSortBy] = useState<string>('confidence');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(30);

  const [stats, setStats] = useState<PrizePicksStats>({
    totalLineups: 0,
    winRate: 0,
    profit: 0,
    avgConfidence: 0,
    bestStreak: 0,
    currentStreak: 0,
  });

  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    status: 'online',
    accuracy: 85,
    activePredictions: 0,
    uptime: 99.9,
    lastUpdate: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - would come from real API
  const mockProps: PlayerProp[] = [
    {
      id: '1',
      player: 'LeBron James',
      team: 'LAL',
      stat: 'Points',
      line: 25.5,
      sport: 'NBA',
      confidence: 89,
      edge: 12.3,
      recent_form: [28, 31, 22, 29, 26],
      risk: 'low',
    },
    {
      id: '2',
      player: 'Stephen Curry',
      team: 'GSW',
      stat: 'Assists',
      line: 6.5,
      sport: 'NBA',
      confidence: 76,
      edge: 8.7,
      recent_form: [8, 5, 7, 9, 6],
      risk: 'medium',
    },
    {
      id: '3',
      player: 'Nikola Jokic',
      team: 'DEN',
      stat: 'Rebounds',
      line: 11.5,
      sport: 'NBA',
      confidence: 92,
      edge: 15.1,
      recent_form: [13, 12, 15, 10, 14],
      risk: 'low',
    },
  ];

  // Computed values
  const filteredProps = useMemo(() => {
    return mockProps
      .filter(prop => filterSport === 'all' || prop.sport === filterSport)
      .filter(prop => prop.confidence >= filterConfidence)
      .sort((a, b) => {
        const aVal = a[sortBy as keyof PlayerProp] as number;
        const bVal = b[sortBy as keyof PlayerProp] as number;
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      });
  }, [filterSport, filterConfidence, sortBy, sortOrder]);

  const totalPayout = useMemo(() => {
    if (selectedPicks.length === 0) return 0;
    const multiplier =
      selectedPicks.length === 2
        ? 3
        : selectedPicks.length === 3
          ? 5
          : selectedPicks.length === 4
            ? 10
            : selectedPicks.length === 5
              ? 20
              : 50;
    return entryFee * multiplier;
  }, [selectedPicks.length, entryFee]);

  const averageConfidence = useMemo(() => {
    if (selectedPicks.length === 0) return 0;
    return Math.round(
      selectedPicks.reduce((sum, pick) => sum + pick.confidence, 0) / selectedPicks.length
    );
  }, [selectedPicks]);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayerProps(mockProps);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Event handlers
  const handlePickToggle = (prop: PlayerProp, choice: 'over' | 'under') => {
    const existingPickIndex = selectedPicks.findIndex(
      pick => pick.player === prop.player && pick.stat === prop.stat
    );

    if (existingPickIndex !== -1) {
      const existingPick = selectedPicks[existingPickIndex];
      if (existingPick.choice === choice) {
        setSelectedPicks(prev => prev.filter((_, index) => index !== existingPickIndex));
        return;
      } else {
        const updatedPick: SelectedPick = { ...existingPick, choice };
        setSelectedPicks(prev =>
          prev.map((pick, index) => (index === existingPickIndex ? updatedPick : pick))
        );
        return;
      }
    }

    if (selectedPicks.length >= 6) {
      alert('Maximum 6 picks per lineup!');
      return;
    }

    const newPick: SelectedPick = {
      id: prop.id,
      player: prop.player,
      stat: prop.stat,
      line: prop.line,
      choice,
      confidence: prop.confidence,
      edge: prop.edge,
    };

    setSelectedPicks(prev => [...prev, newPick]);
  };

  const isPickSelected = (prop: PlayerProp, choice: 'over' | 'under'): boolean => {
    return selectedPicks.some(
      pick => pick.player === prop.player && pick.stat === prop.stat && pick.choice === choice
    );
  };

  const removePick = (index: number) => {
    setSelectedPicks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitLineup = async () => {
    if (selectedPicks.length < 2) {
      alert('You need at least 2 picks to submit a lineup!');
      return;
    }

    const teams = new Set(
      selectedPicks.map(pick => {
        const prop = mockProps.find(p => p.id === pick.id);
        return prop?.team || '';
      })
    );

    if (teams.size < 2) {
      alert('You need picks from at least 2 different teams!');
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(`Lineup submitted! Potential payout: $${totalPayout}`);
      setSelectedPicks([]);
    } catch (error) {
      alert('Failed to submit lineup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Utility functions
  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  // Render helpers
  const renderPickButton = (prop: PlayerProp, choice: 'over' | 'under') => {
    const isSelected = isPickSelected(prop, choice);

    return (
      <motion.button
        onClick={() => handlePickToggle(prop, choice)}
        className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
          isSelected
            ? choice === 'over'
              ? 'bg-green-500/20 border-green-500 text-green-400'
              : 'bg-red-500/20 border-red-500 text-red-400'
            : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className='font-bold'>{choice.toUpperCase()}</div>
        <div className='text-xs'>{choice === 'over' ? `>${prop.line}` : `<${prop.line}`}</div>
      </motion.button>
    );
  };

  const renderPropCard = (prop: PlayerProp) => (
    <motion.div
      key={prop.id}
      className='quantum-card rounded-2xl p-6 hover:shadow-neon transition-all'
      whileHover={{ scale: 1.02 }}
    >
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='font-bold text-white text-lg'>{prop.player}</h3>
          <p className='text-gray-400 text-sm'>
            {prop.team} • {prop.stat}
          </p>
        </div>
        <div className='text-right'>
          <div className={`text-sm font-bold ${getConfidenceColor(prop.confidence)}`}>
            {prop.confidence}% confidence
          </div>
          <div className={`text-xs ${getRiskColor(prop.risk)}`}>{prop.risk.toUpperCase()} risk</div>
        </div>
      </div>

      <div className='mb-4'>
        <div className='text-center mb-2'>
          <span className='text-2xl font-bold text-electric-400'>{prop.line}</span>
          <span className='text-gray-400 ml-2'>{prop.stat}</span>
        </div>
        <div className='text-center text-sm text-gray-400'>
          Edge: <span className='text-green-400 font-bold'>+{prop.edge}%</span>
        </div>
      </div>

      <div className='flex space-x-3 mb-4'>
        {renderPickButton(prop, 'over')}
        {renderPickButton(prop, 'under')}
      </div>

      {showAdvanced && (
        <div className='pt-4 border-t border-gray-700'>
          <div className='text-xs text-gray-400 mb-2'>Recent Form:</div>
          <div className='flex space-x-1'>
            {prop.recent_form.map((value, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded text-xs ${
                  value > prop.line
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  if (loading) {
    return (
      <div className='text-center py-20'>
        <div className='text-electric-400 text-6xl mb-6 animate-spin'>🏆</div>
        <div className='text-2xl font-bold text-white mb-4'>Loading PrizePicks Props...</div>
        <div className='text-gray-400'>Fetching the latest predictions</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-20'>
        <div className='text-red-400 text-6xl mb-6'>⚠️</div>
        <div className='text-2xl font-bold text-white mb-4'>Error Loading Props</div>
        <p className='text-gray-400 mb-6'>{error}</p>
        <button className='px-6 py-3 bg-electric-500 text-black rounded-xl font-bold hover:bg-electric-400 transition-colors'>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Header */}
      <div className='text-center mb-12'>
        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-electric-400/20 blur-3xl rounded-full' />
          <div className='relative text-8xl text-electric-400 mb-6 animate-float'>🏆</div>
          <h1 className='holographic text-6xl font-black mb-4 font-cyber'>PRIZEPICKS PRO</h1>
          <p className='text-2xl text-gray-400 font-mono'>AI-Powered Props Analysis</p>
        </div>
      </div>

      {/* Status Bar */}
      <div className='quantum-card rounded-2xl p-6 flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <div
            className={`flex items-center space-x-2 ${healthStatus.status === 'online' ? 'text-green-400' : 'text-red-400'}`}
          >
            <div className='w-3 h-3 bg-current rounded-full animate-pulse' />
            <span className='font-bold'>{healthStatus.status.toUpperCase()}</span>
          </div>
          <div className='text-gray-400'>
            <span className='font-bold text-white'>{healthStatus.accuracy}%</span> accuracy
          </div>
          <div className='text-gray-400'>
            <span className='font-bold text-white'>{filteredProps.length}</span> active props
          </div>
        </div>

        <motion.button
          onClick={() => setLoading(true)}
          className='flex items-center space-x-2 px-4 py-2 bg-electric-500/20 hover:bg-electric-500/30 rounded-xl transition-colors'
          whileHover={{ scale: 1.05 }}
        >
          <RefreshCw className='w-4 h-4' />
          <span>Refresh</span>
        </motion.button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Filters & Settings */}
        <div className='space-y-6'>
          <div className='quantum-card rounded-2xl p-6'>
            <h3 className='flex items-center text-lg font-bold text-white mb-4'>
              <Settings className='w-5 h-5 mr-2 text-electric-400' />
              Filters & Settings
            </h3>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Sport</label>
                <select
                  value={filterSport}
                  onChange={e => setFilterSport(e.target.value)}
                  className='w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white'
                >
                  <option value='all'>All Sports</option>
                  <option value='NBA'>NBA</option>
                  <option value='NFL'>NFL</option>
                  <option value='MLB'>MLB</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Min Confidence: {filterConfidence}%
                </label>
                <input
                  type='range'
                  min='50'
                  max='95'
                  value={filterConfidence}
                  onChange={e => setFilterConfidence(Number(e.target.value))}
                  className='w-full'
                />
              </div>

              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={showAdvanced}
                  onChange={e => setShowAdvanced(e.target.checked)}
                  className='rounded'
                />
                <label className='text-sm text-gray-300'>Show Advanced Stats</label>
              </div>
            </div>
          </div>

          {/* Selected Picks */}
          {selectedPicks.length > 0 && (
            <div className='quantum-card rounded-2xl p-6'>
              <h3 className='text-lg font-bold text-white mb-4'>
                Your Lineup ({selectedPicks.length}/6)
              </h3>

              <div className='space-y-3 mb-4'>
                {selectedPicks.map((pick, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-3 bg-gray-800/50 rounded-xl'
                  >
                    <div>
                      <div className='font-medium text-white'>{pick.player}</div>
                      <div className='text-sm text-gray-400'>
                        {pick.choice.toUpperCase()} {pick.line} {pick.stat}
                      </div>
                      <div className='text-xs text-gray-500'>{pick.confidence}% confidence</div>
                    </div>
                    <button
                      onClick={() => removePick(index)}
                      className='text-red-400 hover:text-red-300 text-sm font-bold'
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className='border-t border-gray-700 pt-4'>
                <div className='flex justify-between text-sm text-gray-400 mb-2'>
                  <span>Entry Fee:</span>
                  <span>${entryFee}</span>
                </div>
                <div className='flex justify-between text-sm text-gray-400 mb-2'>
                  <span>Potential Payout:</span>
                  <span className='text-green-400 font-bold'>${totalPayout}</span>
                </div>
                <div className='flex justify-between text-sm text-gray-400 mb-4'>
                  <span>Avg Confidence:</span>
                  <span>{averageConfidence}%</span>
                </div>

                <motion.button
                  onClick={handleSubmitLineup}
                  disabled={selectedPicks.length < 2 || isSubmitting}
                  className='w-full py-3 bg-gradient-to-r from-electric-400 to-neon-blue text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Lineup'}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Props Grid */}
        <div className='lg:col-span-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {filteredProps.map(renderPropCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizePicksPro;
