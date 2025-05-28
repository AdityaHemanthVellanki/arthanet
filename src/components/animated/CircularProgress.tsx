'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  duration?: number;
  children?: React.ReactNode;
}

export const CircularProgress = ({
  percentage,
  size = 200,
  strokeWidth = 12,
  color = '#4364F7',
  bgColor = 'rgba(30, 41, 59, 0.2)',
  duration = 1.5,
  children
}: CircularProgressProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Calculate properties
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progressValue = circumference - circumference * (percentage / 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progressValue }}
          transition={{ duration: duration, ease: 'easeInOut' }}
          style={{
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
          }}
        />
      </svg>
      
      {/* Content in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
