import type { Metadata, Viewport } from "next"
import { Space_Grotesk } from 'next/font/google'
import "./globals.css"
import { ConditionalHeader } from '@/components/ConditionalHeader';
import { cn } from "@/lib/utils";
import { Providers } from '@/components/providers';


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
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
        spaceGrotesk.variable,
        'scroll-smooth font-space' // Space Grotesk as default font
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body 
        suppressHydrationWarning={true}
        className={cn(
          'min-h-screen bg-background text-foreground antialiased font-space',
          spaceGrotesk.variable
        )}
        suppressContentEditableWarning
      >
        <Providers>
            <div className="relative flex min-h-screen flex-col">
              {/* Conditionally rendered header (hidden on dashboard pages) */}
              <ConditionalHeader />
              <main className="flex-1">
                {children}
              </main>
            </div>
        </Providers>
      </body>
    </html>
  );
}
