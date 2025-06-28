import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Brain,
  Target,
  TrendingUp,
  Zap,
  DollarSign,
  Eye,
  BarChart3,
  Home,
  Cpu,
  Atom,
  Trophy,
  Users,
  Clock,
  Globe,
  Shield,
} from 'lucide-react';

interface AppContextType {
  realTimeData: {
    liveGames: number;
    predictions: number;
    accuracy: number;
    profit: number;
    neuralActivity: number;
    quantumCoherence: number;
    dataPoints: number;
    processingSpeed: number;
    confidence: number;
    activeBots: number;
    winStreak: number;
  };
  setRealTimeData: (data: any) => void;
  marketData: {
    hotGames: Array<{
      game: string;
      odds: string;
      volume: string;
      confidence: number;
    }>;
  };
}

// Create a mock context if it doesn't exist
const AppContext = React.createContext<AppContextType>({
  realTimeData: {
    liveGames: 23,
    predictions: 1847,
    accuracy: 87.3,
    profit: 24750,
    neuralActivity: 94.7,
    quantumCoherence: 99.97,
    dataPoints: 247892,
    processingSpeed: 12,
    confidence: 91.5,
    activeBots: 47,
    winStreak: 14,
  },
  setRealTimeData: () => {},
  marketData: {
    hotGames: [
      { game: 'Lakers vs Warriors', odds: '-110', volume: '$2.4M', confidence: 96.2 },
      { game: 'Chiefs vs Bills', odds: '-105', volume: '$1.8M', confidence: 93.7 },
      { game: 'Celtics vs Heat', odds: '-115', volume: '$1.2M', confidence: 91.8 },
    ],
  },
});

interface WorkingDashboardProps {
  onNavigate: (page: string) => void;
}

// Enhanced UI Components - Exact matches from poe-preview(8).html
const Button = ({
  label,
  onClick,
  variant = 'primary',
  className = '',
  icon = null,
  size = 'md',
  disabled = false,
  loading = false,
}: any) => {
  const variants = {
    primary: 'quantum-btn',
    secondary:
      'bg-gray-700/50 hover:bg-gray-600/50 text-white border-2 border-gray-600 hover:border-gray-500 backdrop-blur-20',
    success:
      'bg-green-600/50 hover:bg-green-700/50 text-white border-2 border-green-500 backdrop-blur-20',
    danger: 'bg-red-600/50 hover:bg-red-700/50 text-white border-2 border-red-500 backdrop-blur-20',
    ghost:
      'bg-transparent border-2 border-electric-500 text-electric-500 hover:bg-electric-500 hover:text-black backdrop-blur-20',
    neural:
      'bg-purple-600/50 hover:bg-purple-700/50 text-white border-2 border-purple-500 backdrop-blur-20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${sizes[size]} rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${variants[variant]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {loading && (
        <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
      )}
      {!loading && icon && <i className={icon} />}
      <span>{label}</span>
    </button>
  );
};

