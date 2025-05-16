import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Decentralized Credit Scoring
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          ArthaNet is building the future of trust in Web3 — credit scoring, simplified and decentralized.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#how-it-works">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Decentralized",
              description: "Built on blockchain for transparency and security"
            },
            {
              title: "AI-Powered",
              description: "Advanced algorithms for accurate credit assessment"
            },
            {
              title: "User-Controlled",
              description: "You own and control your credit data"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {[
            "Connect your wallet to create your credit profile",
            "Link your existing accounts and verify your identity",
            "Our AI analyzes your on-chain and off-chain data",
            "Get your decentralized credit score and start building credit"
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the waitlist to be the first to access ArthaNet's decentralized credit scoring platform.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">Join Waitlist</Link>
        </Button>
      </section>
    </div>
  );
}
