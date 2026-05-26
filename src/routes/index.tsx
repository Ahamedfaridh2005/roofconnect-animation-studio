import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { ProductsGrid } from "@/components/ProductsGrid";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { ProcessCTA } from "@/components/ProcessCTA";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RoofConnect — Every roof. One connection." },
      { name: "description", content: "RoofConnect curates every type of roofing — shingles, metal, clay, slate, wood and solar — from the most trusted brands. Compare, sample, install." },
      { property: "og:title", content: "RoofConnect — Every roof. One connection." },
      { property: "og:description", content: "Browse roofing products and brands. Get connected to a certified installer in minutes." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ProductsGrid />
        <BrandsMarquee />
        <ProcessCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
