import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import worktableImg from "@/assets/product-worktable.jpg";
import sinkImg from "@/assets/product-sink.jpg";
import hoodImg from "@/assets/product-hood.jpg";
import shelfImg from "@/assets/product-shelf.jpg";
import dishwashImg from "@/assets/product-dishwash.jpg";

export const Route = createFileRoute("/kitchen-fabrications")({
  head: () => ({
    meta: [
      { title: "Kitchen Fabrications — Elite Stainless Steel Concepts" },
      { name: "description", content: "Stainless steel work tables, sinks, wall shelves, exhaust hoods, dishwashing tables, grease traps and rack systems for commercial kitchens." },
      { property: "og:title", content: "Kitchen Fabrications — Elite Stainless Steel" },
      { property: "og:description", content: "Stainless steel kitchen equipment for hotels, restaurants, hospitals & schools." },
    ],
  }),
  component: KitchenPage,
});

const categories = [
  {
    name: "Work Tables",
    items: [
      { image: worktableImg, title: "Table with undershelf", description: "Custom-fabricated in various sizes. Stainless steel undershelf included." },
      { image: worktableImg, title: "Table without undershelf", description: "Clean open base. Available with or without backsplash." },
      { image: worktableImg, title: "Table with chute", description: "Integrated chute for waste handling on prep lines." },
    ],
  },
  {
    name: "Sinks",
    items: [
      { image: sinkImg, title: "Single bowl sink", description: "Custom-fabricated stainless steel single-bowl sinks." },
      { image: sinkImg, title: "Double bowl sink", description: "Two equal bowls with optional drainboards." },
      { image: sinkImg, title: "Triple bowl sink", description: "Three-compartment wash, rinse and sanitise sinks." },
    ],
  },
  {
    name: "Wall shelves & rack systems",
    items: [
      { image: shelfImg, title: "Wall shelves", description: "Single and double-tier stainless steel wall shelves." },
      { image: shelfImg, title: "Rack systems", description: "Free-standing storage racks for dry goods or equipment." },
      { image: shelfImg, title: "Perforated wall shelf", description: "Ventilated perforated shelving for hot or wet stations." },
    ],
  },
  {
    name: "Exhaust hoods & canopy systems",
    items: [
      { image: hoodImg, title: "Wall canopy hood", description: "Wall-mounted canopy hood with grease filters and lighting." },
      { image: hoodImg, title: "Island canopy hood", description: "Centre-mounted island canopy for cookline islands." },
      { image: hoodImg, title: "Condensate hood", description: "Hood for steam-producing equipment with condensate collection." },
    ],
  },
  {
    name: "Dishwashing & landing tables",
    items: [
      { image: dishwashImg, title: "Dishwasher inlet table", description: "Soiled-side landing table with pre-rinse area." },
      { image: dishwashImg, title: "Dishwasher outlet table", description: "Clean-side landing table sized to your machine." },
      { image: dishwashImg, title: "Dishwasher table — left", description: "Double sink configuration with backsplash." },
    ],
  },
  {
    name: "Grease traps & floor drains",
    items: [
      { image: worktableImg, title: "Grease trap", description: "Stainless steel grease interceptor, multiple capacities." },
      { image: worktableImg, title: "Floor drains", description: "Stainless steel floor drains for wet kitchens." },
    ],
  },
];

function KitchenPage() {
  return (
    <>
      <PageHero
        eyebrow="Kitchen fabrications"
        title="Commercial kitchen equipment, built for the line."
        description="Work tables, sinks, hoods, shelving, dishwashing stations and grease management — fabricated to your dimensions in food-safe stainless steel."
      />

      {categories.map((cat) => (
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
