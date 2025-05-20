'use client';

import { motion } from 'framer-motion';

// Step data
const steps = [
  {
    number: "1",
    title: "Connect Wallet",
    description: "Connect your Ethereum wallet to ArthaNet securely with just a few clicks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    )
  },
  {
    number: "2",
    title: "AI Analysis",
    description: "Our advanced AI algorithms analyze your on-chain transactions and DeFi history to generate an accurate credit score.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    )
  },
  {
    number: "3",
    title: "Access DeFi Benefits",
    description: "Use your ArthaNet score to access better rates, increased borrowing capacity, and specialized DeFi products across the ecosystem.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background" id="how-it-works">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto mb-20">
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-6 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            <p className="text-blue-500 font-medium">How It Works</p>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            How ArthaNet Works
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our decentralized credit scoring platform uses AI to analyze blockchain data and provide valuable DeFi insights.
          </motion.p>
        </div>

        {/* Steps with progress line */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress line */}
          <div className="absolute left-[28px] top-10 bottom-10 w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/20 hidden md:block"></div>
          
          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Step number with circle */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="bg-gradient-to-br from-background to-background/90 border border-border/40 rounded-xl p-6 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 mr-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-foreground/70">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
