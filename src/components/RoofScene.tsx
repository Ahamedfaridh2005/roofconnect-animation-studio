import { motion } from "motion/react";
import { useState } from "react";

/**
 * Animated SVG roof scene — house silhouette draws itself in,
 * sun pulses, clouds drift, raindrops fall onto a sheltering roof.
 * Enhanced with sequential drawing animation, deferred rain/sunlight triggers,
 * and SVG masking to shield the house interior from rain and light.
 */
export function RoofScene() {
  const [isHovered, setIsHovered] = useState(false);

  // Coordinated rain drop & splash timelines (starting after roof forms at ~2.2s)
  const rainTriggers = [
    { cx: 180, cy: 163, delay: 2.2, duration: 1.6, px1: 177, py1: 153, px2: 172, py2: 155, px3: 183, py3: 153, px4: 188, py4: 155 },
    { cx: 240, cy: 127, delay: 2.7, duration: 1.8, px1: 237, py1: 117, px2: 232, py2: 119, px3: 243, py3: 117, px4: 248, py4: 119 },
    { cx: 300, cy: 90,  delay: 2.4, duration: 1.5, px1: 297, py1: 80,  px2: 292, py2: 82,  px3: 303, py3: 80,  px4: 308, py4: 82  },
    { cx: 360, cy: 131, delay: 3.0, duration: 1.7, px1: 357, py1: 121, px2: 352, py2: 123, px3: 363, py3: 121, px4: 368, py4: 123 },
    { cx: 420, cy: 172, delay: 2.5, duration: 1.6, px1: 417, py1: 162, px2: 412, py2: 164, px3: 423, py3: 162, px4: 428, py4: 164 }
  ];

  // 22 background raindrops inside the SVG (starting after 2.2s)
  const bgRaindrops = [
    { x: 40,  delay: 2.3, duration: 1.4 },
    { x: 90,  delay: 2.5, duration: 1.6 },
    { x: 130, delay: 2.8, duration: 1.5 },
    { x: 170, delay: 2.2, duration: 1.3 },
    { x: 210, delay: 2.7, duration: 1.7 },
    { x: 250, delay: 2.4, duration: 1.4 },
    { x: 290, delay: 2.9, duration: 1.6 },
    { x: 320, delay: 2.3, duration: 1.5 },
    { x: 360, delay: 2.6, duration: 1.3 },
    { x: 400, delay: 2.8, duration: 1.7 },
    { x: 440, delay: 2.2, duration: 1.4 },
    { x: 480, delay: 2.5, duration: 1.6 },
    { x: 520, delay: 2.9, duration: 1.5 },
    { x: 560, delay: 2.4, duration: 1.3 },
    { x: 70,  delay: 2.7, duration: 1.6 },
    { x: 150, delay: 2.1, duration: 1.4 },
    { x: 230, delay: 2.6, duration: 1.5 },
    { x: 380, delay: 2.3, duration: 1.7 },
    { x: 460, delay: 2.7, duration: 1.4 },
    { x: 500, delay: 2.1, duration: 1.5 },
    { x: 110, delay: 2.9, duration: 1.3 },
    { x: 340, delay: 2.5, duration: 1.4 }
  ];

  // Sun rays starting from the Sun center at (530, 60)
  const sunRays = [
    { x2: 440, y2: 110, delay: 2.2 },
    { x2: 380, y2: 130, delay: 2.4 },
    { x2: 300, y2: 90,  delay: 2.6 },
    { x2: 220, y2: 140, delay: 2.8 },
    { x2: 145, y2: 165, delay: 3.0 },
    { x2: 80,  y2: 195, delay: 3.2 }
  ];

  return (
    <div
      className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden bg-gradient-sky shadow-elegant transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clouds */}
      <div className="absolute top-16 left-0 w-full pointer-events-none">
        <div className="animate-cloud inline-block">
          <div className="flex items-center gap-1">
            <div className="w-16 h-10 bg-white/80 rounded-full shadow-sm" />
            <div className="w-10 h-8 bg-white/80 rounded-full -ml-4 shadow-sm" />
          </div>
        </div>
      </div>
      <div className="absolute top-32 left-0 w-full pointer-events-none" style={{ animationDelay: "10s" }}>
        <div className="animate-cloud inline-block" style={{ animationDuration: "55s" }}>
          <div className="flex items-center gap-1 opacity-70">
            <div className="w-20 h-12 bg-white rounded-full shadow-sm" />
            <div className="w-12 h-10 bg-white rounded-full -ml-5 shadow-sm" />
          </div>
        </div>
      </div>

      {/* House — animated SVG drawing */}
      <svg
        viewBox="0 0 600 360"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[640px] overflow-visible"
        fill="none"
      >
        <defs>
          {/* Intense neon glow filter for flowing sparks */}
          <filter id="spark-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* SVG Mask to protect/shield the interior of the house from rain and sun rays */}
          <mask id="rain-mask">
            {/* By default, everything is visible (white) */}
            <rect x="-100" y="-100" width="800" height="600" fill="white" />
            {/* House interior column is blocked (black) starting from the ground up to chimney & roof apex */}
            <polygon
              points="80,345 80,280 120,200 120,90 160,90 160,175.5 300,90 460,200 560,260 560,345"
              fill="black"
            />
          </mask>
        </defs>

        {/* --- LAYER 0: SVG SUN & SUN RAYS (Scattered & Masked) --- */}

        {/* SVG Sun glow (behind) */}
        <motion.circle
          cx="530"
          cy="60"
          r="45"
          fill="oklch(0.85 0.18 75)"
          className="opacity-50 blur-xl pointer-events-none"
          animate={{
            scale: isHovered ? [1, 1.15, 1] : [1, 1.04, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        />

        {/* SVG Sun body */}
        <motion.circle
          cx="530"
          cy="60"
          r="26"
          fill="oklch(0.92 0.15 85)"
          className="pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1.12 : 1,
            opacity: 1
          }}
          transition={{
            scale: { duration: 0.4 },
            opacity: { duration: 1.0, delay: 0.5 }
          }}
        />

        {/* Sun Rays - masked to protect the house interior */}
        <g mask="url(#rain-mask)">
          {sunRays.map((ray, idx) => (
            <motion.line
              key={`sun-ray-${idx}`}
              x1="530"
              y1="60"
              x2={ray.x2}
              y2={ray.y2}
              stroke="oklch(0.92 0.15 85 / 0.15)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                stroke: isHovered
                  ? ["oklch(0.92 0.15 85 / 0.25)", "oklch(0.92 0.15 85 / 0.1)", "oklch(0.92 0.15 85 / 0.25)"]
                  : "oklch(0.92 0.15 85 / 0.15)"
              }}
              transition={{
                pathLength: { duration: 1.2, delay: ray.delay, ease: "easeOut" },
                stroke: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: idx * 0.3 }
              }}
            />
          ))}
        </g>


        {/* --- LAYER 1: AMBIENT GLOW BACKDROPS (Pulsing) --- */}

        {/* Chimney Glow */}
        <motion.path
          d="M120 200 L120 90 L160 90 L160 200"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="12"
          strokeLinecap="round"
          className="opacity-15 blur-sm pointer-events-none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity: isHovered ? 0.35 : 0.15,
          }}
          transition={{
            pathLength: { duration: 1.4, delay: 0.4 },
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
        />

        {/* Roof Peak Glow */}
        <motion.path
          d="M120 200 L300 90 L460 200"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-15 blur-md pointer-events-none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity: isHovered ? 0.4 : 0.15,
          }}
          transition={{
            pathLength: { duration: 1.8, delay: 0.7 },
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
        />

        {/* Roof slope right Glow */}
        <motion.path
          d="M460 200 L560 260 L560 280 L80 280"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-15 blur-md pointer-events-none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity: isHovered ? 0.4 : 0.15,
          }}
          transition={{
            pathLength: { duration: 1.8, delay: 1.4 },
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
        />

        {/* Underline Glow */}
        <motion.line
          x1="200" y1="280" x2="540" y2="280"
          stroke="oklch(0.62 0.22 25)"
          strokeWidth="14"
          strokeLinecap="round"
          className="opacity-20 blur-sm pointer-events-none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            opacity: isHovered ? 0.5 : 0.2,
          }}
          transition={{
            pathLength: { duration: 1, delay: 2.2 },
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
        />


        {/* --- LAYER 2: STRUCTURAL BASE LINES --- */}

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
          animate={{
            pathLength: 1,
            strokeWidth: isHovered ? 7.5 : 6,
          }}
          transition={{
            pathLength: { duration: 1.4, delay: 0.4 },
            strokeWidth: { duration: 0.3 },
          }}
        />

        {/* Roof peak */}
        <motion.path
          d="M120 200 L300 90 L460 200"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            strokeWidth: isHovered ? 8.5 : 7,
          }}
          transition={{
            pathLength: { duration: 1.8, delay: 0.7 },
            strokeWidth: { duration: 0.3 },
          }}
        />

        {/* Roof slope to the right */}
        <motion.path
          d="M460 200 L560 260 L560 280 L80 280"
          stroke="oklch(0.55 0.18 250)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            strokeWidth: isHovered ? 8.5 : 7,
          }}
          transition={{
            pathLength: { duration: 1.8, delay: 1.4 },
            strokeWidth: { duration: 0.3 },
          }}
        />

        {/* roofconnect underline */}
        <motion.line
          x1="200" y1="280" x2="540" y2="280"
          stroke="oklch(0.62 0.22 25)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            strokeWidth: isHovered ? 7.5 : 6,
          }}
          transition={{
            pathLength: { duration: 1, delay: 2.2 },
            strokeWidth: { duration: 0.3 },
          }}
        />


        {/* --- LAYER 3: CONTINUOUS ENERGY FLOW SPARKS (Dashed loop) --- */}

        {/* Chimney Energy Spark */}
        <motion.path
          d="M120 200 L120 90 L160 90 L160 200"
          stroke="oklch(0.68 0.16 245)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="25 150"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            strokeDashoffset: [0, -175]
          }}
          transition={{
            opacity: { duration: 0.4, delay: 2.6 },
            strokeDashoffset: {
              repeat: Infinity,
              ease: "linear",
              duration: isHovered ? 1.2 : 2.5,
              delay: 2.6
            }
          }}
          className="pointer-events-none"
          filter="url(#spark-glow)"
        />

        {/* Roof Peak Energy Spark */}
        <motion.path
          d="M120 200 L300 90 L460 200"
          stroke="oklch(0.68 0.16 245)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="45 280"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            strokeDashoffset: [0, -325]
          }}
          transition={{
            opacity: { duration: 0.4, delay: 2.6 },
            strokeDashoffset: {
              repeat: Infinity,
              ease: "linear",
              duration: isHovered ? 1.5 : 3.5,
              delay: 2.6
            }
          }}
          className="pointer-events-none"
          filter="url(#spark-glow)"
        />

        {/* Right slope Energy Spark */}
        <motion.path
          d="M460 200 L560 260 L560 280 L80 280"
          stroke="oklch(0.68 0.16 245)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="50 350"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            strokeDashoffset: [0, -400]
          }}
          transition={{
            opacity: { duration: 0.4, delay: 2.6 },
            strokeDashoffset: {
              repeat: Infinity,
              ease: "linear",
              duration: isHovered ? 1.8 : 4.2,
              delay: 2.6
            }
          }}
          className="pointer-events-none"
          filter="url(#spark-glow)"
        />

        {/* Underline Energy Spark (Red/Orange Accent) */}
        <motion.line
          x1="200" y1="280" x2="540" y2="280"
          stroke="oklch(0.72 0.2 28)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="35 220"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            strokeDashoffset: [0, -255]
          }}
          transition={{
            opacity: { duration: 0.4, delay: 2.6 },
            strokeDashoffset: {
              repeat: Infinity,
              ease: "linear",
              duration: isHovered ? 1 : 2.2,
              delay: 2.6
            }
          }}
          className="pointer-events-none"
          filter="url(#spark-glow)"
        />


        {/* --- LAYER 4: DETAILED RAIN & SPLASHES (Masked/Shielded) --- */}

        {/* Group containing all rain (both falling drops and splashes) masked by #rain-mask */}
        <g mask="url(#rain-mask)">
          {/* Background Raindrops */}
          {bgRaindrops.map((drop, idx) => (
            <motion.line
              key={`bg-drop-${idx}`}
              x1={drop.x}
              y1={-50}
              x2={drop.x}
              y2={-30}
              stroke="oklch(0.55 0.18 250 / 0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, 420],
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: drop.duration,
                delay: drop.delay,
                times: [0, 0.1, 0.9, 1],
                ease: "linear"
              }}
            />
          ))}

          {/* Synchronized Landing Raindrops */}
          {rainTriggers.map((splash, idx) => (
            <g key={`rain-grp-${idx}`} className="pointer-events-none">
              {/* 1. Coordinated falling raindrop */}
              <motion.line
                x1={splash.cx}
                y1={splash.cy - 120}
                x2={splash.cx}
                y2={splash.cy - 100}
                stroke="oklch(0.68 0.16 245 / 0.75)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, 16.7, 91.7, 100, 100],
                  opacity: [0, 0.8, 0.8, 0, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: splash.duration,
                  delay: splash.delay,
                  times: [0, 0.1, 0.55, 0.6, 1],
                  ease: "linear",
                }}
              />

              {/* 2. Expanding splash ripple ring */}
              <motion.ellipse
                cx={splash.cx}
                cy={splash.cy}
                rx={7}
                ry={2.5}
                stroke="oklch(0.68 0.16 245)"
                strokeWidth="1.2"
                fill="none"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{
                  scale: [0.2, 0.2, 0.5, 1.4, 0.2],
                  opacity: [0, 0, 0.8, 0, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: splash.duration,
                  delay: splash.delay,
                  times: [0, 0.6, 0.65, 0.9, 1],
                  ease: "easeOut",
                }}
              />

              {/* 3. Splattering spray droplets */}
              <motion.path
                d={`M ${splash.cx} ${splash.cy} Q ${splash.px1} ${splash.py1} ${splash.px2} ${splash.py2} M ${splash.cx} ${splash.cy} Q ${splash.px3} ${splash.py3} ${splash.px4} ${splash.py4}`}
                stroke="oklch(0.68 0.16 245)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0, 0.2, 1, 1],
                  opacity: [0, 0, 0.8, 0, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: splash.duration,
                  delay: splash.delay,
                  times: [0, 0.6, 0.65, 0.9, 1],
                  ease: "easeOut",
                }}
              />
            </g>
          ))}
        </g>


        {/* --- LAYER 5: BRAND WORDMARK --- */}

        {/* Wordmark Suggestion with responsive shadow and scale */}
        <motion.text
          x="300"
          y="245"
          textAnchor="middle"
          fontFamily="Space Grotesk"
          fontWeight="700"
          fontSize="42"
          fill="oklch(0.62 0.22 25)"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isHovered ? 1.03 : 1,
            fill: isHovered ? "oklch(0.65 0.24 28)" : "oklch(0.62 0.22 25)",
          }}
          transition={{
            opacity: { duration: 0.6, delay: 2.6 },
            y: { duration: 0.6, delay: 2.6 },
            scale: { duration: 0.3 },
            fill: { duration: 0.3 },
          }}
          style={{ transformOrigin: "300px 230px" }}
          className="select-none"
        >
          roofconnect
        </motion.text>
      </svg>
    </div>
  );
}


