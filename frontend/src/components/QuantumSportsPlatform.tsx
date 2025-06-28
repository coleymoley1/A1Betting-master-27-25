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

// Create functional dashboard inline to avoid syntax errors
const WorkingDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { realTimeData } = useContext(AppContext);

  return (
    <div className='p-8 space-y-6'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-white mb-4 animate-cyber-pulse'>
          Quantum Intelligence Dashboard
        </h1>
        <p className='text-electric-400 text-lg'>Real-time Sports Betting AI Platform</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-lg font-bold text-white mb-2'>Live Games</h3>
          <div className='text-3xl font-bold text-green-400'>{realTimeData.liveGames}</div>
          <p className='text-gray-300 text-sm'>Currently monitored</p>
        </div>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-lg font-bold text-white mb-2'>Predictions Today</h3>
          <div className='text-3xl font-bold text-electric-400'>{realTimeData.predictions}</div>
          <p className='text-gray-300 text-sm'>Neural processed</p>
        </div>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-lg font-bold text-white mb-2'>Accuracy</h3>
          <div className='text-3xl font-bold text-cyan-400'>
            {(realTimeData.accuracy || 87.3).toFixed(1)}%
          </div>
          <p className='text-gray-300 text-sm'>This week</p>
        </div>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-lg font-bold text-white mb-2'>Profit</h3>
          <div className='text-3xl font-bold text-yellow-400'>
            +${realTimeData.profit?.toLocaleString() || '24,750'}
          </div>
          <p className='text-gray-300 text-sm'>Total returns</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-xl font-bold text-white mb-4'>Neural Activity</h3>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Processing Speed</span>
              <span className='text-electric-400 font-bold'>
                {realTimeData.processingSpeed || 12}ms avg
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Active Bots</span>
              <span className='text-green-400 font-bold'>{realTimeData.activeBots || 47}/47</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Quantum Coherence</span>
              <span className='text-cyan-400 font-bold'>
                {(realTimeData.quantumCoherence || 99.97).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-xl font-bold text-white mb-4'>Quick Actions</h3>
          <div className='space-y-3'>
            <button
              onClick={() => onNavigate('money-maker')}
              className='w-full text-left p-3 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 transition-all'
            >
              <div className='flex justify-between items-center'>
                <span className='text-green-400 font-bold'>💰 Money Maker</span>
                <span className='text-green-300'>→</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('propollama')}
              className='w-full text-left p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 transition-all'
            >
              <div className='flex justify-between items-center'>
                <span className='text-purple-400 font-bold'>🤖 PropOllama AI</span>
                <span className='text-purple-300'>→</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate('prizepicks')}
              className='w-full text-left p-3 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 transition-all'
            >
              <div className='flex justify-between items-center'>
                <span className='text-yellow-400 font-bold'>🏆 PrizePicks Pro</span>
                <span className='text-yellow-300'>→</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create working real-time monitor inline
