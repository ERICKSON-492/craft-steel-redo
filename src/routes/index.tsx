import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Wrench, Factory, Sparkles, Phone, Mail, CircleCheck as CheckCircle2, Hammer, Cog, Flame, HardHat } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { IMG, homeProducts } from "@/lib/products";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import expertiseSectionImage from "@/assets/expertise/section-hero.jpg.asset.json";

type SiteContent = {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
};

function useSiteContent(key: string) {
  return useQuery({
    queryKey: ["site-content", key],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content" as any).select("*").eq("key", key).maybeSingle();
      if (error) throw error;
      return (data as unknown) as SiteContent | null;
    },
  });
}

const ICONS: Record<string, any> = { Wrench, Sparkles, ShieldCheck, Factory, Hammer, Cog, Flame, Hardhat: HardHat };
const FALLBACK_EXPERTISE = [
  { id: "1", title: "Custom Fabrication", description: "Precision stainless steel fabrication tailored to residential, commercial and industrial needs.", icon: "Wrench", image_url: null },
  { id: "2", title: "Commercial Kitchens", description: "Durable, hygienic stainless kitchen solutions for hotels, restaurants and food businesses.", icon: "Sparkles", image_url: null },
  { id: "3", title: "Railings & Balustrades", description: "Modern stainless railings designed for safety, durability and architectural appeal.", icon: "ShieldCheck", image_url: null },
  { id: "4", title: "Industrial Fabrication", description: "Heavy-duty stainless structures and components built for industrial performance.", icon: "Factory", image_url: null },
  { id: "5", title: "Custom Installations", description: "Professional on-site installation ensuring precise fitting and long-term performance.", icon: "Hammer", image_url: null },
];

const SITE = "https://craft-steel-redo.lovable.app";

const heroSlides = [
  IMG.hood1,
  IMG.worktopUndershelf,
  IMG.sinkTriple,
  IMG.coldroom1,
  IMG.rackSystem,
  IMG.meatRails,
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Stainless Steel Concepts — Commercial Fabrication in Kenya" },
      { name: "description", content: "Custom stainless steel fabrication in Nairobi — commercial kitchens, refrigeration, laundry, railings and industrial projects across Kenya." },
      { name: "keywords", content: "stainless steel Kenya, commercial kitchen fabrication Nairobi, cold room shelving, exhaust hoods, sinks, grease traps, meat rails" },
      { property: "og:title", content: "Elite Stainless Steel Concepts — Commercial Fabrication in Kenya" },
      { property: "og:description", content: "Custom commercial stainless steel fabrication built in Nairobi for kitchens, cold rooms, laundries and architectural projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:image", content: IMG.hood1 },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Elite Stainless Steel Concepts" },
      { name: "twitter:description", content: "Commercial stainless steel fabrication in Nairobi, Kenya." },
      { name: "twitter:image", content: IMG.hood1 },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
  }),
  component: Home,
});

