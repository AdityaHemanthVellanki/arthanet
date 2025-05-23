'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/animated/GlassCard';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  Wallet, 
  ChevronDown, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  BarChart2, 
  LineChart, 
  CircleDollarSign,
  Percent
} from 'lucide-react';

interface AssetData {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change24h: number;
}

interface LoanData {
  protocol: string;
  amount: string;
  value: number;
  interestRate: number;
  collateralRatio: number;
}

interface YieldData {
  protocol: string;
  asset: string;
  amount: string;
  value: number;
  apy: number;
}

interface PortfolioCardsProps {
  assets: AssetData[];
  loans: LoanData[];
  yields: YieldData[];
  loading?: boolean;
}

export const PortfolioCards = ({ assets, loans, yields, loading = false }: PortfolioCardsProps) => {
  const [expandedAssets, setExpandedAssets] = useState(true);
  const [expandedLoans, setExpandedLoans] = useState(false);
  const [expandedYields, setExpandedYields] = useState(false);
  
  // Calculate totals
  const totalAssetValue = assets.reduce((total, asset) => total + asset.value, 0);
  const totalLoanValue = loans.reduce((total, loan) => total + loan.value, 0);
  const totalYieldValue = yields.reduce((total, yield_) => total + yield_.value, 0);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Format percentage
  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  const cardVariants = {
    closed: { height: 80 },
    open: { height: 'auto' }
  };
  
  const contentVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="h-20 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent"
              />
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Assets Card */}
      <motion.div
        layout
        initial="closed"
        animate={expandedAssets ? "open" : "closed"}
        variants={cardVariants}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <GlassCard className="overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setExpandedAssets(!expandedAssets)}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">Assets</h3>
                <p className="text-slate-400 text-sm">{formatCurrency(totalAssetValue)}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedAssets ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {expandedAssets && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="space-y-2">
                    {assets.map((asset, index) => (
                      <motion.div
                        key={asset.symbol}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-slate-800/50 p-3 hover:bg-slate-800/30 transition-colors"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                              <span className="text-xs font-semibold text-slate-200">{asset.symbol.slice(0, 3)}</span>
                            </div>
                            <div>
                              <h4 className="text-slate-200 font-medium">{asset.name}</h4>
                              <p className="text-slate-400 text-xs">{asset.balance} {asset.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-200 font-medium">{formatCurrency(asset.value)}</p>
                            <div className="flex items-center justify-end space-x-1">
                              {asset.change24h >= 0 ? (
                                <TrendingUp className="h-3 w-3 text-emerald-400" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-rose-400" />
                              )}
                              <span className={`text-xs ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {formatPercent(asset.change24h)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
      
      {/* Loans Card */}
      <motion.div
        layout
        initial="closed"
        animate={expandedLoans ? "open" : "closed"}
        variants={cardVariants}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <GlassCard className="overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setExpandedLoans(!expandedLoans)}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                <DollarSign className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">Loans</h3>
                <p className="text-slate-400 text-sm">{formatCurrency(totalLoanValue)}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedLoans ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {expandedLoans && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="space-y-2">
                    {loans.map((loan, index) => (
                      <motion.div
                        key={`${loan.protocol}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-slate-800/50 p-3 hover:bg-slate-800/30 transition-colors"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                              <CircleDollarSign className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="text-slate-200 font-medium">{loan.protocol}</h4>
                              <p className="text-slate-400 text-xs">{loan.amount}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-200 font-medium">{formatCurrency(loan.value)}</p>
                            <div className="flex items-center justify-end space-x-1">
                              <Percent className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-400">
                                {loan.interestRate.toFixed(2)}% APR
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-400">Collateral Ratio</span>
                            <span className="text-xs text-slate-400">{loan.collateralRatio.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-slate-800/50 rounded-full h-1.5">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${Math.min(loan.collateralRatio, 100)}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
      
      {/* Yields Card */}
      <motion.div
        layout
        initial="closed"
        animate={expandedYields ? "open" : "closed"}
        variants={cardVariants}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <GlassCard className="overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setExpandedYields(!expandedYields)}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <BarChart2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">Yields</h3>
                <p className="text-slate-400 text-sm">{formatCurrency(totalYieldValue)}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedYields ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {expandedYields && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="space-y-2">
                    {yields.map((yield_, index) => (
                      <motion.div
                        key={`${yield_.protocol}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-slate-800/50 p-3 hover:bg-slate-800/30 transition-colors"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                              <LineChart className="h-4 w-4 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-slate-200 font-medium">{yield_.protocol}</h4>
                              <p className="text-slate-400 text-xs">{yield_.amount} {yield_.asset}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-200 font-medium">{formatCurrency(yield_.value)}</p>
                            <div className="flex items-center justify-end space-x-1">
                              <TrendingUp className="h-3 w-3 text-emerald-400" />
                              <span className="text-xs text-emerald-400">
                                {yield_.apy.toFixed(2)}% APY
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
};
