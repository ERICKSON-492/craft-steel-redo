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
        eyebrow="PRODUCTION_CATALOGUE_v2.6"
        title="KITCHEN MODULE FABRICATIONS."
        description="Heavy-line work prep assemblies, deep-draw hydration basins, and structural ventilation extraction hoods. Built on-spec using raw grade 304 food-safe steel."
      />

      {/* Quick Jump System Matrix Hub */}
      <nav aria-label="Category Navigation Matrix" className="sticky top-[72px] z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur select-none">
        <div className="container-page flex items-center gap-1 overflow-x-auto py-3 text-[10px] font-mono tracking-wider scrollbar-none">
          <span className="text-[var(--accent)] font-bold shrink-0 mr-2">SYS_INDEX //</span>
          {kitchenCategories.map((cat, idx) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="px-3 py-1.5 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors uppercase font-medium shrink-0 bg-[var(--card)]/40"
            >
              [{String(idx + 1).padStart(2, "0")}] {cat.slug.replace("-", "_")}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Structural Catalogue Assembly */}
      <div className="bg-[var(--background)]">
        {kitchenCategories.map((cat, idx) => (
          <section 
            key={cat.name} 
            id={cat.slug} 
            className="relative scroll-mt-[130px] border-b border-[var(--border)] last:border-b-0"
          >
            {/* Embedded Structural ID Marker Tag */}
            <div className="absolute top-0 right-4 md:right-8 font-mono text-[9px] text-[var(--border)] p-2 select-none z-10 pointer-events-none">
              SYS_BLOCK_REF // 00{idx + 1}
            </div>

            <SectionHeader 
              eyebrow={`CAT_SPEC_SECTION.[00${idx + 1}]`} 
              title={cat.name} 
              align="left"
            />
            
            {/* Unified Grid Block Blueprint Frame */}
            <div className="container-page py-10 md:py-14">
              <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((p) => (
                  <div key={p.title} className="bg-[var(--background)]">
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
