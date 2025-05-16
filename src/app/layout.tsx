import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: "ArthaNet | AI-Powered Decentralized Credit Scoring",
  description: "ArthaNet is building the future of trust in Web3 — credit scoring, simplified and decentralized.",
  keywords: "ArthaNet, decentralized credit scoring, DeFi, Ethereum, Web3, on-chain credit score, AI powered finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={cn(
        inter.variable,
        spaceGrotesk.variable,
        'scroll-smooth' // Optional: Enable smooth scrolling
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn(
        'min-h-screen bg-background text-foreground antialiased',
        'transition-colors duration-200' // Smooth theme transitions
      )}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
