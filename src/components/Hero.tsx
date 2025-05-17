'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Animation constants
const PREMIUM_EASING = [0.4, 0, 0.2, 1];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const buttonHover = {
  scale: 1.03,
  transition: { duration: 0.2 }
};

// Generate a stable random number for consistent rendering between server/client
const getStableRandom = (seed: number, max: number = 1, min: number = 0): number => {
  // Simple hash function for consistent pseudo-random values
  let hash = 0;
  const str = `seed-${seed}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return (Math.abs(hash) % 1000) / 1000 * (max - min) + min;
};

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
  
  // Local animation variants
  const staggeredFadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterFadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.span
      className={className}
      variants={staggeredFadeIn}
      initial="hidden"
      animate="visible"
    >
      {shouldReduceMotion ? (
        text
      ) : (
        text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterFadeIn}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))
      )}
    </motion.span>
  );
};

// Custom AnimatedButton component with premium hover effect
const AnimatedButton = ({ 
  children, 
  className = "", 
  type = "button" as "button" | "submit" | "reset", 
  disabled = false,
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={className}
      whileHover={buttonHover}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// Apple-inspired blurred glass card component
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(
      "rounded-2xl backdrop-blur-md bg-background/30 border border-border/30", 
      "shadow-xl hover:shadow-2xl transition-all duration-500",
      "border-opacity-30 overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
};

// Enhanced toast notification component with Apple/Raycast style
const Toast = ({ message, onClose, type = "success" }: { message: string; onClose: () => void; type?: "success" | "error" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 px-6 rounded-xl backdrop-blur-xl shadow-2xl",
        "border border-border/20 flex items-center gap-3 max-w-md",
        type === "success" ? "bg-primary/15" : "bg-red-500/15"
      )}
      style={{
        boxShadow: type === "success" 
          ? "0 8px 32px rgba(var(--primary-rgb), 0.2)" 
          : "0 8px 32px rgba(239, 68, 68, 0.2)"
      }}
    >
      <div className={cn(
        "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
        type === "success" ? "bg-primary/30 text-primary" : "bg-red-500/30 text-red-500"
      )}>
        <Check className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground/90">{message}</p>
      </div>
      <button
        onClick={onClose}
        className={cn(
          "p-1.5 rounded-full hover:bg-background/50 focus:outline-none transition-colors",
          "text-foreground/90 hover:text-foreground"
        )}
      >
        <span className="sr-only">Close</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-xl"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
        style={{ display: type === "success" ? "block" : "none" }}
      />
    </motion.div>
  );
};



// Floating element for background decoration
const FloatingElement = ({ index, className = "" }: { index: number, className?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  const size = 20 + index * 15;
  
  return shouldReduceMotion ? null : (
    <motion.div
      className={cn("absolute rounded-full bg-opacity-10", className)}
      style={{
        width: size,
        height: size,
        left: `${getStableRandom(index * 3, 80, 10)}%`,
        top: `${getStableRandom(index * 5, 80, 10)}%`,
        background: `radial-gradient(circle at center, rgba(var(--${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'accent' : 'secondary'}-rgb), 0.15) 0%, transparent 70%)`,
        boxShadow: `0 0 ${size/2}px rgba(var(--${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'accent' : 'secondary'}-rgb), 0.1)`,
      }}
      animate={{
        y: [0, getStableRandom(index * 2, 15, -15)],
        x: [0, getStableRandom(index * 4, 15, -15)],
        scale: [1, getStableRandom(index * 6, 1.1, 0.9)],
      }}
      transition={{
        duration: getStableRandom(index * 7, 25, 15),
        repeat: Infinity,
        repeatType: "reverse",
        ease: PREMIUM_EASING,
      }}
    />
  );
};

// Helper for random gradients (stable across client/server)
const getRandomValue = (seed: number, max: number = 1, min: number = 0): number => {
  return getStableRandom(seed, max, min);
};

export default function Hero() {
  // State management
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isClient, setIsClient] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Handle reduced motion preferences
  const shouldReduceMotion = useReducedMotion();
  
  // Set up client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Set up scroll event listener for parallax effects
  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (window && window.scrollY < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create stable random value generator for consistent SSR
  const getRandomValue = (index: number, max: number = 1, min: number = 0): number => {
    return isClient ? Math.random() * (max - min) + min : getStableRandom(index, max, min);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!email) {
      setToastType('error');
      setToastMessage('Please enter your email address.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setToastType('error');
      setToastMessage('Please enter a valid email address.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For demo purposes - simulate API call with a delay
      // TODO: Replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success path
      setToastType('success');
      setToastMessage('Successfully joined the ArthaNet waitlist! 🎉');
      setShowToast(true);
      
      // Show success animation in the form area
      setShowSuccessAnimation(true);
      
      // Clear the form after a brief delay to allow animation to be visible
      setTimeout(() => {
        setEmail('');
        // Reset the success animation after 2 seconds
        setTimeout(() => setShowSuccessAnimation(false), 2000);
      }, 300);
      
      // Toast will auto-hide after 5 seconds (matching the progress bar animation)
      setTimeout(() => setShowToast(false), 5000);
      
      // Uncomment and adapt this for real API integration
      /*
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setEmail('');
        setToastType('success');
        setToastMessage('Successfully joined the ArthaNet waitlist! 🎉');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      } else {
        const data = await response.json();
        setToastType('error');
        setToastMessage(data.message || 'Something went wrong. Please try again.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
      */
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setToastType('error');
      setToastMessage('An error occurred. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 md:pt-28 pb-32 overflow-hidden" id="hero">
      <AnimatePresence>
        {showToast && (
          <Toast 
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(74, 144, 226, 0.15), rgba(10, 18, 33, 0) 60%),
                radial-gradient(circle at 85% 30%, rgba(155, 81, 224, 0.1), rgba(10, 18, 33, 0) 50%),
                radial-gradient(circle at 20% 80%, rgba(43, 198, 163, 0.1), rgba(10, 18, 33, 0) 50%)
              `,
            }}
          />
        </div>

        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 30% 20%, rgba(var(--primary-rgb), 0.08) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(var(--accent-rgb), 0.08) 0%, transparent 30%), radial-gradient(circle at 50% 50%, rgba(var(--secondary-rgb), 0.05) 0%, transparent 40%)` }}>
        </div>

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
            repeatType: 'reverse',
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
            delay: 2,
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
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto py-8 lg:py-16 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10 w-full lg:w-[45%] mx-auto lg:mx-0 flex-shrink-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
                className="block"
              >
                <span>Redefining </span>
                <span className="inline-block relative">
                  <span
                    className="relative inline-block"
                    style={{
                      background: 'var(--gradient-primary)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '200% 200%',
                      animation: 'gradientMove 8s ease infinite',
                      filter: 'brightness(1.2) contrast(1.1)',
                      textShadow: '0 1px 3px rgba(var(--primary-rgb), 0.4)'
                    }}
                  >
                    On-Chain
                  </span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}
                className="block mt-1"
              >
                <span
                  className="relative inline-block"
                  style={{
                    background: 'var(--gradient-secondary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: 'gradientMove 8s ease infinite',
                    filter: 'brightness(1.2) contrast(1.1)',
                    textShadow: '0 1px 3px rgba(var(--accent-rgb), 0.4)'
                  }}
                >
                  Credit
                </span>
                <span> with AI</span>
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
              className="text-xl text-foreground/90 mb-8 max-w-2xl font-medium"
              style={{ lineHeight: 1.6 }}
            >
              <span className="text-foreground/90 font-medium">ArthaNet</span> is the first AI-powered credit scoring platform for your crypto assets. Join our waitlist for early access to the future of decentralized finance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.8 }}
              className="max-w-md w-full relative"
            >
              {/* Success animation overlay */}
              <AnimatePresence>
                {showSuccessAnimation && (
                  <motion.div 
                    className="absolute inset-0 bg-primary/15 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-primary font-semibold flex flex-col items-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-primary/25 flex items-center justify-center mb-3"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: [0.5, 1.1, 1] }}
                        transition={{ duration: 0.4, times: [0, 0.7, 1] }}
                      >
                        <Check className="h-8 w-8" />
                      </motion.div>
                      <motion.p
                        className="text-sm font-semibold text-primary/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Thank you for joining!
                      </motion.p>
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0.3 }}
                      animate={{
                        background: [
                          "radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb), 0.15), transparent 70%)",
                          "radial-gradient(circle at 70% 70%, rgba(var(--primary-rgb), 0.15), transparent 70%)",
                          "radial-gradient(circle at 30% 70%, rgba(var(--primary-rgb), 0.15), transparent 70%)",
                          "radial-gradient(circle at 70% 30%, rgba(var(--primary-rgb), 0.15), transparent 70%)",
                          "radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb), 0.15), transparent 70%)"
                        ]
                      }}
                      transition={{ duration: 4, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
                      style={{ zIndex: -1 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form 
                onSubmit={handleSubmit}
                className="w-full space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div className="relative sm:col-span-2">
                      <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                        placeholder="Enter your email"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-full font-medium rounded-lg px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-primary-foreground backdrop-filter backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-5 h-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
                          <span className="ml-2">Submitting...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>Join Waitlist</span>
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </form>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
            className="relative w-full lg:w-[50%] mx-auto lg:mt-0 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden p-0.5"
                style={{
                  background: `linear-gradient(140deg, rgba(var(--primary-rgb), 0.5), rgba(var(--accent-rgb), 0.5), rgba(var(--secondary-rgb), 0.5), rgba(var(--primary-rgb), 0.5))`,
                  backgroundSize: '400% 400%',
                  animation: shouldReduceMotion ? 'none' : 'gradientMove 8s ease infinite',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <div className="relative h-full w-full rounded-[calc(1.5rem-2px)] bg-background/80 backdrop-blur-xl overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative w-full h-full max-w-xs">
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
                            strokeDashoffset="125.66"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{
                              rotate: -90,
                              opacity: 1,
                              strokeDashoffset: shouldReduceMotion ? "125.66" : ["502.65", "125.66"],
                            }}
                            transition={{ duration: 1.8, ease: 'easeInOut' }}
                            filter="url(#glow)"
                          />
                        </svg>
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                        <motion.span
                          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary"
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}
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
                          className="flex items-center gap-2 font-medium text-foreground/90 mt-2"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                        >
                          <span className="text-primary font-medium">Excellent</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                          <span className="text-sm">Credit Score</span>
                        </motion.div>
                      </div>
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
                        const size = getRandomValue(i, 80, 20);
                        return (
                          <motion.div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              width: size,
                              height: size,
                              left: `${getRandomValue(i * 2, 100)}%`,
                              top: `${getRandomValue(i * 2 + 1, 100)}%`,
                              background: `radial-gradient(circle at center, 
                                rgba(var(--${i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'accent' : 'secondary'}-rgb), ${getRandomValue(i * 3, 0.1, 0.05)}) 0%, 
                                rgba(var(--${i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'accent' : 'secondary'}-rgb), 0) 100%`
                            }}
                            animate={{
                              y: [0, getRandomValue(i * 5) > 0.5 ? 15 : -15, 0],
                              x: [0, getRandomValue(i * 6) > 0.5 ? 15 : -15, 0],
                              opacity: getRandomValue(i * 4, 0.4, 0.2),
                              scale: getRandomValue(i * 10, 0.2, 0.9) + 0.9
                            }}
                            transition={{
                              duration: getRandomValue(i * 11, 8, 8),
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: PREMIUM_EASING,
                              delay: getRandomValue(i * 12, 2)
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-foreground/90 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: PREMIUM_EASING }}
      >
        <motion.span 
          className="mb-2 tracking-wide font-medium text-foreground"
          animate={{ opacity: [0.8, 1, 0.8] }}
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
            className="w-1.5 h-2 bg-primary/90 rounded-full shadow-sm shadow-primary/30"
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
            className="absolute inset-0 opacity-0 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
            animate={{ opacity: [0, 0.7, 0] }}
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
