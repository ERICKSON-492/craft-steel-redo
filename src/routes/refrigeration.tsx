import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import coldroomImg from "@/assets/product-coldroom.jpg";
import shelfImg from "@/assets/product-shelf.jpg";

export const Route = createFileRoute("/refrigeration")({
  head: () => ({
    meta: [
      { title: "Cold Room & Refrigeration Fabrication — Elite Stainless Steel" },
      { name: "description", content: "Cold room shelving, meat rails, hanging systems and evaporator drain trays in stainless steel for commercial refrigeration." },
      { property: "og:title", content: "Refrigeration Fabrication" },
      { property: "og:description", content: "Stainless steel cold room shelving, meat rails and drain trays." },
    ],
  }),
  component: RefrigerationPage,
});

const sections = [
  {
    name: "Cold room shelving",
    items: [
      { image: coldroomImg, title: "Modular cold room shelves", description: "Adjustable stainless steel shelving units for walk-in cold rooms." },
      { image: coldroomImg, title: "Heavy-duty shelving", description: "Reinforced shelving for high-load refrigerated storage." },
    ],
  },
  {
    name: "Meat rails & hanging systems",
    items: [
      { image: shelfImg, title: "Meat rails", description: "Stainless steel overhead rail systems for carcass hanging." },
      { image: shelfImg, title: "Meat trolley", description: "Custom-fabricated carcass trolleys with hooks." },
    ],
  },
  {
    name: "Evaporator & drain trays",
    items: [
      { image: shelfImg, title: "Evaporator drain tray", description: "Stainless steel condensate trays sized to your unit." },
      { image: shelfImg, title: "Drain tray", description: "Custom drip trays for refrigeration and ice equipment." },
      { image: shelfImg, title: "Drip tray with drain", description: "Recessed 40×22 drip tray with integrated drain outlet." },
    ],
  },
];

function RefrigerationPage() {
  return (
    <>
      <PageHero
        eyebrow="Cold room & refrigeration"
        title="Refrigerated storage, fabricated to fit."
        description="Modular shelving, hanging systems and drain trays in 304-grade stainless — engineered for cold, wet, and high-hygiene environments."
      />
      {sections.map((cat) => (
        <section key={cat.name} className="py-16 md:py-20 border-b border-border last:border-0">
          <div className="container-page">
            <SectionHeader eyebrow="Category" title={cat.name} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((p) => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
