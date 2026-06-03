// Client-side local database syncing with localStorage.
// Safe for SSR (Server-Side Rendering) in TanStack Start.
import upvcImage from "@/assets/product-upvc.png";
import upvcProject1 from "@/assets/project-upvc-1.png";
import upvcProject2 from "@/assets/project-upvc-2.png";

export interface Specification {
  thickness: string;
  pricePerSqFt: number;
  warranty: string;
  recommendedUsage: string;
}

export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  warranty: string;
  installationSupport: string;
  keyFeatures: string[];
  sheetWidth: string;
  sheetLength: string;
  colors: string[];
  heatResistance: string;
  waterResistance: string;
  specifications: Specification[];
}

export interface Project {
  id: string;
  title: string;
  productType: string; // matches product.id
  location: string;
  projectType: 'Residential' | 'Commercial' | 'Industrial';
  area: number; // sq.ft
  completionDate: string;
  image: string;
  reelUrl?: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productType: string;
  inquiryType: 'Quote' | 'Site Visit' | 'Callback';
  area?: number;
  message?: string;
  status: 'New' | 'Contacted' | 'Resolved';
  createdAt: string;
}

// Seed Data
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "upvc-roofing",
    name: "UPVC Roofing Sheets",
    shortDesc: "Excellent heat insulation, corrosion resistance, and high structural durability for industrial and residential use.",
    description: "UPVC (Unplasticized Polyvinyl Chloride) Roofing Sheets are a state-of-the-art solution designed to withstand harsh weather conditions. Offering excellent chemical resistance, heat-insulating capabilities, and sound dampening properties, they are the go-to choice for modern industrial warehouses, factories, and premium residential spaces.",
    image: upvcImage,
    warranty: "10 Years",
    installationSupport: "Full professional site assessment, detailed structural drafting, and expert execution.",
    keyFeatures: ["High Corrosion Resistance", "Superior Thermal Insulation", "Excellent Sound Dampening", "Eco-friendly & Recyclable", "UV Resistant Layer"],
    sheetWidth: "3.5 Feet (1070mm)",
    sheetLength: "Custom (up to 20 Feet)",
    colors: ["Terracotta Red", "Forest Green", "Royal Blue", "Slate Grey"],
    heatResistance: "Reduces under-roof temperature by up to 5°C-8°C",
    waterResistance: "100% waterproof with seamless overlap joints",
    specifications: [
      { thickness: "1.5 MM", pricePerSqFt: 75, warranty: "5 Years", recommendedUsage: "Residential Carports" },
      { thickness: "2.0 MM", pricePerSqFt: 95, warranty: "10 Years", recommendedUsage: "Residential & Light Commercial" },
      { thickness: "2.5 MM", pricePerSqFt: 120, warranty: "10 Years", recommendedUsage: "Commercial Warehouses" },
      { thickness: "3.0 MM", pricePerSqFt: 145, warranty: "12 Years", recommendedUsage: "Heavy Industrial Plants" }
    ]
  },
  {
    id: "polycarbonate-sheets",
    name: "Polycarbonate Sheets",
    shortDesc: "High transparency, high impact strength, and UV coating. Ideal for skylights and pergolas.",
    description: "Engineered for maximum daylighting and structural strength, our Polycarbonate Roofing Sheets provide up to 85% light transmission while blocking 99.9% of harmful UV rays. Virtually unbreakable, they are perfect for skylights, carports, domes, greenhouses, and stylish outdoor pergolas.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    warranty: "10 Years against yellowing",
    installationSupport: "Precision framing layout guide, customized flashing trim installation, and specialist support.",
    keyFeatures: ["Virtually Unbreakable", "85% Light Transmission", "Double-Sided UV Protection", "Lightweight & Flexible", "Flame Retardant"],
    sheetWidth: "4 Feet (1220mm)",
    sheetLength: "Custom (up to 39 Feet)",
    colors: ["Crystal Clear", "Bronze/Brown", "Opal White", "Ocean Blue"],
    heatResistance: "UV coated to reflect heat while letting in ambient light",
    waterResistance: "Waterproof sealing gasket system",
    specifications: [
      { thickness: "1.5 MM", pricePerSqFt: 90, warranty: "5 Years", recommendedUsage: "Residential Greenhouses" },
      { thickness: "2.0 MM", pricePerSqFt: 115, warranty: "8 Years", recommendedUsage: "Gazebos & Patio Covers" },
      { thickness: "3.0 MM", pricePerSqFt: 165, warranty: "10 Years", recommendedUsage: "Commercial Skylights" },
      { thickness: "4.0 MM", pricePerSqFt: 210, warranty: "10 Years", recommendedUsage: "Heavy Duty Walkways" }
    ]
  },
  {
    id: "turbo-ventilators",
    name: "Turbo Ventilators",
    shortDesc: "Wind-driven ventilators that extract hot air, humidity, and fumes from industrial rooftops without electricity.",
    description: "RoofConnect's stainless steel and aluminum Turbo Ventilators utilize natural wind power to extract stale, hot air from your warehouse or industrial shed. Operating 24/7 with zero electricity costs, they enhance ventilation, reduce humidity, and maintain structural longevity.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    warranty: "5 Years bearing warranty",
    installationSupport: "Base plate customization, leak-proof waterproofing seal, and professional alignment check.",
    keyFeatures: ["Zero Running Cost", "Runs on Wind Energy", "Maintenance-Free Bearing System", "Highly Durable SS304/Aluminium", "Rainproof Drainage Design"],
    sheetWidth: "21-inch Throat Diameter",
    sheetLength: "N/A (Standard unit height 18-inches)",
    colors: ["Natural Silver", "Powder Coated Grey"],
    heatResistance: "Continuous draft lowers ambient room temperature",
    waterResistance: "Spun dome keeps rainwater out entirely",
    specifications: [
      { thickness: "21\" (Aluminium)", pricePerSqFt: 3200, warranty: "5 Years", recommendedUsage: "Commercial Sheds" },
      { thickness: "21\" (SS304)", pricePerSqFt: 4500, warranty: "5 Years", recommendedUsage: "Chemical & Food Plants" },
      { thickness: "24\" (Aluminium)", pricePerSqFt: 4100, warranty: "5 Years", recommendedUsage: "Medium Industrial Sheds" },
      { thickness: "24\" (SS304)", pricePerSqFt: 5800, warranty: "7 Years", recommendedUsage: "Heavy Engineering Plants" }
    ]
  },
  {
    id: "puf-panels",
    name: "PUF Insulated Panels",
    shortDesc: "Polyurethane Foam insulated sandwich panels offering top-tier thermal insulation for cold rooms and sheds.",
    description: "PUF Panels represent the pinnacle of thermal efficiency. Featuring a rigid polyurethane foam core sandwiched between two metal sheets, these panels provide exceptional temperature control. Perfect for cold storage units, commercial food processing facilities, and cleanrooms, as well as energy-efficient pre-engineered buildings.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80",
    warranty: "15 Years thermal performance guarantee",
    installationSupport: "Tongue-and-groove joint sealing, structural load calculation, and custom wall/roof installation.",
    keyFeatures: ["Thermal Insulation (R-Value)", "Quick Pre-Fab Installation", "Acoustic Dampening Properties", "Energy Efficient & Green", "High Load-Bearing Capacity"],
    sheetWidth: "3.28 Feet (1000mm)",
    sheetLength: "Custom (up to 40 Feet)",
    colors: ["Off-White", "Mist Green", "Sky Blue", "Alabaster"],
    heatResistance: "U-value down to 0.22 W/m²K (excellent thermal barrier)",
    waterResistance: "Hermetically sealed tongue-and-groove jointing",
    specifications: [
      { thickness: "30 MM", pricePerSqFt: 180, warranty: "10 Years", recommendedUsage: "Low-Temp Prefab Cabins" },
      { thickness: "50 MM", pricePerSqFt: 240, warranty: "15 Years", recommendedUsage: "Standard Cold Rooms & Warehouses" },
      { thickness: "75 MM", pricePerSqFt: 310, warranty: "15 Years", recommendedUsage: "Deep Freezers & Clean Rooms" },
      { thickness: "100 MM", pricePerSqFt: 390, warranty: "15 Years", recommendedUsage: "Ultra-Cold Industrial Facilities" }
    ]
  },
  {
    id: "metal-roofing-sheets",
    name: "Metal Roofing Sheets",
    shortDesc: "Galvalume and Color Coated metal sheets combining extreme strength, weather tightness, and visual appeal.",
    description: "Crafted from high-tensile steel alloy coated with aluminum and zinc (Galvalume), our metal roofing sheets offer unparalleled durability. Coated with premium weather-resistant paints, they look stunning and provide high corrosion protection for agricultural sheds, residential garages, and massive commercial warehouses.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    warranty: "15 Years anti-corrosion",
    installationSupport: "Precision fastener placement, self-tapping screw installation, and specialized flashing trims.",
    keyFeatures: ["High Tensile Strength", "Excellent Corrosion Resistance", "Lightweight & Fast Installation", "Fire-resistant Class A", "Low Thermal Expansion"],
    sheetWidth: "3.5 Feet (1070mm)",
    sheetLength: "Custom (up to 30 Feet)",
    colors: ["Brick Red", "Royal Blue", "Slate Grey", "Forest Green"],
    heatResistance: "Reflective heat-shield coating keeps roofs cooler",
    waterResistance: "Double-overlap rib prevents capillary action water leakage",
    specifications: [
      { thickness: "0.35 MM", pricePerSqFt: 60, warranty: "5 Years", recommendedUsage: "Agricultural & Temporary Sheds" },
      { thickness: "0.45 MM", pricePerSqFt: 78, warranty: "10 Years", recommendedUsage: "Residential Lean-to & Garages" },
      { thickness: "0.50 MM", pricePerSqFt: 92, warranty: "15 Years", recommendedUsage: "Industrial Warehouses & Factories" },
      { thickness: "0.60 MM", pricePerSqFt: 115, warranty: "15 Years", recommendedUsage: "Heavy Duty Power Plants" }
    ]
  },
  {
    id: "frp-sheets",
    name: "FRP Sheets",
    shortDesc: "Fiberglass Reinforced Plastic sheets offering superior strength-to-weight ratio and corrosive chemical immunity.",
    description: "Fiberglass Reinforced Plastic (FRP) Roofing Sheets are specifically engineered for highly corrosive chemical environments and industrial spaces that require excellent structural rigidity coupled with natural lighting. Impervious to acid fumes, moisture, and chemical washes, they are the ideal companion for chemical factories, effluent treatment plants, and coastal industrial zones.",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80",
    warranty: "10 Years chemical resistance",
    installationSupport: "Thermal expansion gasket installation, secure structural purlin alignment, and joint sealing.",
    keyFeatures: ["Immune to Chemical Corrosion", "Extremely High Impact Strength", "Semi-Translucent Lighting Option", "UV Weather Stabilization", "Very High Strength-to-Weight Ratio"],
    sheetWidth: "3.28 Feet (1000mm)",
    sheetLength: "Custom (up to 24 Feet)",
    colors: ["Translucent Green", "Translucent Blue", "Opaque Yellow", "Opaque Grey"],
    heatResistance: "Blocks IR rays while permitting diffuse light transmission",
    waterResistance: "Non-porous composite structure prevents water absorption",
    specifications: [
      { thickness: "1.5 MM", pricePerSqFt: 80, warranty: "5 Years", recommendedUsage: "Residential Balcony Skylights" },
      { thickness: "2.0 MM", pricePerSqFt: 105, warranty: "10 Years", recommendedUsage: "Industrial Chemical Shed Walkways" },
      { thickness: "2.5 MM", pricePerSqFt: 130, warranty: "10 Years", recommendedUsage: "Effluent Treatment Plants (ETP)" },
      { thickness: "3.0 MM", pricePerSqFt: 160, warranty: "12 Years", recommendedUsage: "High-Corrosive Smelter Plants" }
    ]
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "UPVC Roofing Industrial Warehouse Installation",
    productType: "upvc-roofing",
    location: "Ambattur Industrial Estate, Chennai",
    projectType: "Industrial",
    area: 12500,
    completionDate: "2026-03-12",
    image: upvcProject1,
    reelUrl: "https://www.instagram.com/reel/DV58pqiAWWr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "proj-2",
    title: "Modern Villa Skylight & Patio Cover",
    productType: "polycarbonate-sheets",
    location: "Kochi, Kerala",
    projectType: "Residential",
    area: 850,
    completionDate: "2026-04-20",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-3",
    title: "Eco Ventilators Installation on Production Unit",
    productType: "turbo-ventilators",
    location: "Coimbatore Special Economic Zone",
    projectType: "Industrial",
    area: 32000,
    completionDate: "2026-05-10",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-4",
    title: "Pharma Cold Room PUF Enclosure",
    productType: "puf-panels",
    location: "Whitefield, Bangalore",
    projectType: "Commercial",
    area: 6400,
    completionDate: "2026-02-15",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-5",
    title: "Premium Metal Rooftops for Commercial Plaza",
    productType: "metal-roofing-sheets",
    location: "Bandra Kurla Complex, Mumbai",
    projectType: "Commercial",
    area: 18500,
    completionDate: "2026-04-05",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-6",
    title: "Acid Storage Plant Anti-Corrosive FRP Covers",
    productType: "frp-sheets",
    location: "Visakhapatnam Refinery Area",
    projectType: "Industrial",
    area: 9500,
    completionDate: "2026-05-01",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-7",
    title: "UPVC Roofing Residential Carport Shelter",
    productType: "upvc-roofing",
    location: "Adyar, Chennai",
    projectType: "Residential",
    area: 450,
    completionDate: "2026-05-18",
    image: upvcProject2,
    reelUrl: "https://www.instagram.com/reel/DTfguWZk38e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: "proj-8",
    title: "Commercial Mall Translucent Atrium Dome",
    productType: "polycarbonate-sheets",
    location: "Gachibowli, Hyderabad",
    projectType: "Commercial",
    area: 4500,
    completionDate: "2026-04-28",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"
  }
];

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    customerName: "Ahamed Faridh",
    customerEmail: "ahamed@example.com",
    customerPhone: "+91 98765 43210",
    productType: "upvc-roofing",
    inquiryType: "Quote",
    area: 2400,
    message: "Need quote for premium terracotta red UPVC roofing sheets, thickness 2.5mm for commercial garage project.",
    status: "New",
    createdAt: "2026-05-29T14:30:00Z"
  },
  {
    id: "inq-2",
    customerName: "Karthik Raja",
    customerEmail: "karthik.r@example.com",
    customerPhone: "+91 87654 32109",
    productType: "turbo-ventilators",
    inquiryType: "Site Visit",
    message: "Requesting site visit to measure and suggest the number of turbo ventilators required for our foundry in Coimbatore.",
    status: "Contacted",
    createdAt: "2026-05-28T10:15:00Z"
  }
];

