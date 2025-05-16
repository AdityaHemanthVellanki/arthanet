'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PREMIUM_EASING, fadeInUp, letterFadeIn, staggeredFadeIn, buttonHover } from '@/lib/animations';

const GRADIENT_TEXT = 'bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary';

// Animation to count up from a starting to ending value
const CountUpAnimation = ({ from, to, duration = 1.5, delay = 0 }: { from: number; to: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(from + progress * (to - from)));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, duration, delay]);
  
  return <>{count}</>;
};

// Split text into individual characters for animation
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.span
      className={className}
      variants={staggeredFadeIn}
      initial="hidden"
      animate="visible"
    >
      {shouldReduceMotion ? (
        <motion.span variants={fadeInUp}>{text}</motion.span>
      ) : (
        text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterFadeIn}
            className="inline-block"
            style={{ originY: 0.5 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))
      )}
    </motion.span>
  );
};

// Animated button with hover effects
const AnimatedButton = ({ 
  type = 'button', 
  disabled = false, 
  className, 
  children,
  onClick
}: {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden transition-all',
        'group',
        className
      )}
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Gradient border effect on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.2), rgba(var(--accent-rgb), 0.2), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shine 2s linear infinite',
        }}>
      </span>
      
      {/* Inner shadow on button press */}
      <span className="absolute inset-0 opacity-0 group-active:opacity-20 bg-black transition-opacity duration-150"></span>
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define keyframes for animated gradient border and other animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shine {
        0% { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
      
      @keyframes breathe {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }
      
      @keyframes gradientMove {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 md:pt-28 pb-32 overflow-hidden" id="hero">
      {/* Enhanced animated background with breathing effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Node network background with breathing effect */}
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(var(--primary-rgb), 0.08) 0%, transparent 30%), 
                              radial-gradient(circle at 70% 60%, rgba(var(--accent-rgb), 0.08) 0%, transparent 30%), 
                              radial-gradient(circle at 50% 50%, rgba(var(--secondary-rgb), 0.05) 0%, transparent 40%)`,
            animation: shouldReduceMotion ? 'none' : 'breathe 8s infinite ease-in-out'
          }}>
        </div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl opacity-70"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>
      
      {/* Main content container with strict dimensions */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout with fixed widths and spacing */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center max-w-6xl mx-auto py-8 lg:py-12">
          {/* Hero text content with staggered animations - fixed width to prevent overlap */}
          <motion.div
            variants={staggeredFadeIn}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full lg:w-2/5 mx-auto lg:mx-0 flex-shrink-0 lg:pr-4"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block px-4 py-2 mb-6 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-sm font-medium text-muted-foreground"
              style={{
                boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.05)',
                transition: 'all var(--transition-fast)'
              }}
              whileHover={{
                boxShadow: '0 0 25px rgba(var(--primary-rgb), 0.15)',
                borderColor: 'rgba(var(--primary-rgb), 0.3)',
                transition: { duration: 0.2, ease: PREMIUM_EASING }
              }}
            >
              <span className="relative flex h-2 w-2 mr-2 float-left mt-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Now in Private Beta</span>
            </motion.div>
            
            {/* Letter-by-letter animated headline with Credit Score on same line */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6">
              <div>
                <AnimatedText text="Your " />
              </div>
              <div className="whitespace-nowrap">
                <AnimatedText 
                  text="On-Chain Credit Score" 
                  className={GRADIENT_TEXT} 
                />
              </div>
            </h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 max-w-2xl"
            >
              Unlock the power of decentralized finance with AI-powered credit scoring. Join the waitlist for early access to the future of DeFi lending.
            </motion.p>
            
            {/* Enhanced waitlist form with micro-interactions */}
            <motion.div 
              variants={fadeInUp}
              className="max-w-[400px] w-full"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: PREMIUM_EASING }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20 text-primary"
                    style={{ boxShadow: 'var(--shadow-glow)' }}
                  >
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>You're on the list! We'll be in touch soon.</span>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 w-full max-w-[400px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: PREMIUM_EASING }}
                  >
                    <div className="relative flex-1">
                      {/* Animated label that slides up when input is focused */}
                      <motion.label
                        htmlFor="email-input"
                        className={cn(
                          "absolute pointer-events-none text-muted-foreground/60 transition-all duration-200",
                          isInputFocused || email ? 
                            "text-xs top-1.5 left-3 text-primary" : 
                            "text-base top-1/2 -translate-y-1/2 left-5"
                        )}
                        animate={{ 
                          y: isInputFocused || email ? 0 : 0,
                          opacity: 1
                        }}
                        transition={{ duration: 0.2, ease: PREMIUM_EASING }}
                      >
                        Enter your email
                      </motion.label>
                      
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        className={cn(
                          "w-full px-5 pt-6 pb-3 rounded-lg border text-foreground transition-all duration-200",
                          "bg-background/50 backdrop-blur-md",
                          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
                          "placeholder:text-transparent",
                          isInputFocused ? 
                            "border-primary/50 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]" : 
                            "border-border"
                        )}
                        placeholder="Enter your email"
                        required
                        disabled={isSubmitting}
                      />
                      
                      <motion.div 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground"
                        animate={{ 
                          opacity: isInputFocused || email ? 1 : 0.5,
                          x: isInputFocused || email ? 0 : 5
                        }}
                        transition={{ duration: 0.2, ease: PREMIUM_EASING }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                    
                    {/* Fancy animated button */}
                    <AnimatedButton
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'px-6 py-3.5 font-medium rounded-lg',
                        'bg-gradient-to-r from-primary to-accent text-primary-foreground',
                        'hover:shadow-lg hover:shadow-primary/20',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'relative',
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Joining...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </AnimatedButton>
                  </motion.form>
                )}
              </AnimatePresence>
              
              <motion.p 
                variants={fadeInUp}
                className="mt-3 text-sm text-muted-foreground"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              >
                Join {Math.floor(Math.random() * 1000) + 500}+ early adopters on the waitlist
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Enhanced Hero Illustration with 3D effects and premium animations - fixed width */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.8, ease: PREMIUM_EASING }}
            className="relative w-full lg:w-1/2 mx-auto mt-16 lg:mt-0 flex-shrink-0 lg:pl-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: PREMIUM_EASING }}
          >
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Premium card with animated gradient border */}
              <div 
                className="absolute inset-0 rounded-3xl overflow-hidden p-0.5"
                style={{
                  background: `linear-gradient(140deg, 
                    rgba(var(--primary-rgb), 0.5), 
                    rgba(var(--accent-rgb), 0.5), 
                    rgba(var(--secondary-rgb), 0.5), 
                    rgba(var(--primary-rgb), 0.5))`,
                  backgroundSize: '400% 400%',
                  animation: shouldReduceMotion ? 'none' : 'gradientMove 8s ease infinite',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <div className="relative h-full w-full rounded-[calc(1.5rem-2px)] bg-background/80 backdrop-blur-xl overflow-hidden flex items-center justify-center">
                  {/* Enhanced 3D Credit Score Visualization */}
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    {/* Credit score visualization with premium effects */}
                    <div className="relative w-full h-full max-w-xs">
                      {/* Track for score ring - dim background */}
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="rgba(var(--border-rgb), 0.3)"
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      
                      {/* Animated score ring with gradient and glow */}
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
                          <defs>
                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(var(--primary-rgb), 1)" />
                              <stop offset="50%" stopColor="rgba(var(--accent-rgb), 1)" />
                              <stop offset="100%" stopColor="rgba(var(--secondary-rgb), 1)" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          <motion.circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="url(#ringGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray="502.65"
                            strokeDashoffset="125.66" // 75% of 502.65 (for 750 score)
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ 
                              rotate: -90,
                              opacity: 1,
                              strokeDashoffset: shouldReduceMotion ? "125.66" : ["502.65", "125.66"]
                            }}
                            transition={{ duration: 1.8, ease: PREMIUM_EASING }}
                            filter="url(#glow)"
                          />
                        </svg>
                      </div>
                      
                      {/* Score display with counting animation */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                        <motion.span 
                          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary"
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.6, ease: PREMIUM_EASING }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                          >
                            {shouldReduceMotion ? "750" : (
                              <CountUpAnimation from={0} to={750} duration={1.8} delay={0.8} />
                            )}
                          </motion.span>
                        </motion.span>
                        <motion.div 
                          className="flex items-center gap-2 font-medium text-muted-foreground mt-2"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                        >
                          <span className="text-primary font-medium">Excellent</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                          <span className="text-sm">Credit Score</span>
                        </motion.div>
                      </div>
                      
                      {/* Premium floating elements with 3D effects */}
                      <motion.div 
                        className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-primary/5 backdrop-blur-sm"
                        style={{ boxShadow: '0 8px 32px rgba(var(--primary-rgb), 0.15)' }}
                        animate={{
                          y: shouldReduceMotion ? 0 : [0, -12, 0],
                          scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
                          rotate: shouldReduceMotion ? 0 : [0, 5, 0]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      />
                      
                      <motion.div 
                        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-accent/40 to-accent/5 backdrop-blur-sm"
                        style={{ boxShadow: '0 8px 32px rgba(var(--accent-rgb), 0.15)' }}
                        animate={{
                          y: shouldReduceMotion ? 0 : [0, 12, 0],
                          scale: shouldReduceMotion ? 1 : [1, 1.08, 1],
                          rotate: shouldReduceMotion ? 0 : [0, -5, 0]
                        }}
                        transition={{
                          duration: 7,
                          delay: 0.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    
                    {/* Enhanced decorative elements with varying opacity */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                      {shouldReduceMotion ? null : [...Array(12)].map((_, i) => {
                        const size = Math.random() * 80 + 20;
                        return (
                          <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              width: size,
                              height: size,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              background: `radial-gradient(circle, 
                                rgba(var(--${i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'accent' : 'secondary'}-rgb), ${Math.random() * 0.1 + 0.05}) 0%, 
                                transparent 70%)`,
                              opacity: Math.random() * 0.4 + 0.2
                            }}
                            animate={{
                              y: [0, Math.random() > 0.5 ? 15 : -15, 0],
                              x: [0, Math.random() > 0.5 ? 15 : -15, 0],
                              opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2, Math.random() * 0.3 + 0.1],
                              scale: [1, Math.random() * 0.2 + 0.9, 1]
                            }}
                            transition={{
                              duration: Math.random() * 8 + 8,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: PREMIUM_EASING,
                              delay: Math.random() * 2
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Data points visualization */}
                    <div className="absolute inset-0 pointer-events-none">
                      {shouldReduceMotion ? null : [...Array(8)].map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const radius = 90;
                        const x = Math.cos(angle) * radius + 100;
                        const y = Math.sin(angle) * radius + 100;
                        return (
                          <motion.div
                            key={`point-${i}`}
                            className="absolute w-2 h-2 rounded-full bg-primary"
                            style={{
                              left: `calc(50% - 1px)`,
                              top: `calc(50% - 1px)`,
                              transform: `translate(${x - 100}px, ${y - 100}px)`,
                              opacity: 0
                            }}
                            animate={{
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.5]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                              delay: i * 0.4 + 1
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator with smoother animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: PREMIUM_EASING }}
      >
        <motion.span 
          className="mb-2 tracking-wide font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          Scroll to explore
        </motion.span>
        <motion.div 
          className="relative w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1 overflow-hidden"
          style={{ boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.1)' }}
          whileHover={{ borderColor: 'rgba(var(--primary-rgb), 0.5)' }}
        >
          <motion.div 
            className="w-1.5 h-2 bg-primary rounded-full"
            initial={{ y: 0 }}
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: PREMIUM_EASING,
            }}
          />
          <motion.div 
            className="absolute inset-0 opacity-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: PREMIUM_EASING,
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
