/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      colors: {
        border: 'rgb(var(--border-rgb))',
        input: 'rgb(var(--border-rgb))',
        ring: 'rgb(var(--primary-rgb))',
        background: 'rgb(var(--background-rgb))',
        foreground: 'rgb(var(--foreground-rgb))',
        primary: {
          DEFAULT: 'rgb(var(--primary-rgb))',
          foreground: 'rgb(var(--primary-foreground-rgb))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--muted-foreground-rgb))',
          foreground: 'rgb(var(--foreground-rgb))',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(210, 40%, 98%)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted-foreground-rgb))',
          foreground: 'rgb(var(--muted-foreground-rgb))',
        },
        accent: {
          DEFAULT: 'rgb(var(--primary-rgb))',
          foreground: 'rgb(var(--primary-foreground-rgb))',
        },
        popover: {
          DEFAULT: 'rgb(var(--card-rgb))',
          foreground: 'rgb(var(--card-foreground-rgb))',
        },
        card: {
          DEFAULT: 'rgb(var(--card-rgb))',
          foreground: 'rgb(var(--card-foreground-rgb))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
};
