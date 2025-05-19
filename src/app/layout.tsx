import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from 'next/font/google'
import "./globals.css"
import { Header } from '@/components/header';
import { cn } from "@/lib/utils";
import { Providers } from '@/components/providers';
import SupabaseProvider from '@/components/providers/supabase-provider';

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
  icons: {
    icon: '/favicon.ico',
  },
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body 
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background text-foreground antialiased',
          inter.variable,
          spaceGrotesk.variable
        )}
        suppressContentEditableWarning
      >
        <Providers>
          <SupabaseProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </SupabaseProvider>
        </Providers>
      </body>
    </html>
  );
}