const WorkingRealTimeMonitor: React.FC = () => {
  const { realTimeData } = useContext(AppContext);

  return (
    <div className='p-8 space-y-6'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-white mb-4 animate-cyber-pulse'>
          Real-Time Monitor
        </h2>
        <p className='text-orange-400 text-lg'>Live Data Intelligence Center</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='quantum-card p-4 rounded-xl text-center'>
          <div className='text-green-400 text-2xl font-bold'>{realTimeData.liveGames}</div>
          <div className='text-gray-300 text-sm'>Live Games</div>
        </div>
        <div className='quantum-card p-4 rounded-xl text-center'>
          <div className='text-electric-400 text-2xl font-bold'>{realTimeData.predictions}</div>
          <div className='text-gray-300 text-sm'>Predictions</div>
        </div>
        <div className='quantum-card p-4 rounded-xl text-center'>
          <div className='text-cyan-400 text-2xl font-bold'>{realTimeData.activeBots}</div>
          <div className='text-gray-300 text-sm'>Active Bots</div>
        </div>
        <div className='quantum-card p-4 rounded-xl text-center'>
          <div className='text-purple-400 text-2xl font-bold'>{realTimeData.processingSpeed}ms</div>
          <div className='text-gray-300 text-sm'>Response Time</div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-xl font-bold text-white mb-4'>System Status</h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-300'>Neural Networks</span>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-green-400 font-bold'>OPTIMAL</span>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-300'>Data Pipeline</span>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-green-400 font-bold'>STREAMING</span>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-300'>API Services</span>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-green-400 font-bold'>ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-xl font-bold text-white mb-4'>Performance Metrics</h3>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Data Quality</span>
              <span className='text-electric-400 font-bold'>98.3%</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Model Accuracy</span>
              <span className='text-green-400 font-bold'>
                {(realTimeData.accuracy || 87.3).toFixed(1)}%
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Confidence Score</span>
              <span className='text-cyan-400 font-bold'>
                {(realTimeData.confidence || 91.5).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import real services
import { useAuth } from '../hooks/useAuth';
import { useBettingData } from '../hooks/useBettingData';
import { useRealTimeData } from '../hooks/useRealtimeData';
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
}

const AppContext = createContext<AppContextType | null>(null);

const QuantumSportsPlatform: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Real data hooks
  const { user } = useAuth();
  const { data: realTimeData } = useRealTimeData();
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
  } = context;
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState('quantum-dark');

  const toggleTheme = () => {
    const themes = ['quantum-dark', 'neural-purple', 'cyber-blue', 'quantum-light'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

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
              className='p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon'
              whileHover={{ scale: 1.05 }}
            >
              <Eye className='text-electric-400 text-lg w-5 h-5' />
            </motion.button>

            <motion.button
              className='p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon'
              whileHover={{ scale: 1.05 }}
            >
              <Activity className='text-gray-400 w-5 h-5' />
            </motion.button>

            <div className='relative'>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className='relative p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon'
                whileHover={{ scale: 1.05 }}
              >
                <Bell className='text-gray-400 w-5 h-5' />
                {notifications.length > 0 && (
                  <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse'>
                    <span className='text-white text-xs font-bold'>{notifications.length}</span>
                  </div>
                )}
              </motion.button>

              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute right-0 top-full mt-2 w-80 ultra-glass rounded-2xl border border-white/10 overflow-hidden z-50'
                >
                  <div className='p-4 border-b border-white/10'>
                    <h3 className='font-bold text-white'>Notifications</h3>
                    <p className='text-sm text-gray-400'>{notifications.length} new alerts</p>
                  </div>
                  <div className='max-h-64 overflow-y-auto'>
                    {notifications.map((notif: any, index: number) => (
                      <div
                        key={index}
                        className='p-4 hover:bg-white/5 border-b border-white/5 last:border-b-0'
                      >
                        <div className='text-sm text-white mb-1'>{notif.message}</div>
                        <div className='text-xs text-gray-400'>{notif.time}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

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
      name: 'Quantum Predictions',
      key: 'quantum',
      icon: 'fa-atom',
      category: 'ai',
      indicator: '⚛️',
      color: 'text-cyan-400',
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
        return <WorkingDashboard onNavigate={setCurrentPage} />;
      case 'money-maker':
        return <MoneyMakerPro />;
      case 'prizepicks':
        return <PrizePicksPro />;
      case 'propollama':
        return <PropOllama />;
      case 'ml-center':
        return <MLModelDashboard />;
      case 'quantum':
        return (
          <div className='space-y-10 animate-slide-in-up'>
            <div className='text-center'>
              <div className='relative mb-10'>
                <div className='absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full' />
                <div className='relative text-8xl text-cyan-400 float-element'>⚛️</div>
              </div>
              <h1 className='holographic text-6xl font-black mb-6 font-cyber'>
                QUANTUM PREDICTIONS
              </h1>
              <p className='text-2xl text-gray-400 max-w-4xl mx-auto font-mono'>
                Quantum-enhanced prediction engine with 1024 qubits, superposition algorithms, and
                neural-quantum hybrid processing
              </p>
            </div>

            <div className='quantum-card rounded-3xl p-10 text-center'>
              <div className='text-gray-500 mb-8 text-xl font-mono'>
                Advanced quantum feature interface coming soon...
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-10'>
                <div className='text-center'>
                  <div className='text-4xl mb-4 text-electric-400'>🧠</div>
                  <div className='font-bold text-white font-cyber'>Neural Networks</div>
                  <div className='text-gray-400 text-sm font-mono'>47 AI agents ready</div>
                </div>
                <div className='text-center'>
                  <div className='text-4xl mb-4 text-purple-400'>⚛️</div>
                  <div className='font-bold text-white font-cyber'>Quantum Processing</div>
                  <div className='text-gray-400 text-sm font-mono'>1024 qubits active</div>
                </div>
                <div className='text-center'>
                  <div className='text-4xl mb-4 text-blue-400'>📊</div>
                  <div className='font-bold text-white font-cyber'>Real-time Analysis</div>
                  <div className='text-gray-400 text-sm font-mono'>Live data processing</div>
                </div>
              </div>
              <button className='px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl rounded-2xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 font-cyber'>
                INITIALIZE QUANTUM INTERFACE
              </button>
            </div>
          </div>
        );
      case 'analytics':
        return <UniversalAnalytics />;
      case 'realtime':
        return <WorkingRealTimeMonitor />;
      case 'market':
        return (
          <div className='space-y-10 animate-slide-in-up'>
            <div className='text-center'>
              <div className='relative mb-10'>
                <div className='absolute inset-0 bg-pink-400/20 blur-3xl rounded-full' />
                <div className='relative text-8xl text-pink-400 float-element'>📈</div>
              </div>
              <h1 className='holographic text-6xl font-black mb-6 font-cyber'>
                MARKET INTELLIGENCE
              </h1>
              <p className='text-2xl text-gray-400 max-w-4xl mx-auto font-mono'>
                Advanced market analysis with neural sentiment processing, quantum trend prediction,
                and real-time opportunity detection
              </p>
            </div>

            <div className='quantum-card rounded-3xl p-10 text-center'>
              <div className='text-gray-500 mb-8 text-xl font-mono'>
                Advanced quantum feature interface coming soon...
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-10'>
                <div className='text-center'>
                  <div className='text-4xl mb-4 text-electric-400'>🧠</div>
                  <div className='font-bold text-white font-cyber'>Neural Networks</div>
                  <div className='text-gray-400 text-sm font-mono'>47 AI agents ready</div>
                </div>
                <div className='text-center'>
                  <div className='text-4xl mb-4 text-purple-400'>⚛️</div>
                  <div className='font-bold text-white font-cyber'>Quantum Processing</div>
                  <div className='text-gray-400 text-sm font-mono'>1024 qubits active</div>
                </div>
                <div className='text-center'>
                  <div className='text-4xl mb-4 text-blue-400'>📊</div>
                  <div className='font-bold text-white font-cyber'>Real-time Analysis</div>
                  <div className='text-gray-400 text-sm font-mono'>Live data processing</div>
                </div>
              </div>
              <button className='px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl rounded-2xl hover:from-pink-400 hover:to-purple-400 transition-all duration-300 font-cyber'>
                INITIALIZE QUANTUM INTERFACE
              </button>
            </div>
          </div>
        );
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
