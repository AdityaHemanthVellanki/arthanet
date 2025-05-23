import { ethers } from 'ethers';
import { INFURA_API_KEY } from './web3Config';
import axios from 'axios';

// Initialize Ethereum provider
let provider: ethers.JsonRpcProvider;

/**
 * Initialize the Ethereum provider
 */
export function initializeProvider(chainId: number = 1) {
  try {
    // Use Infura as the provider
    const network = chainId === 1 ? 'mainnet' : 'sepolia';
    provider = new ethers.JsonRpcProvider(`https://${network}.infura.io/v3/${INFURA_API_KEY}`);
    return provider;
  } catch (error) {
    console.error('Failed to initialize Ethereum provider:', error);
    throw error;
  }
}

/**
 * Get the Ethereum provider, initializing if necessary
 */
export function getProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    initializeProvider();
  }
  return provider;
}

/**
 * Get the ETH balance for a wallet address
 * @param address Ethereum wallet address
 */
export async function getEthBalance(address: string): Promise<string> {
  try {
    const provider = getProvider();
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Failed to get ETH balance:', error);
    return '0.0';
  }
}

/**
 * Get transaction history for a wallet address
 * @param address Ethereum wallet address
 * @param limit Maximum number of transactions to return
 */
export async function getTransactionHistory(address: string, limit: number = 10): Promise<any[]> {
  try {
    // Use Etherscan API for transaction history (in production, you'd use your own API key)
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc`);
    
    if (response.data.status === '1') {
      return response.data.result.map((tx: any) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value),
        timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
        gasUsed: tx.gasUsed,
        isError: tx.isError === '1',
      }));
    } else {
      console.error('Etherscan API error:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Failed to get transaction history:', error);
    return [];
  }
}

/**
 * Get token balances for a wallet address
 * @param address Ethereum wallet address
 */
export async function getTokenBalances(address: string): Promise<any[]> {
  try {
    // Use Etherscan API for token balances
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokenbalance&address=${address}&tag=latest`);
    
    if (response.data.status === '1') {
      return response.data.result;
    } else {
      console.error('Etherscan API error:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Failed to get token balances:', error);
    return [];
  }
}

/**
 * Get wallet age in days
 * @param address Ethereum wallet address
 */
export async function getWalletAge(address: string): Promise<number> {
  try {
    const provider = getProvider();
    const txCount = await provider.getTransactionCount(address);
    
    if (txCount === 0) {
      return 0;
    }
    
    // Try to get the first transaction to determine wallet age
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc`);
    
    if (response.data.status === '1' && response.data.result.length > 0) {
      const firstTxTimestamp = parseInt(response.data.result[0].timeStamp) * 1000;
      const ageInMilliseconds = Date.now() - firstTxTimestamp;
      return Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24)); // Convert to days
    }
    
    return 0;
  } catch (error) {
    console.error('Failed to get wallet age:', error);
    return 0;
  }
}

/**
 * Calculate gas usage statistics
 * @param transactions Array of transactions
 */
export function calculateGasStatistics(transactions: any[]): { totalGasUsed: number, averageGasUsed: number } {
  if (!transactions || transactions.length === 0) {
    return { totalGasUsed: 0, averageGasUsed: 0 };
  }
  
  const totalGasUsed = transactions.reduce((total, tx) => total + parseInt(tx.gasUsed || '0'), 0);
  const averageGasUsed = totalGasUsed / transactions.length;
  
  return { totalGasUsed, averageGasUsed };
}

/**
 * Get full wallet analysis
 * @param address Ethereum wallet address
 */
export async function getWalletAnalysis(address: string): Promise<any> {
  try {
    // Get all wallet data in parallel
    const [ethBalance, transactions, tokenBalances, walletAge] = await Promise.all([
      getEthBalance(address),
      getTransactionHistory(address, 50),
      getTokenBalances(address),
      getWalletAge(address),
    ]);
    
    // Calculate gas statistics
    const gasStats = calculateGasStatistics(transactions);
    
    // Return complete wallet analysis
    return {
      address,
      ethBalance,
      tokenBalances,
      transactionCount: transactions.length,
      transactions,
      gasStats,
      walletAge,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to get wallet analysis:', error);
    throw error;
  }
}
