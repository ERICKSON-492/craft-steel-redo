import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { IMG } from "@/lib/products";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Elite Stainless Steel Concepts" },
      { name: "description", content: "Browse stainless steel fabrication projects delivered across Kenya — hotels, restaurants, hospitals, industrial plants and more." },
      { property: "og:title", content: "Our Projects — Elite Stainless Steel" },
      { property: "og:description", content: "A portfolio of stainless steel fabrications across Kenya." },
      { property: "og:image", content: IMG.coldroom1 },
    ],
  }),
  component: ProjectsPage,
});

type Project = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  project_date: string | null;
  image_url: string | null;
};

function ProjectsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["portfolio-public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Projects delivered across Kenya."
        description="From hotel kitchens to industrial cold rooms — a selection of stainless steel builds completed in our Nairobi workshop."
        backgroundImage={IMG.coldroom1}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          {isLoading ? (
            <div className="grid h-60 place-items-center text-slate-400"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : data.length === 0 ? (
            <div className="grid h-60 place-items-center rounded-2xl border border-dashed border-[var(--border)] text-sm text-foreground/60">
              Projects coming soon. Check back shortly.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((p) => (
                <article key={p.id} className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-slate-300 text-sm">No image</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">{p.category}</div>
                    <h3 className="mt-2 font-display text-lg font-bold text-foreground">{p.title}</h3>
                    {p.description && <p className="mt-2 text-sm leading-relaxed text-foreground/70 line-clamp-3">{p.description}</p>}
                    {p.project_date && <div className="mt-3 text-xs text-foreground/50">{new Date(p.project_date).toLocaleDateString()}</div>}
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
