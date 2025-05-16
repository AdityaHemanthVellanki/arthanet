'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
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
          <Link href="/" className="group flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="text-sm font-bold text-primary-foreground">AN</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">ArthaNet</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="hidden items-center space-x-8 md:flex"
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
              {isHome && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              )}
              {item.name}
            </Link>
          ))}
        </motion.nav>

        {/* Connect Wallet Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ConnectButton
            accountStatus="address"
            showBalance={false}
            chainStatus="none"
            label="Connect Wallet"
          />
        </motion.div>
      </div>
    </header>
  );
}
