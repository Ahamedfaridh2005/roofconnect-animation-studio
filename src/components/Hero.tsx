import { motion } from "motion/react";
import { RoofScene } from "./RoofScene";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Every roof. One connection.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-5xl md:text-7xl font-bold leading-[1.02]"
          >
            Roofs that <span className="text-gradient-brand">protect</span>,<br />
            brands you <span className="text-accent">trust</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            RoofConnect brings together every category of roofing — shingles, metal, clay, slate, wood and solar — from the world's most trusted brands. Pick a material, compare brands, get quoted in minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#products" className="px-7 py-3.5 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-brand hover:scale-[1.03] transition-transform">
              Explore products
            </a>
            <a href="#brands" className="px-7 py-3.5 rounded-full border-2 border-primary/20 font-semibold hover:bg-primary/5 transition">
              See brands
            </a>
          </motion.div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "6+", l: "Material types" },
              { n: "24", l: "Premium brands" },
              { n: "12k", l: "Roofs delivered" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className="text-3xl font-display font-bold text-primary">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <RoofScene />
      </div>
    </section>
  );
}
