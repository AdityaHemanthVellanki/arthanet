'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
  duration?: number;
}

export const GlassCard = ({ 
  children, 
  className, 
  hoverEffect = true,
  delay = 0,
  duration = 0.5
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.65, 0.05, 0.36, 1] 
      }}
      whileHover={hoverEffect ? {
        y: -5,
        transition: { duration: 0.2 }
      } : undefined}
      className={cn(
        'relative bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-xl overflow-hidden',
        className
      )}
    >
      {/* Glass reflection effect - top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/20 to-transparent" />
      
      {/* Glass reflection effect - left edge */}
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-slate-400/20 to-transparent" />
      
      {/* Subtle inner glow on hover */}
      {hoverEffect && (
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
