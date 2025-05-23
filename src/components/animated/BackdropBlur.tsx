'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BackdropBlurProps {
  children: ReactNode;
  className?: string;
}

export const BackdropBlur = ({ children, className = '' }: BackdropBlurProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main content */}
      <div className="relative z-10">{children}</div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradients */}
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
            scale: [0.8, 1.2, 0.8],
            x: ['-10%', '15%', '-10%'],
            y: ['-20%', '0%', '-20%']
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: 'easeInOut'
          }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0.4, scale: 0.7 }}
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [0.7, 1.1, 0.7],
            x: ['30%', '0%', '30%'],
            y: ['20%', '40%', '20%']
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0.3, scale: 0.6 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [0.6, 1, 0.6],
            x: ['-5%', '10%', '-5%'],
            y: ['60%', '40%', '60%']
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 30,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-pink-500/10 blur-3xl"
        />
      </div>
    </div>
  );
};
