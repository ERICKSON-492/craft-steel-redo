import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { refrigerationSections } from "@/lib/products";

const SITE = "https://craft-steel-redo.lovable.app";

export const Route = createFileRoute("/refrigeration")({
  head: () => ({
    meta: [
      { title: "Cold Room & Refrigeration Fabrication — Elite Stainless Steel" },
      { name: "description", content: "Cold room shelving, meat rails, hanging systems and evaporator drain trays — custom stainless steel fabrication for commercial refrigeration in Kenya." },
      { property: "og:title", content: "Cold Room & Refrigeration Fabrication" },
      { property: "og:description", content: "Stainless steel cold room shelving, meat rails and drain trays — built in Nairobi." },
      { property: "og:url", content: `${SITE}/refrigeration` },
      { property: "og:image", content: refrigerationSections[0].items[0].image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: refrigerationSections[0].items[0].image },
    ],
    links: [{ rel: "canonical", href: `${SITE}/refrigeration` }],
  }),
  component: RefrigerationPage,
});

function RefrigerationPage() {
  return (
    <>
      <PageHero
        eyebrow="PRODUCTION_CATALOGUE_v2.6"
        title="REFRIGERATION STORAGE CONFIGURATIONS."
        description="High-density modular shelving layouts, carcass suspension meat rails, and custom condensation catchment pans. Specifically structuralized for low-temperature, high-humidity environments."
      />

      {/* Quick Jump System Matrix Hub */}
      <nav aria-label="Category Navigation Matrix" className="sticky top-[72px] z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur select-none">
        <div className="container-page flex items-center gap-1 overflow-x-auto py-3 text-[10px] font-mono tracking-wider scrollbar-none">
          <span className="text-[var(--accent)] font-bold shrink-0 mr-2">SYS_INDEX //</span>
          {refrigerationSections.map((cat, idx) => {
            const systemSlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
            return (
              <a
                key={cat.name}
                href={`#${systemSlug}`}
                className="px-3 py-1.5 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors uppercase font-medium shrink-0 bg-[var(--card)]/40"
              >
                [{String(idx + 1).padStart(2, "0")}] {systemSlug}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Main Structural Catalogue Assembly */}
      <div className="bg-[var(--background)]">
        {refrigerationSections.map((cat, idx) => {
          const systemSlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
          return (
            <section 
              key={cat.name} 
              id={systemSlug} 
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
          );
        })}
      </div>
    </>
  );
}
