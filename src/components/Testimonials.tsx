import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "ArthaNet's credit scoring is a game-changer for DeFi lending. It's accurate, transparent, and secure.",
      author: "Alex Johnson",
      role: "DeFi Enthusiast"
    },
    {
      id: 2,
      quote: "Finally, a credit system that works across chains. ArthaNet is building the future of decentralized finance.",
      author: "Sarah Chen",
      role: "Blockchain Developer"
    },
    {
      id: 3,
      quote: "The AI-powered insights have helped me understand and improve my credit score like never before.",
      author: "Miguel Rodriguez",
      role: "Crypto Trader"
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Trusted by the Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are already building their credit history on ArthaNet
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * testimonial.id }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
