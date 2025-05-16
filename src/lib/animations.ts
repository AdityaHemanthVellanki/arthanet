import { Variants } from 'framer-motion';

// Custom easing curve as requested
export const PREMIUM_EASING = [0.65, 0.05, 0.36, 1];

// Animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.4, ease: PREMIUM_EASING }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASING }
  }
};

export const staggeredFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: PREMIUM_EASING
    }
  }
};

export const letterFadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: PREMIUM_EASING
    }
  }
};

export const cardEntrance: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    skewX: '-3deg',
    transition: { duration: 0.6, ease: PREMIUM_EASING }
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    skewX: '0deg',
    transition: { duration: 0.8, ease: PREMIUM_EASING }
  }
};

export const pulseGlow = {
  initial: { 
    boxShadow: '0 0 0 rgba(var(--primary-rgb), 0)' 
  },
  animate: { 
    boxShadow: [
      '0 0 5px rgba(var(--primary-rgb), 0.1)',
      '0 0 20px rgba(var(--primary-rgb), 0.3)',
      '0 0 5px rgba(var(--primary-rgb), 0.1)'
    ],
    transition: { 
      duration: 4, 
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: { duration: 0.2, ease: PREMIUM_EASING }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1, ease: PREMIUM_EASING }
  }
};

// Helper function to create a reduced motion version of animations
export function createReducedMotionVariants(variants: Variants): Variants {
  const reducedVariants: Variants = {};
  
  for (const key in variants) {
    // Copy all properties except transform-related ones
    reducedVariants[key] = {
      ...variants[key],
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      skew: 0,
      skewX: 0,
      skewY: 0
    };
    
    // Ensure opacity transitions are quicker
    if (reducedVariants[key].transition) {
      reducedVariants[key].transition = {
        ...reducedVariants[key].transition,
        duration: 0.2
      };
    }
  }
  
  return reducedVariants;
}
