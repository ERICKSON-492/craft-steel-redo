import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-white">
      {/* Main footer content */}
      <div className="container-page mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-6 md:px-12 py-16 md:py-24">
          {/* Column 1: Logo & Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-[var(--accent)] rounded flex items-center justify-center text-[var(--navy-deep)] font-bold text-sm">
                ES
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-white leading-tight">
                  ELITE STAINLESS<br />STEEL CONCEPTS
                </h3>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Premium stainless steel fabrication for commercial kitchens, refrigeration systems, laundry facilities, and architectural structures across Kenya.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                aria-label="Facebook"
                href="#"
                className="text-white/70 hover:text-[var(--accent)] transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="text-white/70 hover:text-[var(--accent)] transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                ["Kitchen Fabrications", "/kitchen-fabrications"],
                ["Refrigeration", "/refrigeration"],
                ["Laundry", "/laundry"],
                ["Structural Railings", "/kitchen-fabrications"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white/70 hover:text-[var(--accent)] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                ["About", "/"],
                ["Contact", "/contact"],
                ["Request Quotation", "/contact"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white/70 hover:text-[var(--accent)] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+254794872338"
                      className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                    >
                      +254 794 872 338
                    </a>
                    <a
                      href="tel:+254706093060"
                      className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                    >
                      +254 706 093 060
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <a
                    href="mailto:sales@elitestainlesssteelconcepts.co.ke"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm break-all"
                  >
                    sales@elitestainlesssteelconcepts.co.ke
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Landies Road, Nairobi, Kenya
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 px-6 md:px-12 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-white/70 text-xs">
            © {new Date().getFullYear()} Elite Stainless Steel Concepts. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/70 hover:text-[var(--accent)] transition-colors duration-200 text-xs">
              Privacy Policy
            </a>
            <span className="text-white/20">•</span>
            <a href="#" className="text-white/70 hover:text-[var(--accent)] transition-colors duration-200 text-xs">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
