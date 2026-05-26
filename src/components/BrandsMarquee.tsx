import { motion } from "motion/react";

const brands = [
  "GAF", "Owens Corning", "CertainTeed", "IKO", "Tamko", "Atlas",
  "Malarkey", "DECRA", "Boral", "Eagle Roofing", "Ludowici", "DaVinci",
  "Tesla Solar", "GAF Energy", "Brava", "Englert", "Drexel Metals", "PetersenAluminum",
];

export function BrandsMarquee() {
  const loop = [...brands, ...brands];
  return (
    <section id="brands" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <span className="text-accent font-semibold text-sm uppercase tracking-wider">Brands</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-bold">
          We carry the names <span className="text-gradient-brand">contractors trust</span>.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Officially partnered with every major manufacturer — so your roof is backed by real warranties, not promises.
        </p>
      </div>

      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-4 w-max">
          {loop.map((b, i) => (
            <div
              key={`${b}-${i}`}
              className="px-8 py-5 rounded-2xl bg-card border border-border shadow-sm font-display font-bold text-xl text-primary-deep whitespace-nowrap hover:shadow-brand hover:border-primary/30 transition-all"
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Featured partner cards */}
      <div className="container mx-auto px-6 mt-20 grid md:grid-cols-3 gap-6">
        {[
          { name: "GAF", tag: "Master Elite® Contractor", note: "Top 2% of US roofers" },
          { name: "Owens Corning", tag: "Platinum Preferred", note: "Limited lifetime warranty" },
          { name: "Tesla Solar", tag: "Certified Installer", note: "Solar Roof v3.5" },
        ].map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-8 rounded-2xl bg-gradient-card border border-border shadow-elegant overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-brand opacity-20 blur-2xl" />
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">{c.tag}</div>
            <div className="mt-2 text-3xl font-bold font-display">{c.name}</div>
            <div className="mt-4 text-sm text-muted-foreground">{c.note}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
