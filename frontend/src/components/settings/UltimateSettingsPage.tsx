import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Download, Undo, X } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  timezone: string;
  avatar: string | null;
  phone: string;
  website: string;
  social: {
    twitter: string;
    linkedin: string;
    discord: string;
  };
}

interface Preferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    discord: boolean;
    telegram: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showStats: boolean;
    shareAchievements: boolean;
    allowAnalytics: boolean;
  };
  display: {
    theme: string;
    language: string;
    currency: string;
    dateFormat: string;
    timeFormat: string;
  };
  neural: {
    autoOptimize: boolean;
    customModels: boolean;
    dataSharing: boolean;
    advancedMetrics: boolean;
  };
}

const UltimateSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [theme, setTheme] = useState('quantum-dark');

  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Alex Chen',
    email: 'alex@quantumsports.ai',
    bio: 'Quantum sports analyst with 5+ years of neural network experience. Specializing in high-frequency betting strategies and AI-driven profit optimization.',
    location: 'San Francisco, CA',
    timezone: 'PST',
    avatar: null,
    phone: '+1 (555) 123-4567',
    website: 'https://quantumsports.ai',
    social: {
      twitter: '@alexchen_ai',
      linkedin: 'alex-chen-quantum',
      discord: 'AlexQuantum#1337',
    },
  });

  const [preferences, setPreferences] = useState<Preferences>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      discord: true,
      telegram: false,
    },
    privacy: {
      profileVisible: true,
      showStats: true,
      shareAchievements: true,
      allowAnalytics: true,
    },
    display: {
      theme: theme,
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
    },
    neural: {
      autoOptimize: true,
      customModels: false,
      dataSharing: true,
      advancedMetrics: true,
    },
  });

  const subscriptionData = {
    currentPlan: 'Quantum Pro',
    planColor: 'text-electric-400',
    planIcon: '⚛️',
    nextBilling: '2024-02-15',
    features: [
      'Unlimited Neural Networks',
      'Quantum Processing',
      'Real-time Analytics',
      'Advanced Prop Analysis',
      'Premium Support',
      'API Access',
      'Custom Models',
      'White-label Options',
    ],
    usage: {
      predictions: { used: 8247, limit: 'Unlimited' },
      aiQueries: { used: 1293, limit: 'Unlimited' },
      dataExports: { used: 47, limit: 100 },
      apiCalls: { used: 23847, limit: 'Unlimited' },
    },
  };

  const achievements = [
    {
      id: 1,
      name: 'Neural Master',
      icon: '🧠',
      description: 'Used 47 neural networks',
      rarity: 'legendary',
      color: 'text-purple-400',
    },
    {
      id: 2,
      name: 'Quantum Sage',
      icon: '⚛️',
      description: 'Achieved 99%+ accuracy',
      rarity: 'mythic',
      color: 'text-cyan-400',
    },
    {
      id: 3,
      name: 'Profit Prophet',
      icon: '💰',
      description: 'Generated $100K+ profit',
      rarity: 'legendary',
      color: 'text-green-400',
    },
    {
      id: 4,
      name: 'Speed Demon',
      icon: '⚡',
      description: 'Sub-5ms processing',
      rarity: 'epic',
      color: 'text-yellow-400',
    },
    {
      id: 5,
      name: 'Data Wizard',
      icon: '📊',
      description: 'Processed 1M+ data points',
      rarity: 'rare',
      color: 'text-blue-400',
    },
    {
      id: 6,
      name: 'Streak King',
      icon: '🔥',
      description: '50+ win streak',
      rarity: 'epic',
      color: 'text-orange-400',
    },
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'fa-user', color: 'text-electric-400' },
    { id: 'account', name: 'Account', icon: 'fa-cog', color: 'text-blue-400' },
    { id: 'subscription', name: 'Subscription', icon: 'fa-crown', color: 'text-yellow-400' },
    { id: 'neural', name: 'Neural AI', icon: 'fa-brain', color: 'text-purple-400' },
    { id: 'security', name: 'Security', icon: 'fa-shield-alt', color: 'text-red-400' },
    { id: 'preferences', name: 'Preferences', icon: 'fa-sliders-h', color: 'text-green-400' },
    { id: 'achievements', name: 'Achievements', icon: 'fa-trophy', color: 'text-orange-400' },
    { id: 'api', name: 'API Access', icon: 'fa-code', color: 'text-cyan-400' },
  ];

  const exportData = () => {
    const data = {
      profile: profileData,
      preferences: preferences,
      stats: {
        level: 47,
        experience: 125000,
        accuracy: 94.2,
        totalProfit: 247500,
        winRate: 87.3,
      },
      achievements: achievements.filter(a => [1, 2, 3, 4].includes(a.id)),
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `a1betting-profile-${profileData.name.toLowerCase().replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const applyTheme = (newTheme: string) => {
    console.log('Applying theme:', newTheme);
  };

  const Button = ({ label, variant, icon, onClick, className }: any) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-r from-electric-400 to-neon-blue text-black hover:shadow-neon';
        case 'secondary':
          return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-gray-500/50';
        case 'danger':
          return 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-red-500/50';
        default:
          return 'bg-gradient-to-r from-electric-400 to-neon-blue text-black hover:shadow-neon';
      }
    };

    return (
      <motion.button
        onClick={onClick}
        className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 font-cyber ${getVariantClasses()} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && <i className={`${icon} text-lg`} />}
        <span>{label}</span>
      </motion.button>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preferences':
        return (
          <div className='space-y-10'>
            {/* Display Preferences */}
            <div className='quantum-card rounded-3xl p-10'>
              <h3 className='text-2xl font-bold text-electric-400 holographic mb-8 font-cyber'>
                DISPLAY PREFERENCES
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                    THEME
                  </label>
                  <select
                    value={theme}
                    onChange={e => {
                      const newTheme = e.target.value;
                      setTheme(newTheme);
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, theme: newTheme },
                      });
                      applyTheme(newTheme);
                    }}
                    className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
                  >
                    <option value='quantum-dark'>Quantum Dark</option>
                    <option value='neural-purple'>Neural Purple</option>
                    <option value='cyber-blue'>Cyber Blue</option>
                    <option value='quantum-light'>Quantum Light</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                    LANGUAGE
                  </label>
                  <select
                    value={preferences.display.language}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, language: e.target.value },
                      })
                    }
                    className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
                  >
                    <option value='en'>English</option>
                    <option value='es'>Español</option>
                    <option value='fr'>Français</option>
                    <option value='de'>Deutsch</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                    CURRENCY
                  </label>
                  <select
                    value={preferences.display.currency}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, currency: e.target.value },
                      })
                    }
                    className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
                  >
                    <option value='USD'>USD ($)</option>
                    <option value='EUR'>EUR (€)</option>
                    <option value='GBP'>GBP (£)</option>
                    <option value='BTC'>BTC (₿)</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                    TIMEZONE
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={e => setProfileData({ ...profileData, timezone: e.target.value })}
                    className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
                  >
                    <option value='PST'>Pacific (PST)</option>
                    <option value='EST'>Eastern (EST)</option>
                    <option value='UTC'>UTC</option>
                    <option value='CET'>Central European (CET)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className='quantum-card rounded-3xl p-10'>
              <h3 className='text-2xl font-bold text-electric-400 holographic mb-8 font-cyber'>
                NOTIFICATION PREFERENCES
              </h3>
              <div className='space-y-6'>
                <div className='flex items-center justify-between p-6 quantum-card rounded-2xl'>
                  <div>
                    <div className='font-bold text-white font-cyber flex items-center space-x-3'>
                      <i className='fas fa-envelope text-blue-400' />
                      <span>Email Notifications</span>
                    </div>
                    <div className='text-sm text-gray-400 font-mono mt-1'>
                      Receive updates via email
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.notifications.email}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        notifications: { ...preferences.notifications, email: e.target.checked },
                      })
                    }
                    className='w-6 h-6 text-electric-500'
                  />
                </div>

                <div className='flex items-center justify-between p-6 quantum-card rounded-2xl'>
                  <div>
                    <div className='font-bold text-white font-cyber flex items-center space-x-3'>
                      <i className='fas fa-bell text-green-400' />
                      <span>Push Notifications</span>
                    </div>
                    <div className='text-sm text-gray-400 font-mono mt-1'>
                      Browser push notifications
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.notifications.push}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        notifications: { ...preferences.notifications, push: e.target.checked },
                      })
                    }
                    className='w-6 h-6 text-electric-500'
                  />
                </div>

                <div className='flex items-center justify-between p-6 quantum-card rounded-2xl'>
                  <div>
                    <div className='font-bold text-white font-cyber flex items-center space-x-3'>
                      <i className='fab fa-discord text-purple-400' />
                      <span>Discord Notifications</span>
                    </div>
                    <div className='text-sm text-gray-400 font-mono mt-1'>
                      Discord bot notifications
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.notifications.discord}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        notifications: { ...preferences.notifications, discord: e.target.checked },
                      })
                    }
                    className='w-6 h-6 text-electric-500'
                  />
                </div>
              </div>
            </div>

            {/* Neural AI Preferences */}
            <div className='quantum-card rounded-3xl p-10'>
              <h3 className='text-2xl font-bold text-electric-400 holographic mb-8 font-cyber'>
                NEURAL AI PREFERENCES
              </h3>
              <div className='space-y-6'>
                <div className='flex items-center justify-between p-6 quantum-card rounded-2xl'>
                  <div>
                    <div className='font-bold text-white font-cyber flex items-center space-x-3'>
                      <i className='fas fa-brain text-purple-400' />
                      <span>Auto-Optimize Models</span>
                    </div>
                    <div className='text-sm text-gray-400 font-mono mt-1'>
                      Automatically optimize neural networks
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.neural.autoOptimize}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        neural: { ...preferences.neural, autoOptimize: e.target.checked },
                      })
                    }
                    className='w-6 h-6 text-electric-500'
                  />
                </div>

                <div className='flex items-center justify-between p-6 quantum-card rounded-2xl'>
                  <div>
                    <div className='font-bold text-white font-cyber flex items-center space-x-3'>
                      <i className='fas fa-share text-cyan-400' />
                      <span>Data Sharing</span>
                    </div>
                    <div className='text-sm text-gray-400 font-mono mt-1'>
                      Share anonymized data to improve models
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    checked={preferences.neural.dataSharing}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        neural: { ...preferences.neural, dataSharing: e.target.checked },
                      })
                    }
                    className='w-6 h-6 text-electric-500'
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className='quantum-card rounded-3xl p-10'>
            <h3 className='text-2xl font-bold text-electric-400 holographic mb-8 font-cyber'>
              QUANTUM ACHIEVEMENTS
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all duration-300'
                  whileHover={{ scale: 1.05 }}
                >
                  <div className='text-4xl mb-4'>{achievement.icon}</div>
                  <h4 className={`font-bold ${achievement.color} mb-2 font-cyber`}>
                    {achievement.name}
                  </h4>
                  <p className='text-sm text-gray-400 mb-3'>{achievement.description}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${achievement.color} bg-opacity-20`}
                  >
                    {achievement.rarity.toUpperCase()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className='text-center py-20'>
            <div className='text-gray-500 text-xl font-mono'>
              Select a settings category from the tabs above
            </div>
          </div>
        );
    }
  };

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Enhanced Header - Exact match to HTML */}
      <div className='text-center mb-12'>
        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-electric-400/20 blur-3xl rounded-full' />
          <div className='relative text-8xl text-electric-400 mb-6 animate-float'>⚙️</div>
          <h1 className='holographic text-6xl font-black mb-4 font-cyber'>QUANTUM USER CONTROL</h1>
          <p className='text-2xl text-gray-400 font-mono'>
            Advanced profile management and system preferences
          </p>
        </div>
      </div>

      {/* Enhanced Navigation Tabs - Exact match to HTML */}
      <div className='quantum-card rounded-3xl p-6 mb-10'>
        <div className='flex flex-wrap gap-4'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold font-cyber ${
                activeTab === tab.id
                  ? 'bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 shadow-neon transform scale-105'
                  : `bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border-2 border-transparent hover:border-gray-600 ${tab.color}`
              }`}
            >
              <i className={`${tab.icon} text-lg`} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className='min-h-96'>{renderTabContent()}</div>

      {/* Action Buttons - Exact match to HTML */}
      <div className='flex justify-between items-center quantum-card rounded-3xl p-8'>
        <div className='flex space-x-4'>
          <Button label='EXPORT DATA' variant='secondary' icon='fa-download' onClick={exportData} />
          <Button label='RESET SETTINGS' variant='danger' icon='fa-undo' />
        </div>
        <div className='flex space-x-4'>
          <Button label='CANCEL' variant='secondary' />
          <Button label='SAVE CHANGES' variant='primary' icon='fa-save' />
        </div>
      </div>
    </div>
  );
};

export default UltimateSettingsPage;
