'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
  progressColor?: string;
  textColor?: string;
  duration?: number;
}

export const CircularProgress = ({
  score,
  maxScore = 850,
  size = 200,
  strokeWidth = 12,
  bgColor = 'rgba(30, 41, 59, 0.2)',
  progressColor = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
  textColor = 'white',
  duration = 1.5,
}: CircularProgressProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [hover, setHover] = useState(false);
  
  // Calculate properties
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = score / maxScore;
  const progressValue = circumference - circumference * progressPercentage;
  
  // Define score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-emerald-400';
    if (score >= 650) return 'text-blue-400';
    if (score >= 550) return 'text-amber-400';
    return 'text-rose-400';
  };
  
  const getScoreText = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        className="relative"
      >
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
            stroke="url(#gradient)"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressValue }}
            transition={{ duration: duration, ease: 'easeInOut' }}
            style={{
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
              filter: hover ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' : 'none',
            }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Score text in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.span 
              className={`text-4xl font-bold ${getScoreColor(score)}`}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring', 
                delay: 0.8, 
                duration: 0.8 
              }}
            >
              {animatedScore}
            </motion.span>
            <motion.span 
              className="text-sm font-medium text-slate-300 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              {getScoreText(score)}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        animate={{ 
          boxShadow: hover 
            ? '0 0 20px 5px rgba(139, 92, 246, 0.2)' 
            : '0 0 0px 0px rgba(139, 92, 246, 0)' 
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
