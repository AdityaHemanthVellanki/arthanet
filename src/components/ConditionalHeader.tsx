'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render the header on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  return <Header />;
}
