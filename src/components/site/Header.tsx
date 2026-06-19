import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, LogIn } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contacts" },
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
          ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-[var(--background)] border-b border-[var(--border)]/50"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)] font-display text-sm font-bold text-[var(--background)] group-hover:shadow-md transition-all duration-300">
            ES
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display text-sm font-semibold text-[var(--foreground)] leading-tight">
              ELITE STAINLESS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-display font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors duration-300 relative group"
              activeProps={{
                className: "text-sm font-display font-semibold text-[var(--accent)]"
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Section */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+254794872338"
            className="flex items-center gap-2 text-sm font-display text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors duration-300"
          >
            <Phone className="h-4 w-4" />
            <span>+254 794 872 338</span>
          </a>

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 h-10 px-4 text-[var(--muted-foreground)] font-display text-sm font-medium rounded-lg border border-[var(--border)] hover:bg-[var(--muted)]/30 hover:text-[var(--accent)] transition-all duration-300"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-10 px-6 bg-[var(--accent)] text-[var(--background)] font-display text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--muted)]/30 transition-colors duration-300"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      {open && (
        <div className="lg:hidden border-t border-[var(--border)]/50 bg-[var(--background)] animate-fade-in">
          <div className="container-page space-y-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-display font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)]/30 hover:text-[var(--accent)] transition-colors duration-300"
                activeProps={{ className: "block px-4 py-3 rounded-lg text-sm font-display font-semibold bg-[var(--accent)]/10 text-[var(--accent)]" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-[var(--border)]/50 mt-4 pt-4">
              <a
                href="tel:+254794872338"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-display text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]/30 transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>+254 794 872 338</span>
              </a>
              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-display text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:bg-[var(--muted)]/30 transition-colors duration-300"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex h-10 items-center justify-center bg-[var(--accent)] text-[var(--background)] font-display text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
