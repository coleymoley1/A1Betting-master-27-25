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
  };
  setRealTimeData: (data: any) => void;
  marketData: any;
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
  },
  setRealTimeData: () => {},
  marketData: {},
});

interface WorkingDashboardProps {
  onNavigate: (page: string) => void;
}

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

  // MetricCard component matching HTML reference
  const MetricCard = ({
    label,
    value,
    icon: Icon,
    change,
    trend = 'up',
    live = false,
    variant = 'default',
  }: {
    label: string;
    value: string;
    icon: any;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    live?: boolean;
    variant?: 'default' | 'neural' | 'quantum' | 'profit';
  }) => {
    const trendColor =
      trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';

    const variants = {
      default: 'quantum-card',
      neural: 'quantum-card border-purple-500/20',
      quantum: 'quantum-card border-blue-500/20',
      profit: 'quantum-card border-green-500/20',
    };

    return (
      <motion.div
        className={`${variants[variant]} rounded-2xl p-6 text-center hover:shadow-neon transition-all duration-500 transform hover:scale-105 hover:rotate-1`}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative mb-4'>
          <div className='absolute inset-0 bg-electric-400/20 rounded-full blur-xl' />
          <div
            className={`relative text-4xl text-electric-400 ${live ? 'animate-neural-pulse' : ''}`}
          >
            <Icon className='w-10 h-10 mx-auto' />
          </div>
        </div>
        <div
          className={`text-3xl font-black mb-2 text-white font-cyber ${live ? 'animate-cyber-pulse' : ''}`}
        >
          {value}
        </div>
        <div className='text-gray-400 text-sm mb-3 uppercase tracking-wider font-mono'>{label}</div>
        {change && (
          <div className={`flex items-center justify-center text-sm ${trendColor} font-semibold`}>
            <TrendingUp className='w-4 h-4 mr-2' />
            {change}
          </div>
        )}
      </motion.div>
    );
  };

  // StatusIndicator component matching HTML reference
  const StatusIndicator = ({
    status,
    label,
    pulsing = true,
  }: {
    status: 'active' | 'warning' | 'error' | 'processing' | 'neural';
    label: string;
    pulsing?: boolean;
  }) => {
    const statusColors = {
      active: 'bg-green-400',
      warning: 'bg-yellow-400',
      error: 'bg-red-400',
      processing: 'bg-blue-400',
      neural: 'bg-purple-400',
    };

    return (
      <div className='flex items-center space-x-3'>
        <div className='relative'>
          <div
            className={`absolute inset-0 ${statusColors[status]} rounded-full blur-sm opacity-50`}
          />
          <div
            className={`relative w-3 h-3 ${statusColors[status]} rounded-full ${pulsing ? 'animate-pulse' : ''}`}
          />
        </div>
        <span className='text-sm text-gray-300 font-medium font-mono'>{label}</span>
      </div>
    );
  };

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Enhanced Welcome Section - Matching HTML Reference */}
      <motion.div
        className='text-center mb-12'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='relative'>
          <motion.h1
            className='holographic text-6xl font-black mb-6 font-cyber relative z-10'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            QUANTUM INTELLIGENCE COMMAND
          </motion.h1>
          <motion.p
            className='text-2xl text-gray-300 font-light relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Real-time neural network analysis with quantum enhancement
          </motion.p>
          <motion.div
            className='text-lg text-electric-400 mt-4 font-mono'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {realTimeData.dataPoints.toLocaleString()} data points processed •{' '}
            {realTimeData.activeBots} AI agents active
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Real-Time Metrics Grid - Exact HTML Match */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <MetricCard
          label='Neural Activity'
          value={`${realTimeData.neuralActivity.toFixed(1)}%`}
          icon={Brain}
          change='+2.1%'
          trend='up'
          live={true}
          variant='neural'
        />
        <MetricCard
          label='Quantum Coherence'
          value={`${realTimeData.quantumCoherence.toFixed(2)}%`}
          icon={Atom}
          change='+0.03%'
          trend='up'
          live={true}
          variant='quantum'
        />
        <MetricCard
          label='Real-Time Accuracy'
          value={`${realTimeData.accuracy.toFixed(1)}%`}
          icon={Target}
          change='+0.4%'
          trend='up'
          live={true}
        />
        <MetricCard
          label='Live Profit Stream'
          value={`$${realTimeData.profit.toLocaleString()}`}
          icon={DollarSign}
          change='+$2.7K'
          trend='up'
          live={true}
          variant='profit'
        />
      </div>

      {/* Enhanced Status Bar - Matching HTML Reference */}
      <motion.div
        className='quantum-card rounded-3xl p-8 border border-electric-500/30'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-2xl font-bold text-electric-400 holographic font-cyber'>
            SYSTEM STATUS MATRIX
          </h3>
          <div className='flex items-center space-x-3'>
            <Activity className='w-6 h-6 text-green-400 animate-pulse' />
            <span className='text-green-400 font-bold font-cyber'>ALL SYSTEMS OPTIMAL</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          <StatusIndicator status='neural' label='Neural Networks' />
          <StatusIndicator status='active' label='Data Pipeline' />
          <StatusIndicator status='processing' label='Quantum Core' />
          <StatusIndicator status='active' label='API Services' />
          <StatusIndicator status='neural' label='ML Models' />
          <StatusIndicator status='active' label='Real-time Feed' />
        </div>
      </motion.div>

      {/* Enhanced Performance Metrics - Matching HTML Reference */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <motion.div
          className='quantum-card rounded-3xl p-8'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className='text-xl font-bold text-white mb-6 font-cyber'>NEURAL PERFORMANCE</h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Processing Speed</span>
              <span className='text-electric-400 font-bold font-mono'>
                {realTimeData.processingSpeed}ms avg
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Active Bots</span>
              <span className='text-green-400 font-bold font-mono'>
                {realTimeData.activeBots}/47
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Quantum Coherence</span>
              <span className='text-cyan-400 font-bold font-mono'>
                {realTimeData.quantumCoherence.toFixed(2)}%
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Data Quality</span>
              <span className='text-purple-400 font-bold font-mono'>98.3%</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Confidence Score</span>
              <span className='text-yellow-400 font-bold font-mono'>
                {realTimeData.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='quantum-card rounded-3xl p-8'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className='text-xl font-bold text-white mb-6 font-cyber'>QUANTUM ACTIONS</h3>
          <div className='space-y-4'>
            <motion.button
              onClick={() => onNavigate('money-maker')}
              className='w-full text-left p-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 transition-all duration-300 group'
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <DollarSign className='w-5 h-5 text-green-400' />
                  <span className='text-green-400 font-bold font-cyber'>Money Maker Pro</span>
                </div>
                <span className='text-green-300 opacity-0 group-hover:opacity-100 transition-opacity'>
                  →
                </span>
              </div>
            </motion.button>

            <motion.button
              onClick={() => onNavigate('prizepicks')}
              className='w-full text-left p-4 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 transition-all duration-300 group'
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <Trophy className='w-5 h-5 text-yellow-400' />
                  <span className='text-yellow-400 font-bold font-cyber'>PrizePicks Pro</span>
                </div>
                <span className='text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity'>
                  →
                </span>
              </div>
            </motion.button>

            <motion.button
              onClick={() => onNavigate('propollama')}
              className='w-full text-left p-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 transition-all duration-300 group'
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <Brain className='w-5 h-5 text-blue-400' />
                  <span className='text-blue-400 font-bold font-cyber'>PropOllama AI</span>
                </div>
                <span className='text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity'>
                  →
                </span>
              </div>
            </motion.button>

            <motion.button
              onClick={() => onNavigate('saved-lineups')}
              className='w-full text-left p-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 transition-all duration-300 group'
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <BarChart3 className='w-5 h-5 text-purple-400' />
                  <span className='text-purple-400 font-bold font-cyber'>Saved Lineups</span>
                </div>
                <span className='text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity'>
                  →
                </span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Live Data Feed - Matching HTML Reference */}
      <motion.div
        className='quantum-card rounded-3xl p-8 border border-electric-500/30'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-2xl font-bold text-electric-400 holographic font-cyber'>
            LIVE INTELLIGENCE FEED
          </h3>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-electric-400 rounded-full animate-pulse' />
            <span className='text-electric-400 font-mono text-sm'>STREAMING</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          <div className='text-center p-4 bg-gray-800/30 rounded-xl'>
            <div className='text-2xl font-bold text-green-400 font-cyber'>
              {realTimeData.liveGames}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Live Games</div>
          </div>
          <div className='text-center p-4 bg-gray-800/30 rounded-xl'>
            <div className='text-2xl font-bold text-electric-400 font-cyber'>
              {realTimeData.predictions}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Predictions</div>
          </div>
          <div className='text-center p-4 bg-gray-800/30 rounded-xl'>
            <div className='text-2xl font-bold text-cyan-400 font-cyber'>
              {realTimeData.dataPoints.toLocaleString()}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Data Points</div>
          </div>
          <div className='text-center p-4 bg-gray-800/30 rounded-xl'>
            <div className='text-2xl font-bold text-purple-400 font-cyber'>
              {realTimeData.processingSpeed}ms
            </div>
            <div className='text-xs text-gray-400 font-mono'>Speed</div>
          </div>
          <div className='text-center p-4 bg-gray-800/30 rounded-xl'>
            <div className='text-2xl font-bold text-yellow-400 font-cyber'>47/47</div>
            <div className='text-xs text-gray-400 font-mono'>AI Agents</div>
          </div>
          <div className='text-center p-4 bg-gray-800/30 rounded-xl'>
            <div className='text-2xl font-bold text-red-400 font-cyber'>∞</div>
            <div className='text-xs text-gray-400 font-mono'>Capacity</div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Footer Info - Matching HTML Reference */}
      <motion.div
        className='text-center text-gray-500 text-sm font-mono'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className='mb-2'>
          Neural Interface v4.7 • Quantum Enhanced • Processing at {realTimeData.processingSpeed}ms
        </div>
        <div>
          Last Update: {new Date().toLocaleTimeString()} • System Status:
          <span className='text-green-400 ml-1'>OPTIMAL</span>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkingDashboard;
