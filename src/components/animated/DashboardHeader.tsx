'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const notifications = [
    { id: 1, title: 'Credit score improved', message: 'Your credit score has increased by 15 points', time: '2h ago' },
    { id: 2, title: 'New recommendation', message: 'We have a new suggestion to improve your score', time: '1d ago' },
    { id: 3, title: 'Wallet connected', message: 'Your wallet has been successfully connected', time: '3d ago' },
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-50 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">A</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                ArthaNet
              </h1>
              <p className="text-xs text-slate-400">Decentralized Credit Scoring</p>
            </div>
          </Link>
          
          {/* Removed old desktop navigation */}
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative h-10 w-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-indigo-500"></span>
              </motion.button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-800/80">
                    <h3 className="font-medium text-slate-200">Notifications</h3>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <motion.div 
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                      >
                        <h4 className="font-medium text-slate-200">{notification.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 flex justify-center">
                    <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-colors"
            >
              <User size={16} />
              <span className="text-sm font-medium">Account</span>
              <ChevronDown size={14} />
            </motion.button>
            
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden h-10 w-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu removed */}
    </motion.header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink = ({ href, children, active }: NavLinkProps) => {
  return (
    <Link href={href} className="group relative block">
      <div className={`py-2 relative z-10 ${active ? 'text-indigo-400' : 'text-slate-300'} font-medium transition-colors`}>
        {children}
      </div>
      
      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-indigo-500 opacity-0 group-hover:opacity-100"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
      
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-indigo-500"
          layoutId="activeNavIndicator"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};
