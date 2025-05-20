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
            <div className="grid grid-cols-5 gap-4">
              {blockchainIcons.map((app, index) => (
                <motion.div
                  key={app.name}
                  className={`aspect-square rounded-xl ${app.color} bg-opacity-10 flex items-center justify-center relative overflow-hidden group cursor-pointer border border-border/30`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-10 h-10 rounded-lg ${app.color} flex items-center justify-center text-white font-medium`}>
                    {app.icon.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-white text-xs font-medium">{app.name}</p>
                  </div>
                </motion.div>
              ))}
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
