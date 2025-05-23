'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  glowColor?: string;
}

export const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0,
  hoverEffect = true,
  glowColor = 'rgba(139, 92, 246, 0.15)'
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.65, 0.05, 0.36, 1] 
      }}
      whileHover={hoverEffect ? { 
        y: -5,
        transition: { duration: 0.2, ease: 'easeOut' }
      } : {}}
      className="relative w-full"
    >
      <Card className={`relative overflow-hidden backdrop-blur-sm border-opacity-30 ${className}`}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/80 z-0" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-10 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        
        {/* Glass highlight effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-100/10 to-transparent z-0" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-slate-100/10 to-transparent z-0" />
        
        {/* Content with relative positioning */}
        <div className="relative z-10">
          {children}
        </div>
      </Card>
      
      {/* Glow effect on hover */}
      {hoverEffect && (
        <motion.div 
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ 
            boxShadow: `0 0 30px 5px ${glowColor}`,
            zIndex: -1 
          }}
        />
      )}
    </motion.div>
  );
};
