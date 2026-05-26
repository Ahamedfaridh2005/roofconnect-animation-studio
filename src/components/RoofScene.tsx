import { motion } from "motion/react";

/**
 * Animated SVG roof scene — house silhouette draws itself in,
 * sun pulses, clouds drift, raindrops fall onto a sheltering roof.
 */
export function RoofScene() {
  return (
    <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden bg-gradient-sky shadow-elegant">
      {/* Sun */}
      <div className="absolute top-10 right-12 w-28 h-28 rounded-full bg-[oklch(0.85_0.18_75)] blur-2xl opacity-70 animate-sun" />
      <div className="absolute top-12 right-14 w-20 h-20 rounded-full bg-[oklch(0.92_0.15_85)] animate-sun" />

      {/* Clouds */}
      <div className="absolute top-16 left-0 w-full pointer-events-none">
        <div className="animate-cloud inline-block">
          <div className="flex items-center gap-1">
            <div className="w-16 h-10 bg-white/80 rounded-full" />
            <div className="w-10 h-8 bg-white/80 rounded-full -ml-4" />
          </div>
        </div>
      </div>
      <div className="absolute top-32 left-0 w-full pointer-events-none" style={{ animationDelay: "10s" }}>
        <div className="animate-cloud inline-block" style={{ animationDuration: "55s" }}>
          <div className="flex items-center gap-1 opacity-70">
            <div className="w-20 h-12 bg-white rounded-full" />
            <div className="w-12 h-10 bg-white rounded-full -ml-5" />
          </div>
        </div>
      </div>

      {/* Rain over the house */}
      <div className="absolute inset-x-0 top-[40%] flex justify-center gap-2 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="block w-[2px] h-3 bg-primary/50 rounded animate-rain"
            style={{ animationDelay: `${(i % 6) * 0.18}s` }}
          />
        ))}
      </div>

      {/* House — animated SVG drawing */}
      <svg
        viewBox="0 0 600 360"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[640px]"
        fill="none"
      >
        {/* Ground */}
        <motion.line
          x1="0" y1="340" x2="600" y2="340"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        />
        {/* Chimney */}
        <motion.path
          d="M120 200 L120 90 L160 90 L160 200"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />
        {/* Roof peak */}
        <motion.path
          d="M120 200 L300 90 L460 200"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.7 }}
        />
        {/* Roof slope to the right */}
        <motion.path
          d="M460 200 L560 260 L560 280 L80 280"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.4 }}
        />
        {/* roofconnect underline */}
        <motion.line
          x1="200" y1="280" x2="540" y2="280"
          stroke="oklch(0.62 0.22 25)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        />
        {/* Wordmark suggestion */}
        <motion.text
          x="300" y="245"
          textAnchor="middle"
          fontFamily="Space Grotesk"
          fontWeight="700"
          fontSize="42"
          fill="oklch(0.62 0.22 25)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          roofconnect
        </motion.text>
      </svg>
    </div>
  );
}
