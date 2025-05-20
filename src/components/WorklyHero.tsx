'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function WorklyHero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
        alert('Successfully joined the waitlist!');
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
              
              {/* Trust indicators */}
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
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel anytime</span>
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
              {/* Dashboard Preview */}
              <div className="relative rounded-2xl shadow-2xl shadow-blue-600/10 border border-border overflow-hidden">
                <Image 
                  src="/dashboard-preview.png" 
                  alt="ArthaNet Dashboard" 
                  width={650}
                  height={400}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/650x400/111827/6366f1?text=ArthaNet+Dashboard';
                  }}
                />
                
                {/* Dashboard Overlay Elements */}
                <div className="absolute top-3 left-3 right-3 flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto bg-foreground/10 rounded-md px-3 py-1 text-[10px] text-foreground/70">
                    ArthaNet Workspace
                  </div>
                </div>
                
                {/* Floating Notification */}
                <motion.div
                  className="absolute top-12 right-6 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg w-48"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <p className="text-xs font-medium">New notification</p>
                  </div>
                  <p className="text-xs text-foreground/70">Your task "Update dashboard" has been completed!</p>
                </motion.div>
                
                {/* Floating Analytics Card */}
                <motion.div
                  className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <p className="text-xs font-medium mb-1">Productivity Score</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-foreground/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "85%" }}
                        transition={{ delay: 1.6, duration: 1 }}
                      ></motion.div>
                    </div>
                    <span className="text-xs text-blue-500 font-medium">85%</span>
                  </div>
                </motion.div>
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