const Card = ({ title, children, className = '', glowing = false, variant = 'default' }: any) => {
  const variants = {
    default: 'quantum-card',
    glass: 'ultra-glass',
    neural: 'quantum-card border-purple-500/30',
    success: 'quantum-card border-green-500/30',
    warning: 'quantum-card border-yellow-500/30',
  };

  const glowClass = glowing ? 'shadow-neon' : '';

  return (
    <div className={`${variants[variant]} rounded-3xl p-8 ${glowClass} ${className}`}>
      {title && (
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-electric-400 holographic'>{title}</h3>
          <div className='w-3 h-3 bg-electric-400 rounded-full animate-pulse' />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  icon,
  change,
  trend = 'up',
  live = false,
  variant = 'default',
}: any) => {
  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  const trendIcon =
    trend === 'up' ? 'fa-arrow-up' : trend === 'down' ? 'fa-arrow-down' : 'fa-minus';

  const variants = {
    default: 'quantum-card',
    neural: 'quantum-card border-purple-500/20',
    quantum: 'quantum-card border-blue-500/20',
    profit: 'quantum-card border-green-500/20',
  };

  return (
    <div
      className={`${variants[variant]} rounded-2xl p-6 text-center hover:shadow-neon transition-all duration-500 transform hover:scale-105 hover:rotate-1`}
    >
      <div className='relative mb-4'>
        <div className='absolute inset-0 bg-electric-400/20 rounded-full blur-xl' />
        <div className={`relative text-4xl text-electric-400 ${live ? 'brain-pulse' : ''}`}>
          <i className={icon} />
        </div>
      </div>
      <div
        className={`text-3xl font-black mb-2 text-white font-cyber ${live ? 'animate-cyber-pulse' : ''}`}
      >
        {value}
      </div>
      <div className='text-gray-400 text-sm mb-3 uppercase tracking-wider'>{label}</div>
      {change && (
        <div className={`flex items-center justify-center text-sm ${trendColor} font-semibold`}>
          <i className={`${trendIcon} mr-2`} />
          {change}
        </div>
      )}
    </div>
  );
};

const WorkingDashboard: React.FC<WorkingDashboardProps> = ({ onNavigate }) => {
  const { realTimeData, setRealTimeData, marketData } = useContext(AppContext);

  // Enhanced real-time data updates to match HTML reference exactly
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev: any) => ({
        ...prev,
        liveGames: Math.max(15, prev.liveGames + Math.floor(Math.random() * 5 - 2)),
        predictions: prev.predictions + Math.floor(Math.random() * 100 + 20),
        accuracy: Math.min(99.9, Math.max(95, prev.accuracy + (Math.random() - 0.5) * 0.2)),
        profit: prev.profit + Math.floor(Math.random() * 2000 + 500),
        neuralActivity: Math.min(
          99.9,
          Math.max(90, prev.neuralActivity + (Math.random() - 0.5) * 1)
        ),
        quantumCoherence: Math.min(
          99.99,
          Math.max(99.9, prev.quantumCoherence + (Math.random() - 0.5) * 0.01)
        ),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 10000 + 5000),
        processingSpeed: Math.max(
          8,
          Math.min(20, prev.processingSpeed + Math.floor(Math.random() * 6 - 3))
        ),
        confidence: Math.min(99, Math.max(85, prev.confidence + (Math.random() - 0.5) * 2)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [setRealTimeData]);

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Enhanced Welcome Section */}
      <div className='text-center mb-12'>
        <div className='relative'>
          <h1 className='holographic text-6xl font-black mb-6 font-cyber relative z-10'>
            QUANTUM INTELLIGENCE COMMAND
          </h1>
          <p className='text-2xl text-gray-300 font-light relative z-10'>
            Real-time neural network analysis with quantum enhancement
          </p>
          <div className='text-lg text-electric-400 mt-4 font-mono'>
            {realTimeData.dataPoints.toLocaleString()} data points processed •{' '}
            {realTimeData.activeBots} AI agents active
          </div>
        </div>
      </div>

      {/* Enhanced Real-Time Metrics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <MetricCard
          label='Neural Activity'
          value={`${realTimeData.neuralActivity.toFixed(1)}%`}
          icon='fa-brain'
          change='+2.1%'
          trend='up'
          live={true}
          variant='neural'
        />
        <MetricCard
          label='Quantum Coherence'
          value={`${realTimeData.quantumCoherence.toFixed(2)}%`}
          icon='fa-atom'
          change='+0.03%'
          trend='up'
          live={true}
          variant='quantum'
        />
        <MetricCard
          label='Real-Time Accuracy'
          value={`${realTimeData.accuracy.toFixed(1)}%`}
          icon='fa-target'
          change='+0.4%'
          trend='up'
          live={true}
        />
        <MetricCard
          label='Live Profit Stream'
          value={`$${realTimeData.profit.toLocaleString()}`}
          icon='fa-chart-line'
          change='+$2.7K'
          trend='up'
          live={true}
          variant='profit'
        />
      </div>

      {/* Enhanced Status Bar */}
      <div className='ultra-glass rounded-3xl p-8 border border-electric-500/20'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-electric-400 holographic font-cyber'>
            NEURAL COMMAND CENTER
          </h2>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-green-400 rounded-full animate-pulse' />
            <span className='text-green-400 font-bold font-mono'>SYSTEMS ONLINE</span>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='text-center'>
            <div className='text-4xl mb-3 text-blue-400'>
              <i className='fas fa-microchip animate-pulse' />
            </div>
            <div className='text-gray-400 text-sm font-mono'>Processing Speed</div>
            <div className='text-2xl font-bold text-blue-400 font-mono'>
              {realTimeData.processingSpeed}ms
            </div>
            <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse mx-auto mt-2' />
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-3 text-green-400'>
              <i className='fas fa-shield-alt animate-pulse' />
            </div>
            <div className='text-gray-400 text-sm font-mono'>AI Confidence</div>
            <div className='text-2xl font-bold text-green-400 font-mono'>
              {realTimeData.confidence.toFixed(1)}%
            </div>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse mx-auto mt-2' />
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-3 text-purple-400'>
              <i className='fas fa-database animate-pulse' />
            </div>
            <div className='text-gray-400 text-sm font-mono'>Data Points</div>
            <div className='text-2xl font-bold text-purple-400 font-mono'>
              {(realTimeData.dataPoints / 1000000).toFixed(1)}M
            </div>
            <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse mx-auto mt-2' />
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-3 text-yellow-400'>
              <i className='fas fa-fire animate-pulse' />
            </div>
            <div className='text-gray-400 text-sm font-mono'>Win Streak</div>
            <div className='text-2xl font-bold text-yellow-400 font-mono'>
              {realTimeData.winStreak}
            </div>
            <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse mx-auto mt-2' />
          </div>
        </div>
        <div className='mt-8 text-center border-t border-white/10 pt-6'>
          <div className='flex items-center justify-center space-x-4 text-sm'>
            <span className='text-gray-500 font-mono'>Last neural sync:</span>
            <span className='text-electric-400 font-mono font-bold'>
              {new Date().toLocaleTimeString()}
            </span>
            <div className='w-px h-4 bg-gray-500' />
            <span className='text-gray-400 font-mono'>Auto-sync: 2.0s intervals</span>
          </div>
        </div>
      </div>

      {/* Enhanced Live Feed */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card title='QUANTUM GAME ANALYSIS' glowing={true} variant='neural'>
          <div className='space-y-6'>
            {marketData.hotGames.map((game, i) => (
              <div
                key={i}
                className={`p-6 bg-gradient-to-r ${i === 0 ? 'from-green-500/10 to-green-600/5' : i === 1 ? 'from-blue-500/10 to-blue-600/5' : 'from-purple-500/10 to-purple-600/5'} rounded-2xl border border-${i === 0 ? 'green' : i === 1 ? 'blue' : 'purple'}-500/30 hover:shadow-neon transition-all duration-300`}
              >
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <div
                      className={`font-bold text-xl ${i === 0 ? 'text-green-300' : i === 1 ? 'text-blue-300' : 'text-purple-300'} font-cyber`}
                    >
                      {game.game}
                    </div>
                    <div className='text-gray-400 font-mono text-sm'>
                      Odds: {game.odds} • Volume: {game.volume}
                    </div>
                  </div>
                  <div
                    className={`${i === 0 ? 'text-green-400' : i === 1 ? 'text-blue-400' : 'text-purple-400'} text-sm font-bold animate-pulse flex items-center`}
                  >
                    <div
                      className={`w-3 h-3 ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-blue-400' : 'bg-purple-400'} rounded-full mr-2`}
                    />
                    LIVE TRACKING
                  </div>
                </div>
                <div className='mb-4'>
                  <div className='flex justify-between text-sm mb-2'>
                    <span className='text-gray-400 font-mono'>AI Confidence</span>
                    <span
                      className={`${i === 0 ? 'text-green-400' : i === 1 ? 'text-blue-400' : 'text-purple-400'} font-bold font-mono`}
                    >
                      {game.confidence}%
                    </span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-3 overflow-hidden'>
                    <div
                      className={`h-full ${i === 0 ? 'bg-gradient-to-r from-green-400 to-green-500' : i === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-purple-400 to-purple-500'} rounded-full transition-all duration-1000 animate-energy-wave`}
                      style={{ width: `${game.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title='NEURAL NETWORK ACTIVITY' variant='quantum'>
          <div className='space-y-6'>
            <div className='flex items-center space-x-4 p-4 bg-electric-500/10 rounded-2xl border border-electric-500/20'>
              <div className='relative'>
                <div className='absolute inset-0 bg-electric-400 rounded-full blur-md opacity-50' />
                <div className='relative w-4 h-4 bg-electric-400 rounded-full animate-pulse' />
              </div>
              <div className='flex-1'>
                <div className='text-electric-300 text-sm font-mono'>
                  Neural Network #{Math.floor(Math.random() * 47 + 1)} processed{' '}
                  {Math.floor(Math.random() * 5000 + 1000)} data points
                </div>
                <div className='text-xs text-gray-500 mt-1'>
                  {Math.floor(Math.random() * 15 + 5)}ms response time
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20'>
              <div className='relative'>
                <div className='absolute inset-0 bg-purple-400 rounded-full blur-md opacity-50' />
                <div className='relative w-4 h-4 bg-purple-400 rounded-full animate-pulse' />
              </div>
              <div className='flex-1'>
                <div className='text-purple-300 text-sm font-mono'>
                  Quantum processor generated new prediction vector
                </div>
                <div className='text-xs text-gray-500 mt-1'>Quantum coherence: 99.97%</div>
              </div>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20'>
              <div className='relative'>
                <div className='absolute inset-0 bg-blue-400 rounded-full blur-md opacity-50' />
                <div className='relative w-4 h-4 bg-blue-400 rounded-full animate-pulse' />
              </div>
              <div className='flex-1'>
                <div className='text-blue-300 text-sm font-mono'>
                  Ensemble model accuracy increased to {realTimeData.accuracy.toFixed(1)}%
                </div>
                <div className='text-xs text-gray-500 mt-1'>Auto-optimization complete</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <Card glowing={true} variant='success'>
          <div className='text-center'>
            <div className='relative mb-6'>
              <div className='absolute inset-0 bg-green-400/30 rounded-full blur-2xl' />
              <div className='relative text-7xl text-green-400 animate-float'>💰</div>
            </div>
            <h3 className='text-2xl font-black mb-3 text-green-400 font-cyber'>
              QUANTUM MONEY MAKER
            </h3>
            <p className='text-gray-300 mb-6 text-sm font-mono'>
              Neural profit maximization with 47 AI agents active
            </p>
            <div className='mb-6 space-y-2'>
              <div className='text-green-400 font-bold font-mono'>
                ROI: {((realTimeData.profit / 50000) * 100).toFixed(1)}%
              </div>
              <div className='text-xs text-gray-400'>Processing 47 neural networks</div>
            </div>
            <Button
              label='ACTIVATE QUANTUM MODE'
              variant='primary'
              className='w-full'
              size='lg'
              onClick={() => onNavigate('money-maker')}
            />
          </div>
        </Card>

        <Card variant='neural'>
          <div className='text-center'>
            <div className='relative mb-6'>
              <div className='absolute inset-0 bg-blue-400/30 rounded-full blur-2xl' />
              <div className='relative text-7xl text-blue-400 animate-float'>🏆</div>
            </div>
            <h3 className='text-2xl font-black mb-3 text-blue-400 font-cyber'>
              PRIZEPICKS QUANTUM
            </h3>
            <p className='text-gray-300 mb-6 text-sm font-mono'>
              Enhanced prop analysis with quantum prediction
            </p>
            <div className='mb-6 space-y-2'>
              <div className='text-blue-400 font-bold font-mono'>
                Accuracy: {realTimeData.accuracy.toFixed(1)}%
              </div>
              <div className='text-xs text-gray-400'>
                {Math.floor(realTimeData.liveGames * 4)} props analyzed
              </div>
            </div>
            <Button
              label='ANALYZE PROPS'
              variant='secondary'
              className='w-full'
              size='lg'
              onClick={() => onNavigate('prizepicks')}
            />
          </div>
        </Card>

        <Card variant='quantum'>
          <div className='text-center'>
            <div className='relative mb-6'>
              <div className='absolute inset-0 bg-purple-400/30 rounded-full blur-2xl' />
              <div className='relative text-7xl text-purple-400 animate-float'>🤖</div>
            </div>
            <h3 className='text-2xl font-black mb-3 text-purple-400 font-cyber'>PROPGPT NEURAL</h3>
            <p className='text-gray-300 mb-6 text-sm font-mono'>
              AI assistant powered by quantum intelligence
            </p>
            <div className='mb-6 space-y-2'>
              <div className='text-purple-400 font-bold font-mono'>Neural IQ: 247</div>
              <div className='text-xs text-gray-400'>Real-time market analysis</div>
            </div>
            <Button
              label='CHAT WITH AI'
              variant='ghost'
              className='w-full'
              size='lg'
              onClick={() => onNavigate('propgpt')}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkingDashboard;
