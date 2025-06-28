import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, TrendingDown, Brain, Zap } from 'lucide-react';

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

const PrizePicksPro: React.FC = () => {
  const [selectedProps, setSelectedProps] = useState<Map<string, SelectedProp>>(new Map());
  const [entryAmount, setEntryAmount] = useState(25);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
        <div className='quantum-card rounded-2xl p-6 border-2 border-red-500/40 bg-red-500/5'>
          <h3 className='font-bold text-red-400 text-lg mb-3'>⚠️ Validation Errors</h3>
          <ul className='space-y-1'>
            {validationErrors.map((error, index) => (
              <li key={index} className='text-red-300 font-mono text-sm'>
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Props Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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

      {/* Submit Section */}
      {selectedProps.size >= 2 && validationErrors.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='quantum-card rounded-3xl p-8 text-center border-2 border-electric-500/30'
        >
          <h3 className='text-2xl font-bold text-electric-400 font-cyber mb-4'>READY TO SUBMIT</h3>
          <div className='grid grid-cols-3 gap-8 mb-6'>
            <div>
              <div className='text-2xl font-bold text-white font-cyber'>{selectedProps.size}</div>
              <div className='text-gray-400 font-mono'>Picks Selected</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-green-400 font-cyber'>${entryAmount}</div>
              <div className='text-gray-400 font-mono'>Entry Amount</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-yellow-400 font-cyber'>
                ${calculatePayout().toFixed(2)}
              </div>
              <div className='text-gray-400 font-mono'>Potential Payout</div>
            </div>
          </div>

          <motion.button
            className='px-12 py-6 bg-gradient-to-r from-electric-500 to-purple-500 text-black font-bold text-xl rounded-2xl hover:from-electric-400 hover:to-purple-400 transition-all duration-300'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className='flex items-center space-x-3'>
              <Zap className='w-6 h-6' />
              <span>SUBMIT QUANTUM ENTRY</span>
            </div>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PrizePicksPro;
