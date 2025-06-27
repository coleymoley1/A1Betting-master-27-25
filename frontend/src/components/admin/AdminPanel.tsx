import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Atom, Settings, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface AdminConfig {
  autoOptimization: boolean;
  maxModels: number;
  confidenceThreshold: number;
  retraining: string;
  dataFeeds: string;
  quantumProcessing: boolean;
  neuralDepth: string;
  learningRate: string;
}

const AdminPanel: React.FC = () => {
  const [adminConfig, setAdminConfig] = useState<AdminConfig>({
    autoOptimization: true,
    maxModels: 47,
    confidenceThreshold: 95,
    retraining: 'quantum',
    dataFeeds: 'all',
    quantumProcessing: true,
    neuralDepth: 'deep',
    learningRate: 'adaptive',
  });

  // Mock real-time data - would come from actual services
  const predictionEngine = {
    uptime: '99.97%',
    algorithmVersion: 'v4.7.3',
    neuralNetworks: '47/47',
    ensembleAccuracy: '94.2',
    processingNodes: '128',
    quantumQubits: '512',
    dataStreams: '847',
    nextUpdate: '2m 34s',
  };

  const realTimeData = {
    quantumCoherence: 99.97,
    accuracy: 94.2,
    processingSpeed: 12,
  };

  return (
    <div className='space-y-10 animate-slide-in-up'>
      {/* Enhanced Header */}
      <div className='quantum-card rounded-3xl p-12 text-center border-2 border-red-500/30'>
        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-red-400/20 blur-3xl rounded-full' />
          <div className='relative text-8xl text-red-400 mb-6 animate-quantum-spin'>🛡️</div>
          <h1 className='holographic text-5xl font-black mb-4 font-cyber'>QUANTUM ADMIN CONTROL</h1>
          <p className='text-2xl text-gray-400 font-mono'>
            Neural Network Command Center • Clearance Level: MAXIMUM
          </p>
        </div>

        <div className='grid grid-cols-4 gap-8'>
          <div>
            <div className='text-3xl font-bold text-red-400 font-cyber'>ALPHA</div>
            <div className='text-gray-400 font-mono'>Security Level</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-electric-400 font-cyber'>100%</div>
            <div className='text-gray-400 font-mono'>System Access</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-green-400 font-cyber'>
              {predictionEngine.uptime}
            </div>
            <div className='text-gray-400 font-mono'>System Uptime</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-purple-400 font-cyber'>
              {predictionEngine.algorithmVersion}
            </div>
            <div className='text-gray-400 font-mono'>Neural Version</div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className='quantum-card rounded-2xl p-8 border-2 border-yellow-500/40 bg-yellow-500/5'>
        <div className='flex items-center space-x-6'>
          <i className='fas fa-exclamation-triangle text-yellow-400 text-4xl animate-pulse' />
          <div>
            <h3 className='font-bold text-yellow-400 text-xl font-cyber'>
              QUANTUM AUTO-OPTIMIZATION ACTIVE
            </h3>
            <p className='text-gray-300 font-mono mt-2'>
              All prediction parameters are quantum-optimized for maximum accuracy. Manual
              adjustments may disrupt neural harmony and reduce performance efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced System Status */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <motion.div
          className='admin-control rounded-3xl p-8 hover:shadow-neon-purple bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-purple-500/5 border border-purple-500/30'
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' }}
        >
          <div className='flex items-center space-x-4 mb-6'>
            <i className='fas fa-brain text-3xl text-purple-400 animate-neural-pulse' />
            <h3 className='font-bold text-purple-400 text-xl font-cyber'>NEURAL NETWORKS</h3>
          </div>
          <div className='text-5xl font-bold text-white mb-4 font-cyber'>
            {predictionEngine.neuralNetworks}
          </div>
          <div className='text-sm text-green-400 font-mono mb-2'>
            ● All Networks Active & Synchronized
          </div>
          <div className='text-sm text-gray-400 font-mono'>
            Ensemble Accuracy: {predictionEngine.ensembleAccuracy}%
          </div>
          <div className='text-sm text-gray-400 font-mono'>
            Processing Nodes: {predictionEngine.processingNodes}
          </div>
        </motion.div>

        <motion.div
          className='admin-control rounded-3xl p-8 hover:shadow-quantum bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-cyan-500/5 border border-cyan-500/30'
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)' }}
        >
          <div className='flex items-center space-x-4 mb-6'>
            <i className='fas fa-atom text-3xl text-cyan-400 animate-quantum-spin' />
            <h3 className='font-bold text-cyan-400 text-xl font-cyber'>QUANTUM CORE</h3>
          </div>
          <div className='text-5xl font-bold text-white mb-4 font-cyber'>
            {predictionEngine.quantumQubits}
          </div>
          <div className='text-sm text-green-400 font-mono mb-2'>● Quantum Entanglement Stable</div>
          <div className='text-sm text-gray-400 font-mono'>
            Coherence: {realTimeData.quantumCoherence}%
          </div>
          <div className='text-sm text-gray-400 font-mono'>
            Data Streams: {predictionEngine.dataStreams}
          </div>
        </motion.div>

        <motion.div
          className='admin-control rounded-3xl p-8 hover:shadow-neon bg-gradient-to-br from-green-500/20 via-green-500/10 to-green-500/5 border border-green-500/30'
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' }}
        >
          <div className='flex items-center space-x-4 mb-6'>
            <i className='fas fa-cogs text-3xl text-green-400 animate-spin' />
            <h3 className='font-bold text-green-400 text-xl font-cyber'>AUTO-OPTIMIZER</h3>
          </div>
          <div className='text-3xl font-bold text-green-400 mb-4 font-cyber'>QUANTUM ACTIVE</div>
          <div className='text-sm text-gray-400 font-mono mb-1'>
            Last optimization: 47 seconds ago
          </div>
          <div className='text-sm text-gray-400 font-mono mb-1'>
            Next cycle: {predictionEngine.nextUpdate}
          </div>
          <div className='text-sm text-gray-400 font-mono'>
            Algorithm: {predictionEngine.algorithmVersion}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Control Panel */}
      <div className='quantum-card rounded-3xl p-10 border border-electric-500/30'>
        <h2 className='text-3xl font-bold text-electric-400 holographic mb-8 font-cyber'>
          QUANTUM SYSTEM CONFIGURATION
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Neural Engine Controls */}
          <div>
            <h3 className='font-bold text-white mb-6 text-xl font-cyber'>NEURAL ENGINE CONTROLS</h3>

            {/* Auto-Optimization Toggle */}
            <div className='flex items-center justify-between mb-6 p-6 quantum-card rounded-2xl'>
              <div>
                <div className='font-bold text-white font-cyber'>Quantum Auto-Optimization</div>
                <div className='text-sm text-gray-400 font-mono'>
                  Continuously optimize all neural parameters
                </div>
              </div>
              <div className='relative'>
                <input
                  type='checkbox'
                  checked={adminConfig.autoOptimization}
                  onChange={e =>
                    setAdminConfig({ ...adminConfig, autoOptimization: e.target.checked })
                  }
                  className='w-6 h-6 text-electric-500'
                />
                {adminConfig.autoOptimization && (
                  <div className='absolute inset-0 bg-electric-400/50 rounded blur-sm' />
                )}
              </div>
            </div>

            {/* Confidence Threshold */}
            <div className='mb-6'>
              <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                QUANTUM CONFIDENCE THRESHOLD
              </label>
              <input
                type='range'
                min='80'
                max='99'
                value={adminConfig.confidenceThreshold}
                onChange={e =>
                  setAdminConfig({ ...adminConfig, confidenceThreshold: parseInt(e.target.value) })
                }
                className='w-full h-3 bg-gray-700 rounded-full appearance-none slider'
              />
              <div className='text-center text-electric-400 font-bold mt-3 text-2xl font-cyber'>
                {adminConfig.confidenceThreshold}%
              </div>
            </div>

            {/* Neural Depth */}
            <div>
              <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                NEURAL NETWORK DEPTH
              </label>
              <select
                value={adminConfig.neuralDepth}
                onChange={e => setAdminConfig({ ...adminConfig, neuralDepth: e.target.value })}
                className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
              >
                <option value='shallow'>Shallow Networks (Fast)</option>
                <option value='deep'>Deep Networks (Recommended)</option>
                <option value='quantum'>Quantum Deep (Maximum)</option>
                <option value='neural-quantum'>Neural-Quantum Hybrid</option>
              </select>
            </div>
          </div>

          {/* Quantum Processing Controls */}
          <div>
            <h3 className='font-bold text-white mb-6 text-xl font-cyber'>
              QUANTUM PROCESSING CONTROLS
            </h3>

            {/* Quantum Processing Toggle */}
            <div className='flex items-center justify-between mb-6 p-6 quantum-card rounded-2xl'>
              <div>
                <div className='font-bold text-white font-cyber'>Quantum Enhancement</div>
                <div className='text-sm text-gray-400 font-mono'>
                  Enable quantum-enhanced computations
                </div>
              </div>
              <div className='relative'>
                <input
                  type='checkbox'
                  checked={adminConfig.quantumProcessing}
                  onChange={e =>
                    setAdminConfig({ ...adminConfig, quantumProcessing: e.target.checked })
                  }
                  className='w-6 h-6 text-cyan-500'
                />
                {adminConfig.quantumProcessing && (
                  <div className='absolute inset-0 bg-cyan-400/50 rounded blur-sm' />
                )}
              </div>
            </div>

            {/* Retraining Protocol */}
            <div className='mb-6'>
              <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                MODEL RETRAINING PROTOCOL
              </label>
              <select
                value={adminConfig.retraining}
                onChange={e => setAdminConfig({ ...adminConfig, retraining: e.target.value })}
                className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
              >
                <option value='quantum'>Quantum Automatic (Recommended)</option>
                <option value='neural'>Neural Scheduled</option>
                <option value='manual'>Manual Override</option>
                <option value='adaptive'>Adaptive Learning</option>
              </select>
            </div>

            {/* Learning Rate */}
            <div>
              <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                LEARNING RATE CONTROL
              </label>
              <select
                value={adminConfig.learningRate}
                onChange={e => setAdminConfig({ ...adminConfig, learningRate: e.target.value })}
                className='w-full p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-slate-800 text-white'
              >
                <option value='adaptive'>Adaptive Rate (Quantum)</option>
                <option value='fixed'>Fixed Rate (Stable)</option>
                <option value='decay'>Exponential Decay</option>
                <option value='cyclic'>Cyclic Learning</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Performance Metrics - Exact match to HTML */}
      <div className='quantum-card rounded-3xl p-10 border border-electric-500/30'>
        <h2 className='text-3xl font-bold text-electric-400 holographic mb-8 font-cyber'>
          REAL-TIME PERFORMANCE MATRIX
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='text-center p-8 quantum-card rounded-2xl border border-green-500/40 hover:shadow-neon'>
            <div className='text-4xl mb-4 text-green-400'>
              <i className='fas fa-target animate-pulse' />
            </div>
            <div className='text-4xl font-bold text-green-400 mb-3 font-cyber'>
              {realTimeData.accuracy.toFixed(1)}%
            </div>
            <div className='text-gray-400 text-sm font-mono mb-2'>Neural Accuracy</div>
            <div className='text-green-400 text-xs font-mono'>↗ +0.3% (Quantum Optimized)</div>
          </div>

          <div className='text-center p-8 quantum-card rounded-2xl border border-blue-500/40 hover:shadow-neon-blue'>
            <div className='text-4xl mb-4 text-blue-400'>
              <i className='fas fa-microchip animate-pulse' />
            </div>
            <div className='text-4xl font-bold text-blue-400 mb-3 font-cyber'>
              {realTimeData.processingSpeed}ms
            </div>
            <div className='text-gray-400 text-sm font-mono mb-2'>Processing Speed</div>
            <div className='text-blue-400 text-xs font-mono'>↘ -3ms (Quantum Enhanced)</div>
          </div>

          <div className='text-center p-8 quantum-card rounded-2xl border border-purple-500/40 hover:shadow-neon-purple'>
            <div className='text-4xl mb-4 text-purple-400'>
              <i className='fas fa-infinity animate-pulse' />
            </div>
            <div className='text-4xl font-bold text-purple-400 mb-3 font-cyber'>∞</div>
            <div className='text-gray-400 text-sm font-mono mb-2'>Quantum Throughput</div>
            <div className='text-purple-400 text-xs font-mono'>Unlimited Neural Capacity</div>
          </div>

          <div className='text-center p-8 quantum-card rounded-2xl border border-yellow-500/40 hover:shadow-yellow'>
            <div className='text-4xl mb-4 text-yellow-400'>
              <i className='fas fa-bolt animate-pulse' />
            </div>
            <div className='text-4xl font-bold text-yellow-400 mb-3 font-cyber'>99.97%</div>
            <div className='text-gray-400 text-sm font-mono mb-2'>System Efficiency</div>
            <div className='text-yellow-400 text-xs font-mono'>Quantum Optimal Performance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
