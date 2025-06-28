import React, { useState } from 'react';
import { Brain } from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ============================================================================
// MAIN COMPONENT - PropOllama (matching PropGPT design)
// ============================================================================

const PropOllama: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content:
        "Welcome to PropOllama Quantum Neural Interface! I'm powered by 47 neural networks and quantum processing. I can analyze props, predict outcomes, and provide real-time market insights. How can I assist your betting strategy today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mock real-time data (in production this would come from context/props)
  const realTimeData = {
    accuracy: 87.3,
    responseTime: '<1ms',
    neuralNetworks: 47,
    neuralIQ: 247,
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Enhanced AI responses matching the HTML design
    setTimeout(() => {
      const responses = [
        `Based on neural network analysis of 247,892 data points, LeBron James has an 87.3% probability of exceeding 25.5 points tonight. Key factors: 94% shooting efficiency in last 3 games, Warriors defensive rating allows 112.4 points per game.`,
        `Quantum analysis indicates weather conditions in Buffalo will create 23% more passing opportunities. Wind speed: 8mph NE. Temperature: 32°F. Recommend OVER on pass attempts and total offensive plays.`,
        `MMA Neural Insight: Conor McGregor's striking accuracy drops 12% after Round 2 based on 47 fight analysis. Consider UNDER 2.5 rounds or opponent ML if fight extends past early rounds.`,
        `WNBA Analysis: A'ja Wilson averages 2.3 more rebounds per game vs teams allowing 85+ PPG. Sky allows 89.4 PPG. Strong OVER 9.5 rebounds play with 91.2% confidence.`,
        `Soccer/Football Quantum Model: Manchester City scores 73% more goals when possession exceeds 65%. Current weather favors possession play. OVER 2.5 team goals has 88.7% probability.`,
        `Boxing Neural Network #15: Fighters with 6+ inch reach advantage land 34% more jabs. Fury vs Wilder 3 data shows +7 inch reach = 89% OVER punches landed prop.`,
        `NHL Ice Analytics: Power play efficiency increases 23% with ice temperature below 22°F. Arena reports 21°F ice. Strong OVER team power play goals prop tonight.`,
        `Esports Data Stream: League of Legends teams with 15+ minute average game time hit OVER 26.5 kills 87% of the time. TSM averages 16.2 minutes - strong OVER play.`,
        `MLB Weather Model: Wind speed 12+ MPH out to right field creates 31% more home runs for lefty batters. Yankee Stadium tonight: 14 MPH winds favor Aaron Judge OVER 0.5 HRs.`,
        `Real-time odds arbitrage detected: Lakers spread moved from -3.5 to -4.5 across 6 sportsbooks. Recommend waiting 47 minutes for optimal line value based on historical movement patterns.`,
        `Political Betting Neural Analysis: Incumbent governors with 55%+ approval ratings win re-election 94% of the time. Current governor at 57% approval - strong ML value vs +150 odds.`,
      ];

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2500);
  };

  const Button = ({
    label,
    onClick,
    variant = 'primary',
    className = '',
    icon = null,
    disabled = false,
  }) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-electric-500 to-neon-blue text-black font-bold hover:shadow-neon',
      secondary:
        'bg-gray-700/50 hover:bg-gray-600/50 text-white border-2 border-gray-600 hover:border-gray-500',
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {icon && <i className={icon} />}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className='space-y-8 animate-slide-in-up h-full flex flex-col'>
      {/* Enhanced Header - Matching PropGPT design exactly */}
      <div className='quantum-card rounded-3xl p-10 text-center'>
        <div className='relative mb-6'>
          <h1 className='holographic text-5xl font-black mb-4 font-cyber'>PROPOLLAMA QUANTUM</h1>
          <p className='text-2xl text-gray-400 font-mono'>Neural Sports Intelligence Assistant</p>
        </div>
        <div className='grid grid-cols-4 gap-6'>
          <div>
            <div className='text-2xl font-bold text-electric-400 font-cyber'>
              {realTimeData.neuralNetworks}
            </div>
            <div className='text-gray-400 font-mono text-sm'>Neural Networks</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-purple-400 font-cyber'>
              {realTimeData.neuralIQ}
            </div>
            <div className='text-gray-400 font-mono text-sm'>Neural IQ</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-green-400 font-cyber'>
              {realTimeData.accuracy}%
            </div>
            <div className='text-gray-400 font-mono text-sm'>Prediction Accuracy</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-blue-400 font-cyber'>
              {realTimeData.responseTime}
            </div>
            <div className='text-gray-400 font-mono text-sm'>Response Time</div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Container - Matching PropGPT design exactly */}
      <div className='flex-1 quantum-card rounded-3xl p-8 flex flex-col border border-electric-500/30'>
        <div className='flex-1 space-y-6 mb-8 overflow-y-auto max-h-96 custom-scrollbar'>
          {messages.map(message => (
            <div
              key={message.id}
              className={`chat-message flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${message.type === 'user' ? 'order-2 ml-4' : 'order-1 mr-4'} flex-shrink-0`}
              >
                {message.type === 'user' ? (
                  <div className='w-10 h-10 bg-gradient-to-br from-electric-400 to-neon-blue rounded-xl flex items-center justify-center'>
                    <span className='text-black font-bold text-sm'>U</span>
                  </div>
                ) : (
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-neon-purple rounded-xl flex items-center justify-center animate-neural-pulse'>
                    <Brain className='text-black w-5 h-5' />
                  </div>
                )}
              </div>
              <div className={`${message.type === 'user' ? 'order-1' : 'order-2'} max-w-2xl`}>
                <div
                  className={`px-6 py-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-electric-500 text-black font-semibold'
                      : 'quantum-card border border-purple-500/30 text-white'
                  }`}
                >
                  {message.content}
                </div>
                <div className='text-xs text-gray-500 mt-2 font-mono'>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className='flex justify-start'>
              <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-neon-purple rounded-xl flex items-center justify-center animate-neural-pulse mr-4'>
                <Brain className='text-black w-5 h-5' />
              </div>
              <div className='quantum-card border border-purple-500/30 text-white px-6 py-4 rounded-2xl typing-indicator'>
                PropOllama Quantum is analyzing neural networks...
              </div>
            </div>
          )}
        </div>

        <div className='flex space-x-4'>
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder='Ask about props, odds, strategies, or market analysis...'
            className='flex-1 p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-800/50 text-white font-mono'
          />
          <Button
            label='SEND'
            variant='primary'
            icon='fa-paper-plane'
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
          />
        </div>
      </div>

      {/* Enhanced Quick Actions - Matching PropGPT design exactly */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <button
          onClick={() => setInput("Analyze tonight's NBA props with neural networks")}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-green-500/30 hover:border-green-500/50'
        >
          <div className='text-4xl mb-3 text-green-400'>📊</div>
          <div className='text-sm font-bold font-cyber'>NEURAL ANALYSIS</div>
        </button>
        <button
          onClick={() => setInput('Show live line movements and market intelligence')}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-blue-500/30 hover:border-blue-500/50'
        >
          <div className='text-4xl mb-3 text-blue-400'>📈</div>
          <div className='text-sm font-bold font-cyber'>LIVE MARKETS</div>
        </button>
        <button
          onClick={() => setInput('Find quantum value bets with highest EV')}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-yellow-500/30 hover:border-yellow-500/50'
        >
          <div className='text-4xl mb-3 text-yellow-400'>💰</div>
          <div className='text-sm font-bold font-cyber'>VALUE DETECTION</div>
        </button>
        <button
          onClick={() => setInput('Create advanced betting strategy with correlation analysis')}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-purple-500/30 hover:border-purple-500/50'
        >
          <div className='text-4xl mb-3 text-purple-400'>🧠</div>
          <div className='text-sm font-bold font-cyber'>STRATEGY AI</div>
        </button>
      </div>
    </div>
  );
};

export default PropOllama;
