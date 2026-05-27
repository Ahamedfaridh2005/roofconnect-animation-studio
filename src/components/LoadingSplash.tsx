import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import logo from "@/assets/roofconnect-logo.png";
import asphalt from "@/assets/product-asphalt.jpg";
import metal from "@/assets/product-metal.jpg";
import clay from "@/assets/product-clay.jpg";
import slate from "@/assets/product-slate.jpg";
import wood from "@/assets/product-wood.jpg";
import solar from "@/assets/product-solar.jpg";

const images = [asphalt, metal, clay, slate, wood, solar];

export function LoadingSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-background"
        >
          {/* Real roof product images collage */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1">
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="relative overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover blur-[3px] scale-105"
                />
              </motion.div>
            ))}
          </div>

          {/* Subtle brand wash so logo stays readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/30 to-accent/40" />
          <div className="absolute inset-0 bg-background/20" />

          {/* Animated rain lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: "-20%", opacity: 0 }}
                animate={{ y: "120%", opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 1.4 + Math.random(),
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 w-px h-16 bg-gradient-to-b from-transparent via-white/70 to-transparent"
                style={{ left: `${(i / 24) * 100}%` }}
              />
            ))}
          </div>

          {/* Center logo */}
          <div className="relative h-full w-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-accent/40 blur-3xl"
              />
              <img
                src={logo}
                alt="RoofConnect"
                className="relative w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Roof<span className="text-accent">Connect</span>
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Every roof. One connection.
              </p>
            </motion.div>

            {/* Roof symbol spinner */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Rotating circular track */}
                <motion.svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="50" cy="50" r="44"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="60 220"
                  />
                </motion.svg>

                {/* Pulsing roof/house icon in the center */}
                <motion.svg
                  viewBox="0 0 64 64"
                  className="relative w-12 h-12"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Roof triangle */}
                  <motion.path
                    d="M6 34 L32 10 L58 34"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1] }}
                    transition={{ duration: 1.6, times: [0, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* House body */}
                  <motion.path
                    d="M12 32 L12 54 L52 54 L52 32"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 0, 1] }}
                    transition={{ duration: 1.6, times: [0, 0.4, 1], repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.svg>
              </div>
              <motion.p
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                Building your roof…
              </motion.p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
