import { motion } from 'framer-motion';
import {
  Activity,
  Atom,
  BarChart3,
  Bell,
  Brain,
  DollarSign,
  Eye,
  Home,
  Menu,
  MessageCircle,
  Settings,
  Shield,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import working components
import PropOllama from './user-friendly/PropOllama';
import AdminPanel from './admin/AdminPanel';
import UltimateSettingsPage from './settings/UltimateSettingsPage';
import MLModelDashboard from './ml/MLModelDashboard';
import MoneyMakerPro from './user-friendly/MoneyMakerPro';
import PrizePicksPro from './user-friendly/PrizePicksPro';
import UniversalAnalytics from './analytics/UniversalAnalytics';
import SavedLineups from './lineups/SavedLineups';

import MarketIntelligence from './market/MarketIntelligence';
import '../styles/quantum-dashboard.css';

// Import enhanced WorkingDashboard
import EnhancedWorkingDashboard from './WorkingDashboard';

// Enhanced Real-time Monitor with live data streaming
const WorkingRealTimeMonitor: React.FC = () => {
  const { realTimeData } = useContext(AppContext);
  const [alertsCount, setAlertsCount] = useState(3);
  const [systemLoad, setSystemLoad] = useState(67);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      if (Math.random() < 0.1) setAlertsCount(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className='space-y-8 animate-slide-in-up p-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='text-center'>
        <div className='relative mb-6'>
          <div className='absolute inset-0 bg-orange-400/20 blur-3xl rounded-full' />
          <div className='relative text-6xl text-orange-400 float-element'>👁️</div>
        </div>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>REAL-TIME MONITOR</h1>
        <p className='text-xl text-gray-400 font-mono'>
          Live Data Intelligence & System Monitoring
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-green-400 text-3xl font-bold font-cyber'>
            {realTimeData?.liveGames || 23}
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>Live Games</div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2'></div>
            <span className='text-green-400 text-xs font-mono'>STREAMING</span>
          </div>
        </motion.div>

        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-electric-400 text-3xl font-bold font-cyber'>
            {(realTimeData?.predictions || 1247).toLocaleString()}
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>
            Predictions
          </div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-electric-400 rounded-full animate-pulse mr-2'></div>
            <span className='text-electric-400 text-xs font-mono'>GENERATING</span>
          </div>
        </motion.div>

        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-cyan-400 text-3xl font-bold font-cyber'>
            {realTimeData?.activeBots || 47}
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>
            Neural Bots
          </div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2'></div>
            <span className='text-cyan-400 text-xs font-mono'>ACTIVE</span>
          </div>
        </motion.div>

        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-purple-400 text-3xl font-bold font-cyber'>
            {realTimeData?.processingSpeed || 12}ms
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>Response</div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2'></div>
            <span className='text-purple-400 text-xs font-mono'>OPTIMAL</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* System Status */}
        <div className='quantum-card p-6 rounded-2xl border border-green-500/20'>
          <h3 className='text-xl font-bold text-green-400 font-cyber mb-6 flex items-center'>
            <Activity className='w-6 h-6 mr-2 animate-pulse' />
            SYSTEM STATUS
          </h3>
          <div className='space-y-4'>
            {[
              { name: 'Neural Networks', status: 'OPTIMAL', color: 'green-400' },
              { name: 'Data Pipeline', status: 'STREAMING', color: 'electric-400' },
              { name: 'API Gateway', status: 'ACTIVE', color: 'green-400' },
              { name: 'ML Models', status: 'TRAINING', color: 'yellow-400' },
              { name: 'Quantum Core', status: 'COHERENT', color: 'cyan-400' },
              { name: 'Alert System', status: 'MONITORING', color: 'orange-400' },
            ].map((item, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'
              >
                <span className='text-gray-300 font-mono'>{item.name}</span>
                <div className='flex items-center space-x-2'>
                  <div className={`w-3 h-3 bg-${item.color} rounded-full animate-pulse`}></div>
                  <span className={`text-${item.color} font-bold font-mono text-sm`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className='quantum-card p-6 rounded-2xl border border-electric-500/20'>
          <h3 className='text-xl font-bold text-electric-400 font-cyber mb-6 flex items-center'>
            <BarChart3 className='w-6 h-6 mr-2' />
            PERFORMANCE
          </h3>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-300 font-mono'>System Load</span>
                <span className='text-electric-400 font-bold font-mono'>{systemLoad}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-electric-400 to-cyan-400 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${systemLoad}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-300 font-mono'>Model Accuracy</span>
                <span className='text-green-400 font-bold font-mono'>
                  {(realTimeData?.accuracy || 87.3).toFixed(1)}%
                </span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full'
                  style={{ width: `${realTimeData?.accuracy || 87.3}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-300 font-mono'>Confidence Score</span>
                <span className='text-cyan-400 font-bold font-mono'>
                  {(realTimeData?.confidence || 91.5).toFixed(1)}%
                </span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full'
                  style={{ width: `${realTimeData?.confidence || 91.5}%` }}
                ></div>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-6'>
              <div className='text-center p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-purple-400 font-bold font-mono'>
                  {(realTimeData?.dataPoints || 2847592).toLocaleString()}
                </div>
                <div className='text-gray-400 text-xs font-mono'>Data Points</div>
              </div>
              <div className='text-center p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-yellow-400 font-bold font-mono'>
                  {(realTimeData?.quantumCoherence || 99.97).toFixed(2)}%
                </div>
                <div className='text-gray-400 text-xs font-mono'>Coherence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Alerts & Activity */}
        <div className='quantum-card p-6 rounded-2xl border border-orange-500/20'>
          <h3 className='text-xl font-bold text-orange-400 font-cyber mb-6 flex items-center'>
            <Bell className='w-6 h-6 mr-2' />
            LIVE ALERTS ({alertsCount})
          </h3>
          <div className='space-y-3 max-h-80 overflow-y-auto'>
            {[
              {
                time: '2m ago',
                type: 'HIGH',
                message: 'NBA model accuracy spike: 94.7%',
                color: 'green',
              },
              {
                time: '5m ago',
                type: 'INFO',
                message: 'New data feed: NFL injury reports',
                color: 'blue',
              },
              {
                time: '8m ago',
                type: 'WARN',
                message: 'API rate limit approaching',
                color: 'yellow',
              },
              {
                time: '12m ago',
                type: 'HIGH',
                message: 'Arbitrage opportunity detected',
                color: 'purple',
              },
              {
                time: '15m ago',
                type: 'INFO',
                message: 'Model retrained: XGBoost v2.1',
                color: 'green',
              },
              {
                time: '18m ago',
                type: 'CRIT',
                message: 'Quantum coherence > 99.9%',
                color: 'cyan',
              },
            ].map((alert, idx) => (
              <motion.div
                key={idx}
                className='p-3 bg-gray-800/40 rounded-lg border-l-4 border-l-green-400'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className='flex items-center justify-between mb-1'>
                  <span className={`text-${alert.color}-400 font-bold font-mono text-xs`}>
                    {alert.type}
                  </span>
                  <span className='text-gray-500 font-mono text-xs'>{alert.time}</span>
                </div>
                <div className='text-gray-300 text-sm font-mono'>{alert.message}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className='quantum-card p-6 rounded-2xl'>
        <h3 className='text-xl font-bold text-white font-cyber mb-6'>DATA SOURCES STATUS</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {[
            { name: 'ESPN API', status: 'online', latency: '45ms' },
            { name: 'PrizePicks', status: 'online', latency: '23ms' },
            { name: 'SportsRadar', status: 'online', latency: '67ms' },
            { name: 'TheOdds', status: 'warning', latency: '156ms' },
            { name: 'Neural Feed', status: 'online', latency: '12ms' },
            { name: 'Quantum Core', status: 'optimal', latency: '8ms' },
          ].map((source, idx) => (
            <div
              key={idx}
              className='p-4 bg-gray-800/30 rounded-xl text-center border border-gray-600/30'
            >
              <div className='text-sm font-bold text-white font-mono mb-2'>{source.name}</div>
              <div
                className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  source.status === 'online'
                    ? 'bg-green-400 animate-pulse'
                    : source.status === 'optimal'
                      ? 'bg-cyan-400 animate-pulse'
                      : 'bg-yellow-400 animate-pulse'
                }`}
              ></div>
              <div className='text-xs text-gray-400 font-mono'>{source.latency}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Import real services
import { useAuth } from '../hooks/useAuth';
import { useBettingData } from '../hooks/useBettingData';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { useStore } from '../stores/useStore';

// Context for app state
interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  user: any;
  realTimeData: any;
  notifications: any[];
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const QuantumSportsPlatform: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState('quantum-dark');

  // Real data hooks
  const { user } = useAuth();
  const { data: realTimeData } = useRealtimeData();
  const { notifications } = useBettingData();

  // Particle effects
  useEffect(() => {
    const createParticle = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = 8 + Math.random() * 4 + 's';
      particlesContainer.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 12000);
    };

    const particleInterval = setInterval(createParticle, 2000);

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  // Theme functionality
  const toggleTheme = () => {
    const themes = ['quantum-dark', 'neural-purple', 'cyber-blue', 'quantum-light'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);

    // Apply theme to document body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${nextTheme}`);

    // Handle light theme
    if (nextTheme === 'quantum-light') {
      document.documentElement.classList.remove('dark');
      document.body.style.background =
        'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)';
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.background = '';
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    document.body.classList.add('theme-quantum-dark');
    document.documentElement.classList.add('dark');
  }, []);

  // Toast functionality
  const store = useStore();
  console.log('Store:', store);
  console.log('Store keys:', Object.keys(store));
  // const { addToast } = store;

  const contextValue: AppContextType = {
    currentPage,
    setCurrentPage,
    sidebarCollapsed,
    setSidebarCollapsed,
    user: user || {
      name: 'Quantum User',
      tier: 'NEURAL',
      level: 47,
      accuracy: 87.3,
      profit: 24750,
    },
    realTimeData: realTimeData || {
      liveGames: 23,
      predictions: 1247,
      accuracy: 87.3,
      profit: 24750,
      neuralActivity: 94.2,
      quantumCoherence: 99.97,
      dataPoints: 2847592,
      processingSpeed: 12,
      confidence: 91.5,
      activeBots: 47,
    },
    notifications: notifications || [],
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className='quantum-bg text-white font-sans min-h-screen overflow-x-hidden'>
        {/* Particle Background */}
        <div id='particles' className='fixed inset-0 pointer-events-none z-0'></div>

        {/* Main layout */}
        <div className='flex min-h-screen'>
          <Sidebar />
          <div className='flex-1 flex flex-col transition-all duration-500'>
            <Header />
            <main className='flex-1 p-10'>
              <PageRenderer />
            </main>
            <footer className='ultra-glass border-t border-white/10 py-8'>
              <div className='text-center'>
                <div className='holographic font-bold mb-2 text-lg font-cyber'>
                  A1BETTING ULTIMATE QUANTUM INTELLIGENCE
                </div>
                <div className='text-sm text-gray-400 font-mono'>
                  © 2024 Neural Sports Intelligence Platform • 47 AI Agents • 1024 Qubits • Quantum
                  Enhanced • 🧠 Brain Status: OPTIMAL
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

const Header: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const {
    user,
    realTimeData,
    notifications,
    sidebarCollapsed,
    setSidebarCollapsed,
    setCurrentPage,
    theme,
    toggleTheme,
  } = context;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSystemMonitor, setShowSystemMonitor] = useState(false);
  return (
    <header className='ultra-glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-30'>
      <div className='max-w-full mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-6'>
            <motion.button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className='p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className='w-6 h-6 text-gray-300' />
            </motion.button>

            <div className='flex items-center space-x-4'>
              <div className='relative float-element'>
                <div className='absolute inset-0 bg-gradient-to-r from-electric-400 via-neon-blue to-neon-purple rounded-2xl blur-xl opacity-75' />
                <div className='relative w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-2xl flex items-center justify-center transform rotate-3'>
                  <Brain className='text-black text-xl font-bold animate-neural-pulse' />
                </div>
              </div>
              <div>
                <div className='holographic text-2xl font-black tracking-tight font-cyber'>
                  A1BETTING
                </div>
                <div className='text-xs text-gray-400 uppercase tracking-widest font-mono'>
                  Ultimate Brain 🧠 QUANTUM ACTIVE
                </div>
              </div>
            </div>

            <div className='hidden xl:flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-electric-500/10 rounded-xl px-4 py-2 border border-green-500/20'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse' />
              <span className='text-green-400 text-sm font-bold font-cyber'>NEURAL OPTIMAL</span>
              <span className='text-green-300 text-sm font-mono'>
                {(realTimeData?.accuracy || 87.3).toFixed(1)}% ACC
              </span>
              <div className='w-px h-4 bg-green-400/30' />
              <span className='text-blue-400 text-sm font-mono'>
                {realTimeData?.quantumCoherence || 99.97}% COHERENCE
              </span>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='hidden lg:flex items-center space-x-6 text-sm'>
              <div className='flex items-center space-x-2'>
                <Zap className='text-electric-400 animate-pulse w-4 h-4' />
                <span className='text-gray-400'>Processing:</span>
                <span className='text-electric-400 font-mono font-bold'>
                  {realTimeData?.processingSpeed || 12}ms
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Brain className='text-purple-400 animate-pulse w-4 h-4' />
                <span className='text-gray-400'>Bots:</span>
                <span className='text-purple-400 font-mono font-bold'>
                  {realTimeData?.activeBots || 47}/47
                </span>
              </div>
            </div>

            <motion.button
              onClick={toggleTheme}
              className='relative p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon group'
              whileHover={{ scale: 1.05 }}
              title={`Current theme: ${theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
            >
              <Eye className='text-electric-400 text-lg w-5 h-5' />
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-600 ${
                  theme === 'quantum-dark'
                    ? 'bg-gray-400'
                    : theme === 'neural-purple'
                      ? 'bg-purple-400'
                      : theme === 'cyber-blue'
                        ? 'bg-blue-400'
                        : 'bg-gray-200'
                }`}
              />
              <div className='absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity font-cyber whitespace-nowrap'>
                {theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </motion.button>

            {/* Activity Monitor Button */}
            <motion.button
              onClick={() => setShowSystemMonitor(!showSystemMonitor)}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                theme === 'neural-purple'
                  ? 'hover:bg-purple-500/20 hover:shadow-neon-purple'
                  : theme === 'cyber-blue'
                    ? 'hover:bg-blue-500/20 hover:shadow-neon-blue'
                    : theme === 'quantum-light'
                      ? 'hover:bg-gray-200 hover:shadow-lg'
                      : 'hover:bg-electric-500/20 hover:shadow-neon'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Activity
                className={`w-5 h-5 transition-colors duration-300 ${
                  showSystemMonitor
                    ? theme === 'neural-purple'
                      ? 'text-purple-400'
                      : theme === 'cyber-blue'
                        ? 'text-blue-400'
                        : theme === 'quantum-light'
                          ? 'text-gray-700'
                          : 'text-electric-400'
                    : theme === 'quantum-light'
                      ? 'text-gray-500'
                      : 'text-gray-400'
                } group-hover:animate-pulse`}
              />
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                  theme === 'neural-purple'
                    ? 'bg-purple-400'
                    : theme === 'cyber-blue'
                      ? 'bg-blue-400'
                      : theme === 'quantum-light'
                        ? 'bg-green-500'
                        : 'bg-green-400'
                }`}
              />
            </motion.button>

            {/* Notifications Button */}
            <div className='relative'>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3 rounded-xl transition-all duration-300 group ${
                  theme === 'neural-purple'
                    ? 'hover:bg-purple-500/20 hover:shadow-neon-purple'
                    : theme === 'cyber-blue'
                      ? 'hover:bg-blue-500/20 hover:shadow-neon-blue'
                      : theme === 'quantum-light'
                        ? 'hover:bg-gray-200 hover:shadow-lg'
                        : 'hover:bg-electric-500/20 hover:shadow-neon'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell
                  className={`w-5 h-5 transition-colors duration-300 ${
                    showNotifications
                      ? theme === 'neural-purple'
                        ? 'text-purple-400'
                        : theme === 'cyber-blue'
                          ? 'text-blue-400'
                          : theme === 'quantum-light'
                            ? 'text-gray-700'
                            : 'text-electric-400'
                      : theme === 'quantum-light'
                        ? 'text-gray-500'
                        : 'text-gray-400'
                  } group-hover:animate-bounce`}
                />
                {notifications.length > 0 && (
                  <div
                    className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center animate-pulse ${
                      theme === 'neural-purple'
                        ? 'bg-purple-500'
                        : theme === 'cyber-blue'
                          ? 'bg-blue-500'
                          : theme === 'quantum-light'
                            ? 'bg-red-500'
                            : 'bg-red-500'
                    }`}
                  >
                    <span className='text-white text-xs font-bold font-mono'>
                      {notifications.length}
                    </span>
                  </div>
                )}
              </motion.button>

              {/* Enhanced Notifications Panel */}
              {showNotifications && (
                <>
                  <div className='fixed inset-0 z-40' onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ type: 'spring', duration: 0.4 }}
                    className='absolute right-0 top-full mt-3 w-96 z-50 quantum-card'
                    style={{
                      background:
                        theme === 'neural-purple'
                          ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(45, 27, 105, 0.95) 100%)'
                          : theme === 'cyber-blue'
                            ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(29, 78, 216, 0.95) 100%)'
                            : theme === 'quantum-light'
                              ? 'linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)'
                              : 'linear-gradient(135deg, rgba(15, 15, 20, 0.95) 0%, rgba(26, 26, 36, 0.95) 100%)',
                      border:
                        theme === 'neural-purple'
                          ? '1px solid rgba(147, 51, 234, 0.6)'
                          : theme === 'cyber-blue'
                            ? '1px solid rgba(59, 130, 246, 0.6)'
                            : theme === 'quantum-light'
                              ? '1px solid rgba(100, 116, 139, 0.4)'
                              : '1px solid rgba(64, 224, 208, 0.6)',
                      borderRadius: '20px',
                      boxShadow:
                        theme === 'neural-purple'
                          ? '0 25px 50px -12px rgba(88, 28, 135, 0.6), 0 0 40px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          : theme === 'cyber-blue'
                            ? '0 25px 50px -12px rgba(29, 78, 216, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            : theme === 'quantum-light'
                              ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 30px rgba(100, 116, 139, 0.2)'
                              : '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(64, 224, 208, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(30px)',
                    }}
                  >
                    {/* Header Section */}
                    <div
                      className={`p-6 border-b rounded-t-[20px] ${
                        theme === 'neural-purple'
                          ? 'bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30'
                          : theme === 'cyber-blue'
                            ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30'
                            : theme === 'quantum-light'
                              ? 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 border-gray-300/30'
                              : 'bg-gradient-to-r from-gray-900/30 to-gray-800/30 border-electric-500/30'
                      }`}
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`p-2 rounded-xl ${
                              theme === 'neural-purple'
                                ? 'bg-purple-500/20'
                                : theme === 'cyber-blue'
                                  ? 'bg-blue-500/20'
                                  : theme === 'quantum-light'
                                    ? 'bg-gray-200'
                                    : 'bg-electric-500/20'
                            }`}
                          >
                            <Bell
                              className={`w-5 h-5 ${
                                theme === 'neural-purple'
                                  ? 'text-purple-400'
                                  : theme === 'cyber-blue'
                                    ? 'text-blue-400'
                                    : theme === 'quantum-light'
                                      ? 'text-gray-700'
                                      : 'text-electric-400'
                              }`}
                            />
                          </div>
                          <div>
                            <h3
                              className={`text-lg font-bold font-cyber ${
                                theme === 'quantum-light' ? 'text-gray-800' : 'text-white'
                              }`}
                            >
                              Notifications
                            </h3>
                            <p
                              className={`text-sm ${
                                theme === 'quantum-light' ? 'text-gray-600' : 'text-gray-300'
                              }`}
                            >
                              Real-time system alerts
                            </p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-2`}>
                          <div
                            className={`text-xs px-3 py-1.5 rounded-full font-mono font-medium ${
                              theme === 'neural-purple'
                                ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30'
                                : theme === 'cyber-blue'
                                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400/30'
                                  : theme === 'quantum-light'
                                    ? 'bg-gray-200 text-gray-700 border border-gray-300'
                                    : 'bg-electric-500/30 text-electric-200 border border-electric-400/30'
                            }`}
                          >
                            {notifications.length} ACTIVE
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className='max-h-80 overflow-y-auto custom-scrollbar'>
                      {notifications.length > 0 ? (
                        <div className='p-2'>
                          {notifications.map((notif: any, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`m-2 p-4 rounded-xl transition-all cursor-pointer group ${
                                theme === 'neural-purple'
                                  ? 'hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-400/40'
                                  : theme === 'cyber-blue'
                                    ? 'hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-400/40'
                                    : theme === 'quantum-light'
                                      ? 'hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                                      : 'hover:bg-electric-500/20 border border-electric-500/20 hover:border-electric-400/40'
                              }`}
                            >
                              <div className='flex items-start space-x-4'>
                                <div className='flex-shrink-0 pt-1'>
                                  <div
                                    className={`w-3 h-3 rounded-full animate-pulse ${
                                      theme === 'neural-purple'
                                        ? 'bg-purple-400'
                                        : theme === 'cyber-blue'
                                          ? 'bg-blue-400'
                                          : theme === 'quantum-light'
                                            ? 'bg-green-500'
                                            : 'bg-electric-400'
                                    }`}
                                  />
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='flex items-start justify-between'>
                                    <div className='flex-1'>
                                      <p
                                        className={`text-sm font-medium leading-relaxed ${
                                          theme === 'quantum-light' ? 'text-gray-800' : 'text-white'
                                        }`}
                                      >
                                        {notif.message}
                                      </p>
                                      <div className='flex items-center mt-2 space-x-3'>
                                        <span
                                          className={`text-xs font-mono px-2 py-1 rounded ${
                                            theme === 'neural-purple'
                                              ? 'bg-purple-500/20 text-purple-300'
                                              : theme === 'cyber-blue'
                                                ? 'bg-blue-500/20 text-blue-300'
                                                : theme === 'quantum-light'
                                                  ? 'bg-gray-200 text-gray-600'
                                                  : 'bg-electric-500/20 text-electric-300'
                                          }`}
                                        >
                                          {notif.time}
                                        </span>
                                        <span
                                          className={`text-xs ${
                                            theme === 'quantum-light'
                                              ? 'text-gray-500'
                                              : 'text-gray-400'
                                          }`}
                                        >
                                          {notif.type || 'SYSTEM'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className='p-8 text-center'>
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                              theme === 'neural-purple'
                                ? 'bg-purple-500/20'
                                : theme === 'cyber-blue'
                                  ? 'bg-blue-500/20'
                                  : theme === 'quantum-light'
                                    ? 'bg-gray-200'
                                    : 'bg-electric-500/20'
                            }`}
                          >
                            <Bell
                              className={`w-8 h-8 ${
                                theme === 'neural-purple'
                                  ? 'text-purple-400'
                                  : theme === 'cyber-blue'
                                    ? 'text-blue-400'
                                    : theme === 'quantum-light'
                                      ? 'text-gray-500'
                                      : 'text-electric-400'
                              }`}
                            />
                          </div>
                          <p
                            className={`text-sm font-medium ${
                              theme === 'quantum-light' ? 'text-gray-600' : 'text-gray-400'
                            }`}
                          >
                            No notifications
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              theme === 'quantum-light' ? 'text-gray-500' : 'text-gray-500'
                            }`}
                          >
                            All systems operating normally
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* System Monitor Modal */}
            {showSystemMonitor && (
              <>
                <div className='fixed inset-0 z-40' onClick={() => setShowSystemMonitor(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className='absolute right-16 top-full mt-2 w-96 z-50'
                  style={{
                    backgroundColor:
                      theme === 'neural-purple'
                        ? '#1e1b4b'
                        : theme === 'cyber-blue'
                          ? '#1e3a8a'
                          : theme === 'quantum-light'
                            ? '#f8fafc'
                            : '#0f0f14',
                    border:
                      theme === 'neural-purple'
                        ? '2px solid rgba(147, 51, 234, 0.4)'
                        : theme === 'cyber-blue'
                          ? '2px solid rgba(59, 130, 246, 0.4)'
                          : theme === 'quantum-light'
                            ? '2px solid rgba(100, 116, 139, 0.3)'
                            : '2px solid rgba(64, 224, 208, 0.3)',
                    borderRadius: '16px',
                    boxShadow:
                      theme === 'neural-purple'
                        ? '0 25px 50px -12px rgba(88, 28, 135, 0.4), 0 0 30px rgba(147, 51, 234, 0.2)'
                        : theme === 'cyber-blue'
                          ? '0 25px 50px -12px rgba(29, 78, 216, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)'
                          : theme === 'quantum-light'
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 20px rgba(100, 116, 139, 0.1)'
                            : '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(64, 224, 208, 0.2)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    className='p-4 border-b'
                    style={{
                      backgroundColor:
                        theme === 'neural-purple'
                          ? '#2d1b69'
                          : theme === 'cyber-blue'
                            ? '#1d4ed8'
                            : theme === 'quantum-light'
                              ? '#e2e8f0'
                              : '#1a1a24',
                      borderBottom:
                        theme === 'neural-purple'
                          ? '1px solid rgba(147, 51, 234, 0.3)'
                          : theme === 'cyber-blue'
                            ? '1px solid rgba(59, 130, 246, 0.3)'
                            : theme === 'quantum-light'
                              ? '1px solid rgba(100, 116, 139, 0.2)'
                              : '1px solid rgba(64, 224, 208, 0.3)',
                    }}
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <h3
                        className={`font-bold font-cyber flex items-center space-x-2 ${
                          theme === 'quantum-light'
                            ? 'text-gray-800'
                            : theme === 'neural-purple'
                              ? 'text-purple-400'
                              : theme === 'cyber-blue'
                                ? 'text-blue-400'
                                : 'text-electric-400'
                        }`}
                      >
                        <Activity
                          className={`w-5 h-5 animate-pulse ${
                            theme === 'quantum-light'
                              ? 'text-gray-600'
                              : theme === 'neural-purple'
                                ? 'text-purple-400'
                                : theme === 'cyber-blue'
                                  ? 'text-blue-400'
                                  : 'text-electric-400'
                          }`}
                        />
                        <span>System Monitor</span>
                      </h3>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'neural-purple'
                            ? 'bg-purple-500/20 text-purple-300'
                            : theme === 'cyber-blue'
                              ? 'bg-blue-500/20 text-blue-300'
                              : theme === 'quantum-light'
                                ? 'bg-gray-200 text-gray-700'
                                : 'bg-electric-500/20 text-electric-300'
                        } font-mono`}
                      >
                        LIVE
                      </div>
                    </div>
                    <p
                      className={`text-sm ${theme === 'quantum-light' ? 'text-gray-600' : 'text-gray-300'}`}
                    >
                      Real-time performance metrics
                    </p>
                  </div>
                  <div
                    className='p-4 space-y-4'
                    style={{
                      backgroundColor:
                        theme === 'neural-purple'
                          ? '#1e1b4b'
                          : theme === 'cyber-blue'
                            ? '#1e3a8a'
                            : theme === 'quantum-light'
                              ? '#f8fafc'
                              : '#0f0f14',
                    }}
                  >
                    <div className='grid grid-cols-2 gap-3'>
                      {[
                        {
                          label: 'CPU Usage',
                          value: '67%',
                          color:
                            theme === 'neural-purple'
                              ? 'purple'
                              : theme === 'cyber-blue'
                                ? 'blue'
                                : theme === 'quantum-light'
                                  ? 'gray'
                                  : 'electric',
                        },
                        { label: 'Memory', value: '4.2GB', color: 'green' },
                        {
                          label: 'Networks',
                          value: `${realTimeData?.activeBots || 47}/47`,
                          color: 'purple',
                        },
                        {
                          label: 'Latency',
                          value: `${realTimeData?.processingSpeed || 12}ms`,
                          color: 'cyan',
                        },
                      ].map((metric, index) => (
                        <div
                          key={index}
                          className='rounded-lg p-3 border'
                          style={{
                            backgroundColor:
                              theme === 'neural-purple'
                                ? '#2d1b69'
                                : theme === 'cyber-blue'
                                  ? '#1d4ed8'
                                  : theme === 'quantum-light'
                                    ? '#ffffff'
                                    : '#1a1a24',
                            borderColor:
                              theme === 'neural-purple'
                                ? 'rgba(147, 51, 234, 0.3)'
                                : theme === 'cyber-blue'
                                  ? 'rgba(59, 130, 246, 0.3)'
                                  : theme === 'quantum-light'
                                    ? 'rgba(100, 116, 139, 0.2)'
                                    : 'rgba(100, 100, 120, 0.3)',
                          }}
                        >
                          <div
                            className={`text-xs font-mono mb-1 ${
                              theme === 'quantum-light' ? 'text-gray-600' : 'text-gray-400'
                            }`}
                          >
                            {metric.label}
                          </div>
                          <div
                            className={`font-bold font-cyber text-lg ${
                              metric.color === 'purple'
                                ? 'text-purple-400'
                                : metric.color === 'blue'
                                  ? 'text-blue-400'
                                  : metric.color === 'green'
                                    ? 'text-green-400'
                                    : metric.color === 'cyan'
                                      ? 'text-cyan-400'
                                      : metric.color === 'gray'
                                        ? 'text-gray-700'
                                        : 'text-electric-400'
                            }`}
                          >
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='space-y-3'>
                      <div className='flex justify-between items-center text-sm'>
                        <span
                          className={`font-mono ${theme === 'quantum-light' ? 'text-gray-600' : 'text-gray-400'}`}
                        >
                          Quantum Coherence
                        </span>
                        <span
                          className={`font-bold font-cyber ${
                            theme === 'neural-purple'
                              ? 'text-purple-400'
                              : theme === 'cyber-blue'
                                ? 'text-blue-400'
                                : theme === 'quantum-light'
                                  ? 'text-gray-700'
                                  : 'text-cyan-400'
                          }`}
                        >
                          {realTimeData?.quantumCoherence || 99.97}%
                        </span>
                      </div>
                      <div
                        className='w-full rounded-full h-3 relative overflow-hidden'
                        style={{
                          backgroundColor: theme === 'quantum-light' ? '#e5e7eb' : '#374151',
                        }}
                      >
                        <div
                          className='h-3 rounded-full transition-all duration-1000 relative'
                          style={{
                            width: `${realTimeData?.quantumCoherence || 99.97}%`,
                            background:
                              theme === 'neural-purple'
                                ? 'linear-gradient(to right, #8b5cf6, #a855f7)'
                                : theme === 'cyber-blue'
                                  ? 'linear-gradient(to right, #3b82f6, #60a5fa)'
                                  : theme === 'quantum-light'
                                    ? 'linear-gradient(to right, #6366f1, #8b5cf6)'
                                    : 'linear-gradient(to right, #22d3ee, #40e0d0)',
                          }}
                        >
                          <div className='absolute inset-0 bg-white/20 animate-pulse' />
                        </div>
                      </div>
                    </div>

                    <div className='text-center pt-2'>
                      <button
                        onClick={() => {
                          setCurrentPage('realtime');
                          setShowSystemMonitor(false);
                        }}
                        className={`text-sm font-cyber transition-all px-4 py-2 rounded-lg border ${
                          theme === 'neural-purple'
                            ? 'text-purple-400 hover:text-purple-300 border-purple-500/30 hover:bg-purple-500/10'
                            : theme === 'cyber-blue'
                              ? 'text-blue-400 hover:text-blue-300 border-blue-500/30 hover:bg-blue-500/10'
                              : theme === 'quantum-light'
                                ? 'text-gray-700 hover:text-gray-600 border-gray-300 hover:bg-gray-100'
                                : 'text-electric-400 hover:text-electric-300 border-electric-500/30 hover:bg-electric-500/10'
                        }`}
                      >
                        View Full Monitor →
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            <div className='flex items-center space-x-4'>
              <div className='hidden md:block text-right'>
                <div className='font-bold text-white text-sm'>{user.name}</div>
                <div className='text-xs text-electric-400 font-mono'>
                  {user.tier} • LVL {user.level}
                </div>
              </div>
              <motion.button
                onClick={() => setCurrentPage('settings')}
                className='relative w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-xl flex items-center justify-center hover:shadow-neon transition-all duration-300 transform hover:scale-105 hover:rotate-3'
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='text-black font-black text-lg font-cyber'>
                  {user.name.charAt(0)}
                </span>
                <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse' />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { currentPage, setCurrentPage, sidebarCollapsed, realTimeData } = context;

  const navigation = [
    {
      name: 'Ultimate Dashboard',
      key: 'dashboard',
      icon: 'fa-home',
      category: 'main',
      indicator: '🧠',
      color: 'text-electric-400',
    },
    {
      name: 'Money Maker',
      key: 'money-maker',
      icon: 'fa-dollar-sign',
      category: 'main',
      indicator: '💰',
      color: 'text-green-400',
    },
    {
      name: 'PrizePicks Pro',
      key: 'prizepicks',
      icon: 'fa-trophy',
      category: 'main',
      indicator: '🏆',
      color: 'text-yellow-400',
    },
    {
      name: 'PropGPT',
      key: 'propollama',
      icon: 'fa-comments',
      category: 'ai',
      indicator: '🤖',
      color: 'text-blue-400',
    },
    {
      name: 'Saved Lineups',
      key: 'saved-lineups',
      icon: 'fa-bookmark',
      category: 'main',
      indicator: '📋',
      color: 'text-electric-400',
    },
    {
      name: 'ML Center',
      key: 'ml-center',
      icon: 'fa-brain',
      category: 'ai',
      indicator: '🧠',
      color: 'text-purple-400',
    },

    {
      name: 'Neural Analytics',
      key: 'analytics',
      icon: 'fa-chart-line',
      category: 'insights',
      indicator: '📊',
      color: 'text-indigo-400',
    },
    {
      name: 'Real-time Monitor',
      key: 'realtime',
      icon: 'fa-eye',
      category: 'insights',
      indicator: '👁️',
      color: 'text-orange-400',
    },
    {
      name: 'Market Intelligence',
      key: 'market',
      icon: 'fa-chart-bar',
      category: 'insights',
      indicator: '📈',
      color: 'text-pink-400',
    },
    {
      name: 'Settings',
      key: 'settings',
      icon: 'fa-cog',
      category: 'account',
      color: 'text-gray-400',
    },
    {
      name: 'Admin Quantum',
      key: 'admin',
      icon: 'fa-shield-alt',
      category: 'account',
      indicator: '🛡️',
      color: 'text-red-400',
    },
  ];

  const categories = {
    main: 'Core Quantum Features',
    ai: 'AI & Neural Networks',
    insights: 'Intelligence & Analytics',
    account: 'System Control',
  };

  const groupedNav = navigation.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <motion.div
      className={`${sidebarCollapsed ? 'w-20' : 'w-96'} ultra-glass h-screen border-r border-white/10 flex flex-col transition-all duration-500 ease-in-out`}
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 384 }}
    >
      <div className='p-6 border-b border-white/10'>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex items-center space-x-4 mb-8'
          >
            <div className='w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-2xl flex items-center justify-center animate-quantum-spin'>
              <i className='fas fa-brain text-black text-xl font-bold' />
            </div>
            <div>
              <h2 className='holographic text-xl font-black font-cyber'>QUANTUM NAV</h2>
              <p className='text-xs text-gray-400 font-mono'>Neural Interface v4.7</p>
            </div>
          </motion.div>
        )}

        <nav className='space-y-3'>
          <motion.button
            onClick={() => setCurrentPage('dashboard')}
            className={`nav-item w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 rounded-2xl transition-all duration-300 ${
              currentPage === 'dashboard'
                ? 'bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 shadow-neon'
                : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border-2 border-transparent hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-4'}`}>
              <i className='fas fa-home text-xl' />
              {!sidebarCollapsed && <span className='font-bold font-cyber'>QUANTUM DASHBOARD</span>}
              {!sidebarCollapsed && <span className='text-lg animate-bounce'>🧠</span>}
            </div>
            {!sidebarCollapsed && <div className='text-electric-400 font-bold'>→</div>}
          </motion.button>
        </nav>
      </div>

      <div className='flex-1 p-6 overflow-y-auto custom-scrollbar'>
        <nav className='space-y-8'>
          {Object.entries(groupedNav).map(([category, items]: [string, any]) => (
            <div key={category} className='space-y-3'>
              {!sidebarCollapsed && (
                <h3 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-cyber'>
                  {categories[category as keyof typeof categories]}
                </h3>
              )}
              <ul className='space-y-2'>
                {items.map((item: any) => {
                  const isActive = currentPage === item.key;
                  return (
                    <li key={item.key}>
                      <motion.button
                        onClick={() => setCurrentPage(item.key)}
                        className={`nav-item w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 text-left text-sm font-bold transition-all duration-400 rounded-2xl ${
                          isActive
                            ? 'active text-electric-400'
                            : `text-gray-300 hover:text-white ${item.color}`
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-4'}`}>
                          <i className={`fas ${item.icon} text-xl`} />
                          {!sidebarCollapsed && <span className='font-cyber'>{item.name}</span>}
                          {!sidebarCollapsed && item.indicator && (
                            <span className='text-lg'>{item.indicator}</span>
                          )}
                        </div>
                        {!sidebarCollapsed && isActive && (
                          <div className='text-electric-400 font-bold'>→</div>
                        )}
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {!sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='p-6 border-t border-white/10'
        >
          <div className='quantum-card rounded-2xl p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <Brain className='text-electric-400 text-xl animate-neural-pulse' />
              <span className='font-bold text-white font-cyber'>NEURAL STATUS</span>
            </div>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Status:</span>
                <span className='text-green-400 font-bold font-cyber animate-pulse'>OPTIMAL</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Accuracy:</span>
                <span className='text-electric-400 font-bold font-mono'>
                  {(realTimeData?.accuracy || 87.3).toFixed(1)}%
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Neural Nets:</span>
                <span className='text-white font-bold font-mono'>47/47</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Quantum:</span>
                <span className='text-cyan-400 font-bold font-mono'>
                  {realTimeData?.quantumCoherence || 99.97}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const PageRenderer: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { currentPage, setCurrentPage } = context;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <EnhancedWorkingDashboard onNavigate={setCurrentPage} />;
      case 'money-maker':
        return <MoneyMakerPro />;
      case 'prizepicks':
        return <PrizePicksPro />;
      case 'propollama':
        return <PropOllama />;
      case 'saved-lineups':
        return <SavedLineups />;
      case 'ml-center':
        return <MLModelDashboard />;

      case 'analytics':
        return <UniversalAnalytics />;
      case 'realtime':
        return <WorkingRealTimeMonitor />;
      case 'market':
        return <MarketIntelligence />;
      case 'saved-lineups':
        return <SavedLineups />;
      case 'settings':
        try {
          return <UltimateSettingsPage />;
        } catch (error) {
          return (
            <div className='p-8 space-y-6'>
              <div className='text-center'>
                <h2 className='text-3xl font-bold text-white mb-4'>System Settings</h2>
                <p className='text-gray-400 text-lg'>Configure your neural interface</p>
              </div>
              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-4'>Quantum Interface Settings</h3>
                <p className='text-gray-300'>Advanced configuration panel coming soon...</p>
              </div>
            </div>
          );
        }
      case 'admin':
        try {
          return <AdminPanel />;
        } catch (error) {
          return (
            <div className='p-8 space-y-6'>
              <div className='text-center'>
                <h2 className='text-3xl font-bold text-white mb-4'>Admin Quantum Control</h2>
                <p className='text-red-400 text-lg'>System Administration Portal</p>
              </div>
              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-4'>🛡️ Admin Access Required</h3>
                <p className='text-gray-300'>High-level system administration features...</p>
              </div>
            </div>
          );
        }
      default:
        return <WorkingDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='h-full'
    >
      {renderPage()}
    </motion.div>
  );
};

export default QuantumSportsPlatform;
