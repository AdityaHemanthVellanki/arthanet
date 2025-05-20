'use client';

import { motion } from 'framer-motion';

// Feature card animation variants
const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8
    }
  }
};

// Features data
const features = [
  {
    title: "AI-Powered Credit Scores",
    description: "Advanced machine learning algorithms analyze on-chain data to generate accurate credit scores for DeFi users.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  },
  {
    title: "Decentralized Infrastructure",
    description: "Fully on-chain architecture ensures transparency and immutability of credit data across the Web3 ecosystem.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    )
  },
  {
    title: "Multi-Chain Support",
    description: "Comprehensive credit scoring across Ethereum, Polygon, Arbitrum and other leading blockchain networks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    )
  },
  {
    title: "Ethereum-native & Composable",
    description: "Fully integrated with Ethereum ecosystem, ArthaNet works seamlessly with your favorite DeFi protocols and wallets.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    )
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Decentralized Credit<br/>
            <span className="mt-2 inline-block">For a Trustless World</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-foreground/70 mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ArthaNet provides transparent and decentralized credit scoring for DeFi users and protocols across blockchains.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl border border-border/40 hover:border-primary/30 bg-gradient-to-b from-background/80 to-background hover:shadow-xl transition-all duration-300 group overflow-hidden"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 text-blue-500 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-500 transition-colors duration-300">{feature.title}</h3>
                <p className="text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}  
        </div>
        
        {/* App dashboard preview */}
        <motion.div
          className="mt-24 relative rounded-2xl overflow-hidden shadow-2xl border border-border/40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none opacity-70"></div>
          <img 
            src="/dashboard-large.png" 
            alt="ArthaNet Dashboard" 
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x600/0a0a0a/6366f1?text=ArthaNet+Dashboard';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
