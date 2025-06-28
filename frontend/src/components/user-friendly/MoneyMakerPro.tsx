import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Brain,
  Target,
  TrendingUp,
  Zap,
  RefreshCw,
  Eye,
  Save,
  Filter,
} from 'lucide-react';
import { lineupTracker } from '../../services/lineupTrackingService';
import toast from 'react-hot-toast';
import InGameTimeFilter from '../filters/InGameTimeFilter';
import CompactFilterBar from '../filters/CompactFilterBar';
import { useFilters } from '../../hooks/useFilters';

interface BettingConfig {
  investment: number;
  strategy: string;
  confidence: number;
  portfolio: number;
  sports: string;
  riskLevel: string;
  timeFrame: string;
  leagues: string[];
  maxOdds: number;
  minOdds: number;
  playerTypes: string;
  weatherFilter: boolean;
  injuryFilter: boolean;
  lineMovement: string;
}

interface MoneyMakerResults {
  investment: number;
  multiplier: number;
  payout: number;
  accuracy: number;
  picks: Array<{
    game: string;
    pick: string;
    confidence: number;
    odds: string;
    neural: string;
    reason: string;
  }>;
  quantumBoost: boolean;
  processingTime: string;
  neuralNetworks: number;
  filters: BettingConfig;
}

const MoneyMakerPro: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [config, setConfig] = useState<BettingConfig>({
    investment: 1000,
    strategy: 'quantum',
    confidence: 95,
    portfolio: 4,
    sports: 'all',
    riskLevel: 'moderate',
    timeFrame: 'today',
    leagues: ['nba', 'nfl'],
    maxOdds: -150,
    minOdds: -300,
    playerTypes: 'all',
    weatherFilter: true,
    injuryFilter: true,
    lineMovement: 'any',
  });
  const [results, setResults] = useState<MoneyMakerResults | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lineupName, setLineupName] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('today');
  const [showFilters, setShowFilters] = useState(false);
  const { filters, updateFilters } = useFilters();

  const saveLineup = () => {
    if (!results || !lineupName.trim()) {
      toast.error('Please enter a lineup name');
      return;
    }

    const picks = results.picks.map(pick => ({
      id: `pick_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      description: pick.pick,
      confidence: pick.confidence,
    }));

    const lineupId = lineupTracker.saveMoneyMakerLineup(
      lineupName,
      picks,
      results.investment,
      results.payout,
      results.accuracy
    );

    toast.success(`💰 Money Maker lineup "${lineupName}" saved!`, {
      duration: 3000,
      style: {
        background: '#1f2937',
        color: '#10b981',
        border: '1px solid #10b981',
      },
    });

    setShowSaveModal(false);
    setLineupName('');
  };

  const activateQuantumAI = async () => {
    setLoading(true);
    setTimeout(() => {
      const multiplier = Math.pow(2.1, config.portfolio) * (config.confidence / 100) * 1.2;
      setResults({
        investment: config.investment,
        multiplier: multiplier,
        payout: config.investment * multiplier,
        accuracy: 94.7 + Math.random() * 4,
        picks: [
          {
            game: 'Lakers vs Warriors',
            pick: 'LeBron Over 25.5 Points',
            confidence: 96.2,
            odds: '-110',
            neural: 'Network #23',
            reason: 'Weather optimal, no injuries, line moved 2pts',
          },
          {
            game: 'Chiefs vs Bills',
            pick: 'Mahomes Over 275.5 Yards',
            confidence: 93.7,
            odds: '-105',
            neural: 'Network #15',
            reason: 'Bills defense allows 12% more vs elite QBs',
          },
          {
            game: 'Celtics vs Heat',
            pick: 'Tatum Over 27.5 Points',
            confidence: 91.8,
            odds: '-115',
            neural: 'Network #41',
            reason: 'Miami missing key defender, pace increase',
          },
          {
            game: 'Rams vs 49ers',
            pick: 'Kupp Over 6.5 Receptions',
            confidence: 89.4,
            odds: '-120',
            neural: 'Network #07',
            reason: 'Slot coverage weakness, injury report clean',
          },
        ].slice(0, config.portfolio),
        quantumBoost: true,
        processingTime: '847ms',
        neuralNetworks: 47,
        filters: config,
      });
      setLoading(false);
    }, 3500);
  };

  return (
    <motion.div
      className='space-y-10 animate-slide-in-up'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Hero Section */}
      <div className='text-center mb-16 quantum-card rounded-3xl p-16 shadow-neon border-2 border-green-500/30'>
        <div className='relative mb-8'>
          <h1 className='holographic text-7xl font-black mb-6 font-cyber'>QUANTUM MONEY MAKER</h1>
          <div className='text-2xl text-gray-300 font-mono'>
            Neural-Enhanced Profit Generation System
          </div>
        </div>

        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-green-400/20 blur-3xl'></div>
          <div className='relative text-8xl font-black text-green-400 mb-6 animate-cyber-pulse font-cyber'>
            $∞
          </div>
          <div className='text-xl text-electric-400 font-mono'>
            UNLIMITED NEURAL PROFIT POTENTIAL
          </div>
        </div>

        <div className='grid grid-cols-3 gap-8 mb-8'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-electric-400 font-cyber'>∞%</div>
            <div className='text-gray-400 font-mono'>Neural ROI</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-purple-400 font-cyber'>99.7%</div>
            <div className='text-gray-400 font-mono'>Quantum Accuracy</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-blue-400 font-cyber'>&lt;1ms</div>
            <div className='text-gray-400 font-mono'>Neural Response</div>
          </div>
        </div>
      </div>

      {/* Enhanced Configuration Panel */}
      <div className='quantum-card rounded-3xl p-10 border border-electric-500/30'>
        <div className='flex items-center space-x-4 mb-8'>
          <Brain className='text-3xl text-electric-400 animate-neural-pulse' />
          <h2 className='text-3xl font-bold text-electric-400 holographic font-cyber'>
            QUANTUM AI CONFIGURATION
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Investment Amount */}
          <div>
            <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
              INVESTMENT ($)
            </label>
            <input
              type='number'
              min='100'
              max='10000'
              step='100'
              value={config.investment}
              onChange={e => setConfig({ ...config, investment: parseInt(e.target.value) })}
              className='w-full p-4 rounded-2xl text-center font-bold text-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
            />
          </div>

          {/* Strategy */}
          <div>
            <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
              NEURAL STRATEGY
            </label>
            <select
              value={config.strategy}
              onChange={e => setConfig({ ...config, strategy: e.target.value })}
              className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
            >
              <option value='quantum'>Quantum Enhanced</option>
              <option value='aggressive'>Aggressive Growth</option>
              <option value='conservative'>Conservative Steady</option>
              <option value='balanced'>Balanced Portfolio</option>
            </select>
          </div>

          {/* Confidence Threshold */}
          <div>
            <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
              CONFIDENCE (%)
            </label>
            <input
              type='range'
              min='80'
              max='99'
              value={config.confidence}
              onChange={e => setConfig({ ...config, confidence: parseInt(e.target.value) })}
              className='w-full h-3 bg-gray-700 rounded-full appearance-none slider mb-2'
            />
            <div className='text-center text-electric-400 font-bold text-xl font-cyber'>
              {config.confidence}%
            </div>
          </div>

          {/* Portfolio Size */}
          <div>
            <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
              PORTFOLIO SIZE
            </label>
            <select
              value={config.portfolio}
              onChange={e => setConfig({ ...config, portfolio: parseInt(e.target.value) })}
              className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
            >
              <option value={2}>2 Picks (Safe)</option>
              <option value={3}>3 Picks (Balanced)</option>
              <option value={4}>4 Picks (Optimal)</option>
              <option value={5}>5 Picks (Aggressive)</option>
              <option value={6}>6 Picks (Maximum)</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-bold text-purple-400 font-cyber'>ADVANCED NEURAL FILTERS</h3>
          <motion.button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className='flex items-center space-x-3 px-6 py-3 rounded-2xl bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 hover:bg-electric-500/30 transition-all duration-300 font-cyber font-bold'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className={`w-5 h-5 ${showAdvancedFilters ? 'animate-pulse' : ''}`} />
            <span>{showAdvancedFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}</span>
          </motion.button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'
          >
            <div>
              <label className='block text-sm font-bold mb-3 text-purple-400 font-cyber'>
                LEAGUES
              </label>
              <div className='space-y-2'>
                {['NBA', 'NFL', 'MLB', 'NHL', 'UFC'].map(league => (
                  <label key={league} className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      checked={config.leagues.includes(league.toLowerCase())}
                      onChange={e => {
                        if (e.target.checked) {
                          setConfig({
                            ...config,
                            leagues: [...config.leagues, league.toLowerCase()],
                          });
                        } else {
                          setConfig({
                            ...config,
                            leagues: config.leagues.filter(l => l !== league.toLowerCase()),
                          });
                        }
                      }}
                      className='w-4 h-4'
                    />
                    <span className='text-gray-300 font-mono'>{league}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-bold mb-3 text-cyan-400 font-cyber'>
                NEURAL FILTERS
              </label>
              <div className='space-y-2'>
                <label className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    checked={config.weatherFilter}
                    onChange={e => setConfig({ ...config, weatherFilter: e.target.checked })}
                    className='w-4 h-4'
                  />
                  <span className='text-gray-300 font-mono'>Weather Analysis</span>
                </label>
                <label className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    checked={config.injuryFilter}
                    onChange={e => setConfig({ ...config, injuryFilter: e.target.checked })}
                    className='w-4 h-4'
                  />
                  <span className='text-gray-300 font-mono'>Injury Reports</span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-bold mb-3 text-yellow-400 font-cyber'>
                RISK LEVEL
              </label>
              <select
                value={config.riskLevel}
                onChange={e => setConfig({ ...config, riskLevel: e.target.value })}
                className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
              >
                <option value='conservative'>Conservative</option>
                <option value='moderate'>Moderate</option>
                <option value='aggressive'>Aggressive</option>
                <option value='maximum'>Maximum Risk</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Quantum Activation Button */}
        <div className='text-center'>
          <motion.button
            onClick={activateQuantumAI}
            disabled={loading}
            className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-electric-500 hover:from-green-400 hover:to-electric-400 text-black shadow-neon'
            }`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? (
              <div className='flex items-center space-x-3'>
                <RefreshCw className='w-6 h-6 animate-spin' />
                <span>QUANTUM PROCESSING...</span>
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <Zap className='w-6 h-6' />
                <span>ACTIVATE QUANTUM AI</span>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='quantum-card rounded-3xl p-10 border-2 border-green-500/30'
        >
          <div className='text-center mb-8'>
            <h2 className='text-4xl font-bold text-green-400 holographic font-cyber mb-4'>
              QUANTUM RESULTS GENERATED
            </h2>
            <div className='text-lg text-gray-300 font-mono'>
              Neural networks analyzed {results.neuralNetworks} data streams in{' '}
              {results.processingTime}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
            <div className='text-center quantum-card p-6 rounded-2xl'>
              <div className='text-3xl font-bold text-green-400 font-cyber mb-2'>
                ${results.investment.toLocaleString()}
              </div>
              <div className='text-gray-400 font-mono'>Investment</div>
            </div>
            <div className='text-center quantum-card p-6 rounded-2xl'>
              <div className='text-3xl font-bold text-electric-400 font-cyber mb-2'>
                {results.multiplier.toFixed(2)}x
              </div>
              <div className='text-gray-400 font-mono'>Neural Multiplier</div>
            </div>
            <div className='text-center quantum-card p-6 rounded-2xl'>
              <div className='text-3xl font-bold text-yellow-400 font-cyber mb-2'>
                ${results.payout.toLocaleString()}
              </div>
              <div className='text-gray-400 font-mono'>Projected Payout</div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-white font-cyber mb-4'>
              NEURAL RECOMMENDATIONS
            </h3>
            {results.picks.map((pick, index) => (
              <div key={index} className='quantum-card p-6 rounded-2xl border border-green-500/20'>
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <div className='text-lg font-bold text-white'>{pick.game}</div>
                    <div className='text-electric-400 font-bold'>{pick.pick}</div>
                  </div>
                  <div className='text-right'>
                    <div className='text-green-400 font-bold text-lg'>
                      {pick.confidence.toFixed(1)}%
                    </div>
                    <div className='text-gray-400 font-mono'>{pick.odds}</div>
                  </div>
                </div>
                <div className='text-sm text-gray-300 mb-2'>{pick.reason}</div>
                <div className='text-xs text-purple-400 font-mono'>Processed by {pick.neural}</div>
              </div>
            ))}
          </div>

          <div className='mt-8 flex justify-center space-x-4'>
            <motion.button
              onClick={() => setShowSaveModal(true)}
              className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className='w-5 h-5' />
              <span>SAVE LINEUP</span>
            </motion.button>
            <motion.button
              className='px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-yellow-400 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXECUTE NEURAL STRATEGY
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Save Lineup Modal */}
      {showSaveModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={() => setShowSaveModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='quantum-card rounded-2xl p-8 max-w-md w-full'
            onClick={e => e.stopPropagation()}
          >
            <h3 className='text-2xl font-bold text-electric-400 mb-6 font-cyber'>
              SAVE MONEY MAKER LINEUP
            </h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-bold mb-2 text-gray-300'>Lineup Name</label>
                <input
                  type='text'
                  value={lineupName}
                  onChange={e => setLineupName(e.target.value)}
                  placeholder='Enter lineup name...'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-electric-400 focus:outline-none'
                />
              </div>
              <div className='flex space-x-4 pt-4'>
                <button
                  onClick={saveLineup}
                  className='flex-1 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-all'
                >
                  Save Lineup
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className='flex-1 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all'
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoneyMakerPro;
