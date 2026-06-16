import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { IMG } from "@/lib/products";

const SITE = "https://craft-steel-redo.lovable.app";

export const Route = createFileRoute("/laundry")({
  head: () => ({
    meta: [
      { title: "Laundry Equipment — Elite Stainless Steel Concepts" },
      { name: "description", content: "Stainless steel laundry trolleys, sorting tables, hanging racks and folding tables for commercial laundries in Kenya — built to withstand high humidity." },
      { property: "og:title", content: "Laundry Equipment Fabrication — Elite Stainless Steel Concepts" },
      { property: "og:description", content: "Trolleys, sorting tables and racks for commercial laundries — fabricated in Nairobi." },
      { property: "og:url", content: `${SITE}/laundry` },
      { property: "og:image", content: IMG.rackSystem },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMG.rackSystem },
    ],
    links: [{ rel: "canonical", href: `${SITE}/laundry` }],
  }),
  component: LaundryPage,
});

const items = [
  { image: IMG.rackSystem, title: "Laundry trolleys", description: "Multi-shelf stainless steel trolleys with heavy-duty castors for mobile transport." },
  { image: IMG.worktopUndershelf, title: "Sorting tables", description: "Wide-top sorting tables with optional undershelf storage for efficient workflows." },
  { image: IMG.wallShelf, title: "Hanging racks", description: "Mobile and wall-mounted hanging racks for finished linen storage and display." },
  { image: IMG.worktopUndershelf, title: "Folding tables", description: "Reinforced folding tables designed to support industrial laundry operations." },
  { image: IMG.rackSystem, title: "Linen bins", description: "Stainless steel linen collection bins on wheels for soiled item transport." },
  { image: IMG.wallShelf, title: "Drying racks", description: "Multi-tier drying racks engineered for high-volume industrial laundry rooms." },
];

function LaundryPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title="Laundry Equipment"
        description="Custom stainless steel laundry systems including trolleys, sorting tables, hanging racks, and linen storage solutions."
      />

      <div className="bg-[var(--background)]">
        <section className="border-b border-[var(--border)]">
          <SectionHeader
            eyebrow="01 — Equipment"
            title="Our Laundry Systems"
            align="left"
          />

          <div className="container-page py-10 md:py-14">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <div key={p.title} className="rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
