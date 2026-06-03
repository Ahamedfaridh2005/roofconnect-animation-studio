import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db, Product, Project } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Hammer,
  HelpCircle,
  Info,
  MapPin,
  Maximize2,
  MessageSquare,
  Paintbrush,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Video,
  X
} from "lucide-react";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailsPage
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const router = useRouter();

  const product = useMemo(() => db.getProductById(productId), [productId]);

  // Quote Form State
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteArea, setQuoteArea] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");

  // Site Visit Form State
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [visitName, setVisitName] = useState("");
  const [visitEmail, setVisitEmail] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitMessage, setVisitMessage] = useState("");

  // Calculator State
  const [calcLength, setCalcLength] = useState<number | "">(20);
  const [calcWidth, setCalcWidth] = useState<number | "">(15);
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number>(0);

  // Gallery Filtering
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Industrial'>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <SiteHeader />
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold">Product not found</h2>
          <p className="mt-4 text-muted-foreground">The roofing product you requested does not exist or has been removed.</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-brand text-primary-foreground font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  // Get matching projects
  const projects = useMemo(() => db.getProjectsByProduct(product.id), [product.id]);
  const filteredProjects = useMemo(() => {
    if (galleryFilter === 'All') return projects;
    return projects.filter(p => p.projectType === galleryFilter);
  }, [projects, galleryFilter]);

  // Calculator computations
  const calculatorResults = useMemo(() => {
    if (!calcLength || !calcWidth) return { area: 0, sheetsNeeded: 0, cost: 0 };
    const area = calcLength * calcWidth;
    const selectedSpec = product.specifications[selectedSpecIndex];
    const cost = area * (selectedSpec?.pricePerSqFt || 0);

    // Simple sheet count estimation
    // Parse width from sheetWidth e.g. "3.5 Feet (1070mm)"
    let widthFt = 3.5;
    if (product.sheetWidth.includes("4 Feet")) widthFt = 4;
    else if (product.sheetWidth.includes("3.28 Feet")) widthFt = 3.28;

    // Assume average sheet length of 10 feet for calculation if custom
    const lengthFt = 10;
    const sheetArea = widthFt * lengthFt;
    const sheetsNeeded = Math.ceil(area / sheetArea);

    return { area, sheetsNeeded, cost };
  }, [calcLength, calcWidth, selectedSpecIndex, product]);

  // Submit Inquiry handlers
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone || !quoteEmail) {
      toast.error("Please fill in all required fields.");
      return;
    }

    db.addInquiry({
      customerName: quoteName,
      customerEmail: quoteEmail,
      customerPhone: quotePhone,
      productType: product.id,
      inquiryType: "Quote",
      area: quoteArea ? parseFloat(quoteArea) : undefined,
      message: quoteMessage || `Customer requested a price quote for ${product.name}.`
    });

    toast.success("Quote request submitted successfully! We will contact you shortly.");
    setIsQuoteOpen(false);
    // Reset
    setQuoteName("");
    setQuoteEmail("");
    setQuotePhone("");
    setQuoteArea("");
    setQuoteMessage("");
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitName || !visitPhone || !visitDate) {
      toast.error("Please fill in Name, Phone, and preferred Date.");
      return;
    }

    db.addInquiry({
      customerName: visitName,
      customerEmail: visitEmail,
      customerPhone: visitPhone,
      productType: product.id,
      inquiryType: "Site Visit",
      message: `Preferred Date: ${visitDate}. Notes: ${visitMessage || "None"}`
    });

    toast.success("Site visit booked! Our team will confirm the schedule.");
    setIsVisitOpen(false);
    setVisitName("");
    setVisitEmail("");
    setVisitPhone("");
    setVisitDate("");
    setVisitMessage("");
  };

  // Carousel Next/Prev logic
  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % filteredProjects.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SiteHeader />

      <main className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          {/* 1. Product Banner */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Banner Image */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-elegant group aspect-[4/3] border border-border"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 text-white">
                <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent animate-sun" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-300">Warranty</div>
                    <div className="text-sm font-bold">{product.warranty}</div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur border border-white/10 flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-sky-400" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-300">Support</div>
                    <div className="text-sm font-bold">Pro Install</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Banner Details */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 animate-sun" />
                Featured Product
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {product.name}
              </h1>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Key Features Badge Grid */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-2.5">
                  {product.keyFeatures.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-foreground shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Install Support Info */}
              <div className="mt-8 p-5 rounded-2xl bg-secondary/50 border border-border flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Premium Installation Support</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {product.installationSupport}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 2. Product Specifications & Price Calculator */}
          <div className="grid lg:grid-cols-5 gap-12 mb-24 items-start">
            {/* Spec Table */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Engineering Datasheet</span>
                <h2 className="mt-2 text-3xl font-bold text-foreground">Product Specifications</h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-colors">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary/70 border-b border-border">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Thickness</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Price / Sq.Ft</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Warranty</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Usage Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {product.specifications.map((spec, i) => (
                        <tr
                          key={i}
                          onClick={() => setSelectedSpecIndex(i)}
                          className={`hover:bg-accent/5 transition-colors cursor-pointer ${
                            selectedSpecIndex === i ? "bg-accent/10 border-l-4 border-l-accent" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">{spec.thickness}</td>
                          <td className="px-6 py-4 text-sm font-bold text-accent">₹{spec.pricePerSqFt}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{spec.warranty}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{spec.recommendedUsage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-secondary/20 border-t border-border grid sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Standard Width</div>
                    <div className="mt-1 font-bold text-foreground">{product.sheetWidth}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Standard Length</div>
                    <div className="mt-1 font-bold text-foreground">{product.sheetLength}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Color Options</div>
                    <div className="mt-1 font-bold text-foreground">{product.colors.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Heat Shielding</div>
                    <div className="mt-1 font-bold text-foreground flex items-center gap-1">
                      <Flame className="w-4 h-4 text-amber-500" />
                      {product.heatResistance}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Calculator */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Interactive Tool</span>
                <h2 className="mt-2 text-3xl font-bold text-foreground">Cost Estimator</h2>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card shadow-elegant relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-muted-foreground">
                  <Calculator className="w-24 h-24" />
                </div>

                <div className="space-y-5 relative z-10">
                  {/* Select Spec */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Selected Thickness
                    </label>
                    <select
                      value={selectedSpecIndex}
                      onChange={(e) => setSelectedSpecIndex(parseInt(e.target.value))}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-accent transition"
                    >
                      {product.specifications.map((spec, i) => (
                        <option key={i} value={i}>
                          {spec.thickness} (₹{spec.pricePerSqFt}/sq.ft)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Length (Feet)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={calcLength}
                          onChange={(e) => setCalcLength(e.target.value === "" ? "" : Math.max(0, parseFloat(e.target.value)))}
                          placeholder="e.g. 20"
                          className="w-full p-3 pl-9 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition font-semibold"
                        />
                        <Ruler className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Width (Feet)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={calcWidth}
                          onChange={(e) => setCalcWidth(e.target.value === "" ? "" : Math.max(0, parseFloat(e.target.value)))}
                          placeholder="e.g. 15"
                          className="w-full p-3 pl-9 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition font-semibold"
                        />
                        <Ruler className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Calculations Output */}
                  <div className="pt-6 border-t border-border space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total Roof Area:</span>
                      <span className="font-bold text-foreground">{calculatorResults.area.toLocaleString()} sq.ft</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        Est. Sheets Required:
                        <span title="Based on standard panel size layout including 10% overlap waste">
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help" />
                        </span>
                      </span>
                      <span className="font-bold text-foreground">~ {calculatorResults.sheetsNeeded} units</span>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex justify-between items-center">
                      <span className="font-bold text-accent">Estimated Price:</span>
                      <span className="text-2xl font-black text-accent">
                        ₹{calculatorResults.cost.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[11px] text-muted-foreground text-center flex items-center gap-1.5 justify-center leading-relaxed">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      Estimates exclude local transport taxes, structural steel framing, and labor fees.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Completed Projects Gallery */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">Portfolio Showcase</span>
                <h2 className="mt-2 text-4xl font-bold text-foreground">Our Recent Installations</h2>
                <p className="mt-2 text-muted-foreground">Real completed roofing installations engineered by RoofConnect.</p>
              </div>

              {/* Filtering */}
              <div className="flex flex-wrap gap-2">
                {(['All', 'Residential', 'Commercial', 'Industrial'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setGalleryFilter(type)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition border ${
                      galleryFilter === type
                        ? "bg-accent text-accent-foreground border-accent shadow-brand"
                        : "bg-card text-muted-foreground border-border hover:bg-accent/5 hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-border rounded-3xl bg-secondary/10">
                <p className="text-muted-foreground font-semibold">No recent projects uploaded yet in this category.</p>
                <Link to="/admin" className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent font-bold hover:underline">
                  Go to Admin Panel to upload a project <span>→</span>
                </Link>
              </div>
            ) : (
              /* Masonry/Grid Showcase */
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="group relative rounded-2xl overflow-hidden bg-card border border-border flex flex-col shadow-elegant cursor-pointer"
                    onClick={() => {
                      if (project.reelUrl) {
                        window.open(project.reelUrl, "_blank");
                      } else {
                        setActivePhotoIndex(idx);
                      }
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Hover Overlay Magnifier / Video Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-3.5 bg-black/60 backdrop-blur rounded-full text-white border border-white/25">
                          {project.reelUrl ? (
                            <Video className="w-5 h-5" />
                          ) : (
                            <Maximize2 className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {/* Metadata badges inside image */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-accent/90 text-accent-foreground">
                        {project.projectType}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold text-foreground text-base group-hover:text-accent transition-colors line-clamp-1">
                        {project.title}
                      </h4>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-accent" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <Ruler className="w-3.5 h-3.5 shrink-0 text-accent" />
                          <span>{project.area.toLocaleString()} sq.ft</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0 text-accent" />
                          <span>{project.completionDate}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Inquiry & Dynamic Contact Section */}
          <section className="p-8 md:p-12 rounded-3xl bg-gradient-hero text-white relative overflow-hidden shadow-elegant border border-white/10 mb-12">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-white select-none pointer-events-none">
              <Users className="w-48 h-48" />
            </div>

            <div className="max-w-3xl relative z-10">
              <span className="text-accent-glow font-bold text-sm uppercase tracking-wider">Start Your Project</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold">Ready to connect your roof?</h2>
              <p className="mt-4 text-neutral-200 text-base md:text-lg leading-relaxed">
                Connect directly with RoofConnect's engineering office. Request an estimated quote or book a certified technician to inspect your site structure.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-accent text-white font-bold hover:bg-accent-glow shadow-brand transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4.5 h-4.5" />
                  Request Quote
                </button>

                <button
                  onClick={() => setIsVisitOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-white/10 backdrop-blur text-white font-bold hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  Book Site Visit
                </button>

                <a
                  href={`https://wa.me/919876543210?text=Hi%20RoofConnect,%20I'm%20interested%20in%20your%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold hover:opacity-95 shadow-lg transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  WhatsApp
                </a>

                <a
                  href="tel:+919876543210"
                  className="px-6 py-3.5 rounded-full bg-background/25 border border-white/10 text-white font-bold hover:bg-background/40 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4.5 h-4.5" />
                  Call Now
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Image */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-6 p-3 rounded-full bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo Wrap */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={filteredProjects[activePhotoIndex].image}
                alt={filteredProjects[activePhotoIndex].title}
                className="w-full max-h-[70vh] object-contain bg-neutral-900"
              />
              <div className="p-6 bg-neutral-900 text-white border-t border-white/10">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-accent/90 text-accent-foreground inline-block mb-2">
                  {filteredProjects[activePhotoIndex].projectType}
                </span>
                <h3 className="text-xl font-bold">{filteredProjects[activePhotoIndex].title}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent" /> {filteredProjects[activePhotoIndex].location}</div>
                  <div className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5 text-accent" /> {filteredProjects[activePhotoIndex].area.toLocaleString()} sq.ft</div>
                  <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-accent" /> Completed: {filteredProjects[activePhotoIndex].completionDate}</div>
                </div>
              </div>
            </motion.div>

            {/* Next Image */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-6 p-3 rounded-full bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REQUEST QUOTE DIALOG */}
      <AnimatePresence>
        {isQuoteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg p-6 rounded-3xl bg-card border border-border shadow-2xl"
            >
              <button
                onClick={() => setIsQuoteOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:bg-accent/10 hover:text-foreground transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-accent animate-sun" />
                <h3 className="text-xl font-bold text-foreground">Request Price Quote</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Receive a detailed structural quote breakdown for <span className="font-semibold text-foreground">{product.name}</span>.
              </p>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                      placeholder="e.g. +91 9999999999"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Est. Roof Area (Sq.Ft)
                    </label>
                    <input
                      type="number"
                      value={quoteArea}
                      onChange={(e) => setQuoteArea(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                      placeholder="e.g. 1500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteEmail}
                    onChange={(e) => setQuoteEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Project Requirements / Message
                  </label>
                  <textarea
                    rows={3}
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm resize-none"
                    placeholder="Specific thickness requirements, colors, building framework type, etc."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-brand text-primary-foreground font-bold hover:opacity-95 shadow-brand transition-all text-sm"
                  >
                    Submit Quote Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOOK SITE VISIT DIALOG */}
      <AnimatePresence>
        {isVisitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg p-6 rounded-3xl bg-card border border-border shadow-2xl"
            >
              <button
                onClick={() => setIsVisitOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:bg-accent/10 hover:text-foreground transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-accent animate-sun" />
                <h3 className="text-xl font-bold text-foreground">Schedule Free Site Measurement</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Choose a preferred date. A RoofConnect engineer will call to confirm alignment, inspect structural integrity, and take precise dimensions.
              </p>

              <form onSubmit={handleVisitSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={visitName}
                    onChange={(e) => setVisitName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                      placeholder="e.g. +91 9999999999"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={visitEmail}
                    onChange={(e) => setVisitEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Site Location Address / Remarks
                  </label>
                  <textarea
                    rows={3}
                    value={visitMessage}
                    onChange={(e) => setVisitMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition text-sm resize-none"
                    placeholder="Enter project location address, site access conditions, or preferred time slots."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-brand text-primary-foreground font-bold hover:opacity-95 shadow-brand transition-all text-sm"
                  >
                    Confirm Booking Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
