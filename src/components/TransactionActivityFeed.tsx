'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/animated/GlassCard';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  ExternalLink, 
  FileText,
  Filter
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { getTransactionHistory } from '@/lib/ethereumService';
import { Button } from '@/components/ui/button';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  gasUsed: string;
  isError: boolean;
}

export const TransactionActivityFeed = () => {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');
  const observerTarget = useRef(null);
  
  const loadTransactions = async (pageNum: number, append: boolean = false) => {
    if (!isConnected || !address) return;
    
    setLoading(true);
    try {
      const limit = 10;
      const offset = (pageNum - 1) * limit;
      const newTransactions = await getTransactionHistory(address, limit);
      
      if (newTransactions.length === 0) {
        setHasMore(false);
      } else {
        if (append) {
          setTransactions(prev => [...prev, ...newTransactions]);
        } else {
          setTransactions(newTransactions);
        }
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (isConnected && address) {
      loadTransactions(1);
    }
  }, [isConnected, address]);
  
  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
          loadTransactions(page + 1, true);
        }
      },
      { threshold: 1.0 }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [observerTarget, hasMore, loading, page]);
  
  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'sent' && tx.from.toLowerCase() === address?.toLowerCase()) return true;
    if (filter === 'received' && tx.to?.toLowerCase() === address?.toLowerCase()) return true;
    return false;
  });
  
  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // Format date for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (!isConnected) {
    return (
      <GlassCard>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-slate-200">Transaction Activity</CardTitle>
          <CardDescription className="text-slate-400">Connect your wallet to view transactions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-slate-600 mb-4" />
          <p className="text-slate-400 text-center max-w-md">
            Connect your wallet to view your transaction history and on-chain activity.
          </p>
        </CardContent>
      </GlassCard>
    );
  }
  
  return (
    <GlassCard>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-slate-200">Transaction Activity</CardTitle>
            <CardDescription className="text-slate-400">Your on-chain transactions</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter !== 'all' ? 'bg-slate-800/50 border-slate-700/50' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'sent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('sent')}
              className={filter !== 'sent' ? 'bg-slate-800/50 border-slate-700/50' : ''}
            >
              Sent
            </Button>
            <Button
              variant={filter === 'received' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('received')}
              className={filter !== 'received' ? 'bg-slate-800/50 border-slate-700/50' : ''}
            >
              Received
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 py-1">
        {loading && transactions.length === 0 ? (
          <div className="py-8 flex justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent"
            />
          </div>
        ) : (
          <>
            <AnimatePresence>
              {filteredTransactions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 flex flex-col items-center justify-center"
                >
                  <Filter className="h-12 w-12 text-slate-600 mb-4" />
                  <p className="text-slate-400 text-center">
                    No transactions found for the selected filter.
                  </p>
                </motion.div>
              ) : (
                <ul className="space-y-2 py-2">
                  {filteredTransactions.map((tx, index) => {
                    const isSender = tx.from.toLowerCase() === address?.toLowerCase();
                    
                    return (
                      <motion.li
                        key={tx.hash}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="px-2"
                      >
                        <a 
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <motion.div
                            whileHover={{ 
                              scale: 1.01,
                              backgroundColor: 'rgba(30, 41, 59, 0.3)'
                            }}
                            transition={{ duration: 0.2 }}
                            className={`
                              p-3 rounded-lg border 
                              ${tx.isError ? 'border-rose-800/50' : 'border-slate-800/50'}
                              ${tx.isError ? 'bg-rose-900/10' : 'hover:bg-slate-800/20'} 
                              transition-colors
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`
                                  h-10 w-10 rounded-full flex items-center justify-center mr-3
                                  ${isSender 
                                    ? 'bg-rose-500/20 text-rose-400' 
                                    : 'bg-emerald-500/20 text-emerald-400'
                                  }
                                `}>
                                  {isSender ? (
                                    <ArrowUpRight className="h-5 w-5" />
                                  ) : (
                                    <ArrowDownLeft className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-slate-200 font-medium flex items-center">
                                    {isSender ? 'Sent' : 'Received'}
                                    {tx.isError && (
                                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-rose-900/40 text-rose-400">
                                        Failed
                                      </span>
                                    )}
                                  </h4>
                                  <p className="text-slate-400 text-xs">
                                    {isSender 
                                      ? `To: ${formatAddress(tx.to)}`
                                      : `From: ${formatAddress(tx.from)}`
                                    }
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`
                                  font-medium
                                  ${tx.isError 
                                    ? 'text-slate-400' 
                                    : isSender 
                                      ? 'text-rose-400' 
                                      : 'text-emerald-400'
                                  }
                                `}>
                                  {isSender ? '-' : '+'}{tx.value} ETH
                                </p>
                                <div className="flex items-center justify-end text-xs text-slate-500 mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{formatDate(tx.timestamp)}</span>
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </AnimatePresence>
            
            {/* Infinite scroll observer element */}
            {hasMore && (
              <div ref={observerTarget} className="py-4 flex justify-center">
                {loading && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent"
                  />
                )}
              </div>
            )}
            
            {!hasMore && transactions.length > 0 && (
              <div className="py-3 text-center text-sm text-slate-500">
                No more transactions to load
              </div>
            )}
          </>
        )}
      </CardContent>
    </GlassCard>
  );
};
