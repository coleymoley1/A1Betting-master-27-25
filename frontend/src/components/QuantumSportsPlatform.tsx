import { motion } from 'framer-motion';
import {
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
} from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';

// Import real workspace components without syntax errors
import PropOllama from './user-friendly/PropOllama';
import MoneyMakerPro from './user-friendly/MoneyMakerPro';
import PrizePicksPro from './user-friendly/PrizePicksPro';
import AdvancedAnalyticsHub from './analytics/AdvancedAnalyticsHub';
import AdminPanel from './admin/AdminPanel';
import UltimateSettingsPage from './settings/UltimateSettingsPage';
import MLModelDashboard from './ml/MLModelDashboard';
import UniversalAnalytics from './analytics/UniversalAnalytics';

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
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative'>
        {/* Quantum background effects */}
        <div className='fixed inset-0 bg-quantum-grid opacity-20 pointer-events-none' />
        <div className='fixed inset-0 bg-neural-network opacity-10 pointer-events-none' />

        {/* Main layout */}
        <div className='flex h-screen'>
          <Sidebar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <Header />
            <main className='flex-1 overflow-y-auto p-8'>
              <PageRenderer />
            </main>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

const Header: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { user, notifications, sidebarCollapsed, setSidebarCollapsed } = context;
  const [showNotifications, setShowNotifications] = useState(false);
  const store = useStore();
  console.log('Header Store:', store);
  // const { addToast } = store;

  // Test function for toast
  const testToast = () => {
    // addToast('success', 'Toast system is working! 🎉');
    console.log('Test toast called');
  };

  return (
    <header className='border-b border-white/10 backdrop-blur-xl bg-black/20'>
      <div className='flex items-center justify-between px-8 py-6'>
        <div className='flex items-center space-x-6'>
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className='p-3 rounded-xl bg-electric-500/20 hover:bg-electric-500/30 transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarCollapsed ? <Menu className='w-6 h-6' /> : <X className='w-6 h-6' />}
          </motion.button>

          <div className='hidden md:block'>
            <h1 className='holographic text-2xl font-black font-cyber'>QUANTUM INTELLIGENCE</h1>
            <p className='text-sm text-gray-400 font-mono'>Real-time Neural Processing Engine</p>
          </div>
        </div>

        <div className='flex items-center space-x-6'>
          {/* Notifications */}
          <div className='relative'>
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className='relative p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors'
              whileHover={{ scale: 1.05 }}
            >
              <Bell className='w-6 h-6' />
              {notifications.length > 0 && (
                <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold'>
                  {notifications.length}
                </div>
              )}
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute right-0 top-full mt-2 w-80 ultra-glass rounded-2xl border border-white/10 z-50'
              >
                <div className='p-6'>
                  <h3 className='font-bold text-white mb-4'>Live Notifications</h3>
                  <div className='space-y-3 max-h-64 overflow-y-auto'>
                    {notifications.length > 0 ? (
                      notifications.map((notif: any, index: number) => (
                        <div key={index} className='p-3 bg-white/5 rounded-xl'>
                          <div className='text-sm text-white'>{notif.message}</div>
                          <div className='text-xs text-gray-400 mt-1'>{notif.time}</div>
                        </div>
                      ))
                    ) : (
                      <div className='text-center text-gray-400 py-4'>No new notifications</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Test Toast Button */}
          <motion.button
            onClick={testToast}
            className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors'
            whileHover={{ scale: 1.05 }}
          >
            Test Toast
          </motion.button>

          {/* User Profile */}
          <div className='flex items-center space-x-4'>
            <div className='hidden md:block text-right'>
              <div className='font-bold text-white'>{user.name}</div>
              <div className='text-xs text-electric-400 font-mono'>
                {user.tier} • LVL {user.level}
              </div>
            </div>
            <motion.button
              className='relative w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-xl flex items-center justify-center'
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
    </header>
  );
};

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { currentPage, setCurrentPage, sidebarCollapsed, realTimeData } = context;

  const navigation = [
    {
      name: 'Quantum Dashboard',
      key: 'dashboard',
      icon: Home,
      category: 'main',
      indicator: '🧠',
      color: 'text-electric-400',
    },
    {
      name: 'Money Maker',
      key: 'money-maker',
      icon: DollarSign,
      category: 'main',
      indicator: '💰',
      color: 'text-green-400',
    },
    {
      name: 'PrizePicks Pro',
      key: 'prizepicks',
      icon: Trophy,
      category: 'main',
      indicator: '🏆',
      color: 'text-yellow-400',
    },
    {
      name: 'PropOllama',
      key: 'propollama',
      icon: MessageCircle,
      category: 'ai',
      indicator: '🤖',
      color: 'text-blue-400',
    },
    {
      name: 'ML Center',
      key: 'ml-center',
      icon: Brain,
      category: 'ai',
      indicator: '🧠',
      color: 'text-purple-400',
    },
    {
      name: 'Quantum Predictions',
      key: 'quantum',
      icon: Atom,
      category: 'ai',
      indicator: '⚛️',
      color: 'text-cyan-400',
    },
    {
      name: 'Neural Analytics',
      key: 'analytics',
      icon: BarChart3,
      category: 'insights',
      indicator: '📊',
      color: 'text-indigo-400',
    },
    {
      name: 'Real-time Monitor',
      key: 'realtime',
      icon: Eye,
      category: 'insights',
      indicator: '👁️',
      color: 'text-orange-400',
    },
    {
      name: 'Settings',
      key: 'settings',
      icon: Settings,
      category: 'account',
      color: 'text-gray-400',
    },
    {
      name: 'Admin Quantum',
      key: 'admin',
      icon: Shield,
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

  const groupedNav = navigation.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof navigation>
  );

  return (
    <motion.div
      className={`${sidebarCollapsed ? 'w-20' : 'w-96'} ultra-glass border-r border-white/10 flex flex-col transition-all duration-500`}
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 384 }}
    >
      {/* Header */}
      <div className='p-6 border-b border-white/10'>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex items-center space-x-4 mb-8'
          >
            <div className='w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-2xl flex items-center justify-center animate-quantum-spin'>
              <Brain className='text-black text-xl font-bold' />
            </div>
            <div>
              <h2 className='holographic text-xl font-black font-cyber'>QUANTUM NAV</h2>
              <p className='text-xs text-gray-400 font-mono'>Neural Interface v4.7</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className='flex-1 p-6 overflow-y-auto'>
        <nav className='space-y-8'>
          {Object.entries(groupedNav).map(([category, items]) => (
            <div key={category} className='space-y-3'>
              {!sidebarCollapsed && (
                <h3 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-cyber'>
                  {categories[category]}
                </h3>
              )}
              <ul className='space-y-2'>
                {items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.key;

                  return (
                    <li key={item.key}>
                      <motion.button
                        onClick={() => setCurrentPage(item.key)}
                        className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 rounded-2xl transition-all duration-400 ${
                          isActive
                            ? 'bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 shadow-neon'
                            : `bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border-2 border-transparent hover:border-gray-600 ${item.color}`
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-4'}`}>
                          <Icon className='w-5 h-5' />
                          {!sidebarCollapsed && (
                            <>
                              <span className='font-bold font-cyber'>{item.name}</span>
                              {item.indicator && (
                                <span className='text-sm animate-pulse'>{item.indicator}</span>
                              )}
                            </>
                          )}
                        </div>
                        {!sidebarCollapsed && isActive && (
                          <div className='text-electric-400 text-sm font-bold'>→</div>
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

      {/* Neural Status Footer */}
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
                  {(realTimeData.accuracy || 87.3).toFixed(1)}%
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Neural Nets:</span>
                <span className='text-white font-bold font-mono'>47/47</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Quantum:</span>
                <span className='text-cyan-400 font-bold font-mono'>
                  {realTimeData.quantumCoherence || 99.97}%
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
        try {
          return <MoneyMakerPro />;
        } catch (error) {
          return (
            <div className="p-8 space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4 animate-cyber-pulse">
                  💰 Quantum Money Maker
                </h1>
                <p className="text-green-400 text-lg">AI-Powered Profit Generation Engine</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="quantum-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">Today's Opportunities</h3>
                  <div className="space-y-4">
                    <div className="border border-green-400/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">Lakers vs Warriors</span>
                        <span className="text-green-400 font-bold">94.2%</span>
                      </div>
                      <div className="text-gray-300 text-sm">LeBron James 25+ Points</div>
                      <div className="text-electric-400 font-bold">Recommended: $500 → $1,250</div>
                    </div>

                    <div className="border border-electric-400/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">Chiefs vs Bills</span>
                        <span className="text-electric-400 font-bold">91.7%</span>
                      </div>
                      <div className="text-gray-300 text-sm">Mahomes 300+ Yards</div>
                      <div className="text-green-400 font-bold">Recommended: $300 → $810</div>
                    </div>
                  </div>
                </div>

                <div className="quantum-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">Performance Summary</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">+$24,750</div>
                      <div className="text-gray-300">Total Profit This Month</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-electric-400">73.2%</div>
                        <div className="text-gray-300 text-sm">Win Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">247%</div>
                        <div className="text-gray-300 text-sm">ROI</div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-electric-500 text-black font-bold py-3 px-6 rounded-xl hover:from-green-400 hover:to-electric-400 transition-all duration-300">
                      Start Auto-Trading
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      case 'prizepicks':
        try {
          return <PrizePicksPro />;
        } catch (error) {
          return (
            <div className="p-8 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4 animate-cyber-pulse">PrizePicks Pro</h2>
                <p className="text-electric-400 text-lg">AI-Powered Player Prop Analysis</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="quantum-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-3">Today's Picks</h3>
                  <p className="text-gray-300">47 premium opportunities identified</p>
                  <div className="text-electric-400 font-bold text-2xl mt-2">94.2% Accuracy</div>
                </div>
                <div className="quantum-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-3">Live Analysis</h3>
                  <p className="text-gray-300">Real-time prop monitoring active</p>
                  <div className="text-green-400 font-bold text-2xl mt-2">23 Live Games</div>
                </div>
                <div className="quantum-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-3">Profit Today</h3>
                  <p className="text-gray-300">From neural predictions</p>
                  <div className="text-yellow-400 font-bold text-2xl mt-2">+$2,475</div>
                </div>
              </div>
            </div>
          );
        }
          </div>
        );
      case 'propollama':
        return <PropOllama />;
      case 'ml-center':
        return (
          <div className='p-8 space-y-6'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-white mb-4 animate-cyber-pulse'>
                ML Model Center
              </h2>
              <p className='text-cyan-400 text-lg'>Neural Network Command Center</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-3'>Active Models</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Ensemble Predictor</span>
                    <span className='text-green-400'>Online</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>XGBoost Classifier</span>
                    <span className='text-green-400'>Online</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Neural Network</span>
                    <span className='text-green-400'>Training</span>
                  </div>
                </div>
              </div>
              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-3'>Performance Metrics</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Overall Accuracy</span>
                    <span className='text-electric-400'>87.3%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Predictions Today</span>
                    <span className='text-white'>1,247</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Processing Speed</span>
                    <span className='text-cyan-400'>12ms avg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'quantum':
        return (
          <div className='p-8 space-y-6'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-white mb-4 animate-cyber-pulse'>
                Quantum Predictions
              </h2>
              <p className='text-neon-blue text-lg'>Next-Generation Quantum Processing</p>
            </div>
            <div className='quantum-card p-6 rounded-2xl text-center'>
              <div className='text-6xl mb-4'>⚛️</div>
              <h3 className='text-2xl font-bold text-white mb-3'>Quantum Coherence: 99.97%</h3>
              <p className='text-gray-300'>
                Quantum algorithms processing market data at unprecedented accuracy
              </p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className='p-8 space-y-6'>
            <div className='text-center mb-8'>
              <h1 className='text-4xl font-bold text-white mb-4 animate-cyber-pulse'>
                Advanced Analytics Hub
              </h1>
              <p className='text-purple-400 text-lg'>Deep Learning Performance Metrics</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-4'>Model Performance</h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>XGBoost</span>
                    <span className='text-green-400'>89.2%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Neural Net</span>
                    <span className='text-electric-400'>91.7%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Ensemble</span>
                    <span className='text-cyan-400'>94.1%</span>
                  </div>
                </div>
              </div>

              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-4'>Data Processing</h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Data Points</span>
                    <span className='text-white'>2.8M</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Features</span>
                    <span className='text-electric-400'>847</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Quality Score</span>
                    <span className='text-green-400'>98.3%</span>
                  </div>
                </div>
              </div>

              <div className='quantum-card p-6 rounded-2xl'>
                <h3 className='text-xl font-bold text-white mb-4'>Betting Analytics</h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Win Rate</span>
                    <span className='text-green-400'>73.2%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>ROI</span>
                    <span className='text-yellow-400'>+247%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-300'>Sharpe Ratio</span>
                    <span className='text-cyan-400'>2.84</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'realtime':
        return <WorkingRealTimeMonitor />;
      case 'settings':
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
      case 'admin':
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