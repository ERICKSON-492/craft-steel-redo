import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="steel-surface brushed-line mt-24 border-t border-white/5">
      <div className="container-page py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-sm bg-white/10 font-display text-sm font-black tracking-tighter text-white">
              ES
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-white">ELITE STAINLESS</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/60">Steel Concepts</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            Precision stainless steel fabrication for commercial kitchens,
            refrigeration, laundry, and architectural projects across Kenya.
          </p>
          <div className="mt-5 flex gap-3">
            <a aria-label="Facebook" href="#" className="grid h-9 w-9 place-items-center rounded-sm border border-white/15 text-white/70 hover:border-accent hover:text-accent">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Instagram" href="#" className="grid h-9 w-9 place-items-center rounded-sm border border-white/15 text-white/70 hover:border-accent hover:text-accent">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow !text-white/50">Services</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["Kitchen Fabrications", "/kitchen-fabrications"],
              ["Refrigeration", "/refrigeration"],
              ["Laundry Equipment", "/laundry"],
              ["Railings & Balustrades", "/kitchen-fabrications"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="text-white/70 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow !text-white/50">Company</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="text-white/70 hover:text-white">About</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white">Request Quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow !text-white/50">Get in touch</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-3 text-white/75">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+254794872338">+254 794 872 338</a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+254706093060">+254 706 093 060</a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:sales@elitestainlesssteelconcepts.co.ke" className="break-all">
                sales@elitestainlesssteelconcepts.co.ke
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Landies Road, near Muthurua Primary School, Nairobi
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Elite Stainless Steel Concepts. All rights reserved.</div>
          <div>Designed for quality stainless steel solutions.</div>
        </div>
      </div>
    </footer>
  );
}
