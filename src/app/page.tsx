import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import BackedBy from "@/components/BackedBy";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Social Proof / Backed By Section */}
        <BackedBy />
        
        {/* Waitlist Section */}
        <Waitlist />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