// DB Helper Functions
function isBrowser() {
  return typeof window !== "undefined";
}

function getStored<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error("Error reading localStorage key: " + key, e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing localStorage key: " + key, e);
  }
}

// Public API
export const db = {
  getProducts(): Product[] {
    const products = getStored<Product[]>("roof_products", DEFAULT_PRODUCTS);
    let updated = false;
    const fixedProducts = products.map((p) => {
      if (p.id === "upvc-roofing" && (!p.image || p.image.includes("unsplash") || p.image.includes("1635424710928"))) {
        p.image = upvcImage;
        updated = true;
      }
      return p;
    });
    if (updated) {
      setStored("roof_products", fixedProducts);
    }
    return fixedProducts;
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  },

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      products[idx] = product;
    } else {
      products.push(product);
    }
    setStored("roof_products", products);
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    setStored("roof_products", products);
  },

  getProjects(): Project[] {
    const projects = getStored<Project[]>("roof_projects", DEFAULT_PROJECTS);
    let updated = false;
    const fixedProjects = projects.map((p) => {
      if (p.id === "proj-1" && (!p.reelUrl || p.image.includes("unsplash") || typeof p.image === "string" && p.image.includes("1586528116311"))) {
        p.image = upvcProject1;
        p.reelUrl = "https://www.instagram.com/reel/DV58pqiAWWr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
        updated = true;
      }
      if (p.id === "proj-7" && (!p.reelUrl || p.image.includes("unsplash") || typeof p.image === "string" && p.image.includes("1590069261209"))) {
        p.image = upvcProject2;
        p.reelUrl = "https://www.instagram.com/reel/DTfguWZk38e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
        updated = true;
      }
      return p;
    });
    if (updated) {
      setStored("roof_projects", fixedProjects);
    }
    return fixedProjects;
  },

  getProjectsByProduct(productId: string): Project[] {
    return this.getProjects().filter((p) => p.productType === productId);
  },

  addProject(project: Omit<Project, "id">): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: "proj-" + Date.now()
    };
    projects.push(newProject);
    setStored("roof_projects", projects);
    return newProject;
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    setStored("roof_projects", projects);
  },

  getInquiries(): Inquiry[] {
    return getStored<Inquiry[]>("roof_inquiries", DEFAULT_INQUIRIES);
  },

  addInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: "inq-" + Date.now(),
      status: "New",
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    setStored("roof_inquiries", inquiries);
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: Inquiry["status"]): void {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex((i) => i.id === id);
    if (idx !== -1) {
      inquiries[idx].status = status;
      setStored("roof_inquiries", inquiries);
    }
  },

  deleteInquiry(id: string): void {
    const inquiries = this.getInquiries().filter((i) => i.id !== id);
    setStored("roof_inquiries", inquiries);
  }
};
