import { motion } from "motion/react";

const steps = [
  { n: "01", t: "Pick a material", d: "Tell us what you like — or let our team recommend based on your climate." },
  { n: "02", t: "Compare brands", d: "Side-by-side specs, warranties and real installed photos." },
  { n: "03", t: "Get connected", d: "We match you with a certified local installer and lock your quote." },
];

export function ProcessCTA() {
  return (
    <>
      <section id="process" className="py-24 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="rf" width="10" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 6 L5 0 L10 6" stroke="white" strokeWidth="0.3" fill="none" />
            </pattern>
            <rect width="100" height="100" fill="url(#rf)" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl">
            <span className="text-accent-glow font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Three steps to your new roof.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="text-5xl font-display font-bold text-accent-glow">{s.n}</div>
                <div className="mt-4 text-2xl font-bold">{s.t}</div>
                <div className="mt-2 text-primary-foreground/80">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-12 md:p-16 shadow-brand text-primary-foreground text-center">
            <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">
              Ready to connect with the right roof?
            </h2>
            <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto">
              Free site visit, no obligation. We'll bring samples to your door.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/95 text-foreground outline-none focus:ring-4 ring-white/40"
              />
              <button type="button" className="px-7 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition">
                Book my visit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
