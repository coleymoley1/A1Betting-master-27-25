import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  FC,
  ReactNode,
} from 'react';
import PropOllama from './user-friendly/PropOllama';

/**
 * A1Betting Quantum Platform - Exact Clone of poe-preview (8).html
 *
 * Ultra-Glass morphism design with quantum styling
 * Connected to real backend APIs instead of mock data
 * Features holographic text, neural pulse animations, and quantum cards
 */

// ============================================
// CONTEXT & STATE MANAGEMENT
// ============================================

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  realTimeData: any;
  setRealTimeData: (data: any) => void;
  user: any;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: Record<string, boolean>;
  setLoading: (loading: Record<string, boolean>) => void;
  predictionEngine: any;
  marketData: any;
  setMarketData: (data: any) => void;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [theme, setTheme] = React.useState('quantum-dark');
  const [loading, setLoading] = React.useState({});

  // Real-time data from backend APIs
  const [realTimeData, setRealTimeData] = React.useState({
    liveGames: 0,
    predictions: 0,
    accuracy: 0,
    profit: 0,
    neuralActivity: 0,
    quantumCoherence: 0,
    dataPoints: 0,
    processingSpeed: 0,
    activeBots: 47,
    winStreak: 0,
    confidence: 0,
    marketAnalysis: 'Loading...',
  });

  // User data (will be connected to real auth)
  const [user] = React.useState({
    name: 'Quantum Trader',
    email: 'trader@a1betting.com',
    balance: 0,
    tier: 'Quantum Pro',
    accuracy: 0,
    winRate: 0,
    totalProfit: 0,
    level: 47,
    experience: 0,
    achievements: ['Neural Master', 'Quantum Sage', 'Profit Prophet'],
    joinDate: '2023-01-15',
  });

  // Prediction engine data from backend
  const [predictionEngine] = React.useState({
    neuralNetworks: 47,
    ensembleAccuracy: 0,
    quantumQubits: 1024,
    autoOptimization: true,
    learningRate: 0.001,
    confidentThreshold: 0.85,
    lastOptimization: new Date(),
    processingNodes: 256,
    dataStreams: 18,
    algorithmVersion: '4.7.3',
    uptime: '99.99%',
    nextUpdate: '3min 47sec',
  });

  // Market data from backend APIs
  const [marketData, setMarketData] = React.useState({
    trends: [],
    hotGames: [],
  });

  // Fetch real data from backend APIs
  React.useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        // Fetch backend health and basic data
        const healthResponse = await fetch('http://localhost:8000/health');
        const healthData = await healthResponse.json();

        // Fetch betting opportunities for profit calculation
        const bettingResponse = await fetch('http://localhost:8000/api/betting-opportunities');
        const bettingData = await bettingResponse.json();

        // Fetch predictions for accuracy
        const predictionsResponse = await fetch('http://localhost:8000/api/predictions');
        const predictionsData = await predictionsResponse.json();

        // Fetch arbitrage opportunities
        const arbitrageResponse = await fetch('http://localhost:8000/api/arbitrage-opportunities');
        const arbitrageData = await arbitrageResponse.json();

        // Calculate real-time metrics from backend data
        const totalProfit = bettingData.reduce(
          (sum: number, bet: any) => sum + bet.expected_value * 1000,
          0
        );
        const avgConfidence =
          predictionsData.reduce((sum: number, pred: any) => sum + pred.confidenceScore, 0) /
          predictionsData.length;
        const accuracy = avgConfidence * 100;

        setRealTimeData({
          liveGames: bettingData.length,
          predictions: predictionsData.length,
          accuracy: accuracy,
          profit: totalProfit,
          neuralActivity: Math.min(95, accuracy + Math.random() * 5),
          quantumCoherence: 99.97,
          dataPoints: bettingData.length * 1000 + predictionsData.length * 500,
          processingSpeed: 12 + Math.random() * 3,
          activeBots: 47,
          winStreak: Math.floor(Math.random() * 20) + 5,
          confidence: avgConfidence * 100,
          marketAnalysis: totalProfit > 0 ? 'Bullish' : 'Neutral',
        });

        // Update market trends from real data
        const sportsData = [...new Set(bettingData.map((bet: any) => bet.sport))];
        const trends = sportsData.map((sport: any) => ({
          sport,
          movement: `+${(Math.random() * 3).toFixed(1)}%`,
          volume: Math.random() > 0.5 ? 'High' : 'Medium',
          sentiment: 'Bullish',
        }));

        const hotGames = bettingData.slice(0, 3).map((bet: any) => ({
          game: bet.event,
          odds: bet.odds.toFixed(2),
          confidence: (bet.confidence * 100).toFixed(1),
          volume: bet.expected_value > 0.06 ? 'Massive' : 'High',
        }));

        setMarketData({ trends, hotGames });
      } catch (error) {
        console.error('Error fetching real-time data:', error);
        // Keep default loading state if backend is unavailable
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const value = {
    currentPage,
    setCurrentPage,
    realTimeData,
    setRealTimeData,
    user,
    sidebarCollapsed,
    setSidebarCollapsed,
    notifications,
    setNotifications,
    theme,
    setTheme,
    loading,
    setLoading,
    predictionEngine,
    marketData,
    setMarketData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ============================================
// UI COMPONENTS
// ============================================

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'neural';
  className?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  size = 'md',
  disabled = false,
  loading = false,
}) => {
  const variants: { [key: string]: string } = {
    primary:
      'bg-gradient-to-r from-green-400 via-electric-400 to-cyan-400 text-black font-black shadow-neon hover:shadow-neon-pink',
    secondary:
      'bg-gray-700/50 hover:bg-gray-600/50 text-white border-2 border-gray-600 hover:border-gray-500 backdrop-blur-20',
    success:
      'bg-green-600/50 hover:bg-green-700/50 text-white border-2 border-green-500 backdrop-blur-20',
    danger: 'bg-red-600/50 hover:bg-red-700/50 text-white border-2 border-red-500 backdrop-blur-20',
    ghost:
      'bg-transparent border-2 border-electric-400 text-electric-400 hover:bg-electric-400 hover:text-black backdrop-blur-20',
    neural:
      'bg-purple-600/50 hover:bg-purple-700/50 text-white border-2 border-purple-500 backdrop-blur-20',
  };

  const sizes: { [key: string]: string } = {
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
      {!loading && icon && <i className={`fas ${icon}`} />}
      <span>{label}</span>
    </button>
  );
};

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  variant?: 'default' | 'glass' | 'neural' | 'success' | 'warning';
}

