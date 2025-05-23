'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Link from 'next/link';
import { getUserCreditScore, CreditFactor } from '@/lib/creditScoreService';

export default function ScoreDetails() {
  const [loading, setLoading] = useState(true);
  const [creditScore, setCreditScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [factors, setFactors] = useState<CreditFactor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserCreditScore();
        setCreditScore(data.score);
        setPreviousScore(data.previousScore);
        setFactors(data.factors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching credit score data:', error);
        setLoading(false);
      }
    };

    fetchData();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getScoreDifference = () => {
    const diff = creditScore - previousScore;
    if (diff > 0) {
      return (
        <div className="flex items-center text-green-500">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{diff} points</span>
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-red-500">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>{diff} points</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="h-4 w-4 mr-1" />
          <span>No change</span>
        </div>
      );
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Credit Score Details</h1>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Credit Score</CardTitle>
              <CardDescription>
                Current score and recent changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center mb-6 md:mb-0">
                  <div className={`text-6xl font-bold ${getScoreColor(creditScore)}`}>
                    {creditScore}
                  </div>
                  <p className="text-sm mt-1">{getScoreLevel(creditScore)}</p>
                  <div className="mt-2">{getScoreDifference()}</div>
                </div>

                <div className="w-full md:w-2/3">
                  <div className="mb-6">
                    <Progress value={(creditScore / 850) * 100} className="h-3" />
                    <div className="flex justify-between text-xs mt-1">
                      <span>300</span>
                      <span>850</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded bg-red-100 dark:bg-red-900/20">
                      <div>Poor</div>
                      <div>300-549</div>
                    </div>
                    <div className="p-2 rounded bg-yellow-100 dark:bg-yellow-900/20">
                      <div>Fair</div>
                      <div>550-649</div>
                    </div>
                    <div className="p-2 rounded bg-blue-100 dark:bg-blue-900/20">
                      <div>Good</div>
                      <div>650-749</div>
                    </div>
                    <div className="p-2 rounded bg-green-100 dark:bg-green-900/20">
                      <div>Excellent</div>
                      <div>750-850</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mb-4">Credit Score Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {factors.map((factor, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{factor.name}</CardTitle>
                    <span className={`text-sm font-medium ${getStatusColor(factor.status)}`}>
                      {factor.status.charAt(0).toUpperCase() + factor.status.slice(1)}
                    </span>
                  </div>
                  <CardDescription>{factor.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Impact on Score</span>
                      <span>{Math.round(factor.weight * 100)}%</span>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                  <div className="flex items-start mt-4 text-sm text-muted-foreground">
                    <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      {factor.name === 'Payment History' && 'Your history of on-time payments is a major factor in your credit score.'}
                      {factor.name === 'Credit Utilization' && 'This measures how much of your available credit you are using. Lower is better.'}
                      {factor.name === 'Credit Age' && 'The average age of your credit accounts. Older accounts can improve your score.'}
                      {factor.name === 'Account Diversity' && 'Having different types of credit accounts can positively impact your score.'}
                      {factor.name === 'Recent Applications' && 'Multiple credit applications in a short period can lower your score.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About Decentralized Credit Scoring</CardTitle>
              <CardDescription>
                How ArthaNet calculates your credit score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                ArthaNet uses blockchain data and smart contracts to create a decentralized credit scoring system that's transparent, secure, and user-controlled.
              </p>
              <p>
                Unlike traditional credit bureaus, our system analyzes your on-chain financial behavior, including transaction history, lending activities, and repayment patterns.
              </p>
              <p>
                Your data is never sold to third parties, and you maintain complete control over who can access your credit information.
              </p>
              <p className="font-medium">
                Key benefits of decentralized credit scoring:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Privacy-focused and user-controlled</li>
                <li>Resistant to centralized data breaches</li>
                <li>Transparent scoring methodology</li>
                <li>Global and borderless</li>
                <li>Inclusive for the underbanked</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More About Our Methodology
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </main>
  );
}
