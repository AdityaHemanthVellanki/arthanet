'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, Shield, Wallet, BarChart3, History } from 'lucide-react';

export default function Dashboard() {
  const [creditScore, setCreditScore] = useState(720);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-500';
    if (score >= 650) return 'text-blue-500';
    if (score >= 550) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const recentTransactions = [
    { id: 1, type: 'Loan Repayment', amount: '+25 points', date: '2025-05-20' },
    { id: 2, type: 'Credit Utilization', amount: '+10 points', date: '2025-05-15' },
    { id: 3, type: 'New Credit Line', amount: '-5 points', date: '2025-05-10' },
    { id: 4, type: 'On-time Payment', amount: '+15 points', date: '2025-05-05' },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Credit Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Credit Score</CardTitle>
            <CardDescription>Your decentralized credit rating</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <span className={`text-5xl font-bold ${getScoreColor(creditScore)}`}>{creditScore}</span>
                    <p className="text-sm mt-1">{getScoreLevel(creditScore)}</p>
                  </div>
                </div>
                <Progress value={(creditScore / 850) * 100} className="mt-4" />
                <div className="flex justify-between text-xs mt-1">
                  <span>300</span>
                  <span>850</span>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" size="sm" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Score Details
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Credit Factors</CardTitle>
            <CardDescription>What's affecting your score</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Payment History</span>
                    <span className="text-green-500">Excellent</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit Utilization</span>
                    <span className="text-blue-500">Good</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credit Age</span>
                    <span className="text-yellow-500">Fair</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" size="sm" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Factors
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Wallet Status</CardTitle>
            <CardDescription>Your blockchain activity</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Connected Wallet</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">Ethereum</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Address</span>
                  <span className="text-xs font-mono">0x71C...3E2F</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Transactions</span>
                  <span className="text-xs">142 verified</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" size="sm" className="w-full">
              <Wallet className="h-4 w-4 mr-2" />
              Manage Wallet
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="history">Score History</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Score History</CardTitle>
              <CardDescription>How your score has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Score history chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Score Changes</CardTitle>
              <CardDescription>Factors affecting your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className={transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <History className="h-4 w-4 mr-2" />
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Improve Your Score</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    Reduce Credit Utilization
                    <ArrowUpRight className="h-4 w-4 ml-1 text-blue-500" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try to keep your credit utilization below 30% to improve your score.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    Maintain Payment Schedule
                    <ArrowUpRight className="h-4 w-4 ml-1 text-blue-500" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue making on-time payments to strengthen your payment history.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    Connect Additional Wallets
                    <ArrowUpRight className="h-4 w-4 ml-1 text-blue-500" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Link more blockchain wallets to provide a more comprehensive view of your financial activity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
