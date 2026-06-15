import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Wrench, Factory, Sparkles, Phone, Mail, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-steel.jpg";
import workshopImg from "@/assets/workshop.jpg";
import worktableImg from "@/assets/product-worktable.jpg";
import sinkImg from "@/assets/product-sink.jpg";
import hoodImg from "@/assets/product-hood.jpg";
import shelfImg from "@/assets/product-shelf.jpg";
import coldroomImg from "@/assets/product-coldroom.jpg";
import railingImg from "@/assets/product-railing.jpg";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Stainless Steel Concepts — Precision Fabrication in Kenya" },
      { name: "description", content: "Custom stainless steel fabrication for commercial kitchens, refrigeration, laundry, railings & industrial projects across Kenya." },
      { property: "og:title", content: "Elite Stainless Steel Concepts" },
      { property: "og:description", content: "Custom stainless steel fabrication for commercial kitchens, refrigeration, laundry & architecture." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Wrench, title: "Custom Fabrication", desc: "Precision stainless steel fabrication tailored to unique residential, commercial and industrial needs." },
  { icon: Sparkles, title: "Commercial Kitchens", desc: "Durable, hygienic stainless steel kitchen solutions for restaurants, hotels and food businesses." },
  { icon: ShieldCheck, title: "Railings & Balustrades", desc: "Modern stainless steel railings designed for safety, durability and architectural appeal." },
  { icon: Factory, title: "Industrial Fabrication", desc: "Heavy-duty stainless steel structures and components built for industrial performance." },
];

const products = [
  { image: worktableImg, title: "Work Tables", description: "With or without undershelf, chute or splashback — fabricated to spec.", tag: "Kitchen" },
  { image: sinkImg, title: "Sinks", description: "Single, double or triple bowl commercial sinks in 304 grade steel.", tag: "Kitchen" },
  { image: hoodImg, title: "Exhaust Hoods", description: "Canopy and wall-mounted hoods with grease filters and lighting.", tag: "Ventilation" },
  { image: shelfImg, title: "Wall Shelves & Racks", description: "Single, double and perforated wall-mounted shelving systems.", tag: "Storage" },
  { image: coldroomImg, title: "Cold Room Shelving", description: "Modular shelving units engineered for refrigerated storage.", tag: "Refrigeration" },
  { image: railingImg, title: "Railings & Balustrades", description: "Architectural railings for stairs, balconies and walkways.", tag: "Architectural" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-foreground">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/20" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(700px circle at 20% 80%, oklch(0.7 0.19 45 / 0.35), transparent 60%)",
          }}
        />

        <div className="container-page relative grid min-h-[88vh] grid-cols-1 items-center gap-12 py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Kenya · Established Fabricators
              </span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              Stainless steel,
              <br />
              <span className="text-accent">engineered</span> for the work.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              We design, fabricate and install commercial stainless steel for
              kitchens, refrigeration, laundry and architectural projects —
              built to outlast the trade.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:bg-white hover:text-foreground"
              >
                Speak to our experts
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kitchen-fabrications"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/15"
              >
                Explore products
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-lg">
              {[
                ["10+", "Years in trade"],
                ["500+", "Custom builds"],
                ["304", "Grade steel"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl font-black text-white sm:text-4xl">{k}</dt>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block" />
        </div>

        {/* marquee */}
        <div className="relative border-t border-white/10 bg-black/30 backdrop-blur">
          <div className="container-page flex items-center gap-10 overflow-x-auto py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
            {["Hotels", "Restaurants", "Hospitals", "Schools", "Industrial Plants", "Architectural Projects", "Cold Storage"].map(
              (t) => (
                <span key={t} className="shrink-0">— {t}</span>
              )
            )}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Our expertise"
              title="From concept to installation, finished in steel."
              description="Five core practices, one workshop. Every piece is fabricated in-house by craftsmen who understand the demands of commercial service."
            />
            <p className="text-sm leading-relaxed text-muted-foreground lg:max-w-md lg:justify-self-end">
              We work in 304 and 316 grade stainless steel and finish every
              join, edge and weld for the environment it will live in — wet,
              hot, cold or seen.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-card p-8 transition-colors hover:bg-foreground">
                <Icon className="h-7 w-7 text-accent transition-transform group-hover:scale-110" />
                <h3 className="mt-6 font-display text-lg font-bold text-foreground group-hover:text-background">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-background/70">
                  {desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOP STRIP */}
      <section className="relative isolate overflow-hidden">
        <img
          src={workshopImg}
          alt="Stainless steel fabrication workshop"
          width={1600}
          height={1000}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/70 to-transparent" />
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
                "Custom dimensions, no standard sizes",
                "On-site delivery and installation",
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

      {/* PRODUCTS */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeader
            eyebrow="Products"
            title="A workshop catalogue, custom every time."
            description="Below are recurring builds. Send dimensions and we'll quote — or design something new with you."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/kitchen-fabrications" className="inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-accent hover:text-accent-foreground">
              Kitchen catalogue <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/refrigeration" className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-foreground">
              Refrigeration
            </Link>
            <Link to="/laundry" className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-foreground">
              Laundry
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-page">
          <div className="steel-surface brushed-line relative overflow-hidden rounded-lg p-10 md:p-16">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(500px circle at 90% 50%, oklch(0.7 0.19 45 / 0.4), transparent 60%)",
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
                <a href="tel:+254794872338" className="group flex items-center justify-between gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition-colors hover:border-accent">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Call</div>
                      <div className="font-display text-base font-bold text-white">+254 794 872 338</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-accent" />
                </a>
                <a href="mailto:sales@elitestainlesssteelconcepts.co.ke" className="group flex items-center justify-between gap-4 rounded-sm border border-white/15 bg-white/5 px-5 py-4 backdrop-blur transition-colors hover:border-accent">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-5 w-5 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/55">Email</div>
                      <div className="truncate font-display text-sm font-bold text-white">sales@elitestainlesssteelconcepts.co.ke</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 group-hover:text-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
