'use client';

import { motion } from 'framer-motion';
;

// Step data
const steps = [
  {
    number: "01",
    title: "Connect Wallet",
    description: "Simply connect your Ethereum wallet to get started. All data remains secure and private.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    )
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI analyzes your historical on-chain activity across DeFi protocols to build your credit profile.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Get Your Score & Insights",
    description: "Receive your real-time credit score with detailed insights and personalized DeFi recommendations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    )
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 relative" id="how-it-works">
      {/* Background accent */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--accent-purple)] opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">How</span> <span className="text-gradient">ArthaNet</span> <span className="text-foreground">Works</span>
          </h2>
          <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
            Simple, secure, and seamless credit scoring for Web3 users.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Connection line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 right-0 w-full h-0.5 bg-gradient-to-r from-[var(--accent-blue)] to-transparent z-0"></div>
              )}
              
              <div className="bg-card bg-opacity-60 p-8 rounded-xl backdrop-blur-sm border border-[var(--accent-blue)] border-opacity-20 hover:border-opacity-40 transition-all relative z-10">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-foreground font-mono font-bold">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="bg-[var(--primary)] p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 text-primary/90">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-foreground/90">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a href="#waitlist" className="btn-primary inline-flex items-center">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
