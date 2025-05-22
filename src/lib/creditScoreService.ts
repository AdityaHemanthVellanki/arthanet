// This is a mock service that simulates how a decentralized credit scoring system might work
// In a real application, this would interact with blockchain data and smart contracts

export interface CreditFactor {
  name: string;
  score: number;
  weight: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: string;
  date: string;
  impact: number;
}

export interface CreditScoreData {
  score: number;
  previousScore: number;
  factors: CreditFactor[];
  transactions: Transaction[];
  recommendations: string[];
  lastUpdated: string;
}

// Helper function to get status based on score
const getStatus = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (score >= 90) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'fair';
  return 'poor';
};

// Mock data for a user's credit factors
const mockCreditFactors: CreditFactor[] = [
  {
    name: 'Payment History',
    score: 92,
    weight: 0.35,
    status: 'excellent',
    description: 'Your history of making payments on time'
  },
  {
    name: 'Credit Utilization',
    score: 78,
    weight: 0.30,
    status: 'good',
    description: 'How much of your available credit you are using'
  },
  {
    name: 'Credit Age',
    score: 65,
    weight: 0.15,
    status: 'fair',
    description: 'The average age of your credit accounts'
  },
  {
    name: 'Account Diversity',
    score: 82,
    weight: 0.10,
    status: 'good',
    description: 'The variety of credit accounts you maintain'
  },
  {
    name: 'Recent Applications',
    score: 88,
    weight: 0.10,
    status: 'good',
    description: 'Recent applications for new credit'
  }
];

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Loan Repayment',
    amount: '+25 points',
    date: '2025-05-20',
    impact: 25
  },
  {
    id: '2',
    type: 'Credit Utilization',
    amount: '+10 points',
    date: '2025-05-15',
    impact: 10
  },
  {
    id: '3',
    type: 'New Credit Line',
    amount: '-5 points',
    date: '2025-05-10',
    impact: -5
  },
  {
    id: '4',
    type: 'On-time Payment',
    amount: '+15 points',
    date: '2025-05-05',
    impact: 15
  },
  {
    id: '5',
    type: 'Credit Inquiry',
    amount: '-2 points',
    date: '2025-04-28',
    impact: -2
  },
  {
    id: '6',
    type: 'Account Age Increase',
    amount: '+3 points',
    date: '2025-04-20',
    impact: 3
  }
];

// Mock recommendations based on credit factors
const generateRecommendations = (factors: CreditFactor[]): string[] => {
  const recommendations: string[] = [];
  
  // Find the lowest scoring factors
  const sortedFactors = [...factors].sort((a, b) => a.score - b.score);
  const lowestFactor = sortedFactors[0];
  
  // Generate recommendations based on the lowest factor
  switch (lowestFactor.name) {
    case 'Payment History':
      recommendations.push('Set up automatic payments to avoid missing due dates');
      recommendations.push('Catch up on any past-due accounts as soon as possible');
      break;
    case 'Credit Utilization':
      recommendations.push('Try to keep your credit utilization below 30% to improve your score');
      recommendations.push('Consider requesting a credit limit increase to lower your utilization ratio');
      break;
    case 'Credit Age':
      recommendations.push('Keep your oldest accounts open to maintain a longer credit history');
      recommendations.push('Avoid opening too many new accounts in a short period');
      break;
    case 'Account Diversity':
      recommendations.push('Consider diversifying your credit mix with different types of accounts');
      recommendations.push('A healthy mix of revolving credit and installment loans can improve your score');
      break;
    case 'Recent Applications':
      recommendations.push('Limit new credit applications to avoid hard inquiries on your report');
      recommendations.push('Space out credit applications by at least 6 months when possible');
      break;
    default:
      recommendations.push('Continue maintaining good credit habits');
  }
  
  // Add a general recommendation
  recommendations.push('Connect additional wallets to provide a more comprehensive view of your financial activity');
  
  return recommendations;
};

// Calculate the overall credit score based on factors
const calculateCreditScore = (factors: CreditFactor[]): number => {
  return Math.round(
    factors.reduce((total, factor) => {
      return total + factor.score * factor.weight;
    }, 0)
  );
};

// Get a user's credit score data
export const getUserCreditScore = async (walletAddress?: string): Promise<CreditScoreData> => {
  // In a real app, this would fetch data from blockchain or API
  // For now, we'll just use our mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const currentScore = calculateCreditScore(mockCreditFactors);
  
  // Generate a slightly different previous score
  const previousScore = currentScore - 8;
  
  return {
    score: currentScore,
    previousScore,
    factors: mockCreditFactors,
    transactions: mockTransactions,
    recommendations: generateRecommendations(mockCreditFactors),
    lastUpdated: new Date().toISOString()
  };
};

// Get historical credit score data for charts
export const getCreditScoreHistory = async (walletAddress?: string, months: number = 12): Promise<{date: string; score: number}[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const currentScore = calculateCreditScore(mockCreditFactors);
  const history: {date: string; score: number}[] = [];
  
  // Generate mock historical data
  const today = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    
    // Create some variation in the scores
    const randomVariation = Math.floor(Math.random() * 20) - 10;
    const historicalScore = Math.max(300, Math.min(850, currentScore - 30 + i * 3 + randomVariation));
    
    history.push({
      date: date.toISOString().split('T')[0],
      score: historicalScore
    });
  }
  
  return history;
};
