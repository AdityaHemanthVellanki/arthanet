'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, AlertCircle } from 'lucide-react';

type WalletType = 'Ethereum' | 'Polygon' | 'Solana' | null;

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async (type: WalletType) => {
    setError(null);
    
    try {
      // This is a mock implementation
      // In a real app, you would use libraries like ethers.js, web3.js, or wallet adapters
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful connection
      setConnected(true);
      setWalletType(type);
      
      // Generate a mock wallet address based on type
      const mockAddresses = {
        Ethereum: '0x71C...3E2F',
        Polygon: '0x89D...4A1B',
        Solana: 'CuieV...Rp2Z'
      };
      
      setWalletAddress(type ? mockAddresses[type] : null);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet. Please try again.');
      setConnected(false);
      setWalletType(null);
      setWalletAddress(null);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletType(null);
    setWalletAddress(null);
    setError(null);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Wallet Connection</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {connected ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connected Wallet</span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
              {walletType}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Address</span>
            <span className="text-xs font-mono">{walletAddress}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start" 
            onClick={() => connectWallet('Ethereum')}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Ethereum Wallet
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start" 
            onClick={() => connectWallet('Polygon')}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Polygon Wallet
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start" 
            onClick={() => connectWallet('Solana')}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Solana Wallet
          </Button>
        </div>
      )}
    </div>
  );
}
