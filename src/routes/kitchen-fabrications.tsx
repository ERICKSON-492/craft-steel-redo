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
        eyebrow="Kitchen fabrications"
        title="Commercial kitchen equipment, built for the line."
        description="Work tables, sinks, hoods, shelving, dishwashing stations and grease management — fabricated to your dimensions in food-safe 304 stainless steel."
      />

      {kitchenCategories.map((cat) => (
        <section key={cat.name} id={cat.slug} className="py-16 md:py-20 border-b border-border last:border-0">
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
