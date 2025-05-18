'use client';

import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--primary-dark)] bg-opacity-80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image
                src="/logo.svg"
                alt="ArthaNet Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gradient">ArthaNet</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-[var(--accent-cyan)] transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" className="text-foreground hover:text-[var(--accent-cyan)] transition-colors">
              How It Works
            </Link>
            <Link href="#docs" className="text-foreground hover:text-[var(--accent-cyan)] transition-colors">
              Docs
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#waitlist" className="btn-primary">
                Join Waitlist
              </Link>
            </motion.div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[var(--primary-dark)] bg-opacity-95 backdrop-blur-sm"
        >
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link 
              href="/"
              className="block py-2 text-foreground hover:text-[var(--accent-cyan)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#how-it-works"
              className="block py-2 text-foreground hover:text-[var(--accent-cyan)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="#docs"
              className="block py-2 text-foreground hover:text-[var(--accent-cyan)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link 
              href="#waitlist"
              className="btn-primary inline-block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
