import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import laundryImg from "@/assets/product-laundry.jpg";
import shelfImg from "@/assets/product-shelf.jpg";
import worktableImg from "@/assets/product-worktable.jpg";

const SITE = "https://craft-steel-redo.lovable.app";

export const Route = createFileRoute("/laundry")({
  head: () => ({
    meta: [
      { title: "Laundry Equipment — Elite Stainless Steel Concepts" },
      { name: "description", content: "Stainless steel laundry trolleys, sorting tables, hanging racks and folding tables for commercial laundries in Kenya — built to withstand high humidity." },
      { property: "og:title", content: "Laundry Equipment Fabrication — Elite Stainless Steel Concepts" },
      { property: "og:description", content: "Trolleys, sorting tables and racks for commercial laundries — fabricated in Nairobi." },
      { property: "og:url", content: `${SITE}/laundry` },
      { property: "og:image", content: laundryImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: laundryImg },
    ],
    links: [{ rel: "canonical", href: `${SITE}/laundry` }],
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
        eyebrow="PRODUCTION_CATALOGUE_v2.6"
        title="LAUNDRY MODULE FABRICATIONS."
        description="Heavy-load transport trolleys, wide-aspect sort/fold assemblies, and corrosion-resistant hanging lines. Engineered to handle continuous volume and high-humidity processing plants."
      />

      {/* Quick Jump System Matrix Hub */}
      <nav aria-label="Category Navigation Matrix" className="sticky top-[72px] z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur select-none">
        <div className="container-page flex items-center gap-1 overflow-x-auto py-3 text-[10px] font-mono tracking-wider scrollbar-none">
          <span className="text-[var(--accent)] font-bold shrink-0 mr-2">SYS_INDEX //</span>
          <a
            href="#laundry-catalog"
            className="px-3 py-1.5 border border-[var(--border)] border-[var(--accent)] text-[var(--accent)] uppercase font-medium shrink-0 bg-[var(--card)]/40"
          >
            [01] LAUNDRY_RECURRING_BUILDS
          </a>
        </div>
      </nav>

      {/* Main Structural Catalogue Assembly */}
      <div className="bg-[var(--background)]">
        <section 
          id="laundry-catalog" 
          className="relative scroll-mt-[130px] border-b border-[var(--border)] last:border-b-0"
        >
          {/* Embedded Structural ID Marker Tag */}
          <div className="absolute top-0 right-4 md:right-8 font-mono text-[9px] text-[var(--border)] p-2 select-none z-10 pointer-events-none">
            SYS_BLOCK_REF // 001
          </div>

          <SectionHeader 
            eyebrow="CAT_SPEC_SECTION.[001]" 
            title="Recurring Builds" 
            align="left"
          />
          
          {/* Unified Grid Block Blueprint Frame */}
          <div className="container-page py-10 md:py-14">
            <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <div key={p.title} className="bg-[var(--background)]">
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
