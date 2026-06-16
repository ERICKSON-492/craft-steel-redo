import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { kitchenCategories } from "@/lib/products";

const SITE = "https://craft-steel-redo.lovable.app";

export const Route = createFileRoute("/kitchen-fabrications")({
  head: () => ({
    meta: [
      { title: "Commercial Kitchen Fabrications — Elite Stainless Steel Concepts" },
      { name: "description", content: "Stainless steel work tables, sinks, wall shelves, exhaust hoods, dishwashing tables, grease traps and rack systems — custom-fabricated for commercial kitchens in Kenya." },
      { property: "og:title", content: "Commercial Kitchen Fabrications" },
      { property: "og:description", content: "Stainless steel kitchen equipment for hotels, restaurants, hospitals & schools — fabricated in Nairobi." },
      { property: "og:url", content: `${SITE}/kitchen-fabrications` },
      { property: "og:image", content: kitchenCategories[3].items[0].image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: kitchenCategories[3].items[0].image },
    ],
    links: [{ rel: "canonical", href: `${SITE}/kitchen-fabrications` }],
  }),
  component: KitchenPage,
});

function KitchenPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title="Kitchen Fabrications"
        description="Custom stainless steel work tables, sinks, wall shelves, exhaust hoods, and rack systems designed for professional kitchens."
      />

      <div className="bg-[var(--background)]">
        {kitchenCategories.map((cat, idx) => (
          <section
            key={cat.name}
            id={cat.slug}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <SectionHeader
              eyebrow={`0${idx + 1} — ${cat.name.split(" //")[0]}`}
              title={cat.name.split(" //")[1]?.trim() || cat.name}
              align="left"
            />

            <div className="container-page py-10 md:py-14">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((p) => (
                  <div key={p.title} className="rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                    <ProductCard {...p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
