'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Shield, ArrowRight, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConnectWallet() {
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wallets = [
    { id: 'metamask', name: 'MetaMask', icon: '🦊' },
    { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: '📱' },
    { id: 'phantom', name: 'Phantom', icon: '👻' }
  ];

  const handleSelectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleConnect = async () => {
    if (!selectedWallet) return;
    
    setIsConnecting(true);
    setError(null);
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would use actual wallet connection logic
      if (Math.random() > 0.2) { // 80% success rate for demo
        setIsConnected(true);
        setStep(2);
      } else {
        throw new Error('Connection failed');
      }
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleContinue = () => {
    // In a real app, this would redirect to the dashboard with the connected wallet
    window.location.href = '/dashboard';
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">Connect Your Wallet</h1>
      
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to access your decentralized credit score
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div className="space-y-3">
              {wallets.map(wallet => (
                <button
                  key={wallet.id}
                  className={`w-full p-4 flex items-center justify-between border rounded-lg hover:bg-muted/50 transition-colors ${
                    selectedWallet === wallet.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleSelectWallet(wallet.id)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{wallet.icon}</span>
                    <span>{wallet.name}</span>
                  </div>
                  {selectedWallet === wallet.id && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              disabled={!selectedWallet || isConnecting}
              onClick={handleConnect}
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By connecting your wallet, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
      
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Wallet Connected</CardTitle>
            <CardDescription>
              Your wallet has been successfully connected
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-medium text-lg mb-1">Connection Successful</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Your wallet is now connected to ArthaNet
            </p>
            
            <div className="w-full p-3 bg-muted rounded-md flex items-center justify-between mb-4">
              <span className="text-sm font-mono">0x71C...3E2F</span>
              <Shield className="h-4 w-4 text-blue-500" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleContinue}>
              Continue to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
