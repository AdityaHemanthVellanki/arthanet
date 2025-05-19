'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="group flex items-center">
            <div className="relative h-14 w-auto">
              <Image 
                src="/images/logo.png" 
                alt="ArthaNet Logo" 
                width={200}
                height={56}
                className="h-auto w-auto"
                priority
                style={{ maxHeight: '56px' }}
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center space-x-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  isHome && 'group'
                )}
              >
                {item.name}
                {isHome && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}
          </motion.nav>
        </div>
      </div>
    </header>
  );
}
