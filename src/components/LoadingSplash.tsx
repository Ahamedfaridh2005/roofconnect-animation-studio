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
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const totalDuration = 3200; // 3.2 seconds
    const intervalTime = 30; // 30ms per step
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);

        // Transition: hold at 100% for 600ms before fading out splash screen to open homepage
        setTimeout(() => {
          setShow(false);
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Compute drawing path lengths based on current progress percentage
  const getPathLength = (start: number, end: number) => {
    return Math.max(0, Math.min(1, (progress - start) / (end - start)));
  };

  const baselineLength = getPathLength(5, 22);
  const tallColumnLength = getPathLength(18, 38);
  const innerChevronLength = getPathLength(35, 52);
  const roofLength = getPathLength(48, 70);
  const textClipWidth = progress < 62 ? 0 : Math.min(320, ((progress - 62) / 33) * 320);

  // Compute spark coordinates tracing the roof slope (draws between progress 48% and 70%)
  let sparkX = 0;
  let sparkY = 0;
  let showSpark = false;

  if (progress >= 48 && progress <= 70) {
    showSpark = true;
    const t = (progress - 48) / 22; // 0 to 1
    if (t <= 0.5) {
      const ratio = t / 0.5; // 0 to 1
      sparkX = 68 + 72 * ratio;
      sparkY = 114 - 54 * ratio;
    } else {
      const ratio = (t - 0.5) / 0.5; // 0 to 1
      sparkX = 140 + 78 * ratio;
      sparkY = 60 + 66 * ratio;
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-background"
        >
          {/* Real roof product images collage */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 bg-black">
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden w-full h-full"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Center logo and glassmorphic card */}
          <div className="relative h-full w-full flex flex-col items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative flex flex-col items-center p-8 md:p-10 rounded-3xl bg-background/50 backdrop-blur-xl border border-white/10 shadow-2xl max-w-md w-full"
            >
              {/* Outer ambient glow */}
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl -z-10"
              />

              {/* Dynamic SVG Loader representing the exact RoofConnect logo */}
              <div className="relative w-full max-w-[340px] h-48 flex items-center justify-center">
                <svg
                  viewBox="0 0 460 220"
                  className="w-full h-full overflow-visible"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <clipPath id="textClip">
                      <rect
                        x="120"
                        y="40"
                        height="160"
                        width={textClipWidth}
                      />
                    </clipPath>
                  </defs>

                  {/* Faint structure guides in the background */}
                  <path
                    d="M 30 160 L 420 160"
                    stroke="var(--foreground)"
                    strokeOpacity="0.04"
                    strokeWidth="8"
                  />
                  <path
                    d="M 40 160 L 40 45 L 105 45 L 105 160"
                    stroke="var(--foreground)"
                    strokeOpacity="0.04"
                    strokeWidth="8"
                  />
                  <path
                    d="M 60 160 L 60 100 L 90 100 L 90 160"
                    stroke="var(--foreground)"
                    strokeOpacity="0.04"
                    strokeWidth="6"
                  />
                  <path
                    d="M 65 135 L 135 80 L 225 145"
                    stroke="var(--foreground)"
                    strokeOpacity="0.04"
                    strokeWidth="8"
                  />

                  {/* Animated Baseline (Blue) */}
                  <motion.path
                    d="M 30 160 L 420 160"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    strokeLinecap="square"
                    style={{ pathLength: baselineLength }}
                  />

                  {/* Animated Tall Column (Blue) */}
                  <motion.path
                    d="M 80 160 L 80 48 L 40 48 L 40 160"
                    stroke="var(--primary)"
                    strokeWidth="11"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    style={{ pathLength: tallColumnLength }}
                  />

                  {/* Animated Inner Chevron Wall (Blue) */}
                  <motion.path
                    d="M 104 160 L 104 126 L 80 102"
                    stroke="var(--primary)"
                    strokeWidth="8.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    style={{ pathLength: innerChevronLength }}
                  />

                  {/* Animated Main Roof with glow (Blue) */}
                  <motion.path
                    d="M 68 114 L 140 60 L 218 126"
                    stroke="var(--primary)"
                    strokeWidth="16"
                    className="opacity-20 blur-sm pointer-events-none"
                    style={{ pathLength: roofLength }}
                  />
                  <motion.path
                    d="M 68 114 L 140 60 L 218 126"
                    stroke="var(--primary)"
                    strokeWidth="10"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    style={{ pathLength: roofLength }}
                  />

                  {/* Animated letters "roofconnect" in red (Accent) using exact Space Grotesk text element clipped */}
                  <g clipPath="url(#textClip)">
                    {/* Custom red roof peak on the 'r' */}
                    <path
                      d="M 129 123 L 136 115 L 143 123"
                      stroke="var(--accent)"
                      strokeWidth="4"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />

                    {/* Highly-accurate professional bold text */}
                    <text
                      x="130"
                      y="154"
                      fill="var(--accent)"
                      fontSize="44"
                      fontWeight="700"
                      letterSpacing="-0.04em"
                      style={{ fontFamily: "var(--font-display)", pointerEvents: "none" }}
                    >
                      roofconnect
                    </text>
                  </g>

                  {/* Glowing spark tracing the main roof slope */}
                  {showSpark && (
                    <>
                      <circle
                        cx={sparkX}
                        cy={sparkY}
                        r="12"
                        fill="var(--primary)"
                        className="opacity-25 blur-[3px]"
                      />
                      <circle
                        cx={sparkX}
                        cy={sparkY}
                        r="5"
                        fill="white"
                        className="shadow-[0_0_10px_#fff]"
                      />
                    </>
                  )}
                </svg>
              </div>

              {/* Brand Subtitle */}
              <div className="mt-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">
                  Every roof. One connection.
                </p>
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

