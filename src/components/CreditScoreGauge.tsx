'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Info, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { GlassCard } from '@/components/animated/GlassCard';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreditScoreGaugeProps {
  score: number;
  previousScore: number;
  loading?: boolean;
  onInfoClick?: () => void;
}

export const CreditScoreGauge = ({ score, previousScore, loading = false, onInfoClick }: CreditScoreGaugeProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const controls = useAnimation();
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Calculate score difference and percentage
  const scoreDifference = score - previousScore;
  const scorePercentage = (score / 850) * 100; // Assuming max score is 850
  
  // Determine score level text and color
  const getScoreLevel = () => {
    if (score >= 750) return { text: 'Excellent', color: 'text-emerald-400' };
    if (score >= 700) return { text: 'Very Good', color: 'text-green-400' };
    if (score >= 650) return { text: 'Good', color: 'text-blue-400' };
    if (score >= 600) return { text: 'Fair', color: 'text-amber-400' };
    if (score >= 550) return { text: 'Poor', color: 'text-orange-500' };
    return { text: 'Very Poor', color: 'text-rose-500' };
  };
  
  const scoreLevel = getScoreLevel();
  
  // Animate the gauge on score change
  useEffect(() => {
    if (!loading) {
      controls.start({
        strokeDashoffset: 339.292 - (339.292 * scorePercentage) / 100,
        transition: { duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }
      });
    }
  }, [score, loading, controls, scorePercentage]);
  
  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <GlassCard className="relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-slate-200 flex items-center justify-between">
          <span>Credit Score</span>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Credit score information"
          >
            <HelpCircle size={18} />
          </button>
        </CardTitle>
        <CardDescription className="text-slate-400">Your decentralized credit rating</CardDescription>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center pt-4 pb-6">
        {loading ? (
          <div className="h-52 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-12 w-12 rounded-full border-2 border-indigo-500 border-t-transparent"
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* SVG Gauge */}
            <div className="relative w-52 h-52">
              {/* Background Circle */}
              <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="339.292"
                  strokeDashoffset="0"
                  transform="rotate(-90, 60, 60)"
                />
                {/* Colored Progress Circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="339.292"
                  strokeDashoffset="339.292"
                  transform="rotate(-90, 60, 60)"
                  initial={{ strokeDashoffset: 339.292 }}
                  animate={controls}
                />
                {/* Define the gradient */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score Display in Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <motion.span 
                    key={score}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white"
                  >
                    {score}
                  </motion.span>
                  <p className={`text-sm font-medium mt-1 ${scoreLevel.color}`}>{scoreLevel.text}</p>
                </motion.div>
              </div>
            </div>
            
            {/* Score Change Indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -right-4 top-6 flex items-center"
            >
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${scoreDifference >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {scoreDifference >= 0 ? (
                  <ArrowUp size={14} className="text-emerald-400" />
                ) : (
                  <ArrowDown size={14} className="text-rose-400" />
                )}
                <span className="text-xs font-medium">{Math.abs(scoreDifference)} pts</span>
              </div>
            </motion.div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  ref={tooltipRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-4 p-4 bg-slate-900/90 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl w-64 z-50"
                >
                  <h4 className="font-medium text-slate-200 mb-2">About Credit Scores</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Your decentralized credit score is calculated based on blockchain activity, transaction history, and wallet behavior.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Poor</span>
                      <span className="text-xs text-slate-400">Excellent</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">300</span>
                      <span className="text-xs text-slate-400">850</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-300"
          onClick={onInfoClick}
        >
          <Info className="mr-2 h-4 w-4" />
          Score Details
        </Button>
      </CardFooter>
    </GlassCard>
  );
};
