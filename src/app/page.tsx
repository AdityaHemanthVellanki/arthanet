'use client';

import dynamic from 'next/dynamic';

// Import components with SSR disabled where needed
const WorklyHero = dynamic(() => import('@/components/WorklyHero'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const Cta = dynamic(() => import('@/components/Cta'));
const Footer = dynamic(() => import('@/components/Footer'));
// Additional sections for a richer UI
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const AppIntegrations = dynamic(() => import('@/components/AppIntegrations'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <WorklyHero />
      <Features />
      <AppIntegrations />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Cta />
      <Footer />
    </main>
  );
}
