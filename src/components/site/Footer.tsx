import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--border)] bg-[var(--background)] font-body">
      {/* Outer grid boundary block */}
      <div className="container-page grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.2fr] border-x border-[var(--border)]">
        
        {/* Column 1: Brand Identifier Block */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center bg-[var(--accent)] font-mono text-xs font-black tracking-tighter text-[var(--background)]">
                ES
              </div>
              <div className="leading-none">
                <div className="font-display text-base font-black tracking-tight text-[var(--foreground)]">ELITE STAINLESS</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent)]">SPEC_FILE // 01</div>
              </div>
            </div>
            
            <p className="mt-6 max-w-xs font-body text-xs leading-relaxed text-[var(--muted-foreground)]">
              PRE-FABRICATION DESIGN & INFRASTRUCTURE FOR COMMERCIAL KITCHENS, REFRIGERATION, LAUNDRY, AND HEAVY ARCHITECTURAL SYSTEMS SPECIFIED ACROSS EAST AFRICA.
            </p>
          </div>

          <div className="mt-8 flex gap-2">
            <a aria-label="Facebook" href="#" className="flex h-8 items-center gap-2 border border-[var(--border)] px-3 font-mono text-[10px] uppercase text-[var(--muted-foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
              <Facebook className="h-3 w-3" />
              <span>FBK</span>
            </a>
            <a aria-label="Instagram" href="#" className="flex h-8 items-center gap-2 border border-[var(--border)] px-3 font-mono text-[10px] uppercase text-[var(--muted-foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
              <Instagram className="h-3 w-3" />
              <span>INS</span>
            </a>
          </div>
        </div>

        {/* Column 2: System Specifications / Services */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border)]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-2">
            <span className="text-[var(--accent)]">//</span> 01 / CAPABILITIES
          </div>
          <ul className="mt-6 space-y-3 font-mono text-xs">
            {[
              ["Kitchen Fabrications", "/kitchen-fabrications"],
              ["Refrigeration Units", "/refrigeration"],
              ["Industrial Laundry", "/laundry"],
              ["Structural Railings", "/kitchen-fabrications"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="group flex items-center justify-between text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  <span className="uppercase tracking-tight">{label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-[var(--accent)] transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Corporate Directory */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border)]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-2">
            <span className="text-[var(--accent)]">//</span> 02 / STRUCTURE
          </div>
          <ul className="mt-6 space-y-3 font-mono text-xs">
            {[
              ["About Division", "/"],
              ["Technical Contact", "/contact"],
              ["Request Quotation", "/contact"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="group flex items-center justify-between text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  <span className="uppercase tracking-tight">{label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-[var(--accent)] transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Physical & Network Logistics */}
        <div className="p-8 md:p-12 border-b md:border-b-0 border-[var(--border)]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-2">
            <span className="text-[var(--accent)]">//</span> 03 / LOGISTICS_NODE
          </div>
          <ul className="mt-6 space-y-4 text-xs font-mono text-[var(--muted-foreground)]">
            <li className="flex items-start gap-3">
              <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
              <div className="flex flex-col gap-1">
                <a href="tel:+254794872338" className="hover:text-[var(--foreground)] tracking-tighter">+254 [0] 794 872 338</a>
                <a href="tel:+254706093060" className="hover:text-[var(--foreground)] tracking-tighter">+254 [0] 706 093 060</a>
              </div>
            </li>
            <li className="flex items-start gap-3 border-t border-[var(--border)] pt-3">
              <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
              <a href="mailto:sales@elitestainlesssteelconcepts.co.ke" className="break-all hover:text-[var(--foreground)] lowercase text-[11px] tracking-tight">
                sales@elitestainlesssteelconcepts.co.ke
              </a>
            </li>
            <li className="flex items-start gap-3 border-t border-[var(--border)] pt-3 font-body text-xs text-[var(--muted-foreground)] uppercase tracking-tight">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent)] mt-0.5" />
              <span>LANDIES ROAD // ADJACENT MUTHURUA PRIMARY // NAIROBI, KENYA</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Meta Bar Metadata Block */}
      <div className="border-t border-[var(--border)] bg-[var(--navy-deep)]">
        <div className="container-page border-x border-[var(--border)] py-6 flex flex-col gap-4 text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between px-8 md:px-12">
          <div>
            © {new Date().getFullYear()} ELITE STAINLESS STEEL CONCEPTS. ALL SYSTEMS VERIFIED.
          </div>
          <div className="flex items-center gap-4 text-[var(--accent)]">
            <span>SYS_STATUS: ACTIVE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
