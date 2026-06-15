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
        eyebrow="Cold room & refrigeration"
        title="Refrigerated storage, fabricated to fit."
        description="Modular shelving, hanging systems and drain trays in 304-grade stainless — engineered for cold, wet, and high-hygiene environments."
      />
      {refrigerationSections.map((cat) => (
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
