import { motion } from "motion/react";

const brands = [
  "Tata BlueScope Steel",
  "JSW Steel",
  "Jindal Steel",
  "Everest Industries",
  "Kingspan India",
  "Metecno India",
  "Ashirvad Pipes",
  "Astral Pipes",
  "Supreme Industries",
  "Finolex Industries"
];

function BrandLogo({ name }: { name: string }) {
  switch (name) {
    case "Tata BlueScope Steel":
      return (
        <svg viewBox="0 0 190 50" className="h-9 w-auto select-none pointer-events-none">
          <g stroke="#005691" strokeWidth="2" fill="none" strokeLinecap="round">
            <circle cx="24" cy="25" r="15" strokeWidth="2.2" />
            <path d="M 24,14 C 18,15 15,24 15,31 C 21,24 23,20 23,16" />
            <path d="M 24,14 C 30,15 33,24 33,31 C 27,24 25,20 25,16" />
          </g>
          <text x="48" y="24" fontFamily="var(--font-display)" fontWeight="800" fontSize="15" fill="#005691">TATA</text>
          <text x="48" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="10" fill="#005691" letterSpacing="0.5">BlueScope Steel</text>
        </svg>
      );
    case "JSW Steel":
      return (
        <svg viewBox="0 0 150 50" className="h-9 w-auto select-none pointer-events-none">
          <path d="M12 33 L24 13" stroke="#E31B23" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M21 33 L33 13" stroke="#003884" strokeWidth="5.5" strokeLinecap="round" />
          <text x="40" y="26" fontFamily="var(--font-display)" fontWeight="900" fontSize="21" fill="#003884" letterSpacing="-0.5">JSW</text>
          <text x="40" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="11" fill="#E31B23" letterSpacing="1">STEEL</text>
        </svg>
      );
    case "Jindal Steel":
      return (
        <svg viewBox="0 0 170 50" className="h-9 w-auto select-none pointer-events-none">
          <circle cx="22" cy="25" r="11" fill="none" stroke="#F15A24" strokeWidth="3.5" />
          <path d="M22 14 A 11 11 0 0 1 33 25" stroke="#003884" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <text x="42" y="26" fontFamily="var(--font-display)" fontWeight="900" fontSize="18" fill="#003884" letterSpacing="-0.5">JINDAL</text>
          <text x="42" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#F15A24" letterSpacing="1.5">STEEL & POWER</text>
        </svg>
      );
    case "Everest Industries":
      return (
        <svg viewBox="0 0 180 50" className="h-9 w-auto select-none pointer-events-none">
          <polygon points="25,12 11,38 39,38" fill="#E21A22" />
          <polygon points="25,12 31,38 39,38" fill="#A81216" />
          <text x="48" y="26" fontFamily="var(--font-display)" fontWeight="900" fontSize="17" fill="#111" letterSpacing="0.5">EVEREST</text>
          <text x="48" y="38" fontFamily="var(--font-body)" fontWeight="600" fontSize="9" fill="#666" letterSpacing="1">INDUSTRIES</text>
        </svg>
      );
    case "Kingspan India":
      return (
        <svg viewBox="0 0 170 50" className="h-9 w-auto select-none pointer-events-none">
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 33 L15 15 L22 22 L29 15 L32 33 Z" stroke="url(#kingspanMarqueeGlow)" strokeWidth="2.5" fill="url(#kingspanMarqueeGlow)" fillOpacity="0.1" />
            <circle cx="15" cy="13" r="2" fill="url(#kingspanMarqueeGlow)" />
            <circle cx="22" cy="20" r="2" fill="url(#kingspanMarqueeGlow)" />
            <circle cx="29" cy="13" r="2" fill="url(#kingspanMarqueeGlow)" />
          </g>
          <defs>
            <linearGradient id="kingspanMarqueeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005B94" />
              <stop offset="100%" stopColor="#00A896" />
            </linearGradient>
          </defs>
          <text x="42" y="27" fontFamily="var(--font-display)" fontWeight="800" fontSize="18" fill="#005B94" letterSpacing="-0.5">Kingspan</text>
          <text x="42" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#00A896" letterSpacing="1.5">INDIA</text>
        </svg>
      );
    case "Metecno India":
      return (
        <svg viewBox="0 0 160 50" className="h-9 w-auto select-none pointer-events-none">
          <rect x="10" y="14" width="12" height="22" rx="1" fill="#E31B23" />
          <rect x="24" y="14" width="12" height="22" rx="1" fill="#2E7D32" />
          <rect x="18" y="18" width="10" height="14" rx="1" fill="#9E9E9E" />
          <text x="44" y="26" fontFamily="var(--font-display)" fontWeight="800" fontSize="17" fill="#2A2A2A" letterSpacing="-0.5">metecno</text>
          <text x="44" y="37" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#E31B23" letterSpacing="1">INDIA</text>
        </svg>
      );
    case "Ashirvad Pipes":
      return (
        <svg viewBox="0 0 170 50" className="h-9 w-auto select-none pointer-events-none">
          <path d="M 12,32 A 16,16 0 0,1 42,32" stroke="#FFC107" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M27 24 C27 21, 29 20, 27 18 C25 20, 27 21, 27 24 Z" fill="#D32F2F" />
          <text x="48" y="27" fontFamily="var(--font-display)" fontWeight="800" fontSize="16" fill="#0D47A1" letterSpacing="-0.5">ashirvad</text>
          <text x="48" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#FFC107" letterSpacing="1">PIPES</text>
        </svg>
      );
    case "Astral Pipes":
      return (
        <svg viewBox="0 0 160 50" className="h-9 w-auto select-none pointer-events-none">
          <path d="M 22 12 L 25 21 L 34 21 L 27 26 L 30 35 L 22 29 L 14 35 L 17 26 L 10 21 L 19 21 Z" fill="#ED1C24" />
          <text x="42" y="26" fontFamily="var(--font-display)" fontWeight="900" fontSize="18" fill="#0054A6" letterSpacing="0.5">ASTRAL</text>
          <text x="42" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#ED1C24" letterSpacing="2">PIPES</text>
        </svg>
      );
    case "Supreme Industries":
      return (
        <svg viewBox="0 0 180 50" className="h-9 w-auto select-none pointer-events-none">
          <polygon points="26,10 40,25 26,40 12,25" fill="#E65100" />
          <text x="26" y="29" fontFamily="var(--font-display)" fontWeight="900" fontSize="9" fill="#FFF" textAnchor="middle">S</text>
          <text x="48" y="26" fontFamily="var(--font-display)" fontWeight="900" fontSize="17" fill="#E65100" letterSpacing="0.5">Supreme</text>
          <text x="48" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#333" letterSpacing="1">INDUSTRIES</text>
        </svg>
      );
    case "Finolex Industries":
      return (
        <svg viewBox="0 0 170 50" className="h-9 w-auto select-none pointer-events-none">
          <circle cx="22" cy="25" r="10" stroke="#01579B" strokeWidth="4.5" fill="none" />
          <ellipse cx="22" cy="25" rx="14" ry="5" stroke="#FF6D00" strokeWidth="2.5" fill="none" transform="rotate(-30 22 25)" />
          <text x="44" y="27" fontFamily="var(--font-display)" fontWeight="900" fontSize="18" fill="#01579B" letterSpacing="-0.5">Finolex</text>
          <text x="44" y="38" fontFamily="var(--font-body)" fontWeight="700" fontSize="9" fill="#FF6D00" letterSpacing="1">INDUSTRIES</text>
        </svg>
      );
    default:
      return <span className="font-bold text-xl">{name}</span>;
  }
}

export function BrandsMarquee() {
  const loop = [...brands, ...brands];
  return (
    <section id="brands" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <div className="p-8 md:p-10 rounded-3xl bg-black/55 backdrop-blur-xl border border-white/15 shadow-2xl">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Brands</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            We carry the names <span className="text-gradient-brand">contractors trust</span>.
          </h2>
          <p className="mt-4 text-neutral-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Officially partnered with every major manufacturer — so your roof is backed by real warranties, not promises.
          </p>
        </div>
      </div>

      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-4 w-max">
          {loop.map((b, i) => (
            <div
              key={`${b}-${i}`}
              className="px-8 py-4 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center min-w-[200px] h-16 hover:shadow-brand hover:border-primary/30 transition-all duration-300"
            >
              <BrandLogo name={b} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured partner cards */}
      <div className="container mx-auto px-6 mt-20 grid md:grid-cols-3 gap-6">
        {[
          { name: "Tata BlueScope Steel", tag: "Corporate Partner", note: "Zincalume® and Clean COLORBOND® high-strength steel systems." },
          { name: "Kingspan India", tag: "Insulated Panel Partner", note: "Global leader in high-performance insulated sandwich panels." },
          { name: "JSW Steel", tag: "Strategic Partner", note: "Premium high-tensile steel roofing and cladding products." },
        ].map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-8 rounded-2xl bg-gradient-card border border-border shadow-elegant overflow-hidden flex flex-col justify-between h-56"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-brand opacity-20 blur-2xl" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-accent">{c.tag}</div>
              <div className="mt-4">
                <BrandLogo name={c.name} />
              </div>
            </div>
            <div className="mt-4 text-xs font-semibold text-muted-foreground leading-relaxed">{c.note}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

