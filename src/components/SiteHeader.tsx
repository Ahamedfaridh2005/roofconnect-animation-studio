import { motion } from "motion/react";
import logo from "@/assets/roofconnect-logo.png";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="RoofConnect logo" width={48} height={48} className="rounded-lg" />
          <span className="font-display font-bold text-xl tracking-tight hidden sm:inline">
            roof<span className="text-accent">connect</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#products" className="hover:text-foreground transition-colors">Products</a>
          <a href="#brands" className="hover:text-foreground transition-colors">Brands</a>
          <a href="#process" className="hover:text-foreground transition-colors">Process</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-full bg-gradient-brand text-primary-foreground text-sm font-semibold shadow-brand hover:opacity-95 transition"
        >
          Get a quote
        </a>
      </div>
    </motion.header>
  );
}
