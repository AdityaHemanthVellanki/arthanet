'use client';

import dynamic from 'next/dynamic';

// Import Hero component with SSR disabled
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });

export default function HeroClient() {
  return <Hero />;
}
