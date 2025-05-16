import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type FadeInDirection = 'up' | 'down' | 'left' | 'right';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fadeIn(
  direction: FadeInDirection,
  delay: number = 0,
  duration: number = 0.5
) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return {
    initial: { opacity: 0, ...directions[direction] },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
}

export function staggerContainer(
  staggerChildren: number = 0.1,
  delayChildren: number = 0.1
) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function formatAddress(address: string, length: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

export function formatNumber(
  num: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    ...options,
  }).format(num);
}
