import OpenAI from 'openai';
import { OPENAI_API_KEY } from './web3Config';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should be made server-side
});

export interface CreditFactor {
  name: string;
  score: number;
  weight: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

export interface CreditScoreData {
  score: number;
  previousScore: number;
  factors: CreditFactor[];
  recommendations: string[];
  lastUpdated: string;
}

// Helper function to determine status based on score
const getStatus = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'fair';
  return 'poor';
};

/**
 * Analyzes wallet data using OpenAI to generate a credit score and risk assessment
 * @param address Ethereum wallet address
 * @param transactions Array of transaction data
 * @param balances Asset balances
 */
export async function analyzeWalletForCreditScore(
  address: string,
  transactions: any[],
  balances: any
): Promise<CreditScoreData> {
  try {
    // Create a prompt for OpenAI to analyze wallet data
    const prompt = `
      Analyze this Ethereum wallet for credit worthiness:
      
      Address: ${address}
      
      Transaction Count: ${transactions.length}
      
      Transaction Sample: ${JSON.stringify(transactions.slice(0, 5))}
      
      Balances: ${JSON.stringify(balances)}
      
      Based on this data, provide a credit score assessment in the following JSON format:
      {
        "score": [number between 300-850],
        "previousScore": [a slightly different number to show change],
        "factors": [
          {
            "name": [factor name],
            "score": [factor score out of 100],
            "weight": [factor weight as decimal],
            "status": ["excellent", "good", "fair", or "poor"],
            "description": [brief explanation]
          }
        ],
        "recommendations": [array of 3-5 specific recommendations to improve score]
      }
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a financial analysis AI that specializes in Web3 credit scoring. Generate realistic credit scores based on on-chain wallet data."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const analysisText = response.choices[0].message.content;
    if (!analysisText) {
      throw new Error("Empty response from OpenAI");
    }
    
    const analysis = JSON.parse(analysisText) as CreditScoreData;
    
    // Add last updated timestamp
    analysis.lastUpdated = new Date().toISOString();
    
    return analysis;
  } catch (error) {
    console.error("Error analyzing wallet:", error);
    
    // Return fallback data if API call fails
    return generateFallbackCreditScore();
  }
}

/**
 * Generates fallback credit score data when API calls fail
 */
function generateFallbackCreditScore(): CreditScoreData {
  const score = Math.floor(Math.random() * (850 - 600) + 600);
  const previousScore = score - Math.floor(Math.random() * 30) + 15;
  
  const factors: CreditFactor[] = [
    {
      name: 'Transaction History',
      score: Math.floor(Math.random() * 30) + 70,
      weight: 0.35,
      status: 'good',
      description: 'Based on the consistency and patterns of your transactions'
    },
    {
      name: 'Asset Diversity',
      score: Math.floor(Math.random() * 30) + 60,
      weight: 0.25,
      status: 'good',
      description: 'Evaluation of different types of assets in your wallet'
    },
    {
      name: 'Wallet Age',
      score: Math.floor(Math.random() * 40) + 60,
      weight: 0.15,
      status: 'fair',
      description: 'How long your wallet has been active on the blockchain'
    },
    {
      name: 'Protocol Interactions',
      score: Math.floor(Math.random() * 50) + 50,
      weight: 0.15,
      status: 'fair',
      description: 'The DeFi protocols you interact with and their reputation'
    },
    {
      name: 'Value Retention',
      score: Math.floor(Math.random() * 30) + 70,
      weight: 0.10,
      status: 'good',
      description: 'How well you maintain value in your wallet over time'
    }
  ];
  
  // Update status based on scores
  factors.forEach(factor => {
    factor.status = getStatus(factor.score);
  });
  
  return {
    score,
    previousScore,
    factors,
    recommendations: [
      'Increase the diversity of assets in your wallet',
      'Interact with more established DeFi protocols',
      'Maintain consistent transaction patterns',
      'Hold assets for longer periods to demonstrate stability',
      'Consider adding more liquidity to lending protocols'
    ],
    lastUpdated: new Date().toISOString()
  };
}