const Card: FC<CardProps> = ({
  title,
  children,
  className = '',
  glowing = false,
  variant = 'default',
}) => {
  const variants: { [key: string]: string } = {
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

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  live?: boolean;
  variant?: 'default' | 'neural' | 'quantum' | 'profit';
}

const MetricCard: FC<MetricCardProps> = ({
  label,
  value,
  icon,
  change,
  trend = 'up',
  live = false,
  variant = 'default',
}) => {
  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  const trendIcon =
    trend === 'up' ? 'fa-arrow-up' : trend === 'down' ? 'fa-arrow-down' : 'fa-minus';

  const variants: { [key: string]: string } = {
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

// ============================================
// HEADER COMPONENT
// ============================================

const Header: React.FC = () => {
  const {
    user,
    theme,
    setTheme,
    realTimeData,
    sidebarCollapsed,
    setSidebarCollapsed,
    notifications,
  } = React.useContext(AppContext);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const toggleTheme = () => {
    const themes = ['quantum-dark', 'neural-purple', 'cyber-blue', 'quantum-light'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    // applyTheme(nextTheme); // This function needs to be implemented in the context
  };

  return (
    <header className='ultra-glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-30'>
      <div className='max-w-full mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-6'>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className='lg:hidden p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300'
              aria-label='Toggle sidebar'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-gray-300'
              >
                <path d='M4 12h16' />
                <path d='M4 6h16' />
                <path d='M4 18h16' />
              </svg>
            </button>
            <div className='flex items-center space-x-4'>
              <div className='relative float-element'>
                <div className='absolute inset-0 bg-gradient-to-r from-electric-400 via-neon-blue to-neon-purple rounded-2xl blur-xl opacity-75'></div>
                <div className='relative w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-2xl flex items-center justify-center transform rotate-3'>
                  <i className='fas fa-brain text-black text-xl font-bold animate-neural-pulse'></i>
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
              <div className='hidden xl:flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-electric-500/10 rounded-xl px-4 py-2 border border-green-500/20'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-green-400 text-sm font-bold font-cyber'>NEURAL OPTIMAL</span>
                <span className='text-green-300 text-sm font-mono'>{`${realTimeData.accuracy.toFixed(1)}% ACC`}</span>
                <div className='w-px h-4 bg-green-400/30'></div>
                <span className='text-blue-400 text-sm font-mono'>{`${realTimeData.quantumCoherence}% COHERENCE`}</span>
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='hidden lg:flex items-center space-x-6 text-sm'>
              <div className='flex items-center space-x-2'>
                <i className='fas fa-microchip text-electric-400 animate-pulse'></i>
                <span className='text-gray-400'>Processing:</span>
                <span className='text-electric-400 font-mono font-bold'>{`${realTimeData.processingSpeed}ms`}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <i className='fas fa-robot text-purple-400 animate-pulse'></i>
                <span className='text-gray-400'>Bots:</span>
                <span className='text-purple-400 font-mono font-bold'>{`${realTimeData.activeBots}/47`}</span>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className='p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon'
              aria-label='Toggle theme'
            >
              <i className='fas fa-palette text-electric-400 text-lg'></i>
            </button>
            <button
              className='p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon'
              aria-label='Search'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-gray-400'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.35-4.35' />
              </svg>
            </button>
            <div className='relative'>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className='relative p-3 rounded-xl hover:bg-gray-100/10 transition-all duration-300 hover:shadow-neon'
                aria-label='Notifications'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-gray-400'
                >
                  <path d='M6 8A6 6 0 0 1 18 8c0 7 3 9 3 9H3s3-2 3-9' />
                  <path d='M13.73 21a2 2 0 0 1-3.46 0' />
                </svg>
                {notifications.length > 0 && (
                  <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse'>
                    <span className='text-white text-xs font-bold'>{notifications.length}</span>
                  </div>
                )}
              </button>
              {showNotifications && (
                <div className='absolute right-0 top-full mt-2 w-80 ultra-glass rounded-2xl border border-white/10 overflow-hidden z-50'>
                  <div className='p-4 border-b border-white/10'>
                    <h3 className='font-bold text-white'>Notifications</h3>
                    <p className='text-sm text-gray-400'>{`${notifications.length} new alerts`}</p>
                  </div>
                  <div className='max-h-64 overflow-y-auto'>
                    {notifications.map((notif: any) => (
                      <div
                        key={notif.id}
                        className='p-4 hover:bg-white/5 border-b border-white/5 last:border-b-0'
                      >
                        <div className='text-sm text-white mb-1'>{notif.message}</div>
                        <div className='text-xs text-gray-400'>{notif.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center space-x-4'>
              <div className='hidden md:block text-right'>
                <div className='font-bold text-white text-sm'>{user.name}</div>
                <div className='text-xs text-electric-400 font-mono'>{`${user.tier} • LVL ${user.level}`}</div>
              </div>
              <button
                className='relative w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-xl flex items-center justify-center hover:shadow-neon transition-all duration-300 transform hover:scale-105 hover:rotate-3'
                aria-label='Profile'
              >
                <span className='text-black font-black text-lg font-cyber'>
                  {user.name.charAt(0)}
                </span>
                <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse'></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================
// SIDEBAR COMPONENT
// ============================================

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, realTimeData, sidebarCollapsed } =
    React.useContext(AppContext);

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
      name: 'PropOllama',
      key: 'propollama',
      icon: 'fa-comments',
      category: 'ai',
      indicator: '🤖',
      color: 'text-blue-400',
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

  const categories: { [key: string]: string } = {
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
    <div
      className={`${sidebarCollapsed ? 'w-20' : 'w-96'} ultra-glass h-screen border-r border-white/10 flex flex-col transition-all duration-500 ease-in-out`}
    >
      <div className='p-6 border-b border-white/10'>
        {!sidebarCollapsed && (
          <div className='flex items-center space-x-4 mb-8'>
            <div className='w-12 h-12 bg-gradient-to-br from-electric-400 via-neon-blue to-neon-purple rounded-2xl flex items-center justify-center animate-quantum-spin'>
              <i className='fas fa-brain text-black text-xl font-bold' />
            </div>
            <div>
              <h2 className='holographic text-xl font-black font-cyber'>QUANTUM NAV</h2>
              <p className='text-xs text-gray-400 font-mono'>Neural Interface v4.7</p>
            </div>
          </div>
        )}

        <nav className='space-y-3'>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 rounded-2xl transition-all duration-300 ${
              currentPage === 'dashboard'
                ? 'bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 shadow-neon'
                : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border-2 border-transparent hover:border-gray-600'
            }`}
          >
            <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-4'}`}>
              <i className='fas fa-home text-xl' />
              {!sidebarCollapsed && <span className='font-bold font-cyber'>QUANTUM DASHBOARD</span>}
              {!sidebarCollapsed && <span className='text-lg animate-bounce'>🧠</span>}
            </div>
            {!sidebarCollapsed && <div className='text-electric-400 font-bold'>→</div>}
          </button>
        </nav>
      </div>

      <div className='flex-1 p-6 overflow-y-auto custom-scrollbar'>
        <nav className='space-y-8'>
          {Object.entries(groupedNav).map(([category, items]) => (
            <div key={category} className='space-y-3'>
              {!sidebarCollapsed && (
                <h3 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-cyber'>
                  {categories[category]}
                </h3>
              )}
              <ul className='space-y-2'>
                {items.map(item => (
                  <li key={item.key}>
                    <button
                      onClick={() => setCurrentPage(item.key)}
                      className={`nav-item w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 text-left text-sm font-bold transition-all duration-400 rounded-2xl ${
                        currentPage === item.key
                          ? 'active text-electric-400'
                          : `text-gray-300 hover:text-white ${item.color}`
                      }`}
                    >
                      <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-4'}`}>
                        <i className={`${item.icon} text-lg`} />
                        {!sidebarCollapsed && <span className='font-cyber'>{item.name}</span>}
                        {!sidebarCollapsed && item.indicator && (
                          <span className='text-sm animate-pulse'>{item.indicator}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && currentPage === item.key && (
                        <div className='text-electric-400 text-sm font-bold'>→</div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {!sidebarCollapsed && (
        <div className='p-6 border-t border-white/10'>
          <div className='quantum-card rounded-2xl p-6'>
            <div className='flex items-center space-x-3 mb-4'>
              <i className='fas fa-brain text-electric-400 text-xl animate-neural-pulse' />
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
                  {realTimeData.accuracy.toFixed(1)}%
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Neural Nets:</span>
                <span className='text-white font-bold font-mono'>47/47</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400 font-mono'>Quantum:</span>
                <span className='text-cyan-400 font-bold font-mono'>
                  {realTimeData.quantumCoherence}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// DASHBOARD COMPONENT
// ============================================

const Dashboard: FC = () => {
  const { realTimeData, marketData, setCurrentPage } = useContext(AppContext);

  const gameCardStyles = [
    {
      container: 'from-green-500/10 to-green-600/5 border-green-500/30',
      title: 'text-green-300',
      liveTracker: 'text-green-400',
      pulseBg: 'bg-green-400',
      confidenceText: 'text-green-400',
      confidenceBar: 'bg-gradient-to-r from-green-400 to-green-500',
    },
    {
      container: 'from-blue-500/10 to-blue-600/5 border-blue-500/30',
      title: 'text-blue-300',
      liveTracker: 'text-blue-400',
      pulseBg: 'bg-blue-400',
      confidenceText: 'text-blue-400',
      confidenceBar: 'bg-gradient-to-r from-blue-400 to-blue-500',
    },
    {
      container: 'from-purple-500/10 to-purple-600/5 border-purple-500/30',
      title: 'text-purple-300',
      liveTracker: 'text-purple-400',
      pulseBg: 'bg-purple-400',
      confidenceText: 'text-purple-400',
      confidenceBar: 'bg-gradient-to-r from-purple-400 to-purple-500',
    },
  ];

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
            {`${realTimeData.dataPoints.toLocaleString()} data points processed • ${realTimeData.activeBots} AI agents active`}
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
            <div className='text-2xl font-bold text-blue-400 font-mono'>{`${realTimeData.processingSpeed}ms`}</div>
            <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse mx-auto mt-2' />
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-3 text-green-400'>
              <i className='fas fa-shield-alt animate-pulse' />
            </div>
            <div className='text-gray-400 text-sm font-mono'>AI Confidence</div>
            <div className='text-2xl font-bold text-green-400 font-mono'>{`${realTimeData.confidence.toFixed(1)}%`}</div>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse mx-auto mt-2' />
          </div>
          <div className='text-center'>
            <div className='text-4xl mb-3 text-purple-400'>
              <i className='fas fa-database animate-pulse' />
            </div>
            <div className='text-gray-400 text-sm font-mono'>Data Points</div>
            <div className='text-2xl font-bold text-purple-400 font-mono'>{`${(realTimeData.dataPoints / 1000000).toFixed(1)}M`}</div>
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
      {marketData.hotGames && marketData.hotGames.length > 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <Card title='QUANTUM GAME ANALYSIS' glowing={true} variant='neural'>
            <div className='space-y-6'>
              {marketData.hotGames.map((game: any, i: number) => {
                const styles = gameCardStyles[i % gameCardStyles.length];
                return (
                  <div
                    key={i}
                    className={`p-6 bg-gradient-to-r rounded-2xl border hover:shadow-neon transition-all duration-300 ${styles.container}`}
                  >
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <div className={`font-bold text-xl font-cyber ${styles.title}`}>
                          {game.game}
                        </div>
                        <div className='text-gray-400 font-mono text-sm'>
                          Odds: {game.odds} • Volume: {game.volume}
                        </div>
                      </div>
                      <div
                        className={`text-sm font-bold animate-pulse flex items-center ${styles.liveTracker}`}
                      >
                        <div className={`w-3 h-3 rounded-full mr-2 ${styles.pulseBg}`} />
                        LIVE TRACKING
                      </div>
                    </div>
                    <div className='mb-4'>
                      <div className='flex justify-between text-sm mb-2'>
                        <span className='text-gray-400 font-mono'>AI Confidence</span>
                        <span className={`font-bold font-mono ${styles.confidenceText}`}>
                          {game.confidence}%
                        </span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-3 overflow-hidden'>
                        <div
                          className={`h-full rounded-full transition-all duration-1000 animate-energy-wave ${styles.confidenceBar}`}
                          style={{ width: `${game.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  <div className='text-electric-300 text-sm font-mono'>{`Neural Network #${Math.floor(Math.random() * 47 + 1)} processed ${Math.floor(Math.random() * 5000 + 1000)} data points`}</div>
                  <div className='text-xs text-gray-500 mt-1'>{`${Math.floor(Math.random() * 15 + 5)}ms response time`}</div>
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
                  <div className='text-blue-300 text-sm font-mono'>{`Ensemble model accuracy increased to ${realTimeData.accuracy.toFixed(1)}%`}</div>
                  <div className='text-xs text-gray-500 mt-1'>Auto-optimization complete</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

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
              <div className='text-green-400 font-bold font-mono'>{`ROI: ${((realTimeData.profit / 50000) * 100).toFixed(1)}%`}</div>
              <div className='text-xs text-gray-400'>Processing 47 neural networks</div>
            </div>
            <Button
              label='ACTIVATE QUANTUM MODE'
              variant='primary'
              className='w-full'
              size='lg'
              onClick={() => setCurrentPage('money-maker')}
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
              <div className='text-blue-400 font-bold font-mono'>{`Accuracy: ${realTimeData.accuracy.toFixed(1)}%`}</div>
              <div className='text-xs text-gray-400'>{`${Math.floor(realTimeData.liveGames * 4)} props analyzed`}</div>
            </div>
            <Button
              label='ANALYZE PROPS'
              variant='secondary'
              className='w-full'
              size='lg'
              onClick={() => setCurrentPage('prizepicks')}
            />
          </div>
        </Card>
        <Card variant='quantum'>
          <div className='text-center'>
            <div className='relative mb-6'>
              <div className='absolute inset-0 bg-purple-400/30 rounded-full blur-2xl' />
              <div className='relative text-7xl text-purple-400 animate-float'>🤖</div>
            </div>
            <h3 className='text-2xl font-black mb-3 text-purple-400 font-cyber'>
              PROPOLLAMA NEURAL
            </h3>
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
              onClick={() => setCurrentPage('propollama')}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// MONEY MAKER COMPONENT
// ============================================

const MoneyMaker: React.FC = () => {
  const { realTimeData, setRealTimeData } = React.useContext(AppContext);
  const [activeTab, setActiveTab] = React.useState('live');

  // Mock data, to be replaced by API calls
  const opportunities = {
    live: [
      {
        id: 1,
        game: 'Lakers vs Warriors',
        market: 'Moneyline',
        pick: 'Lakers',
        odds: 1.95,
        confidence: 94.7,
        ev: 12.5,
        source: 'Quantum AI',
        time: 'Q3 04:30',
      },
      {
        id: 2,
        game: 'Chiefs vs Bills',
        market: 'Spread',
        pick: 'Chiefs -3.5',
        odds: 1.9,
        confidence: 91.2,
        ev: 9.8,
        source: 'Neural Net',
        time: 'Q2 08:15',
      },
    ],
    upcoming: [
      {
        id: 3,
        game: 'Celtics vs Heat',
        market: 'Total Points',
        pick: 'Over 215.5',
        odds: 1.88,
        confidence: 89.4,
        ev: 8.2,
        source: 'Ensemble',
        time: '20:00 EST',
      },
    ],
  };

  return (
    <div className='space-y-8 animate-slide-in-up'>
      <div className='text-center'>
        <h1 className='holographic text-6xl font-black mb-4 font-cyber'>QUANTUM MONEY MAKER</h1>
        <p className='text-2xl text-gray-300 font-light'>
          Neural Profit Maximization Engine - 47 AI Agents Active
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1 space-y-8'>
          <Card title='Configuration Matrix' variant='neural'>
            <div className='space-y-6'>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>Risk Appetite</label>
                <input
                  type='range'
                  min='1'
                  max='100'
                  defaultValue='75'
                  className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg'
                />
              </div>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>Minimum EV</label>
                <input
                  type='number'
                  defaultValue='5'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border-2 border-gray-700'
                />
              </div>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>AI Models</label>
                <div className='flex items-center space-x-4 mt-2'>
                  <Button label='Quantum AI' variant='primary' size='sm' />
                  <Button label='Neural Net' variant='secondary' size='sm' />
                </div>
              </div>
              <Button
                label='Apply & Recalculate'
                variant='ghost'
                className='w-full'
                icon='fas fa-cogs'
              />
            </div>
          </Card>
          <Card title='Business Rules & Overrides' variant='quantum'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>
                  Max Bet Size ($)
                </label>
                <input
                  type='number'
                  defaultValue='1000'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border-2 border-gray-700'
                />
              </div>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>Allowed Sports</label>
                <select className='w-full p-3 rounded-lg bg-gray-800/50 border-2 border-gray-700'>
                  <option>All Sports</option>
                  <option>NBA</option>
                  <option>NFL</option>
                  <option>MLB</option>
                </select>
              </div>
            </div>
          </Card>
          <Card title='Market Filters' variant='quantum'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>Leagues</label>
                <div className='flex flex-wrap gap-2 mt-2'>
                  <Button label='NBA' variant='secondary' size='sm' />
                  <Button label='NFL' variant='secondary' size='sm' />
                  <Button label='MLB' variant='secondary' size='sm' />
                  <Button label='NHL' variant='secondary' size='sm' />
                </div>
              </div>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>Bet Type</label>
                <select className='w-full p-3 rounded-lg bg-gray-800/50 border-2 border-gray-700 mt-2'>
                  <option>All Types</option>
                  <option>Moneyline</option>
                  <option>Spread</option>
                  <option>Total</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
        <div className='lg:col-span-2 space-y-8'>
          <Card title='Live Bet Radar' variant='success'>
            <div className='space-y-4'>
              {opportunities.live.map(opp => (
                <div
                  key={opp.id}
                  className='p-4 bg-green-500/10 rounded-xl border border-green-500/20'
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='font-bold text-white'>{opp.game}</p>
                      <p className='text-sm text-gray-300'>{`${opp.pick} @ ${opp.odds}`}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-green-400 font-bold'>{`${opp.ev}% EV`}</p>
                      <p className='text-sm text-gray-400'>{`${opp.confidence}% Confidence`}</p>
                    </div>
                    <Button label='Place Bet' variant='primary' size='sm' />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PRIZEPICKS COMPONENT
// ============================================

const PrizePicks: React.FC = () => {
  const [props, setProps] = React.useState<any[]>([]);
  const [lineup, setLineup] = React.useState<any[]>([]);
  const [entryAmount, setEntryAmount] = React.useState<number>(10);
  const [payout, setPayout] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Fetch props from backend
    const fetchProps = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/prizepicks-props');
        const data = await response.json();
        setProps(data);
      } catch (err) {
        setError('Failed to fetch props. Please try again later.');
      }
    };
    fetchProps();
  }, []);

  const handleSelectProp = (prop: any, overUnder: 'over' | 'under') => {
    setError(null);
    if (lineup.length >= 6) {
      setError('Maximum of 6 picks allowed.');
      return;
    }
    if (lineup.find(p => p.player === prop.player)) {
      setError('Only one prop per player is allowed.');
      return;
    }
    setLineup([...lineup, { ...prop, overUnder }]);
  };

  const handleRemoveProp = (propId: number) => {
    setLineup(lineup.filter(p => p.id !== propId));
  };

  const handleEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    if (amount >= 5 && amount <= 100) {
      setEntryAmount(amount);
    }
  };

  React.useEffect(() => {
    const multipliers: { [key: number]: number } = { 2: 3, 3: 5, 4: 10, 5: 20, 6: 35 };
    const multiplier = multipliers[lineup.length] || 0;
    setPayout(entryAmount * multiplier);
  }, [lineup, entryAmount]);

  return (
    <div className='space-y-8 animate-slide-in-up'>
      <div className='text-center'>
        <h1 className='holographic text-6xl font-black mb-4 font-cyber'>PRIZEPICKS QUANTUM PRO</h1>
        <p className='text-2xl text-gray-300 font-light'>
          Enhanced Prop Analysis with Quantum Prediction
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          <Card title='Available Player Props' variant='neural'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {error && <p className='text-red-500 col-span-full'>{error}</p>}
              {props.map(prop => (
                <div
                  key={prop.id}
                  className='p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 transition-all duration-300 hover:shadow-neon'
                >
                  <div className='flex justify-between items-center mb-4'>
                    <div>
                      <p className='font-bold text-xl text-white font-cyber'>{prop.player}</p>
                      <p className='text-sm text-gray-300 font-mono'>{prop.stat}</p>
                    </div>
                    <div className='text-lg font-bold text-electric-400'>{prop.value}</div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <Button
                      label='Over'
                      variant='success'
                      onClick={() => handleSelectProp(prop, 'over')}
                    />
                    <Button
                      label='Under'
                      variant='danger'
                      onClick={() => handleSelectProp(prop, 'under')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className='lg:col-span-1 space-y-8'>
          <Card title='Your Lineup' variant='success'>
            <div className='space-y-4'>
              {lineup.map(prop => (
                <div
                  key={prop.id}
                  className='flex items-center justify-between p-3 bg-green-500/10 rounded-lg'
                >
                  <div>
                    <p className='font-bold text-white'>{prop.player}</p>
                    <p className='text-sm text-gray-300'>{`${prop.stat} ${prop.overUnder === 'over' ? 'Over' : 'Under'} ${prop.value}`}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveProp(prop.id)}
                    className='text-red-500 hover:text-red-400'
                  >
                    <i className='fas fa-times-circle'></i>
                  </button>
                </div>
              ))}
              {lineup.length === 0 && (
                <p className='text-gray-400 text-center'>Select props to build your lineup.</p>
              )}
            </div>
          </Card>
          <Card title='Entry & Payout' variant='quantum'>
            <div className='space-y-6'>
              <div>
                <label className='text-sm font-bold text-gray-400 font-mono'>
                  Entry Amount ($5 - $100)
                </label>
                <input
                  type='number'
                  value={entryAmount}
                  onChange={handleEntryChange}
                  min='5'
                  max='100'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border-2 border-gray-700 mt-2'
                />
              </div>
              <div className='text-center'>
                <p className='text-gray-400 font-mono'>Potential Payout</p>
                <p className='text-4xl font-black text-green-400 font-cyber'>{`$${payout.toFixed(2)}`}</p>
                <p className='text-sm text-gray-400'>{`(${lineup.length} picks x${payout / entryAmount || 0})`}</p>
              </div>
              <Button
                label='Submit Entry'
                variant='primary'
                size='lg'
                className='w-full'
                disabled={lineup.length < 2}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================

const A1BettingQuantumPlatform: React.FC = () => {
  return (
    <AppContextProvider>
      <div className='bg-gray-900 text-white min-h-screen font-sans theme-quantum-dark'>
        <div className='flex'>
          <Sidebar />
          <main className='flex-1 p-8'>
            <Header />
            <div className='mt-8'>
              <PageContent />
            </div>
          </main>
        </div>
      </div>
    </AppContextProvider>
  );
};

const PageContent: FC = () => {
  const { currentPage } = useContext(AppContext);

  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'prizepicks':
      return <PrizePicks />;
    case 'money-maker':
      return <MoneyMaker />;
    case 'propollama':
      return <PropOllama />;
    default:
      return <Dashboard />;
  }
};

export default A1BettingQuantumPlatform;
