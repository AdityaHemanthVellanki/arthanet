'use client';

import { motion } from 'framer-motion';
;
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Cta() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the waitlist to be the first to access ArthaNet&apos;s decentralized credit scoring platform and start building your on-chain credit history today.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
