'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import WaitlistThankYou from './WaitlistThankYou';

export default function WorklyHero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setEmail('');
        setShowThankYou(true);
      } else {
        alert('Error joining the waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error joining the waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 min-h-[90vh] flex flex-col justify-center">
      {/* Thank you popup */}
      <WaitlistThankYou 
        show={showThankYou} 
        onClose={() => setShowThankYou(false)} 
      />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Large gradient orb */}
        <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl opacity-60" />
        
        {/* Small glowing dots - top left */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`dot-tl-${i}`}
            className="absolute rounded-full bg-blue-500"
            style={{
              top: `${10 + Math.random() * 20}%`,
              left: `${5 + Math.random() * 20}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              opacity: 0.4 + Math.random() * 0.3
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Small glowing dots - bottom right */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`dot-br-${i}`}
            className="absolute rounded-full bg-purple-500"
            style={{
              bottom: `${15 + Math.random() * 20}%`,
              right: `${5 + Math.random() * 20}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              opacity: 0.4 + Math.random() * 0.3
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 mt-10">
        {/* Hero Content */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              {/* Highlight label */}
              <motion.div
                className="inline-flex items-center mb-6 rounded-full bg-blue-500/10 px-3 py-1 border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs font-semibold text-blue-500 mr-2">DeFi</span>
                <span className="text-xs text-foreground/70">Decentralized Credit Scoring</span>
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Decentralized
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text inline-block">Credit Scoring</span>
                <br />
                For Web3
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                ArthaNet offers AI-powered credit scoring on the blockchain, providing transparent risk assessment for DeFi protocols and users across Ethereum and other networks.
              </motion.p>
              
              {/* Call to action */}
              <motion.div
                className="mb-8 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-5 py-3.5 rounded-xl bg-background border border-border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 pl-5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-foreground/30"></div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-600/30"
                  >
                    {isSubmitting ? 'Joining...' : 'Get Started'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </motion.div>
              
              {/* Key features */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-foreground/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ethereum & Layer 2 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>On-chain Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>DeFi Protocol Integration</span>
                </div>
              </motion.div>
            </div>
            
            {/* Hero Image */}
            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Credit Score Dashboard */}
              <div className="relative rounded-2xl shadow-2xl shadow-blue-600/10 border border-border overflow-hidden bg-background/90 backdrop-blur-sm p-4 pt-2">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-border/20 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 mr-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      <span className="text-lg">$</span>
                    </div>
                    <div>
                      <h3 className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ArthaNet Score</h3>
                      <p className="text-xs text-foreground/60">Blockchain Credit Profile</p>
                    </div>
                  </div>
                </div>
                
                {/* Main Credit Score Display */}
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  {/* Credit Score Circle */}
                  <motion.div 
                    className="flex-shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <div className="relative w-44 h-44 mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="rgba(var(--foreground-rgb), 0.1)"
                          strokeWidth="12"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="url(#creditScoreGradient)"
                          strokeWidth="12"
                          strokeDasharray="339.3">
                          <motion.animate 
                            attributeName="stroke-dashoffset" 
                            from="339.3" 
                            to="85" 
                            dur="2s" 
                            fill="freeze" 
                          />
                        </circle>
                        <defs>
                          <linearGradient id="creditScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#9333ea" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span 
                          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 0.8 }}
                        >
                          785
                        </motion.span>
                        <span className="text-xs text-foreground/60">EXCELLENT</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Score Details */}
                  <div className="flex-1 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">DeFi Activity</span>
                        <span className="text-sm font-medium text-blue-500">92%</span>
                      </div>
                      <div className="h-2 bg-foreground/10 rounded-full">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ delay: 1.2, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Transaction History</span>
                        <span className="text-sm font-medium text-purple-500">85%</span>
                      </div>
                      <div className="h-2 bg-foreground/10 rounded-full">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ delay: 1.4, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Wallet Age</span>
                        <span className="text-sm font-medium text-blue-500">67%</span>
                      </div>
                      <div className="h-2 bg-foreground/10 rounded-full">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '67%' }}
                          transition={{ delay: 1.6, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Blockchain Networks */}
                <div className="pt-4 border-t border-border/20">
                  <p className="text-xs text-foreground/60 mb-3">Connected Networks</p>
                  <div className="flex space-x-3">
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                    >
                      <span className="text-xs font-medium text-blue-500">ETH</span>
                    </motion.div>
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.4 }}
                    >
                      <span className="text-xs font-medium text-purple-500">POL</span>
                    </motion.div>
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-blue-400/20 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.4 }}
                    >
                      <span className="text-xs font-medium text-blue-400">ARB</span>
                    </motion.div>
                    <motion.div 
                      className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.4 }}
                    >
                      <span className="text-xs font-medium text-red-500">OP</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <p className="text-xs text-foreground/50 mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