function ExpertiseGrid() {
  const { data } = useQuery({
    queryKey: ["expertise-public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("expertise" as any).select("*").order("sort_order");
      if (error) throw error;
      return (data as any[]) ?? [];
    },
  });
  const items = (data && data.length > 0) ? data : FALLBACK_EXPERTISE;
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((it: any) => {
        const Icon = ICONS[it.icon ?? "Wrench"] ?? Wrench;
        return (
          <div key={it.id} className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-white transition-shadow hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              {it.image_url ? (
                <img
                  src={it.image_url}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-[var(--accent)]/40">
                  <Icon className="h-12 w-12" />
                </div>
              )}
              <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white/95 text-[var(--accent)] shadow">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-base font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{it.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const advance = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(next);
      setNext((next + 1) % heroSlides.length);
      setTransitioning(false);
    }, 1200);
  }, [next]);

  useEffect(() => {
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div className="absolute inset-0">
      {/* Current slide */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <img
          src={heroSlides[current]}
          alt=""
          className="h-full w-full object-cover scale-105"
        />
      </div>
      {/* Next slide (fades in) */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: transitioning ? 1 : 0 }}
      >
        <img
          src={heroSlides[next]}
          alt=""
          className="h-full w-full object-cover scale-105"
        />
      </div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[var(--navy-deep)]/70" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--navy-deep)] to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setNext((i + 1) % heroSlides.length);
              setTransitioning(false);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-[var(--accent)]"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[100vh] min-h-[700px] max-h-[1100px] overflow-hidden bg-[var(--navy-deep)]">
        <HeroSlideshow />

        <div className="container-page relative z-10 flex h-full items-center">
          <div className="max-w-2xl pt-24 pb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                Nairobi · Kenya · Since 2014
              </span>
            </div>

            <h1 className="mt-7 font-display text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[80px] animate-fade-up">
              Commercial stainless
              <br />
              steel, <span className="text-[var(--accent)]">engineered to last.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg animate-fade-up [animation-delay:150ms]">
              We design, fabricate and install commercial stainless steel for kitchens,
              refrigeration, laundry and architectural projects across Kenya —
              built in-house in 304 / 316 grade steel.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:300ms]">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:scale-[1.03] hover:shadow-lg"
              >
                Speak to our experts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kitchen-fabrications"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 backdrop-blur-sm px-7 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
              >
                Explore products
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-lg animate-fade-up [animation-delay:450ms]">
              {[
                ["10+", "Years in trade"],
                ["500+", "Custom builds"],
                ["304/316", "Grade steel"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl font-black text-white sm:text-4xl">{k}</dt>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE SECTION ================= */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Our expertise"
              title="From concept to installation, finished in steel."
              description="Five core practices, one workshop. Every piece is fabricated in-house by craftsmen who understand the demands of commercial service."
            />
            <p className="text-sm leading-relaxed text-foreground/70 lg:max-w-md lg:justify-self-end">
              We work in 304 and 316 grade stainless steel and finish every join,
              edge and weld for the environment it will live in — wet, hot, cold or seen.
            </p>
          </div>

          <ExpertiseGrid />
        </div>
      </section>

      {/* ================= WORKSHOP STRIP SECTION ================= */}
      <section className="relative overflow-hidden bg-[var(--navy-deep)]">
        <img
          src={IMG.worktopUndershelf}
          alt="Stainless steel fabrication workshop environment"
          width={1600}
          height={1000}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy-deep)]/90 to-transparent" />
        <div className="container-page relative grid items-center gap-10 py-24 md:py-32 lg:grid-cols-2">
          <div>
            <div className="inline-block text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] mb-4">
              Inside the workshop
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Welded, ground and polished by hand.
            </h2>
            <p className="mt-5 max-w-lg text-white/75">
              Every fabrication leaves the workshop fully assembled, tested and
              finished. No site rework. No surprises.
            </p>
            <ul className="mt-8 grid gap-3 max-w-md">
              {[
                "Food-safe 304 / 316 grade stainless",
                "TIG-welded joints, ground and passivated",
                "Custom dimensions — no standard sizes",
                "On-site delivery and installation across Kenya",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-white/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SHOWCASE SECTION ================= */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            eyebrow="Products"
            title="A workshop catalogue, custom every time."
            description="Below are recurring builds. Send dimensions and we'll quote — or design something new with you."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {homeProducts.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/kitchen-fabrications" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-[var(--accent)] hover:text-accent-foreground transition-colors">
              Kitchen catalogue <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/refrigeration" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-foreground transition-colors">
              Refrigeration
            </Link>
            <Link to="/laundry" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-foreground transition-colors">
              Laundry
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION SECTION ================= */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="bg-[var(--navy-deep)] relative overflow-hidden rounded-2xl p-10 md:p-16">
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <div className="inline-block text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)] mb-4">
                  Start a project
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Tell us what you're building.
                </h2>
                <p className="mt-4 max-w-lg text-white/70">
                  Share dimensions, drawings or a rough idea. We'll come back
                  with a quote and a build plan within 48 hours.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:+254794872338" className="group flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition-colors hover:border-[var(--accent)] hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[var(--accent)]" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Call</div>
                      <div className="font-display text-base font-bold text-white">+254 794 872 338</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-[var(--accent)] transition-colors" />
                </a>
                <a href="mailto:sales@elitestainlesssteelconcepts.co.ke" className="group flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition-colors hover:border-[var(--accent)] hover:bg-white/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Email</div>
                      <div className="truncate font-display text-sm font-bold text-white">sales@elitestainlesssteelconcepts.co.ke</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 group-hover:text-[var(--accent)] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
