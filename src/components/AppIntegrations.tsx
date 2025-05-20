'use client';

import { motion } from 'framer-motion';

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
                  <p className="text-foreground/70 text-sm">ArthaNet&apos;s scoring system is fully compatible with smart contracts for on-chain verification.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Integration icons grid */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Lending and Borrowing Protocols Integration Visualization */}
            <div className="bg-background/30 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-lg relative overflow-hidden">
              {/* Main Title */}
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-1">DeFi Protocol Integration</h4>
                <p className="text-sm text-foreground/70">Your ArthaNet Score opens doors across the DeFi ecosystem</p>
              </div>
              
              {/* Central Node - ArthaNet */}
              <div className="flex justify-center mb-8">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
                  <span className="font-bold text-white text-xl">A</span>
                </div>
              </div>
              
              {/* Connection Lines - These create the network effect */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  className="absolute h-px bg-gradient-to-r from-blue-400/50 to-transparent" 
                  style={{ top: '50%', left: '50%', width: '30%', transform: 'rotate(45deg) translateY(-50%)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute h-px bg-gradient-to-r from-blue-400/50 to-transparent" 
                  style={{ top: '50%', left: '50%', width: '35%', transform: 'rotate(135deg) translateY(-50%)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <motion.div 
                  className="absolute h-px bg-gradient-to-r from-purple-400/50 to-transparent" 
                  style={{ top: '50%', left: '50%', width: '28%', transform: 'rotate(225deg) translateY(-50%)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                <motion.div 
                  className="absolute h-px bg-gradient-to-r from-purple-400/50 to-transparent" 
                  style={{ top: '50%', left: '50%', width: '32%', transform: 'rotate(315deg) translateY(-50%)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
              
              {/* Protocol Nodes - These represent different lending/borrowing protocols */}
              <div className="flex flex-wrap justify-around">
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2">
                    <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Lending</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-2">
                    <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Borrowing</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-2">
                    <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Insurance</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="h-12 w-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-2">
                    <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Flash Loans</span>
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
