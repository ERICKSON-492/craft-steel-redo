import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import laundryImg from "@/assets/product-laundry.jpg";
import shelfImg from "@/assets/product-shelf.jpg";
import worktableImg from "@/assets/product-worktable.jpg";

export const Route = createFileRoute("/laundry")({
  head: () => ({
    meta: [
      { title: "Laundry Equipment — Elite Stainless Steel Concepts" },
      { name: "description", content: "Stainless steel laundry trolleys, sorting tables, hanging racks and folding tables for commercial laundries." },
      { property: "og:title", content: "Laundry Equipment Fabrication" },
      { property: "og:description", content: "Trolleys, sorting tables and racks for commercial laundries." },
    ],
  }),
  component: LaundryPage,
});

const items = [
  { image: laundryImg, title: "Laundry trolleys", description: "Multi-shelf stainless steel trolleys with heavy-duty castors." },
  { image: worktableImg, title: "Sorting tables", description: "Wide-top sorting tables with optional undershelf storage." },
  { image: shelfImg, title: "Hanging racks", description: "Mobile and wall-mounted hanging racks for finished linen." },
  { image: worktableImg, title: "Folding tables", description: "Reinforced folding tables sized to laundry workflows." },
  { image: laundryImg, title: "Linen bins", description: "Stainless steel linen bins on wheels for soiled collection." },
  { image: shelfImg, title: "Drying racks", description: "Multi-tier drying racks for industrial laundry rooms." },
];

function LaundryPage() {
  return (
    <>
      <PageHero
        eyebrow="Laundry equipment"
        title="Commercial laundry, fabricated to move."
        description="Trolleys, sorting tables, hanging racks and storage — built to handle the volume and humidity of hotel and hospital laundries."
      />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <SectionHeader eyebrow="Catalogue" title="Recurring builds" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
