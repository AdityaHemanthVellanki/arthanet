"use client";

import { motion } from 'framer-motion';

export default function BackedBy() {
  return (
    <section className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-60 h-60 bg-[var(--accent-blue)] opacity-5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Backed By <span className="text-gradient">Ecosystem Leaders</span>
          </h2>
          <p className="text-foreground/90 max-w-2xl mx-auto">
            Built by ecosystem experts for the decentralized future.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Partner logos - These would normally be actual partner logos */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-center">
              <div className="bg-card bg-opacity-60 border border-[var(--accent-blue)] border-opacity-20 rounded-lg p-4 w-full max-w-[180px] h-24 flex items-center justify-center">
                <div className="text-foreground/90 text-sm text-center font-medium">
                  {i === 0 ? "Built by Superteam contributor" : 
                   i === 1 ? "Backed by community" : 
                   "Ecosystem partner"}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
