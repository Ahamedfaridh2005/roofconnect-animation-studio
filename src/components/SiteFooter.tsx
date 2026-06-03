import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, ArrowUpRight } from "lucide-react";
import logo from "@/assets/roofconnect-logo.png";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-background/80 backdrop-blur-xl transition-colors duration-300 relative z-10">
      {/* Upper Info Grid */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-border">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="RoofConnect" width={40} height={40} className="rounded-md" />
              <span className="font-display font-bold text-lg text-foreground">
                roof<span className="text-accent">connect</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Curating every type of premium roofing from trusted brands. Compare, sample, and connect with certified local installers in minutes.
            </p>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Office Address</h4>
            <div className="flex items-start gap-3 text-sm text-foreground/90">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">RoofConnect HQ</p>
                <p className="text-muted-foreground mt-1">100 Pine Street, Suite 2400</p>
                <p className="text-muted-foreground">San Francisco, CA 94111</p>
              </div>
            </div>
          </div>

          {/* Contact Details & Email */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:1-800-766-3266" className="flex items-center gap-3 text-sm text-foreground/90 hover:text-accent transition-colors group">
                <Phone className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                <span>1-800-ROOF-CON</span>
              </a>
              <a href="mailto:connect@roofconnect.com" className="flex items-center gap-3 text-sm text-foreground/90 hover:text-accent transition-colors group">
                <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                <span>connect@roofconnect.com</span>
              </a>
              <span className="text-xs text-muted-foreground mt-1 block">Toll-free | 24/7 Customer Support</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-card hover:bg-accent/15 border border-border text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-card hover:bg-accent/15 border border-border text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-card hover:bg-accent/15 border border-border text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-card hover:bg-accent/15 border border-border text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-card hover:bg-accent/15 border border-border text-foreground hover:text-accent transition-all duration-300 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Follow our social channels for design inspiration and installer tips.
            </p>
          </div>
        </div>

        {/* Middle Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12 border-b border-border">
          {/* Column 1: Roofing Types */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-foreground">Roofing Materials</span>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/" hash="products" className="hover:text-accent transition-colors flex items-center gap-1">Asphalt Shingles <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/" hash="products" className="hover:text-accent transition-colors">Standing Seam Metal</Link></li>
              <li><Link to="/" hash="products" className="hover:text-accent transition-colors">Spanish Clay Tile</Link></li>
              <li><Link to="/" hash="products" className="hover:text-accent transition-colors">Premium Slate Roofing</Link></li>
              <li><Link to="/" hash="products" className="hover:text-accent transition-colors">Solar Shingles & Tiles</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions / Services */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-foreground">Our Solutions</span>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="#process" className="hover:text-accent transition-colors">Homeowner Guide</a></li>
              <li><a href="#process" className="hover:text-accent transition-colors">Design & Visualizer</a></li>
              <li><a href="#process" className="hover:text-accent transition-colors">Free Site Consultation</a></li>
              <li><a href="#process" className="hover:text-accent transition-colors">Certified Installer Booking</a></li>
              <li><a href="#process" className="hover:text-accent transition-colors">Brand Partner Network</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-foreground">Company & Trust</span>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="#contact" className="hover:text-accent transition-colors">About RoofConnect</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Careers at RoofConnect</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Partner Installer Program</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Press & Media Kit</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-foreground">Help & Support</span>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><a href="#contact" className="hover:text-accent transition-colors">Customer FAQs</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Roofing Cost Calculator</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Warranty & Installation Quality</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright/legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12">
          <p className="text-xs text-muted-foreground">
            © {currentYear} RoofConnect. All rights reserved. Every roof. One connection.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#contact" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-accent transition-colors">Terms of Use</a>
            <a href="#contact" className="hover:text-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

