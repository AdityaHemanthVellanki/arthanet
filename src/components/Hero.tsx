"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically connect to your waitlist backend
    // For now, we'll just simulate a successful submission
    if (email) {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" id="hero">
      {/* Background gradient circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--accent-purple)] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--accent-blue)] opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero text content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your <span className="text-gradient">On-Chain Credit Score</span> Starts Here.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              ArthaNet is building the future of trust in Web3 — credit scoring, simplified and decentralized.
            </p>
            
            {/* Waitlist form */}
            <div className="max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--primary-dark)] bg-opacity-60 border border-[var(--accent-blue)] border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:border-transparent"
                  required
                />
                <motion.button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Early Access
                </motion.button>
              </form>
              
              {submitted && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400"
                >
                  Thanks for joining our waitlist!
                </motion.p>
              )}
              
              <p className="text-sm text-[var(--text-muted)]">
                Be the first to access ArthaNet's on-chain credit scoring.
              </p>
            </div>
          </motion.div>
          
          {/* 3D visualization */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative h-96 w-full">
              {/* Ethereum logo with glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating">
                <div className="w-32 h-32 relative glow">
                  <svg viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32">
                    <path fill="#fff" fillRule="evenodd" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
                    <path fill="#fff" fillOpacity="0.8" fillRule="evenodd" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
                    <path fill="#fff" fillOpacity="0.6" fillRule="evenodd" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/>
                    <path fill="#fff" fillOpacity="0.4" fillRule="evenodd" d="M127.962 416.905v-104.72L0 236.585z"/>
                    <path fill="#fff" fillOpacity="0.5" fillRule="evenodd" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/>
                    <path fill="#fff" fillOpacity="0.3" fillRule="evenodd" d="M0 212.32l127.96 75.638v-133.8z"/>
                  </svg>
                </div>
              </div>
              
              {/* Connection nodes */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[var(--accent-purple)] rounded-full pulse-glow"></div>
              <div className="absolute top-3/4 left-1/3 w-4 h-4 bg-[var(--accent-blue)] rounded-full pulse-glow"></div>
              <div className="absolute top-2/4 right-1/4 w-4 h-4 bg-[var(--accent-cyan)] rounded-full pulse-glow"></div>
              <div className="absolute top-1/5 right-1/3 w-4 h-4 bg-white rounded-full pulse-glow"></div>
              <div className="absolute bottom-1/4 right-1/5 w-4 h-4 bg-[var(--accent-purple)] rounded-full pulse-glow"></div>
              
              {/* Connection lines */}
              {/* Using pseudo-elements for the lines in a real implementation */}
              {/* This is a visual placeholder that suggests connections */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="url(#gradient)" strokeWidth="1" />
                  <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="url(#gradient)" strokeWidth="1" />
                  <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="url(#gradient)" strokeWidth="1" />
                  <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="url(#gradient)" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
