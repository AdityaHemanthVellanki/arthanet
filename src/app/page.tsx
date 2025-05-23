'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Shield, ChartBar, LockKeyhole } from 'lucide-react';

// Import components with SSR disabled where needed
const WorklyHero = dynamic(() => import('@/components/WorklyHero'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Footer = dynamic(() => import('@/components/Footer'));
const AppIntegrations = dynamic(() => import('@/components/AppIntegrations'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Decentralized Credit Scoring for the Web3 Economy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                ArthaNet provides transparent, secure, and user-controlled credit scoring using blockchain data. Take control of your financial identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/connect">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Connect Wallet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Credit Score
                  </div>
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex justify-center items-center h-40">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-500">720</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Good</div>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <ChartBar className="h-5 w-5 text-blue-500" />
                    <div className="text-sm">Transparent scoring</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <LockKeyhole className="h-5 w-5 text-blue-500" />
                    <div className="text-sm">Your data stays private</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
