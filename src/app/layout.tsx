import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
