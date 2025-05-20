'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals just getting started',
    features: [
      'Up to 3 projects',
      '1GB storage space',
      'Basic task management',
      'Standard support',
      '1 team member'
    ],
    cta: 'Get Started',
    highlight: false,
    periodLabel: 'forever'
  },
  {
    name: 'Pro',
    price: '$9',
    description: 'Ideal for professionals and small teams',
    features: [
      'Unlimited projects',
      '10GB storage space',
      'Advanced task management',
      'Priority support',
      'Up to 10 team members',
      'Analytics dashboard',
      'API access'
    ],
    cta: 'Start Free Trial',
    highlight: true,
    periodLabel: 'per user/month'
  },
  {
    name: 'Enterprise',
    price: '$19',
    description: 'For organizations requiring more power',
    features: [
      'Unlimited everything',
      '100GB storage space',
      'Custom integrations',
      '24/7 dedicated support',
      'Unlimited team members',
      'Advanced analytics',
      'Enhanced security',
      'Custom branding'
    ],
    cta: 'Contact Sales',
    highlight: false,
    periodLabel: 'per user/month'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-6 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            <p className="text-blue-500 font-medium">Plans Made for</p>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Teams of All Sizes
          </motion.h2>
          
          <motion.p
            className="text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find the perfect plan for your team&apos;s needs. All plans include a 14-day free trial.
          </motion.p>
        </div>
        
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl border ${plan.highlight ? 'border-blue-500/50' : 'border-border/50'} bg-background p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-foreground/60 text-sm ml-2">/{plan.periodLabel}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className={`mr-2 mt-1 flex-shrink-0 h-4 w-4 rounded-full ${plan.highlight ? 'bg-blue-500/20' : 'bg-foreground/10'} flex items-center justify-center`}>
                      <Check className={`h-3 w-3 ${plan.highlight ? 'text-blue-500' : 'text-foreground/50'}`} />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-lg font-medium ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-foreground/5 hover:bg-foreground/10 text-foreground'
                } transition-all duration-300`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ Teaser */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-2">Everything You Need to Know</h3>
          <p className="text-foreground/70 mb-6">Before Getting Started</p>
          
          {/* Accordion preview */}
          <div className="max-w-3xl mx-auto bg-background border border-border/30 rounded-xl shadow-sm">
            <div className="border-b border-border/30 p-5 flex items-center justify-between">
              <p className="font-medium">How long does it take to onboard my team?</p>
              <button className="h-6 w-6 rounded-full bg-foreground/5 flex items-center justify-center">
                <span className="text-foreground/70">+</span>
              </button>
            </div>
            <div className="p-5 flex items-center justify-between">
              <p className="font-medium">Is there a limit to how many team members I can add?</p>
              <button className="h-6 w-6 rounded-full bg-foreground/5 flex items-center justify-center">
                <span className="text-foreground/70">+</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
