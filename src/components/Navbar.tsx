'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// This is a placeholder Navbar component that isn't used in the application
// It exists only to resolve IDE errors
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="w-full py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold">ArthaNet</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-sm font-medium">Features</a>
          <a href="#how-it-works" className="text-sm font-medium">How It Works</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-sm font-medium">Sign In</button>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background border-b border-border z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-sm font-medium">How It Works</a>
              <div className="pt-4 border-t border-border">
                <button className="text-sm font-medium">Sign In</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
