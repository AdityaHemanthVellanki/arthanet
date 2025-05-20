'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-500/10 to-purple-600/5 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-b from-background via-background/95 to-background/90 border border-border/40 rounded-3xl p-8 md:p-14 shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1 text-center md:text-left">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Ready to Get Started?
                </motion.h2>
                <motion.p 
                  className="text-lg text-foreground/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Join our waitlist to be one of the first to experience ArthaNet.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Button 
                  onClick={() => {
                    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-600/30 text-lg h-auto w-full md:w-auto"
                >
                  Join Waitlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
