import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Save,
  X,
  CheckCircle,
} from 'lucide-react';
import { lineupTracker } from '../../services/lineupTrackingService';
import toast from 'react-hot-toast';

interface PlayerProp {
  id: number;
  player: string;
  team: string;
  stat: string;
  line: number;
  over: number;
  under: number;
  confidence: number;
  neural: string;
  trend: 'up' | 'down';
  game: string;
}

interface SelectedProp {
  propId: number;
  choice: 'over' | 'under';
}

interface SavedLineup {
  id: string;
  name: string;
  picks: Array<{
    player: string;
    stat: string;
    line: number;
    choice: 'over' | 'under';
    confidence: number;
  }>;
  entryAmount: number;
  projectedPayout: number;
  savedAt: Date;
}

const PrizePicksPro: React.FC = () => {
  const [selectedProps, setSelectedProps] = useState<Map<string, SelectedProp>>(new Map());
  const [entryAmount, setEntryAmount] = useState(25);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lineupName, setLineupName] = useState('');
  const [savedLineups, setSavedLineups] = useState<SavedLineup[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockProps: PlayerProp[] = [
    {
      id: 1,
      player: 'LeBron James',
      team: 'LAL',
      stat: 'Points',
      line: 25.5,
      over: 1.85,
      under: 1.95,
      confidence: 94.7,
      neural: 'Network #23',
      trend: 'up',
      game: 'LAL vs GSW',
    },
    {
      id: 2,
      player: 'Stephen Curry',
      team: 'GSW',
      stat: 'Three-Pointers',
      line: 4.5,
      over: 1.9,
      under: 1.9,
      confidence: 91.3,
      neural: 'Network #15',
      trend: 'up',
      game: 'LAL vs GSW',
    },
    {
      id: 3,
      player: 'Giannis Antetokounmpo',
      team: 'MIL',
      stat: 'Rebounds',
      line: 11.5,
      over: 1.88,
      under: 1.92,
      confidence: 89.2,
      neural: 'Network #41',
      trend: 'down',
      game: 'MIL vs BOS',
    },
    {
      id: 4,
      player: 'Luka Doncic',
      team: 'DAL',
      stat: 'Assists',
      line: 8.5,
      over: 1.93,
      under: 1.87,
      confidence: 87.9,
      neural: 'Network #07',
      trend: 'up',
      game: 'DAL vs PHX',
    },
    {
      id: 5,
      player: 'Joel Embiid',
      team: 'PHI',
      stat: 'Points',
      line: 28.5,
      over: 1.89,
      under: 1.91,
      confidence: 92.4,
      neural: 'Network #33',
      trend: 'up',
      game: 'PHI vs MIA',
    },
    {
      id: 6,
      player: 'Jayson Tatum',
      team: 'BOS',
      stat: 'Points',
      line: 27.5,
      over: 1.91,
      under: 1.89,
      confidence: 88.7,
      neural: 'Network #19',
      trend: 'down',
      game: 'MIL vs BOS',
    },
    {
      id: 7,
      player: 'Nikola Jokic',
      team: 'DEN',
      stat: 'Assists',
      line: 9.5,
      over: 1.87,
      under: 1.93,
      confidence: 90.5,
      neural: 'Network #12',
      trend: 'up',
      game: 'DEN vs LAC',
    },
    {
      id: 8,
      player: 'Kawhi Leonard',
      team: 'LAC',
      stat: 'Points',
      line: 22.5,
      over: 1.85,
      under: 1.95,
      confidence: 86.1,
      neural: 'Network #29',
      trend: 'down',
      game: 'DEN vs LAC',
    },
  ];

  const validatePicks = (newProps: Map<string, SelectedProp>) => {
    const errors: string[] = [];
    const picks = Array.from(newProps.values());

    if (picks.length < 2) {
      errors.push('Minimum 2 picks required');
    }
    if (picks.length > 6) {
      errors.push('Maximum 6 picks allowed');
    }

    if (entryAmount < 5) {
      errors.push('Minimum entry amount is $5');
    }
    if (entryAmount > 1000) {
      errors.push('Maximum entry amount is $1000');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const selectProp = (propId: number, choice: 'over' | 'under') => {
    const key = `${propId}_${choice}`;
    let newProps = new Map(selectedProps);

    if (selectedProps.has(key)) {
      newProps.delete(key);
    } else if (selectedProps.size < 6) {
      const existingKey = `${propId}_${choice === 'over' ? 'under' : 'over'}`;
      if (newProps.has(existingKey)) {
        newProps.delete(existingKey);
      }
      newProps.set(key, { propId, choice });
    }

    setSelectedProps(newProps);
    validatePicks(newProps);
  };

  const calculatePayout = () => {
    const count = selectedProps.size;
    const multipliers: Record<number, number> = { 2: 3, 3: 5, 4: 10, 5: 20, 6: 50 };
    return count >= 2 ? entryAmount * (multipliers[count] || 0) * 1.5 : 0;
  };

  const getPickRequirements = () => {
    const count = selectedProps.size;
    const requirements: Record<number, string> = {
      2: 'Power Play (2 picks)',
      3: 'Flex Play (3 picks)',
      4: 'Power Play (4 picks)',
      5: 'Flex Play (5 picks)',
      6: 'Power Play (6 picks)',
    };
    return requirements[count] || `Select ${Math.max(0, 2 - count)} more`;
  };

  const saveLineup = () => {
    if (!lineupName.trim()) {
      alert('Please enter a lineup name');
      return;
    }

    const picks = Array.from(selectedProps.values()).map(pick => {
      const prop = mockProps.find(p => p.id === pick.propId)!;
      return {
        player: prop.player,
        stat: prop.stat,
        line: prop.line,
        choice: pick.choice,
        confidence: prop.confidence,
      };
    });

    const newLineup: SavedLineup = {
      id: `lineup_${Date.now()}`,
      name: lineupName,
      picks,
      entryAmount,
      projectedPayout: calculatePayout(),
      savedAt: new Date(),
    };

    setSavedLineups(prev => [newLineup, ...prev]);
    setShowSaveModal(false);
    setLineupName('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const submitLineup = async () => {
    if (validationErrors.length > 0) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setSelectedProps(new Map());
      setEntryAmount(25);
    }, 2000);
  };

  return (
    <motion.div
      className='space-y-8 animate-slide-in-up'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Header */}
      <div className='quantum-card rounded-3xl p-10 text-center'>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>PRIZEPICKS QUANTUM PRO</h1>
        <p className='text-2xl text-gray-400 mb-6 font-mono'>
          Neural-Enhanced Player Prop Analysis
        </p>

        <div className='grid grid-cols-3 gap-8'>
          <div>
            <div className='text-3xl font-bold text-electric-400 font-cyber'>87.3%</div>
            <div className='text-gray-400 font-mono'>AI Accuracy</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-purple-400 font-cyber'>{mockProps.length}</div>
            <div className='text-gray-400 font-mono'>Props Analyzed</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-blue-400 font-cyber'>47</div>
            <div className='text-gray-400 font-mono'>Neural Networks</div>
          </div>
        </div>
      </div>

      {/* Entry Configuration */}
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-bold text-electric-400 holographic font-cyber'>
            NEURAL PROP ANALYSIS
          </h2>
          <p className='text-gray-400 mt-2 font-mono'>
            Real-time AI enhancement with quantum prediction models
          </p>
        </div>

        <div className='flex items-center space-x-6'>
          <div>
            <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
              ENTRY AMOUNT
            </label>
            <input
              type='number'
              min={5}
              max={1000}
              value={entryAmount}
              onChange={e => {
                setEntryAmount(parseInt(e.target.value));
                validatePicks(selectedProps);
              }}
              className='w-32 p-4 rounded-2xl text-center font-bold text-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
            />
          </div>
          <div className='text-center'>
            <div className='text-sm text-gray-400 font-mono'>Quantum Payout</div>
            <div className='text-3xl font-bold text-green-400 font-cyber'>
              ${calculatePayout().toFixed(2)}
            </div>
          </div>
          <div className='text-center'>
            <div className='text-sm text-gray-400 font-mono'>Pick Status</div>
            <div className='text-lg font-bold text-purple-400 font-cyber'>
              {getPickRequirements()}
            </div>
          </div>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='quantum-card rounded-2xl p-6 border-2 border-red-500/40 bg-red-500/5'
        >
          <h3 className='font-bold text-red-400 text-lg mb-3'>⚠️ Validation Errors</h3>
          <ul className='space-y-1'>
            {validationErrors.map((error, index) => (
              <li key={index} className='text-red-300 font-mono text-sm'>
                • {error}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Current Lineup Display */}
      {selectedProps.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='quantum-card rounded-3xl p-8 border-2 border-electric-500/30'
        >
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-2xl font-bold text-electric-400 holographic font-cyber'>
              CURRENT LINEUP ({selectedProps.size}/6)
            </h3>
            <div className='flex items-center space-x-4'>
              <div className='text-center'>
                <div className='text-sm text-gray-400 font-mono'>Entry</div>
                <div className='text-lg font-bold text-white font-cyber'>${entryAmount}</div>
              </div>
              <div className='text-center'>
                <div className='text-sm text-gray-400 font-mono'>Payout</div>
                <div className='text-lg font-bold text-green-400 font-cyber'>
                  ${calculatePayout().toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className='grid gap-4'>
            {Array.from(selectedProps.entries()).map(([key, pick]) => {
              const prop = mockProps.find(p => p.id === pick.propId);
              if (!prop) return null;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className='flex items-center justify-between p-4 rounded-xl bg-gray-800/30 border border-gray-700/50'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-electric-500 to-purple-500 flex items-center justify-center text-white font-bold'>
                      {prop.team}
                    </div>
                    <div>
                      <div className='text-lg font-bold text-white'>{prop.player}</div>
                      <div className='text-sm text-gray-400 font-mono'>{prop.game}</div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-6'>
                    <div className='text-center'>
                      <div className='text-sm text-gray-400 font-mono'>{prop.stat}</div>
                      <div className='text-lg font-bold text-electric-400 font-cyber'>
                        {pick.choice.toUpperCase()} {prop.line}
                      </div>
                    </div>

                    <div className='text-center'>
                      <div className='text-sm text-gray-400 font-mono'>Confidence</div>
                      <div className='text-lg font-bold text-green-400 font-cyber'>
                        {prop.confidence.toFixed(1)}%
                      </div>
                    </div>

                    <div className='text-center'>
                      <div className='text-sm text-gray-400 font-mono'>Choice</div>
                      <div
                        className={`px-3 py-1 rounded-lg font-bold text-sm font-cyber ${
                          pick.choice === 'over'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {pick.choice.toUpperCase()}
                      </div>
                    </div>

                    <motion.button
                      onClick={() => selectProp(prop.id, pick.choice)}
                      className='p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className='w-4 h-4' />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {selectedProps.size < 2 ? (
            <div className='text-center mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20'>
              <div className='text-yellow-400 font-mono text-sm'>
                ⚠️ Add {2 - selectedProps.size} more pick{2 - selectedProps.size !== 1 ? 's' : ''}{' '}
                to submit lineup
              </div>
            </div>
          ) : (
            <div className='flex justify-center space-x-4 mt-6'>
              <motion.button
                onClick={() => setShowSaveModal(true)}
                className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300 font-cyber'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className='w-5 h-5' />
                <span>SAVE LINEUP</span>
              </motion.button>

              <motion.button
                onClick={submitLineup}
                disabled={isSubmitting || validationErrors.length > 0}
                className={`flex items-center space-x-2 px-12 py-4 ${
                  isSubmitting || validationErrors.length > 0
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-electric-500 to-green-500 hover:from-electric-400 hover:to-green-400'
                } text-white font-bold text-xl rounded-xl transition-all duration-300 font-cyber`}
                whileHover={!isSubmitting && validationErrors.length === 0 ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting && validationErrors.length === 0 ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <Zap className='w-6 h-6' />
                    <span>SUBMIT QUANTUM ENTRY</span>
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      )}

      {/* Props Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {mockProps.map(prop => {
          const overKey = `${prop.id}_over`;
          const underKey = `${prop.id}_under`;
          const isOverSelected = selectedProps.has(overKey);
          const isUnderSelected = selectedProps.has(underKey);

          return (
            <motion.div
              key={prop.id}
              className='quantum-card rounded-2xl p-6 border border-gray-700/50 hover:border-electric-500/30 transition-all'
              whileHover={{ scale: 1.02 }}
              layout
            >
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <div className='text-xl font-bold text-white'>{prop.player}</div>
                  <div className='text-sm text-gray-400 font-mono'>
                    {prop.team} • {prop.game}
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  {prop.trend === 'up' ? (
                    <TrendingUp className='w-5 h-5 text-green-400' />
                  ) : (
                    <TrendingDown className='w-5 h-5 text-red-400' />
                  )}
                  <div className='text-sm text-purple-400 font-mono'>{prop.neural}</div>
                </div>
              </div>

              <div className='text-center mb-4'>
                <div className='text-lg text-gray-400 font-mono'>{prop.stat}</div>
                <div className='text-3xl font-bold text-electric-400 font-cyber'>{prop.line}</div>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-4'>
                <motion.button
                  onClick={() => selectProp(prop.id, 'over')}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    isOverSelected
                      ? 'bg-green-500/30 border-2 border-green-500 text-green-300'
                      : 'bg-gray-800/50 border-2 border-gray-600 text-gray-300 hover:border-green-500/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className='text-lg'>OVER</div>
                  <div className='text-sm font-mono'>{prop.over.toFixed(2)}</div>
                </motion.button>

                <motion.button
                  onClick={() => selectProp(prop.id, 'under')}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    isUnderSelected
                      ? 'bg-red-500/30 border-2 border-red-500 text-red-300'
                      : 'bg-gray-800/50 border-2 border-gray-600 text-gray-300 hover:border-red-500/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className='text-lg'>UNDER</div>
                  <div className='text-sm font-mono'>{prop.under.toFixed(2)}</div>
                </motion.button>
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <Brain className='w-4 h-4 text-purple-400' />
                  <span className='text-sm text-purple-400 font-mono'>Confidence</span>
                </div>
                <div className='text-lg font-bold text-electric-400 font-cyber'>
                  {prop.confidence.toFixed(1)}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='quantum-card rounded-2xl p-8 max-w-md w-full mx-4'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-2xl font-bold text-white font-cyber'>SAVE LINEUP</h3>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className='text-gray-400 hover:text-white'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
                    LINEUP NAME
                  </label>
                  <input
                    type='text'
                    value={lineupName}
                    onChange={e => setLineupName(e.target.value)}
                    placeholder='e.g., NBA Thursday Special'
                    className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50 text-white'
                  />
                </div>

                <div className='bg-electric-500/10 rounded-xl p-4 border border-electric-500/20'>
                  <div className='text-sm text-gray-400 mb-2'>
                    {selectedProps.size} picks • ${entryAmount} entry
                  </div>
                  <div className='text-lg font-bold text-green-400'>
                    Projected: ${calculatePayout().toFixed(2)}
                  </div>
                </div>

                <div className='flex space-x-4'>
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className='flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-all'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveLineup}
                    className='flex-1 px-6 py-3 bg-gradient-to-r from-electric-500 to-green-500 text-white font-bold rounded-xl hover:from-electric-400 hover:to-green-400 transition-all'
                  >
                    Save Lineup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className='fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-electric-500 text-white px-6 py-4 rounded-xl shadow-neon z-50'
          >
            <div className='flex items-center space-x-3'>
              <CheckCircle className='w-6 h-6' />
              <span className='font-bold'>Success! Lineup processed.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PrizePicksPro;
