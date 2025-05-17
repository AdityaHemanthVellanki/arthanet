"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulating API call to waitlist service
    // In production, you would connect this to Airtable/Notion/Firebase
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 relative" id="waitlist">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--primary-dark)] opacity-60 z-0"></div>
      <div className="absolute -top-40 left-1/3 w-80 h-80 bg-[var(--accent-purple)] opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] p-1 rounded-2xl glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[var(--primary-dark)] bg-opacity-90 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join the <span className="text-gradient">ArthaNet</span> Waitlist
                </h2>
                <p className="text-foreground/90 max-w-2xl mx-auto">
                  Be among the first to access our AI-powered decentralized credit scoring platform and shape the future of DeFi.
                </p>
              </div>
              
              <div className="max-w-md mx-auto">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                      <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                      <input
                        id="waitlist-email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--primary)] bg-opacity-50 border border-[var(--accent-blue)] border-opacity-30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="btn-primary w-full py-3 text-lg font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Get Early Access'
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[var(--primary)] bg-opacity-30 p-8 rounded-lg border border-green-500 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 bg-opacity-20 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Thank you for joining!</h3>
                    <p className="text-foreground/90">
                      We've added you to our waitlist. We'll notify you when ArthaNet launches.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-primary hover:text-primary/80 transition-colors"
                    >
                      Add another email
                    </button>
                  </motion.div>
                )}
                
                <p className="text-sm text-foreground/80 text-center mt-4">
                  By joining the waitlist, you agree to receive updates about ArthaNet. We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
