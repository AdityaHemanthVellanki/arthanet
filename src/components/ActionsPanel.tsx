'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/animated/GlassCard';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { Input } from '@/components/ui/button';

export const ActionsPanel = () => {
  const { isConnected } = useAccount();
  const [activeModal, setActiveModal] = useState<'rebalance' | 'stake' | 'borrow' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleAction = async () => {
    if (!isConnected) return;
    
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setIsSuccess(true);
    } catch (error) {
      console.error('Action failed:', error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const closeModal = () => {
    setActiveModal(null);
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
  };
  
  const actions = [
    {
      id: 'rebalance',
      title: 'Rebalance Portfolio',
      description: 'Optimize your asset allocation',
      icon: BarChart3,
      color: 'bg-indigo-500/20',
      textColor: 'text-indigo-400',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'stake',
      title: 'Stake Assets',
      description: 'Earn yield on your assets',
      icon: TrendingUp,
      color: 'bg-emerald-500/20',
      textColor: 'text-emerald-400',
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      id: 'borrow',
      title: 'Borrow',
      description: 'Get a loan against your assets',
      icon: DollarSign,
      color: 'bg-blue-500/20',
      textColor: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-600',
    },
  ];
  
  return (
    <>
      <GlassCard>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-slate-200">Quick Actions</CardTitle>
          <CardDescription className="text-slate-400">Manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {actions.map((action, index) => (
            <motion.div 
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActiveModal(action.id as any)}
                disabled={!isConnected}
                className="w-full h-full text-left"
                aria-label={action.title}
              >
                <div className={`
                  p-4 rounded-lg border border-slate-800/50 
                  hover:bg-slate-800/30 transition-colors
                  ${!isConnected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}>
                  <div className="flex items-center">
                    <div className={`
                      h-10 w-10 rounded-full flex items-center justify-center mr-3
                      ${action.color}
                    `}>
                      <action.icon className={`h-5 w-5 ${action.textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-slate-200 font-medium">{action.title}</h3>
                      <p className="text-slate-400 text-sm">{action.description}</p>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </CardContent>
      </GlassCard>
      
      {/* Action Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.2 }}
              className="glass w-full max-w-md rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              {actions.filter(a => a.id === activeModal).map(action => (
                <div key={action.id}>
                  <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
                    <div className="flex items-center">
                      <div className={`
                        h-8 w-8 rounded-full flex items-center justify-center mr-3
                        ${action.color}
                      `}>
                        <action.icon className={`h-4 w-4 ${action.textColor}`} />
                      </div>
                      <h3 className="text-lg font-medium text-slate-200">{action.title}</h3>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {isSuccess ? (
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-medium text-slate-200 mb-2">Success!</h4>
                      <p className="text-slate-400 mb-6">
                        {action.id === 'rebalance' && 'Your portfolio has been rebalanced successfully.'}
                        {action.id === 'stake' && 'Your assets have been staked successfully.'}
                        {action.id === 'borrow' && 'Your loan has been approved successfully.'}
                      </p>
                      <Button
                        onClick={closeModal}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                      >
                        Close
                      </Button>
                    </div>
                  ) : isError ? (
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
                        <AlertCircle className="h-8 w-8 text-rose-400" />
                      </div>
                      <h4 className="text-xl font-medium text-slate-200 mb-2">Transaction Failed</h4>
                      <p className="text-slate-400 mb-6">
                        There was an error processing your request. Please try again.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          onClick={closeModal}
                          variant="outline"
                          className="bg-slate-800/50 border-slate-700/50"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAction}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      {action.id === 'rebalance' && (
                        <RebalanceForm 
                          onSubmit={handleAction} 
                          isSubmitting={isSubmitting} 
                          onCancel={closeModal}
                        />
                      )}
                      {action.id === 'stake' && (
                        <StakeForm 
                          onSubmit={handleAction} 
                          isSubmitting={isSubmitting} 
                          onCancel={closeModal}
                        />
                      )}
                      {action.id === 'borrow' && (
                        <BorrowForm 
                          onSubmit={handleAction} 
                          isSubmitting={isSubmitting} 
                          onCancel={closeModal}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Form Components
const RebalanceForm = ({ onSubmit, isSubmitting, onCancel }: { onSubmit: () => void, isSubmitting: boolean, onCancel: () => void }) => {
  return (
    <div className="space-y-4">
      <p className="text-slate-400 mb-4">
        Rebalance your portfolio to optimize for growth and risk management. Our AI algorithm will suggest the best allocation.
      </p>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-400">Current Risk Level</span>
          <span className="text-sm font-medium text-amber-400">Moderate</span>
        </div>
        <div className="w-full bg-slate-800/50 rounded-full h-2">
          <div className="bg-amber-500 h-2 rounded-full w-[60%]" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <button className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/50 transition-colors">
            Conservative
          </button>
          <button className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm">
            Moderate
          </button>
          <button className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/50 transition-colors">
            Aggressive
          </button>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          onClick={onCancel}
          variant="outline"
          className="bg-slate-800/50 border-slate-700/50"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
            />
          ) : (
            'Rebalance Portfolio'
          )}
        </Button>
      </div>
    </div>
  );
};

const StakeForm = ({ onSubmit, isSubmitting, onCancel }: { onSubmit: () => void, isSubmitting: boolean, onCancel: () => void }) => {
  return (
    <div className="space-y-4">
      <p className="text-slate-400 mb-4">
        Stake your assets to earn yield. Choose an asset and amount to stake.
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="asset" className="text-sm font-medium text-slate-300">
            Asset
          </label>
          <select
            id="asset"
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="eth">Ethereum (ETH)</option>
            <option value="usdc">USD Coin (USDC)</option>
            <option value="dai">Dai (DAI)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium text-slate-300">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              type="text"
              placeholder="0.0"
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button className="text-xs text-indigo-400 font-medium">MAX</button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-slate-800/30 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-400">Estimated APY</span>
            <span className="text-sm font-medium text-emerald-400">5.2%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Lock Period</span>
            <span className="text-sm font-medium text-slate-300">14 days</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          onClick={onCancel}
          variant="outline"
          className="bg-slate-800/50 border-slate-700/50"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-emerald-500 to-green-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
            />
          ) : (
            'Stake Assets'
          )}
        </Button>
      </div>
    </div>
  );
};

const BorrowForm = ({ onSubmit, isSubmitting, onCancel }: { onSubmit: () => void, isSubmitting: boolean, onCancel: () => void }) => {
  return (
    <div className="space-y-4">
      <p className="text-slate-400 mb-4">
        Borrow against your assets. Specify the loan amount and select collateral.
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="borrow-amount" className="text-sm font-medium text-slate-300">
            Borrow Amount
          </label>
          <div className="relative">
            <input
              id="borrow-amount"
              type="text"
              placeholder="0.0"
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs text-slate-400">USDC</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="collateral" className="text-sm font-medium text-slate-300">
            Collateral
          </label>
          <select
            id="collateral"
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="eth">Ethereum (ETH)</option>
            <option value="wbtc">Wrapped Bitcoin (WBTC)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="collateral-amount" className="text-sm font-medium text-slate-300">
            Collateral Amount
          </label>
          <div className="relative">
            <input
              id="collateral-amount"
              type="text"
              placeholder="0.0"
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button className="text-xs text-indigo-400 font-medium">MAX</button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-slate-800/30 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-400">Collateral Ratio</span>
            <span className="text-sm font-medium text-blue-400">150%</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-400">Interest Rate (APR)</span>
            <span className="text-sm font-medium text-slate-300">3.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Liquidation Threshold</span>
            <span className="text-sm font-medium text-rose-400">120%</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          onClick={onCancel}
          variant="outline"
          className="bg-slate-800/50 border-slate-700/50"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
            />
          ) : (
            'Borrow Now'
          )}
        </Button>
      </div>
    </div>
  );
};
