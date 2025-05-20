'use client';

import dynamic from 'next/dynamic';

// Import components with SSR disabled where needed
const WorklyHero = dynamic(() => import('@/components/WorklyHero'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Footer = dynamic(() => import('@/components/Footer'));
const AppIntegrations = dynamic(() => import('@/components/AppIntegrations'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <WorklyHero />
      <Features />
      <AppIntegrations />
      <HowItWorks />
      <Footer />
    </main>
  );
}
