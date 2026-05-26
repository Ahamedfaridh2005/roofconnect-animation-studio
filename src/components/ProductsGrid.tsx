import { motion } from "motion/react";
import asphalt from "@/assets/product-asphalt.jpg";
import metal from "@/assets/product-metal.jpg";
import clay from "@/assets/product-clay.jpg";
import slate from "@/assets/product-slate.jpg";
import wood from "@/assets/product-wood.jpg";
import solar from "@/assets/product-solar.jpg";

const products = [
  { name: "Asphalt Shingles", desc: "America's most popular roof. Durable, affordable, endless colors.", img: asphalt, life: "20–30 yrs", tag: "Bestseller" },
  { name: "Standing Seam Metal", desc: "Sleek, weather-tight panels engineered to last generations.", img: metal, life: "40–70 yrs", tag: "Modern" },
  { name: "Clay Tiles", desc: "Mediterranean warmth with class-A fire and storm resistance.", img: clay, life: "50–100 yrs", tag: "Classic" },
  { name: "Natural Slate", desc: "Hand-quarried stone — the most premium roof you can install.", img: slate, life: "75–150 yrs", tag: "Premium" },
  { name: "Cedar Shakes", desc: "Hand-split wood for a warm, organic, custom-home aesthetic.", img: wood, life: "30–40 yrs", tag: "Natural" },
  { name: "Solar Roof", desc: "Generate power and shelter in one beautifully integrated system.", img: solar, life: "25 yrs + power", tag: "Smart" },
];

export function ProductsGrid() {
  return (
    <section id="products" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Products</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Every roofing material, one catalog.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From storm-proof metal to power-generating solar, RoofConnect curates the full spectrum of modern roofing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-elegant"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-background/90 backdrop-blur text-primary">
                  {p.tag}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <span className="text-xs font-semibold text-accent whitespace-nowrap">{p.life}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Request samples <span>→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
