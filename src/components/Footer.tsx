"use client";

import Link from 'next/link';


export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border/20 py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <Link href="/" className="inline-block mb-4">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ArthaNet</span>
        </Link>
        
        <p className="text-sm text-foreground/60">
          &copy; {currentYear} ArthaNet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
