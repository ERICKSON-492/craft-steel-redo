import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Terminal } from "lucide-react";

const nav = [
  { to: "/", label: "Home", index: "01" },
  { to: "/kitchen-fabrications", label: "Kitchen", index: "02" },
  { to: "/refrigeration", label: "Refrigeration", index: "03" },
  { to: "/laundry", label: "Laundry", index: "04" },
  { to: "/contact", label: "Contact", index: "05" },
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
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? "border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md"
          : "border-[var(--border)] bg-[var(--background)]"
      }`}
    >
      {/* Structural bounding container matching footer alignment */}
      <div className="container-page flex h-16 items-center justify-between border-x border-[var(--border)] px-4 sm:px-6 lg:px-8">
        
        {/* Brand Terminal Identifier */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="grid h-9 w-9 place-items-center bg-[var(--foreground)] font-mono text-xs font-black tracking-tighter text-[var(--background)] group-hover:bg-[var(--accent)] transition-colors">
            ES
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-black tracking-tight text-[var(--foreground)] sm:text-base uppercase">
              ELITE STAINLESS
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
              SYS_NODE // CORE
            </div>
          </div>
        </Link>

        {/* Desktop Technical Framework Navigation */}
        <nav className="hidden lg:flex h-full items-center">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="h-full px-5 flex items-center font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)] border-r border-[var(--border)] first:border-l hover:text-[var(--foreground)] hover:bg-[var(--muted)]/30 transition-all"
              activeProps={{ 
                className: "h-full px-5 flex items-center font-mono text-xs uppercase tracking-wider text-[var(--accent)] border-r border-[var(--border)] bg-[var(--muted)]/50 border-b-2 border-b-[var(--accent)]" 
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              <span className="text-[var(--accent)] mr-1.5 text-[10px] font-normal">{item.index}.</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Call-to-Action Matrix Options */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+254794872338"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-tight text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <Phone className="h-3 w-3 text-[var(--accent)]" />
            <span className="tracking-tighter text-[var(--foreground)]">+254 [0] 794 872</span>
          </a>
          
          <Link
            to="/contact"
            className="inline-flex h-9 items-center border border-[var(--accent)] px-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all"
          >
            ESTIMATE_REQ //
          </Link>
        </div>

        {/* Industrial Hamburger Action Trigger */}
        <button
          aria-label="Toggle structural menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex h-9 w-9 items-center justify-center border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Grid Overlay Menu */}
      {open && (
        <div className="lg:hidden border-b border-[var(--border)] bg-[var(--background)] animate-fade-in">
          <div className="container-page border-x border-[var(--border)] divide-y divide-[var(--border)] font-mono text-xs uppercase">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center py-4 px-6 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                activeProps={{ className: "flex items-center py-4 px-6 bg-[var(--muted)]/50 text-[var(--accent)] font-bold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                <span className="text-[var(--accent)] w-8">{item.index} //</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="p-4 bg-[var(--navy-deep)]/40 flex flex-col gap-3">
              <a
                href="tel:+254794872338"
                className="flex items-center gap-2 py-2 px-2 text-[var(--muted-foreground)] text-xs tracking-tighter"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>CONNECT: +254 794 872 338</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center bg-[var(--accent)] text-[var(--background)] font-bold uppercase tracking-widest text-center"
              >
                REQUEST LINE ITEM QUOTE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
