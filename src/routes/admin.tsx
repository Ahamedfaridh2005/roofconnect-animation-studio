import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { db, Product, Project, Inquiry, Specification } from "@/lib/db";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  Briefcase,
  HelpCircle,
  FileText,
  Settings,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Sparkles,
  Save,
  ArrowLeft,
  X,
  LayoutGrid
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboardPage
});

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"products" | "projects" | "inquiries">("products");

  // State trigger for refreshing local lists
  const [dbTick, setDbTick] = useState(0);
  const triggerReload = () => setDbTick(prev => prev + 1);

  // Load dynamically synced databases
  const products = useMemo(() => {
    // depend on dbTick to refresh lists
    dbTick; 
    return db.getProducts();
  }, [dbTick]);

  const projects = useMemo(() => {
    dbTick;
    return db.getProjects();
  }, [dbTick]);

  const inquiries = useMemo(() => {
    dbTick;
    return db.getInquiries();
  }, [dbTick]);

  // Product Editing State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductForm, setNewProductForm] = useState(false);

  // New Project Form State
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projType, setProjType] = useState<"Residential" | "Commercial" | "Industrial">("Commercial");
  const [projArea, setProjArea] = useState("");
  const [projDate, setProjDate] = useState("");
  const [projImage, setProjImage] = useState("");
  const [projReel, setProjReel] = useState("");

  // Handler: Add project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projCategory || !projLocation || !projArea || !projDate || !projImage) {
      toast.error("Please fill in all project fields.");
      return;
    }

    db.addProject({
      title: projTitle,
      productType: projCategory,
      location: projLocation,
      projectType: projType,
      area: parseFloat(projArea),
      completionDate: projDate,
      image: projImage,
      reelUrl: projReel || undefined
    });

    toast.success("Completed project uploaded successfully!");
    triggerReload();

    // Reset Form
    setProjTitle("");
    setProjCategory("");
    setProjLocation("");
    setProjArea("");
    setProjDate("");
    setProjImage("");
    setProjReel("");
  };

  // Handler: Delete project
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      db.deleteProject(id);
      toast.success("Project deleted successfully.");
      triggerReload();
    }
  };

  // Handler: Update Inquiry Status
  const handleInquiryStatusChange = (id: string, newStatus: Inquiry["status"]) => {
    db.updateInquiryStatus(id, newStatus);
    toast.success(`Inquiry status updated to ${newStatus}.`);
    triggerReload();
  };

  // Handler: Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry record?")) {
      db.deleteInquiry(id);
      toast.success("Inquiry record removed.");
      triggerReload();
    }
  };

  // Handler: Save Edited Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    db.saveProduct(editingProduct);
    toast.success("Product configurations updated successfully!");
    setEditingProduct(null);
    triggerReload();
  };

  // Add a spec row to editing product
  const handleAddSpecRow = () => {
    if (!editingProduct) return;
    const newSpec: Specification = {
      thickness: "0.0 MM",
      pricePerSqFt: 0,
      warranty: "0 Years",
      recommendedUsage: "General"
    };
    setEditingProduct({
      ...editingProduct,
      specifications: [...editingProduct.specifications, newSpec]
    });
  };

  // Remove a spec row from editing product
  const handleRemoveSpecRow = (idx: number) => {
    if (!editingProduct) return;
    const nextSpecs = [...editingProduct.specifications];
    nextSpecs.splice(idx, 1);
    setEditingProduct({
      ...editingProduct,
      specifications: nextSpecs
    });
  };

  // Edit a spec cell
  const handleSpecChange = (idx: number, field: keyof Specification, value: any) => {
    if (!editingProduct) return;
    const nextSpecs = [...editingProduct.specifications];
    nextSpecs[idx] = {
      ...nextSpecs[idx],
      [field]: value
    };
    setEditingProduct({
      ...editingProduct,
      specifications: nextSpecs
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SiteHeader />

      <main className="py-12 relative z-10">
        <div className="container mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border pb-8">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">RoofConnect Corporate</span>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold">Admin Management Hub</h1>
              <p className="mt-2 text-muted-foreground text-sm">
                Control catalogs, configure thickness pricing matrices, upload recent works, and process user inquiries.
              </p>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-accent/5 font-semibold text-sm transition text-foreground">
              <ArrowLeft className="w-4 h-4" /> Return to Website
            </Link>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border mb-8 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-5 py-3.5 text-sm font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === "products"
                  ? "border-accent text-accent font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Roofing Products & Pricing
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-5 py-3.5 text-sm font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === "projects"
                  ? "border-accent text-accent font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Completed Projects Showcase
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-5 py-3.5 text-sm font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === "inquiries"
                  ? "border-accent text-accent font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer Inquiries ({inquiries.length})
            </button>
          </div>

          {/* TAB 1: PRODUCTS TABLE */}
          {activeTab === "products" && (
            <div className="space-y-8">
              {!editingProduct ? (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-foreground">Product Catalog Settings</h2>
                    <div className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border border-border">
                      Seeded Categories: {products.length}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                      <div key={p.id} className="p-6 rounded-2xl bg-card border border-border shadow-elegant flex flex-col justify-between">
                        <div>
                          <div className="h-40 rounded-xl overflow-hidden mb-4 border border-border">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{p.description}</p>
                          <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-muted-foreground">
                            <span>Thickness Options: {p.specifications.length}</span>
                            <span>Warranty: {p.warranty}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                          <button
                            onClick={() => setEditingProduct(JSON.parse(JSON.stringify(p)))} // deep copy
                            className="w-full py-2.5 rounded-xl border border-border bg-secondary hover:bg-accent/10 hover:text-accent font-bold text-xs transition flex items-center justify-center gap-1.5 text-foreground"
                          >
                            <Edit3 className="w-4 h-4" />
                            Configure specifications
                          </button>
                           <Link
                            to="/products/$productId"
                            params={{ productId: p.id }}
                            className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                            title="Preview detail page"
                          >
                            <LayoutGrid className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* EDIT PRODUCT FORM WITH SPECIFICATION GRID */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-2xl"
                >
                  <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-accent animate-sun" />
                      <h3 className="text-xl font-bold text-foreground">Configure specifications: {editingProduct.name}</h3>
                    </div>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="p-1 rounded-full text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-6">
                    {/* General Product Configs */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Product Name
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Short Description
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.shortDesc}
                          onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                          className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Image URL
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Warranty Period
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProduct.warranty}
                          onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                          className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-sm"
                        />
                      </div>
                    </div>

                    {/* Technical specifics */}
                    <div className="p-4 rounded-2xl bg-secondary/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-muted-foreground mb-1">Sheet Width</label>
                        <input
                          type="text"
                          value={editingProduct.sheetWidth}
                          onChange={(e) => setEditingProduct({ ...editingProduct, sheetWidth: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-muted-foreground mb-1">Sheet Length</label>
                        <input
                          type="text"
                          value={editingProduct.sheetLength}
                          onChange={(e) => setEditingProduct({ ...editingProduct, sheetLength: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-muted-foreground mb-1">Thermal Resistance</label>
                        <input
                          type="text"
                          value={editingProduct.heatResistance}
                          onChange={(e) => setEditingProduct({ ...editingProduct, heatResistance: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-muted-foreground mb-1">Water Tightness</label>
                        <input
                          type="text"
                          value={editingProduct.waterResistance}
                          onChange={(e) => setEditingProduct({ ...editingProduct, waterResistance: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-semibold"
                        />
                      </div>
                    </div>

                    {/* Specification Table Editing */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                          Specification & Pricing Matrix
                        </h4>
                        <button
                          type="button"
                          onClick={handleAddSpecRow}
                          className="px-3 py-1.5 rounded-lg border border-accent bg-accent/10 hover:bg-accent hover:text-white transition-colors text-xs font-semibold flex items-center gap-1 text-accent"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Row
                        </button>
                      </div>

                      <div className="overflow-x-auto border border-border rounded-xl">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-secondary/70 border-b border-border">
                              <th className="px-4 py-3 text-muted-foreground">Thickness</th>
                              <th className="px-4 py-3 text-muted-foreground">Price per Sq.Ft (₹)</th>
                              <th className="px-4 py-3 text-muted-foreground">Warranty Period</th>
                              <th className="px-4 py-3 text-muted-foreground">Recommended Scope</th>
                              <th className="px-4 py-3 text-muted-foreground w-16 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {editingProduct.specifications.map((spec, sIdx) => (
                              <tr key={sIdx}>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    required
                                    value={spec.thickness}
                                    onChange={(e) => handleSpecChange(sIdx, "thickness", e.target.value)}
                                    className="p-2 border border-border bg-background rounded w-24 font-semibold text-foreground text-center"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="number"
                                    required
                                    value={spec.pricePerSqFt}
                                    onChange={(e) => handleSpecChange(sIdx, "pricePerSqFt", parseFloat(e.target.value) || 0)}
                                    className="p-2 border border-border bg-background rounded w-28 text-center text-accent font-bold"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    required
                                    value={spec.warranty}
                                    onChange={(e) => handleSpecChange(sIdx, "warranty", e.target.value)}
                                    className="p-2 border border-border bg-background rounded w-32 text-foreground"
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="text"
                                    required
                                    value={spec.recommendedUsage}
                                    onChange={(e) => handleSpecChange(sIdx, "recommendedUsage", e.target.value)}
                                    className="p-2 border border-border bg-background rounded w-full text-foreground"
                                  />
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSpecRow(sIdx)}
                                    className="p-2 rounded text-destructive hover:bg-destructive/15 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-border">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-5 py-3 rounded-full border border-border hover:bg-secondary text-sm font-semibold transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-full bg-gradient-brand text-primary-foreground font-bold hover:opacity-95 shadow-brand text-sm transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        Save Configurations
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS DISPLAY & UPLOAD */}
          {activeTab === "projects" && (
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Left Form: Add Project */}
              <div className="lg:col-span-1 p-6 rounded-2xl bg-card border border-border shadow-elegant">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                  <Sparkles className="w-5 h-5 text-accent animate-sun" />
                  <h3 className="font-bold text-lg text-foreground">Upload Completed Project</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Uploading here will dynamically refresh the category gallery filter on specific roofing product sheets.
                </p>

                <form onSubmit={handleAddProject} className="space-y-4 text-xs font-semibold text-muted-foreground">
                  <div>
                    <label className="block text-foreground mb-1.5">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent font-semibold text-foreground"
                      placeholder="e.g. Masonry UPVC Roofing Warehouse"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-foreground mb-1.5">Category</label>
                      <select
                        required
                        value={projCategory}
                        onChange={(e) => setProjCategory(e.target.value)}
                        className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent font-bold text-foreground text-xs"
                      >
                        <option value="">Select Category</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-foreground mb-1.5">Project Type</label>
                      <select
                        required
                        value={projType}
                        onChange={(e) => setProjType(e.target.value as any)}
                        className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent font-bold text-foreground text-xs"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-foreground mb-1.5">Area (Sq.Ft)</label>
                      <input
                        type="number"
                        required
                        value={projArea}
                        onChange={(e) => setProjArea(e.target.value)}
                        className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent text-foreground font-bold"
                        placeholder="e.g. 1500"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground mb-1.5">Completion Date</label>
                      <input
                        type="date"
                        required
                        value={projDate}
                        onChange={(e) => setProjDate(e.target.value)}
                        className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent text-foreground font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-foreground mb-1.5">Project Location</label>
                    <input
                      type="text"
                      required
                      value={projLocation}
                      onChange={(e) => setProjLocation(e.target.value)}
                      className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent text-foreground"
                      placeholder="e.g. Chennai, Tamil Nadu"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-1.5">Project Photo Image URL</label>
                    <input
                      type="text"
                      required
                      value={projImage}
                      onChange={(e) => setProjImage(e.target.value)}
                      className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent text-foreground"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>

                  <div>
                    <label className="block text-foreground mb-1.5">Instagram Reel Link (Optional)</label>
                    <input
                      type="text"
                      value={projReel}
                      onChange={(e) => setProjReel(e.target.value)}
                      className="w-full p-2.5 border border-border bg-background rounded-xl focus:outline-none focus:ring-1 focus:ring-accent text-foreground"
                      placeholder="https://instagram.com/reel/..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-accent text-white font-bold hover:bg-accent-glow shadow-brand text-xs transition"
                    >
                      Publish Project
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Showcase list */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold text-foreground">Completed Installations List</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-card border border-border shadow-elegant relative flex flex-col justify-between">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-border">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-accent/15 text-accent uppercase tracking-wider inline-block">
                            {proj.productType.replace("-", " ")}
                          </span>
                          <h4 className="font-bold text-sm text-foreground line-clamp-1 mt-1">{proj.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {proj.location}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {proj.completionDate}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                        <span>Area: <strong className="text-foreground">{proj.area.toLocaleString()} sq.ft</strong></span>
                        <span className="bg-secondary px-2.5 py-0.5 rounded font-bold">{proj.projectType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Incoming Client Inquiries</h2>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-border rounded-3xl bg-secondary/10">
                  <p className="text-muted-foreground font-semibold">No inquiries submitted yet.</p>
                  <p className="text-xs text-muted-foreground mt-1">Submit inquiries via the forms on individual product pages.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-6 rounded-2xl bg-card border border-border shadow-elegant flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300">
                      <div className="space-y-3 max-w-2xl">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            inq.inquiryType === 'Quote' ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          }`}>
                            {inq.inquiryType === 'Quote' ? 'Price Quote Request' : 'Site Visit Request'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-accent/10 text-accent border border-accent/20">
                            Category: {inq.productType.replace("-", " ")}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 ${
                            inq.status === 'New' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                            inq.status === 'Contacted' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            'bg-green-500/10 text-green-500 border border-green-500/20'
                          }`}>
                            {inq.status === 'New' ? <Clock className="w-3.5 h-3.5" /> : null}
                            Status: {inq.status}
                          </span>
                        </div>

                        {/* Customer data */}
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                          {inq.customerName}
                          <span className="text-xs text-muted-foreground font-normal">
                            (Submitted {new Date(inq.createdAt).toLocaleString()})
                          </span>
                        </h3>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {inq.customerEmail}</div>
                          <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {inq.customerPhone}</div>
                          {inq.area ? <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {inq.area.toLocaleString()} sq.ft area</div> : null}
                        </div>

                        <p className="p-3 bg-secondary/40 border border-border text-xs rounded-xl text-foreground font-medium italic mt-2">
                          "{inq.message || 'No additional notes provided.'}"
                        </p>
                      </div>

                      {/* Status actions */}
                      <div className="flex flex-row md:flex-col gap-2 shrink-0 md:items-end justify-end">
                        <div className="flex items-center gap-1">
                          <label className="text-[10px] text-muted-foreground font-bold uppercase mr-1">Set Status:</label>
                          <select
                            value={inq.status}
                            onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                            className="p-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-foreground focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="px-3.5 py-1.5 rounded-lg border border-destructive/20 text-destructive bg-destructive/5 hover:bg-destructive hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
