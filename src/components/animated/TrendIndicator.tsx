'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  suffix?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const TrendIndicator = ({ 
  value, 
  suffix = 'points', 
  showIcon = true,
  size = 'md',
  animate = true
}: TrendIndicatorProps) => {
  // Determine the trend
  const trend = value > 0 ? 'up' : value < 0 ? 'down' : 'neutral';
  
  // Determine the styles based on trend
  const getStyles = () => {
    switch (trend) {
      case 'up':
        return {
          text: 'text-emerald-400',
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20',
          icon: <TrendingUp className={getSizeClass('icon')} />
        };
      case 'down':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-400/10',
          border: 'border-rose-400/20',
          icon: <TrendingDown className={getSizeClass('icon')} />
        };
      default:
        return {
          text: 'text-slate-400',
          bg: 'bg-slate-400/10',
          border: 'border-slate-400/20',
          icon: <Minus className={getSizeClass('icon')} />
        };
    }
  };
  
  // Get class based on size
  const getSizeClass = (type: 'text' | 'icon' | 'padding') => {
    switch (size) {
      case 'sm':
        return type === 'text' ? 'text-xs' : 
               type === 'icon' ? 'h-3 w-3 mr-1' : 'px-2 py-1';
      case 'lg':
        return type === 'text' ? 'text-base' : 
               type === 'icon' ? 'h-5 w-5 mr-1.5' : 'px-3 py-2';
      default: // md
        return type === 'text' ? 'text-sm' : 
               type === 'icon' ? 'h-4 w-4 mr-1' : 'px-2.5 py-1.5';
    }
  };
  
  const styles = getStyles();
  const formattedValue = value > 0 ? `+${value}` : value.toString();
  
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.9 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`inline-flex items-center rounded-full border ${styles.border} ${styles.bg} ${styles.text} ${getSizeClass('padding')}`}
    >
      {showIcon && (
        <motion.span
          initial={animate ? { y: -5, opacity: 0 } : {}}
          animate={animate ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {styles.icon}
        </motion.span>
      )}
      <motion.span 
        className={getSizeClass('text')} 
        initial={animate ? { x: -5, opacity: 0 } : {}}
        animate={animate ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: 0.4 }}
      >
        {formattedValue} {suffix}
      </motion.span>
    </motion.div>
  );
};
