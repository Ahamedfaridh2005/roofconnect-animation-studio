import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { db } from "@/lib/db";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function ProductsGrid() {
  const products = db.getProducts();

  return (
    <section id="products" className="py-24 bg-secondary/40 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Catalog</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">
            Premium Roofing Materials
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From thermal-insulated panels to solar wind extractors, explore our marketplace of premium roofing systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-elegant flex flex-col h-full"
            >
              <Link to="/products/$productId" params={{ productId: p.id }} className="block relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 backdrop-blur text-primary border border-border flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  {p.warranty} Warranty
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    <Link to="/products/$productId" params={{ productId: p.id }}>{p.name}</Link>
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground flex-grow line-clamp-3">
                  {p.shortDesc}
                </p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {p.specifications && p.specifications.length > 0 ? `Starts at ₹${p.specifications[0].pricePerSqFt}/sq.ft` : "Premium Quality"}
                  </span>
                  <Link
                    to="/products/$productId"
                    params={{ productId: p.id }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
