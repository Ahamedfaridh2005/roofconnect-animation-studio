import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sun, Moon, LayoutDashboard } from "lucide-react";
import logo from "@/assets/roofconnect-logo.png";

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const initialTheme = savedTheme || "dark"; // Default premium dark theme
      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border transition-colors duration-300"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="RoofConnect logo" width={48} height={48} className="rounded-lg" />
          <span className="font-display font-bold text-xl tracking-tight hidden sm:inline text-foreground">
            roof<span className="text-accent">connect</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/" hash="products" className="hover:text-foreground transition-colors">Products</Link>
          <a href="#brands" className="hover:text-foreground transition-colors">Brands</a>
          <a href="#process" className="hover:text-foreground transition-colors">Process</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          <Link to="/admin" className="flex items-center gap-1.5 hover:text-accent font-semibold transition-colors text-foreground/90">
            <LayoutDashboard className="w-4 h-4" />
            Admin Panel
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border bg-card text-foreground hover:bg-accent/15 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-500 animate-sun" />
            ) : (
              <Moon className="w-4 h-4 text-blue-500" />
            )}
          </button>

          <Link
            to="/admin"
            className="px-5 py-2.5 rounded-full bg-gradient-brand text-primary-foreground text-sm font-semibold shadow-brand hover:opacity-95 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
