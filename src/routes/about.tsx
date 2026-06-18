import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Wrench, Factory, Users, Award, Target, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { IMG } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Elite Stainless Steel Concepts" },
      { name: "description", content: "Learn about Elite Stainless Steel Concepts — a Nairobi-based fabrication workshop building commercial-grade stainless steel since 2014." },
      { property: "og:title", content: "About Elite Stainless Steel Concepts" },
      { property: "og:description", content: "Nairobi-based stainless steel fabricator serving Kenya since 2014." },
      { property: "og:image", content: IMG.worktopUndershelf },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built in Nairobi. Engineered for Kenya."
        description="A decade of fabricating commercial stainless steel for kitchens, refrigeration, laundries and architectural projects across East Africa."
        backgroundImage={IMG.worktopUndershelf}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Our story</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Craftsmanship that lasts a generation.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/75">
              Elite Stainless Steel Concepts was founded in 2014 with a simple commitment:
              build commercial stainless steel that survives the demands of professional service.
              From hotel kitchens to industrial cold rooms, every piece leaves our workshop
              fully assembled, finished and ready for installation.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/75">
              We work exclusively in 304 and 316 grade stainless steel, TIG-weld every joint
              and finish for the environment the product will live in — wet, hot, cold or seen.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img src={IMG.hood1} alt="Stainless steel fabrication workshop" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">What we stand for</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Three values, one workshop.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Quality first", body: "Food-safe 304 / 316 stainless. Ground, polished and passivated for the long run." },
              { icon: Target, title: "Built to spec", body: "No standard sizes — every fabrication is dimensioned to your space and workflow." },
              { icon: Users, title: "Service that lasts", body: "On-site delivery, installation and post-install support across Kenya." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-white p-7">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy-deep)] py-20 md:py-24">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Send dimensions or drawings and we'll come back within 48 hours.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground hover:scale-[1.03] transition-transform"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
