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
        eyebrow="Product Catalogue"
        title="Refrigeration Storage"
        description="Custom cold room shelving, meat rails, and drain trays engineered for commercial refrigeration environments."
      />

      <div className="bg-[var(--background)]">
        {refrigerationSections.map((cat, idx) => {
          const systemSlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
          return (
            <section
              key={cat.name}
              id={systemSlug}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              <SectionHeader
                eyebrow={`0${idx + 1} — ${cat.name}`}
                title=""
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
          );
        })}
      </div>
    </>
  );
}
