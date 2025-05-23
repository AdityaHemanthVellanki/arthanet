'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Wallet, BarChart3, AlertCircle } from 'lucide-react';

interface RecommendationProps {
  title: string;
  description: string;
  impact: string;
  icon: 'shield' | 'wallet' | 'chart' | 'alert';
  delay?: number;
}

export const RecommendationCard = ({ 
  title, 
  description, 
  impact, 
  icon, 
  delay = 0 
}: RecommendationProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'wallet': return <Wallet className="w-5 h-5 text-blue-400" />;
      case 'chart': return <BarChart3 className="w-5 h-5 text-purple-400" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      default: return <Shield className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
            {getIcon()}
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="h-7 w-7 rounded-full bg-slate-700/50 flex items-center justify-center"
          >
            <ArrowUpRight className="w-4 h-4 text-slate-300" />
          </motion.div>
        </div>
        
        <h3 className="mt-4 text-lg font-medium text-slate-200">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
        
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-xs font-medium text-indigo-400">{impact}</span>
        </div>
      </div>
      
      {/* Bottom gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </motion.div>
  );
};
