import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { IMG } from "@/lib/products";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Elite Stainless Steel Concepts" },
      { name: "description", content: "Browse our full catalogue of stainless steel products — work tables, sinks, hoods, shelving, cold room frameworks and more." },
      { property: "og:title", content: "Our Products — Elite Stainless Steel" },
      { property: "og:description", content: "Custom stainless steel products manufactured in Nairobi, Kenya." },
      { property: "og:image", content: IMG.worktopUndershelf },
    ],
  }),
  component: ProductsPage,
});

type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
};

function ProductsPage() {
  const [filter, setFilter] = useState<string>("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["products-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  const categories = useMemo(
    () => Array.from(new Set(data.map((p) => p.category))).sort(),
    [data],
  );
  const filtered = filter ? data.filter((p) => p.category === filter) : data;

  return (
    <>
      <PageHero
        eyebrow="Our catalogue"
        title="Stainless steel products built to last."
        description="Custom-fabricated kitchen, refrigeration and industrial stainless steel equipment — engineered in our Nairobi workshop."
        backgroundImage={IMG.worktopUndershelf}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("")}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === ""
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                    : "border-[var(--border)] text-foreground/70 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    filter === c
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                      : "border-[var(--border)] text-foreground/70 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid h-60 place-items-center text-slate-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="grid h-60 place-items-center rounded-2xl border border-dashed border-[var(--border)] text-sm text-foreground/60">
              No products available yet. Check back shortly.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-slate-300 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                      {p.category}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                      {p.name}
                    </h3>
                    {p.description && (
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70 line-clamp-3">
                        {p.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
