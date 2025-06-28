import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Download,
  Undo,
  X,
  User,
  Settings,
  Crown,
  Brain,
  Shield,
  Sliders,
  Trophy,
  Code,
} from 'lucide-react';

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
    { id: 'profile', name: 'Profile', icon: User, color: 'text-electric-400' },
    { id: 'account', name: 'Account', icon: Settings, color: 'text-blue-400' },
    { id: 'subscription', name: 'Subscription', icon: Crown, color: 'text-yellow-400' },
    { id: 'neural', name: 'Neural AI', icon: Brain, color: 'text-purple-400' },
    { id: 'security', name: 'Security', icon: Shield, color: 'text-red-400' },
    { id: 'preferences', name: 'Preferences', icon: Sliders, color: 'text-green-400' },
    { id: 'achievements', name: 'Achievements', icon: Trophy, color: 'text-orange-400' },
    { id: 'api', name: 'API Access', icon: Code, color: 'text-cyan-400' },
  ];

  const exportData = () => {
    const data = {
      profile: profileData,
      preferences: preferences,
      achievements: achievements,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum-settings-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM PROFILE</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
                  NAME
                </label>
                <input
                  type='text'
                  value={profileData.name}
                  onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                  className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                />
              </div>
              <div>
                <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
                  EMAIL
                </label>
                <input
                  type='email'
                  value={profileData.email}
                  onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                  className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
                  BIO
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                />
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className='space-y-8'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM PREFERENCES</h3>

            {/* Notifications */}
            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-electric-400 mb-4'>Notifications</h4>
              <div className='grid grid-cols-2 gap-4'>
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <label key={key} className='flex items-center space-x-3'>
                    <input
                      type='checkbox'
                      checked={value}
                      onChange={e =>
                        setPreferences({
                          ...preferences,
                          notifications: { ...preferences.notifications, [key]: e.target.checked },
                        })
                      }
                      className='w-4 h-4'
                    />
                    <span className='text-gray-300 font-mono capitalize'>{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Display Settings */}
            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-electric-400 mb-4'>Display Settings</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold mb-2 text-purple-400'>Theme</label>
                  <select
                    value={preferences.display.theme}
                    onChange={e => {
                      const newTheme = e.target.value;
                      setTheme(newTheme);
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, theme: newTheme },
                      });
                    }}
                    className='w-full p-3 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                  >
                    <option value='quantum-dark'>Quantum Dark</option>
                    <option value='neural-blue'>Neural Blue</option>
                    <option value='cyber-purple'>Cyber Purple</option>
                    <option value='matrix-green'>Matrix Green</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-bold mb-2 text-purple-400'>Currency</label>
                  <select
                    value={preferences.display.currency}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, currency: e.target.value },
                      })
                    }
                    className='w-full p-3 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                  >
                    <option value='USD'>USD ($)</option>
                    <option value='EUR'>EUR (€)</option>
                    <option value='GBP'>GBP (£)</option>
                    <option value='BTC'>BTC (₿)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM SUBSCRIPTION</h3>

            <div className='quantum-card p-8 rounded-2xl border-2 border-electric-500/30'>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='text-4xl'>{subscriptionData.planIcon}</div>
                <div>
                  <h4 className={`text-2xl font-bold ${subscriptionData.planColor} font-cyber`}>
                    {subscriptionData.currentPlan}
                  </h4>
                  <p className='text-gray-400 font-mono'>
                    Next billing: {subscriptionData.nextBilling}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h5 className='text-lg font-bold text-white mb-4'>Features</h5>
                  <div className='space-y-2'>
                    {subscriptionData.features.map((feature, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                        <span className='text-gray-300 font-mono'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className='text-lg font-bold text-white mb-4'>Usage</h5>
                  <div className='space-y-3'>
                    {Object.entries(subscriptionData.usage).map(([key, data]) => (
                      <div key={key}>
                        <div className='flex justify-between text-sm mb-1'>
                          <span className='text-gray-400 capitalize'>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className='text-electric-400'>
                            {data.used} / {data.limit}
                          </span>
                        </div>
                        <div className='w-full bg-gray-700 rounded-full h-2'>
                          <div
                            className='bg-electric-400 h-2 rounded-full'
                            style={{
                              width:
                                data.limit === 'Unlimited'
                                  ? '100%'
                                  : `${(data.used / data.limit) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM ACHIEVEMENTS</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className='quantum-card p-6 rounded-2xl text-center'
                  whileHover={{ scale: 1.05 }}
                >
                  <div className='text-4xl mb-3'>{achievement.icon}</div>
                  <h4 className={`text-lg font-bold ${achievement.color} font-cyber`}>
                    {achievement.name}
                  </h4>
                  <p className='text-gray-400 text-sm mt-2'>{achievement.description}</p>
                  <div
                    className={`mt-3 text-xs font-bold uppercase tracking-wider ${achievement.color}`}
                  >
                    {achievement.rarity}
                  </div>
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
    <motion.div
      className='space-y-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white mb-4 animate-cyber-pulse holographic font-cyber'>
          QUANTUM SETTINGS CONTROL
        </h1>
        <p className='text-electric-400 text-lg font-mono'>Configure Your Neural Interface</p>
      </div>

      {/* Navigation Tabs */}
      <div className='flex justify-center'>
        <div className='grid grid-cols-4 gap-2 p-2 quantum-card rounded-2xl'>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? `bg-electric-500/20 ${tab.color} border-2 border-electric-500/40`
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className='w-5 h-5' />
                <span className='text-xs font-bold font-cyber'>{tab.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className='quantum-card rounded-3xl p-8'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-center space-x-6'>
        <motion.button
          onClick={() => console.log('Saving settings...')}
          className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-electric-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-electric-400 transition-all duration-300'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save className='w-5 h-5' />
          <span>SAVE QUANTUM CONFIG</span>
        </motion.button>

        <motion.button
          onClick={exportData}
          className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className='w-5 h-5' />
          <span>EXPORT DATA</span>
        </motion.button>

        <motion.button
          onClick={() => console.log('Resetting settings...')}
          className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Undo className='w-5 h-5' />
          <span>RESET SETTINGS</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UltimateSettingsPage;
