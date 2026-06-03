import { motion } from "motion/react";
import { RoofScene } from "./RoofScene";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl select-none"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent-glow text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Every roof. One connection.
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-5xl md:text-6xl font-black leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            Roofs that <span className="text-gradient-brand">protect</span>,<br />
            brands you <span className="text-accent-glow">trust</span>.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-base md:text-lg text-white font-semibold max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          >
            RoofConnect brings together every category of roofing — shingles, metal, clay, slate, wood and solar — from India's most trusted manufacturers. Pick a material, compare brands, get quoted in minutes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#products" className="px-7 py-3.5 rounded-full bg-gradient-brand text-primary-foreground font-bold shadow-brand hover:scale-[1.03] transition-transform">
              Explore products
            </a>
            <a href="#brands" className="px-7 py-3.5 rounded-full border-2 border-white/50 text-white font-bold hover:bg-white/10 hover:border-white/80 transition duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              See brands
            </a>
          </motion.div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md pt-8 border-t border-white/20">
            {[
              { n: "6+", l: "Material types" },
              { n: "10", l: "Premium brands" },
              { n: "12k", l: "Roofs delivered" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className="text-3xl font-display font-extrabold text-accent-glow drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-neutral-100 mt-1 font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <RoofScene />
      </div>
    </section>
  );
}


