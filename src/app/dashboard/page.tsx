'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, Wallet, ArrowUpRight, Clock, CreditCard, 
  TrendingUp, TrendingDown, AlertCircle, ExternalLink, 
  BarChart3, History, ChevronRight, Info, Plus,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { useAccount } from 'wagmi';

// Import our custom components
import { CreditScoreGauge } from '@/components/CreditScoreGauge';
import { PortfolioCards } from '@/components/PortfolioCards';
import { TransactionActivityFeed } from '@/components/TransactionActivityFeed';
import { ActionsPanel } from '@/components/ActionsPanel';
import { CreditFactorAnalysis } from '@/components/CreditFactorAnalysis';
import { GlassCard } from '@/components/animated/GlassCard';
import { AnimatedCard } from '@/components/animated/AnimatedCard';
import { BackdropBlur } from '@/components/animated/BackdropBlur';
import { DashboardHeader } from '@/components/animated/DashboardHeader';

// Import services
import { getWalletAnalysis } from '@/lib/ethereumService';
import { analyzeWalletForCreditScore, CreditScoreData, CreditFactor } from '@/lib/openaiService';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Wallet data state
  const [walletData, setWalletData] = useState<any>(null);
  
  // Credit score state
  const [creditScoreData, setCreditScoreData] = useState<CreditScoreData | null>(null);
  
  // Portfolio data state
  const [assets, setAssets] = useState<any[]>([
    { symbol: 'ETH', name: 'Ethereum', balance: '1.25', value: 3750, change24h: 2.5 },
    { symbol: 'USDC', name: 'USD Coin', balance: '2500.00', value: 2500, change24h: 0.1 },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.05', value: 3000, change24h: -1.2 },
    { symbol: 'AAVE', name: 'Aave', balance: '10.00', value: 800, change24h: 5.7 },
  ]);
  
  const [loans, setLoans] = useState<any[]>([
    { protocol: 'Aave', amount: '1000 USDC', value: 1000, interestRate: 2.5, collateralRatio: 180 },
    { protocol: 'Compound', amount: '0.5 ETH', value: 1500, interestRate: 3.2, collateralRatio: 150 },
  ]);
  
  const [yields, setYields] = useState<any[]>([
    { protocol: 'Lido', asset: 'ETH', amount: '0.5', value: 1500, apy: 3.8 },
    { protocol: 'Aave', asset: 'USDC', amount: '1000', value: 1000, apy: 2.5 },
  ]);
  
  // Refresh data function
  const refreshData = async () => {
    if (!isConnected || !address) return;
    
    setRefreshing(true);
    try {
      // Fetch wallet data
      const walletAnalysis = await getWalletAnalysis(address);
      setWalletData(walletAnalysis);
      
      // Generate credit score using OpenAI
      const creditScore = await analyzeWalletForCreditScore(
        address,
        walletAnalysis.transactions,
        {
          eth: walletAnalysis.ethBalance,
          tokens: walletAnalysis.tokenBalances
        }
      );
      
      setCreditScoreData(creditScore);
      
      // Update assets (in a real app, this would come from the wallet analysis)
      // This is sample data for demonstration
      if (walletAnalysis.transactions.length > 0) {
        // We'd extract real token balances here
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Fetch data on component mount or when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      setLoading(true);
      refreshData();
    }
  }, [isConnected, address]);

  // Show a message if not connected
  const renderConnectWalletMessage = () => {
    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-20 w-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
            <Wallet className="h-10 w-10 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-3">Connect Your Wallet</h2>
          <p className="text-slate-400 max-w-md mb-6">
            Connect your Ethereum wallet to view your personalized dashboard with real-time credit score, portfolio analysis, and recommendations.
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Refresh button component
  const RefreshButton = () => (
    <Button
      variant="outline"
      size="sm"
      className="bg-slate-800/50 border-slate-700/50 text-slate-300 ml-auto flex items-center"
      onClick={refreshData}
      disabled={refreshing || !isConnected}
    >
      {refreshing ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mr-2 h-4 w-4 rounded-full border-2 border-slate-300 border-t-transparent"
        />
      ) : (
        <RefreshCw className="mr-2 h-4 w-4" />
      )}
      Refresh Data
    </Button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 dashboard-bg">
      {/* Modern Dashboard Header - the only navigation element */}
      <DashboardHeader />
      
      {/* Main Content */}
      <BackdropBlur className="py-8">
        <div className="container mx-auto px-4">
          {/* Title and Refresh Button Section */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block">Your Credit Dashboard</h1>
              <p className="text-slate-400 mt-2">Track and improve your decentralized credit score</p>
            </motion.div>
            
            {isConnected && <RefreshButton />}
          </div>
          
          {/* Connect Wallet Message */}
          {renderConnectWalletMessage()}
          
          {!isConnected ? null : (
            <>
              {/* Credit Score Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Credit Score Gauge */}
                <div className="col-span-1">
                  <CreditScoreGauge 
                    score={creditScoreData?.score || 720}
                    previousScore={creditScoreData?.previousScore || 700}
                    loading={loading}
                    onInfoClick={() => setActiveTab('factors')}
                  />
                </div>
                
                {/* Portfolio Cards */}
                <div className="col-span-1 lg:col-span-2">
                  <PortfolioCards 
                    assets={assets}
                    loans={loans}
                    yields={yields}
                    loading={loading}
                  />
                </div>
              </div>
            </>
          )}
            
          {!isConnected ? null : (
            <>
              {/* Tabs Section */}
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-3 h-auto bg-slate-900/50 border border-slate-800/50">
                  <TabsTrigger value="overview" className="py-3 data-[state=active]:bg-slate-800/50">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="py-3 data-[state=active]:bg-slate-800/50">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="factors" className="py-3 data-[state=active]:bg-slate-800/50">
                    Factors
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Actions Panel */}
                    <ActionsPanel />
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
          </TabsContent>
          
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