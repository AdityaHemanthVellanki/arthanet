'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Wallet, ArrowUpRight, Clock, CreditCard, 
  TrendingUp, TrendingDown, AlertCircle, ExternalLink, 
  BarChart3, History, ChevronRight, Info, Plus
} from 'lucide-react';
import Link from 'next/link';

// Import our custom components
import { CreditScoreChart } from '@/components/CreditScoreChart';
import { CircularProgress } from '@/components/animated/CircularProgress';
import { AnimatedCard } from '@/components/animated/AnimatedCard';
import { GlassCard } from '@/components/animated/GlassCard';
import { TrendIndicator } from '@/components/animated/TrendIndicator';
import { BackdropBlur } from '@/components/animated/BackdropBlur';
import { DashboardHeader } from '@/components/animated/DashboardHeader';
import { RecommendationCard } from '@/components/animated/RecommendationCard';

// Import the credit score service
import { getUserCreditScore, getCreditScoreHistory } from '@/lib/creditScoreService';

export default function Dashboard() {
  // State management
  const [creditScore, setCreditScore] = useState(720);
  const [previousScore, setPreviousScore] = useState(680);
  const [loading, setLoading] = useState(true);
  const [scoreHistory, setScoreHistory] = useState<{date: string; score: number}[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch credit score data
        const scoreData = await getUserCreditScore();
        setCreditScore(scoreData.score);
        setPreviousScore(scoreData.previousScore);
        
        // Fetch score history
        const history = await getCreditScoreHistory();
        setScoreHistory(history);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Score difference calculation
  const scoreDifference = creditScore - previousScore;

  // Mock data for transactions
  const recentTransactions = [
    { id: 1, type: 'Loan Repayment', amount: '+25 points', date: '2025-05-20' },
    { id: 2, type: 'Credit Utilization', amount: '+10 points', date: '2025-05-15' },
    { id: 3, type: 'New Credit Line', amount: '-5 points', date: '2025-05-10' },
    { id: 4, type: 'On-time Payment', amount: '+15 points', date: '2025-05-05' },
  ];

  // Mock data for recommendations
  const recommendations = [
    { 
      id: 1, 
      title: 'Reduce Credit Utilization', 
      description: 'Keep your credit card balances below 30% of your available credit.',
      impact: 'High Impact',
      icon: 'chart' as const
    },
    { 
      id: 2, 
      title: 'Maintain Payment Schedule', 
      description: 'Continue making on-time payments to build payment history.',
      impact: 'Medium Impact',
      icon: 'shield' as const
    },
    { 
      id: 3, 
      title: 'Connect Additional Wallets', 
      description: 'Link more blockchain wallets for a comprehensive view.',
      impact: 'Low Impact',
      icon: 'wallet' as const
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 dashboard-bg">
      {/* Modern Dashboard Header - the only navigation element */}
      <DashboardHeader />
      
      {/* Main Content */}
      <BackdropBlur className="py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block">Your Credit Dashboard</h1>
            <p className="text-slate-400 mt-2">Track and improve your decentralized credit score</p>
          </motion.div>
          
          {/* Credit Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Credit Score Card */}
            <GlassCard className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-slate-200">Credit Score</CardTitle>
                <CardDescription className="text-slate-400">Your decentralized credit rating</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                {loading ? (
                  <div className="h-48 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-10 w-10 rounded-full border-2 border-indigo-500 border-t-transparent"
                    />
                  </div>
                ) : (
                  <>
                    <CircularProgress score={creditScore} />
                    <div className="mt-4">
                      <TrendIndicator value={scoreDifference} />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/dashboard/score-details">
                  <Button variant="outline" className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-300">
                    <Info className="mr-2 h-4 w-4" />
                    Score Details
                  </Button>
                </Link>
              </CardFooter>
            </GlassCard>
            
            {/* Quick Stats Cards */}
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedCard delay={0.1}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-slate-200">Connected Wallets</CardTitle>
                  <CardDescription className="text-slate-400">Decentralized identifiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                        <Wallet className="h-5 w-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">2 Wallets Connected</p>
                        <p className="text-sm text-slate-400">Ethereum, Solana</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-300">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/connect" className="w-full">
                    <Button variant="outline" className="w-full bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-300">
                      Manage Connections
                    </Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>
              
              <AnimatedCard delay={0.2}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-slate-200">Activity Overview</CardTitle>
                  <CardDescription className="text-slate-400">Recent score changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTransactions.slice(0, 2).map((transaction) => (
                      <motion.div 
                        key={transaction.id} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + transaction.id * 0.1 }}
                        className="flex justify-between items-center border-b border-slate-800/50 pb-2"
                      >
                        <div>
                          <p className="font-medium text-slate-200">{transaction.type}</p>
                          <p className="text-xs text-slate-400">{transaction.date}</p>
                        </div>
                        <div className={transaction.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>
                          {transaction.amount}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="#transactions" className="w-full">
                    <Button 
                      variant="outline" 
                      className="w-full bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-300"
                      onClick={() => setActiveTab('transactions')}
                    >
                      <History className="mr-2 h-4 w-4" />
                      View All Activity
                    </Button>
                  </Link>
                </CardFooter>
              </AnimatedCard>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mt-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800/50">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-slate-800/80 data-[state=active]:text-indigo-400"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="transactions"
                  className="data-[state=active]:bg-slate-800/80 data-[state=active]:text-indigo-400"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="recommendations"
                  className="data-[state=active]:bg-slate-800/80 data-[state=active]:text-indigo-400"
                >
                  Recommendations
                </TabsTrigger>
              </TabsList>
            </motion.div>
            
            <TabsContent value="overview" className="mt-6">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-200">Credit Score History</CardTitle>
                  <CardDescription className="text-slate-400">Track your progress over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {loading ? (
                    <div className="h-full flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-10 w-10 rounded-full border-2 border-indigo-500 border-t-transparent"
                      />
                    </div>
                  ) : (
                    <CreditScoreChart data={scoreHistory} />
                  )}
                </CardContent>
              </GlassCard>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {recommendations.map((rec, index) => (
                  <RecommendationCard
                    key={rec.id}
                    title={rec.title}
                    description={rec.description}
                    impact={rec.impact}
                    icon={rec.icon}
                    delay={0.3 + index * 0.1}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-6">
              <GlassCard>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-200">Recent Score Changes</CardTitle>
                  <CardDescription className="text-slate-400">Factors affecting your credit score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction, index) => (
                      <motion.div 
                        key={transaction.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex justify-between items-center border-b border-slate-800/50 pb-4"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-slate-800/80 flex items-center justify-center mr-3">
                            {transaction.amount.startsWith('+') ? (
                              <TrendingUp className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-rose-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-200">{transaction.type}</p>
                            <p className="text-sm text-slate-400">{transaction.date}</p>
                          </div>
                        </div>
                        <div className={transaction.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400 font-medium'}>
                          {transaction.amount}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-300">
                    <History className="mr-2 h-4 w-4" />
                    Load More Transactions
                  </Button>
                </CardFooter>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-200">Credit Score Factors</CardTitle>
                    <CardDescription className="text-slate-400">Elements affecting your score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-300">Payment History</span>
                          <span className="text-sm font-medium text-indigo-400">Excellent</span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '92%' }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-300">Credit Utilization</span>
                          <span className="text-sm font-medium text-amber-400">Fair</span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '68%' }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-300">Credit Age</span>
                          <span className="text-sm font-medium text-blue-400">Good</span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-300">Credit Mix</span>
                          <span className="text-sm font-medium text-emerald-400">Excellent</span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '88%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </GlassCard>
                
                <div className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard
                      key={rec.id}
                      title={rec.title}
                      description={rec.description}
                      impact={rec.impact}
                      icon={rec.icon}
                      delay={0.2 + index * 0.1}
                    />
                  ))}
                  
                  <AnimatedCard delay={0.5}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-slate-200">Need Help?</CardTitle>
                      <CardDescription className="text-slate-400">Get personalized assistance</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <div className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                        <AlertCircle className="h-8 w-8 text-indigo-400" />
                      </div>
                      <p className="text-slate-300 mb-4">
                        Talk to our AI assistant to get personalized recommendations for improving your credit score.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90">
                        Get Personalized Advice
                      </Button>
                    </CardFooter>
                  </AnimatedCard>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </BackdropBlur>
    </div>
  );
}