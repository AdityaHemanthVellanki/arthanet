'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { CircularProgress } from '@/components/animated/CircularProgress';

// Import components with SSR disabled where needed
const Features = dynamic(() => import('@/components/Features'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-900/30 text-xs font-medium text-blue-400 mb-4">
                <span className="mr-1">DeFi</span> Decentralized Credit Scoring
              </div>
              <h1 className="text-5xl font-bold">
                <span className="text-white">Decentralized</span><br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Credit Scoring</span><br />
                <span className="text-white">For Web3</span>
              </h1>
              <p className="text-gray-400">
                ArthaNet offers AI-powered credit scoring on the blockchain, providing transparent risk assessment for DeFi protocols and users across Ethereum and other networks.
              </p>
              <div className="flex mt-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="pt-6 space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Ethereum & Layer 2 Support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                  <span className="text-gray-300">On-chain Verification</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                  <span className="text-gray-300">DeFi Protocol Integration</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">$</div>
                        <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ArthaNet Score</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-400">Blockchain Credit Profile</div>
                  <div className="border-t border-gray-800 my-2"></div>
                  <div className="flex justify-center">
                    <div className="relative w-48 h-48">
                      <CircularProgress percentage={92} size={192} strokeWidth={16} color="#4364F7">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-white">785</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">EXCELLENT</div>
                        </div>
                      </CircularProgress>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">DeFi Activity</span>
                      <span className="text-sm text-gray-300">92%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">Transaction History</span>
                      <span className="text-sm text-gray-300">85%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">Wallet Age</span>
                      <span className="text-sm text-gray-300">67%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 my-2"></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Connected Networks</div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-xs font-medium text-white">ETH</div>
                      <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-xs font-medium text-white">POL</div>
                      <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-xs font-medium text-white">ARB</div>
                      <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center text-xs font-medium text-white">OP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center text-gray-600 py-8">
        <p>Scroll to explore</p>
        <div className="flex justify-center mt-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
