import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Wrench, Factory, Sparkles, Phone, Mail, CheckCircle2, Hammer } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { IMG, homeProducts } from "@/lib/products";

const SITE = "https://craft-steel-redo.lovable.app";

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

const services = [
  { icon: Wrench, title: "Custom Fabrication", desc: "Precision stainless steel fabrication tailored to residential, commercial and industrial needs." },
  { icon: Sparkles, title: "Commercial Kitchens", desc: "Durable, hygienic stainless kitchen solutions for hotels, restaurants and food businesses." },
  { icon: ShieldCheck, title: "Railings & Balustrades", desc: "Modern stainless railings designed for safety, durability and architectural appeal." },
  { icon: Factory, title: "Industrial Fabrication", desc: "Heavy-duty stainless structures and components built for industrial performance." },
  { icon: Hammer, title: "Custom Installations", desc: "Professional on-site installation ensuring precise fitting and long-term performance." },
];

function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-surface relative isolate overflow-hidden">
        {/* Glow Effects */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: "radial-gradient(900px circle at 85% 20%, oklch(0.78 0.14 195 / 0.45), transparent 60%), radial-gradient(700px circle at 10% 90%, oklch(0.82 0.14 85 / 0.25), transparent 55%)",
          }} 
        />
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.06]" 
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }} 
        />

        <div className="container-page relative grid min-h-[88vh] grid-cols-1 items-center gap-12 py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_currentColor] text-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                Nairobi · Kenya · Since 2014
              </span>
            </div>

            <h1 className="mt-7 font-display text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[84px]">
              Commercial stainless
              <br />
              steel, <span className="bg-gradient-to-r from-[oklch(0.82_0.14_195)] to-[oklch(0.86_0.14_85)] bg-clip-text text-transparent">engineered to last.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              We design, fabricate and install commercial stainless steel for kitchens,
              refrigeration, laundry and architectural projects across Kenya —
              built in-house in 304 / 316 grade steel.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-[1.02]"
              >
                Speak to our experts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kitchen-fabrications"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/15"
              >
                Explore products
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-lg">
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

          {/* Hero Collage Showcase */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-[520px] ml-auto">
              <div className="absolute right-0 top-0 h-[58%] w-[62%] overflow-hidden rounded-xl border border-white/15 shadow-[var(--shadow-elegant)] [animation:float-slow_7s_ease-in-out_infinite]">
                <img src={IMG.hood1} alt="Stainless exhaust hood" className="h-full w-full object-cover" loading="eager" />
              </div>
              <div className="absolute left-0 top-[28%] h-[48%] w-[58%] overflow-hidden rounded-xl border border-white/15 shadow-[var(--shadow-elegant)] [animation:float-slow_9s_ease-in-out_infinite] [animation-delay:1s]">
                <img src={IMG.worktopUndershelf} alt="Stainless work table" className="h-full w-full object-cover" loading="eager" />
              </div>
              <div className="absolute bottom-0 right-[8%] h-[40%] w-[50%] overflow-hidden rounded-xl border border-white/15 shadow-[var(--shadow-elegant)] [animation:float-slow_8s_ease-in-out_infinite] [animation-delay:2s]">
                <img src={IMG.sinkTriple} alt="Triple bowl sink" className="h-full w-full object-cover" loading="eager" />
              </div>
              <div className="absolute -right-3 top-[44%] grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.14_90)] to-[oklch(0.74_0.16_65)] text-center text-[10px] font-black uppercase leading-tight text-[oklch(0.2_0.05_60)] shadow-xl">
                304<br/>Grade
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Industry Marquee strip */}
        <div className="relative border-t border-white/10 bg-black/25 backdrop-blur">
          <div className="container-page flex items-center gap-10 overflow-x-auto py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 scrollbar-none">
            {["Hotels", "Restaurants", "Hospitals", "Schools", "Industrial Plants", "Architectural Projects", "Cold Storage", "Laundries"].map(
              (t) => <span key={t} className="shrink-0">— {t}</span>
            )}
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE SECTION ================= */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Our expertise"
              title="From concept to installation, finished in steel."
              description="Five core practices, one workshop. Every piece is fabricated in-house by craftsmen who understand the demands of commercial service."
            />
            <p className="text-sm leading-relaxed text-muted-foreground lg:max-w-md lg:justify-self-end">
              We work in 304 and 316 grade stainless steel and finish every join,
              edge and weld for the environment it will live in — wet, hot, cold or seen.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-card p-7 transition-colors hover:bg-[var(--navy-deep)]">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-foreground group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-white/70">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKSHOP STRIP SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[var(--navy-deep)]">
        <img
          src={IMG.worktopUndershelf}
          alt="Stainless steel fabrication workshop"
          width={1600}
          height={1000}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy-deep)]/85 to-transparent" />
        <div className="container-page relative grid items-center gap-10 py-24 md:py-32 lg:grid-cols-2">
          <div>
            <div className="eyebrow !text-accent">Inside the workshop</div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
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
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SHOWCASE SECTION ================= */}
      <section className="py-24 md:py-32">
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
            <Link to="/kitchen-fabrications" className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-accent hover:text-accent-foreground transition-colors">
              Kitchen catalogue <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/refrigeration" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-foreground transition-colors">
              Refrigeration
            </Link>
            <Link to="/laundry" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-foreground transition-colors">
              Laundry
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION SECTION ================= */}
      <section className="py-20">
        <div className="container-page">
          <div className="hero-surface relative overflow-hidden rounded-2xl p-10 md:p-16">
            <div 
              className="absolute inset-0 opacity-50" 
              style={{
                backgroundImage: "radial-gradient(500px circle at 90% 50%, oklch(0.78 0.14 195 / 0.4), transparent 60%)",
              }} 
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <div className="eyebrow !text-accent">Start a project</div>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Tell us what you're building.
                </h2>
                <p className="mt-4 max-w-lg text-white/70">
                  Share dimensions, drawings or a rough idea. We'll come back
                  with a quote and a build plan within 48 hours.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="tel:+254794872338" className="group flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition-colors hover:border-accent">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Call</div>
                      <div className="font-display text-base font-bold text-white">+254 794 872 338</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-accent transition-colors" />
                </a>
                <a href="mailto:sales@elitestainlesssteelconcepts.co.ke" className="group flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition-colors hover:border-accent">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-5 w-5 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Email</div>
                      <div className="truncate font-display text-sm font-bold text-white">sales@elitestainlesssteelconcepts.co.ke</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 group-hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
