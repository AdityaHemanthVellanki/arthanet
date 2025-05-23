'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/animated/GlassCard';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Info, ArrowRight, AlertCircle } from 'lucide-react';

interface CreditFactor {
  name: string;
  score: number;
  weight: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

interface CreditFactorAnalysisProps {
  factors: CreditFactor[];
}

export const CreditFactorAnalysis = ({ factors }: CreditFactorAnalysisProps) => {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-emerald-400';
      case 'good':
        return 'text-blue-400';
      case 'fair':
        return 'text-amber-400';
      case 'poor':
        return 'text-rose-400';
      default:
        return 'text-slate-400';
    }
  };

  const getImpactText = (weight: number) => {
    if (weight >= 0.3) return 'High Impact';
    if (weight >= 0.15) return 'Medium Impact';
    return 'Low Impact';
  };

  const getImpactColor = (weight: number) => {
    if (weight >= 0.3) return 'text-indigo-400';
    if (weight >= 0.15) return 'text-blue-400';
    return 'text-slate-400';
  };

  const toggleFactor = (factorName: string) => {
    if (expandedFactor === factorName) {
      setExpandedFactor(null);
    } else {
      setExpandedFactor(factorName);
    }
  };

  return (
    <GlassCard className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-slate-200">Credit Factor Analysis</CardTitle>
        <CardDescription className="text-slate-400">Understanding what affects your score</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {factors.map((factor, index) => (
          <motion.div 
            key={factor.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-slate-800/50 rounded-lg overflow-hidden"
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors"
              onClick={() => toggleFactor(factor.name)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="h-10 w-10 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Info className="h-5 w-5 text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-200 font-medium">{factor.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={getStatusColor(factor.status)}>{factor.status}</span>
                    <span className="text-slate-500">•</span>
                    <span className={getImpactColor(factor.weight)}>{getImpactText(factor.weight)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-medium text-slate-200">{factor.score}</span>
                <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${expandedFactor === factor.name ? 'rotate-90' : ''}`} />
              </div>
            </div>
            
            {expandedFactor === factor.name && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 pt-2 border-t border-slate-800/50"
              >
                <p className="text-slate-300 mb-3">{factor.description}</p>
                <div className="flex items-start space-x-2 bg-slate-800/30 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-300">
                      This factor makes up <span className="font-semibold text-indigo-400">{(factor.weight * 100).toFixed(0)}%</span> of your total credit score. Focusing on improving this area can have a {getImpactText(factor.weight).toLowerCase()} on your overall score.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </GlassCard>
  );
};
