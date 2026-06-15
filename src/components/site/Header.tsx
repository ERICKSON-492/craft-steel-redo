import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/kitchen-fabrications", label: "Kitchen" },
  { to: "/refrigeration", label: "Refrigeration" },
  { to: "/laundry", label: "Laundry" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-gradient-to-br from-foreground to-foreground/70 text-background font-display text-sm font-black tracking-tighter">
            ES
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-display text-sm font-bold tracking-tight text-foreground sm:text-[15px]">
              ELITE STAINLESS
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Steel Concepts
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+254794872338"
            className="flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <Phone className="h-3.5 w-3.5 text-accent" />
            +254 794 872 338
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-sm bg-foreground px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-background transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Get a Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-sm p-2 text-foreground hover:bg-muted"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "rounded-sm px-3 py-3 text-sm font-semibold bg-muted text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-foreground px-4 py-3 text-xs font-bold uppercase tracking-wider text-background"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
