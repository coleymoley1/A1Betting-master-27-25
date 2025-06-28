import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Target,
  TrendingUp,
  Brain,
  Eye,
  Download,
  Trash2,
  Play,
  Calendar,
  DollarSign,
} from 'lucide-react';

interface SavedLineup {
  id: string;
  name: string;
  type: 'money-maker' | 'prizepicks' | 'propollama';
  picks: Array<{
    player?: string;
    stat?: string;
    line?: number;
    choice?: 'over' | 'under';
    confidence?: number;
    description?: string;
  }>;
  entryAmount: number;
  projectedPayout: number;
  savedAt: Date;
  status: 'active' | 'completed' | 'pending';
  actualResult?: number;
}

const SavedLineups: React.FC = () => {
  const [savedLineups, setSavedLineups] = useState<SavedLineup[]>([]);
  const [selectedType, setSelectedType] = useState<
    'all' | 'money-maker' | 'prizepicks' | 'propollama'
  >('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    // Load saved lineups from localStorage or API
    const mockLineups: SavedLineup[] = [
      {
        id: 'lineup_1',
        name: 'Quantum Strategy #1',
        type: 'money-maker',
        picks: [
          { description: 'Lakers vs Warriors ML', confidence: 94.7 },
          { description: 'LeBron Over 25.5 Points', confidence: 91.3 },
          { description: 'Curry Over 4.5 Threes', confidence: 89.2 },
          { description: 'Total Over 225.5', confidence: 87.8 },
        ],
        entryAmount: 1000,
        projectedPayout: 4250,
        savedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'completed',
        actualResult: 3800,
      },
      {
        id: 'lineup_2',
        name: '5-Pick Power Play',
        type: 'prizepicks',
        picks: [
          { player: 'LeBron James', stat: 'Points', line: 25.5, choice: 'over', confidence: 94.7 },
          {
            player: 'Stephen Curry',
            stat: 'Three-Pointers',
            line: 4.5,
            choice: 'over',
            confidence: 91.3,
          },
          {
            player: 'Giannis Antetokounmpo',
            stat: 'Rebounds',
            line: 11.5,
            choice: 'under',
            confidence: 89.2,
          },
          { player: 'Luka Doncic', stat: 'Assists', line: 8.5, choice: 'over', confidence: 87.9 },
          { player: 'Joel Embiid', stat: 'Points', line: 28.5, choice: 'over', confidence: 92.4 },
        ],
        entryAmount: 50,
        projectedPayout: 1000,
        savedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'active',
      },
      {
        id: 'lineup_3',
        name: 'AI Analysis #47',
        type: 'propollama',
        picks: [
          { description: 'Multi-sport neural analysis recommendation', confidence: 96.1 },
          { description: 'Weather-adjusted player props', confidence: 93.4 },
          { description: 'Injury impact calculations', confidence: 91.7 },
        ],
        entryAmount: 200,
        projectedPayout: 850,
        savedAt: new Date(Date.now() - 30 * 60 * 1000),
        status: 'pending',
      },
      {
        id: 'lineup_4',
        name: 'Neural Boost #2',
        type: 'money-maker',
        picks: [
          { description: 'Chiefs vs Bills ML', confidence: 93.2 },
          { description: 'Mahomes Over 275.5 Yards', confidence: 89.8 },
          { description: 'Kelce Over 6.5 Receptions', confidence: 91.4 },
          { description: 'Total Under 52.5', confidence: 87.3 },
          { description: 'First Half Over 24.5', confidence: 85.9 },
          { description: 'Hill Over 80.5 Receiving', confidence: 88.7 },
        ],
        entryAmount: 500,
        projectedPayout: 2750,
        savedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'completed',
        actualResult: 2750,
      },
    ];
    setSavedLineups(mockLineups);
  }, []);

  const filteredLineups = savedLineups.filter(
    lineup => selectedType === 'all' || lineup.type === selectedType
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'money-maker':
        return 'text-green-400';
      case 'prizepicks':
        return 'text-yellow-400';
      case 'propollama':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'money-maker':
        return DollarSign;
      case 'prizepicks':
        return Trophy;
      case 'propollama':
        return Brain;
      default:
        return Target;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-electric-400 bg-electric-400/20';
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const deleteLineup = (id: string) => {
    setSavedLineups(prev => prev.filter(lineup => lineup.id !== id));
  };

  const exportLineups = () => {
    const data = JSON.stringify(filteredLineups, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saved-lineups-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <motion.div
      className='space-y-10 animate-slide-in-up'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='text-center'>
        <div className='relative mb-10'>
          <div className='absolute inset-0 bg-indigo-400/20 blur-3xl rounded-full' />
          <div className='relative text-8xl text-indigo-400 float-element'>📋</div>
        </div>
        <h1 className='holographic text-6xl font-black mb-6 font-cyber'>SAVED LINEUPS</h1>
        <p className='text-2xl text-gray-400 max-w-4xl mx-auto font-mono'>
          Your neural-optimized betting strategies and quantum-generated lineups
        </p>
      </div>

      {/* Filter Tabs */}
      <div className='flex justify-center space-x-4'>
        {['all', 'money-maker', 'prizepicks', 'propollama'].map(type => (
          <motion.button
            key={type}
            onClick={() => setSelectedType(type as any)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              selectedType === type
                ? 'bg-electric-500/20 text-electric-400 border-2 border-electric-500/40'
                : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.toUpperCase().replace('-', ' ')}
          </motion.button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='quantum-card p-6 rounded-2xl text-center'>
          <div className='text-3xl font-bold text-electric-400 font-cyber'>
            {savedLineups.length}
          </div>
          <div className='text-gray-400 font-mono'>Total Lineups</div>
        </div>
        <div className='quantum-card p-6 rounded-2xl text-center'>
          <div className='text-3xl font-bold text-green-400 font-cyber'>
            $
            {savedLineups
              .reduce((sum, lineup) => sum + (lineup.actualResult || 0), 0)
              .toLocaleString()}
          </div>
          <div className='text-gray-400 font-mono'>Total Winnings</div>
        </div>
        <div className='quantum-card p-6 rounded-2xl text-center'>
          <div className='text-3xl font-bold text-yellow-400 font-cyber'>
            {savedLineups.filter(l => l.status === 'active').length}
          </div>
          <div className='text-gray-400 font-mono'>Active Lineups</div>
        </div>
        <div className='quantum-card p-6 rounded-2xl text-center'>
          <div className='text-3xl font-bold text-purple-400 font-cyber'>
            {Math.round(
              savedLineups.reduce(
                (sum, lineup) =>
                  sum +
                  lineup.picks.reduce((s, p) => s + (p.confidence || 0), 0) / lineup.picks.length,
                0
              ) / savedLineups.length
            )}
            %
          </div>
          <div className='text-gray-400 font-mono'>Avg Confidence</div>
        </div>
      </div>

      {/* Lineups Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AnimatePresence>
          {filteredLineups.map(lineup => {
            const TypeIcon = getTypeIcon(lineup.type);
            return (
              <motion.div
                key={lineup.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className='quantum-card rounded-2xl p-6 hover:border-electric-500/30 transition-all cursor-pointer'
                onClick={() => setShowDetails(showDetails === lineup.id ? null : lineup.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center space-x-3'>
                    <TypeIcon className={`w-6 h-6 ${getTypeColor(lineup.type)}`} />
                    <div>
                      <h3 className='font-bold text-white text-lg'>{lineup.name}</h3>
                      <div className='text-sm text-gray-400 font-mono'>
                        {lineup.type.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(lineup.status)}`}
                  >
                    {lineup.status.toUpperCase()}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div>
                    <div className='text-sm text-gray-400'>Entry</div>
                    <div className='text-lg font-bold text-white'>${lineup.entryAmount}</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-400'>Payout</div>
                    <div className='text-lg font-bold text-green-400'>
                      ${lineup.projectedPayout}
                    </div>
                  </div>
                </div>

                <div className='flex justify-between items-center text-sm'>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-400'>{formatTimeAgo(lineup.savedAt)}</span>
                  </div>
                  <div className='text-electric-400 font-mono'>{lineup.picks.length} picks</div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {showDetails === lineup.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='mt-4 pt-4 border-t border-white/10'
                    >
                      <div className='space-y-2 mb-4'>
                        {lineup.picks.map((pick, index) => (
                          <div key={index} className='bg-gray-800/30 rounded-lg p-3'>
                            {pick.player ? (
                              <div>
                                <div className='font-bold text-white'>{pick.player}</div>
                                <div className='text-sm text-gray-400'>
                                  {pick.stat} {pick.choice?.toUpperCase()} {pick.line}
                                </div>
                                <div className='text-xs text-electric-400'>
                                  {pick.confidence?.toFixed(1)}% confidence
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className='text-white'>{pick.description}</div>
                                {pick.confidence && (
                                  <div className='text-xs text-electric-400'>
                                    {pick.confidence.toFixed(1)}% confidence
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className='flex space-x-2'>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            // Implement reuse functionality
                          }}
                          className='flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-electric-500/20 text-electric-400 rounded-lg hover:bg-electric-500/30 transition-all'
                        >
                          <Play className='w-4 h-4' />
                          <span>Reuse</span>
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            deleteLineup(lineup.id);
                          }}
                          className='flex items-center justify-center px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className='quantum-card rounded-3xl p-8 text-center'>
        <h3 className='text-2xl font-bold text-white font-cyber mb-4'>NEURAL LINEUP MANAGER</h3>
        <p className='text-gray-400 mb-6'>
          Manage, analyze, and optimize your saved betting strategies with quantum intelligence
        </p>
        <div className='flex justify-center space-x-4'>
          <motion.button
            onClick={exportLineups}
            className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300 font-cyber'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className='w-5 h-5' />
            <span>EXPORT STRATEGIES</span>
          </motion.button>
          <motion.button
            className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-electric-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-electric-400 transition-all duration-300 font-cyber'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className='w-5 h-5' />
            <span>ANALYZE ALL LINEUPS</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedLineups;
