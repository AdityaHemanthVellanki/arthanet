'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

// Company logos for the testimonial section
const companies = [
  { name: 'Company 1', logo: '/placeholder-logo-1.svg' },
  { name: 'Company 2', logo: '/placeholder-logo-2.svg' },
  { name: 'Company 3', logo: '/placeholder-logo-3.svg' },
  { name: 'Company 4', logo: '/placeholder-logo-4.svg' },
  { name: 'Company 5', logo: '/placeholder-logo-5.svg' },
];

// Testimonial data
const testimonials = [
  {
    name: 'Sarah L.',
    role: 'UX Designer',
    company: 'Design Studio',
    avatar: '/avatars/avatar-1.png',
    quote: 'Teams That Switched to ArthaNet Don\'t Look Back',
    content: 'Switching to ArthaNet was a game-changer for our team. The unified workspace helped us consolidate our scattered tools.',
    rating: 5
  },
  {
    name: 'Mike T.',
    role: 'Product Manager',
    company: 'Tech Innovations',
    avatar: '/avatars/avatar-2.png',
    quote: 'Seamless Integration',
    content: 'The platform\'s integrations saved us hours of manual work every week. Our productivity has increased by 35% since we started using it.',
    rating: 5
  },
  {
    name: 'Alex K.',
    role: 'Team Lead',
    company: 'Creative Agency',
    avatar: '/avatars/avatar-3.png',
    quote: 'Easy to Manage',
    content: 'Managing our projects has never been easier. The intuitive interface makes onboarding new team members a breeze.',
    rating: 5
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 blur-3xl" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-20">
          <motion.div
            className="inline-flex items-center mb-6 rounded-full bg-green-500/10 px-3 py-1 border border-green-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold text-green-500 mr-2">TESTIMONIALS</span>
            <span className="text-xs text-foreground/70">Hear from our customers</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Teams That Switched to
            <br/>
            ArthaNet Don't Look Back
          </motion.h2>
          
          <motion.p
            className="text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover why teams love our platform
          </motion.p>
        </div>
        
        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-background border border-border/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-blue-500 font-medium">{testimonial.name.charAt(0)}</span>
                    {testimonial.avatar && (
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{testimonial.name}</h4>
                    <p className="text-xs text-foreground/60">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3.5 w-3.5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-foreground/20'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{testimonial.quote}</h3>
              <p className="text-foreground/70 text-sm flex-grow mb-4">{testimonial.content}</p>
              
              {/* Card footer */}
              <div className="flex items-center justify-end">
                <div className="inline-flex rounded-full bg-foreground/5 px-3 py-1 text-xs">
                  <span className="text-foreground/60">Verified customer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trusted by section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-foreground/70 mb-8">Trusted by innovative teams worldwide</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <motion.div 
                key={index}
                className="h-8 opacity-70 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-24 h-8 bg-foreground/10 rounded-md flex items-center justify-center text-xs font-medium">
                  {company.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
