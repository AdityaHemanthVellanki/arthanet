'use client';

import dynamic from 'next/dynamic';

// Import components with SSR disabled where needed
const HeroClient = dynamic(() => import('@/components/HeroClient'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Cta = dynamic(() => import('@/components/Cta'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroClient />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
