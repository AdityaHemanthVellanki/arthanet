'use client';

import { motion } from 'framer-motion';

const blockchainIcons = [
  // Row 1
  { name: 'Ethereum', icon: 'E', color: 'bg-blue-600' },
  { name: 'Polygon', icon: 'P', color: 'bg-purple-600' },
  { name: 'Arbitrum', icon: 'A', color: 'bg-blue-500' },
  { name: 'Optimism', icon: 'O', color: 'bg-red-500' },
  { name: 'Avalanche', icon: 'A', color: 'bg-red-600' },
  
  // Row 2
  { name: 'Aave', icon: 'A', color: 'bg-purple-800' },
  { name: 'Compound', icon: 'C', color: 'bg-green-600' },
  { name: 'MakerDAO', icon: 'M', color: 'bg-teal-600' },
  { name: 'Uniswap', icon: 'U', color: 'bg-pink-500' },
  { name: 'Chainlink', icon: 'C', color: 'bg-blue-700' },
];

export default function AppIntegrations() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/5 to-purple-500/5 blur-3xl opacity-60" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Blockchain Ecosystem</h2>
            <p className="text-lg text-foreground/70 mb-8">
              ArthaNet works seamlessly with leading blockchains and DeFi protocols across the Web3 ecosystem.
            </p>
            
            {/* Feature points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium mb-1">Multi-chain Support</h4>
                  <p className="text-foreground/70 text-sm">ArthaNet provides credit scoring across multiple blockchains for a unified Web3 profile.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium mb-1">DeFi Protocol Integration</h4>
                  <p className="text-foreground/70 text-sm">Seamlessly use your ArthaNet score with major lending and borrowing protocols.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium mb-1">Smart Contract Compatibility</h4>
                  <p className="text-foreground/70 text-sm">ArthaNet's scoring system is fully compatible with smart contracts for on-chain verification.</p>
                </div>
              </div>
            </div>
            
            <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
              Explore ecosystem
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
          
          {/* Integration icons grid */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Credit Score Visualization */}
            <div className="bg-background/30 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-lg">
              {/* Header with Wallet Address and Score */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Wallet</p>
                    <p className="text-sm font-medium">0x71c...93e2</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/60">Credit Score</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">785</p>
                </div>
              </div>
              
              {/* Credit Score Gauge */}
              <motion.div className="mb-6">
                <div className="h-3 w-full bg-foreground/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600" 
                    style={{ width: '78.5%' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '78.5%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-foreground/60">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </motion.div>
              
              {/* Credit Factors */}
              <div className="space-y-4">
                <motion.div 
                  className="p-3 rounded-lg border border-border/30 bg-background/50"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center mr-2">
                        <svg className="h-3 w-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">DeFi Activity Score</span>
                    </div>
                    <span className="text-sm font-medium">92/100</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-3 rounded-lg border border-border/30 bg-background/50"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center mr-2">
                        <svg className="h-3 w-3 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Wallet Age</span>
                    </div>
                    <span className="text-sm font-medium">3.2 years</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
