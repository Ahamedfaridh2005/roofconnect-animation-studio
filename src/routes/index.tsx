import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { ProductsGrid } from "@/components/ProductsGrid";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { ProcessCTA } from "@/components/ProcessCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { LoadingSplash } from "@/components/LoadingSplash";

import roofBg from "@/assets/user_roof_bg.jpg";

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
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Real Roof Products Background */}
      <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-black">
        <img
          src={roofBg}
          alt="Roof Products Background"
          className="w-full h-full object-cover opacity-75"
        />
      </div>

      <LoadingSplash />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <ProductsGrid />
        <BrandsMarquee />
        <ProcessCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
