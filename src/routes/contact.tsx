import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Phone, Mail, MapPin, Clock, Send, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elite Stainless Steel Concepts" },
      { name: "description", content: "Speak to our experts. Call +254 794 872 338 or email sales@elitestainlesssteelconcepts.co.ke for stainless steel fabrication quotes." },
      { property: "og:title", content: "Contact Elite Stainless Steel" },
      { property: "og:description", content: "Request a quote for stainless steel fabrication in Kenya." },
    ],
  }),
  component: ContactPage,
});

const PROJECT_TYPES = [
  "Commercial Kitchen", 
  "Refrigeration / Cold Room", 
  "Laundry", 
  "Ventilation / Hoods", 
  "Storage / Shelving", 
  "Architectural / Railings", 
  "Other"
];

function ContactPage() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim() || null,
      project_type: String(data.get("project") || "").trim() || null,
      message: String(data.get("message") || "").trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setSending(false);
      toast.error("Please fill in all required fields");
      return;
    }
    const { error } = await supabase.from("messages").insert(payload);
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    form.reset();
    toast.success("Thank you — we'll respond within 48 hours.");
  }

  return (
    <>
      <PageHero
        eyebrow="COMMUNICATION_PORTAL"
        title="ENGAGE SPECIFICATIONS."
        description="Transmit your system dimensions, architectural files, or structural schema arrays below. Operational feedback windows lock at 48 hours."
      />

      <section className="py-0 bg-[var(--background)] font-body">
        {/* Outer Grid Wrapper locks down matching structural lines */}
        <div className="container-page grid gap-0 grid-cols-1 lg:grid-cols-[1fr_1.2fr] border-x border-b border-[var(--border)]">
          
          {/* Left Block: Logistics & Direct Nodes Directory */}
          <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[var(--border)] flex flex-col justify-between bg-[var(--background)]">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--accent)] animate-pulse" />
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">DIRECT_CONNECT_CHANNELS</div>
              </div>
              <h2 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-[var(--foreground)] sm:text-3xl">
                WORKSHOP & COORDINATES
              </h2>

              <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {[
                  { icon: Phone, label: "COMM_LINE_01", value: "+254 (0) 794 872 338", href: "tel:+254794872338" },
                  { icon: Phone, label: "COMM_LINE_02", value: "+254 (0) 706 093 060", href: "tel:+254706093060" },
                  { icon: Mail, label: "DATA_INBOUND_SALES", value: "sales@elitestainlesssteelconcepts.co.ke", href: "mailto:sales@elitestainlesssteelconcepts.co.ke" },
                  { icon: Mail, label: "DATA_INBOUND_HQ", value: "info@elitestainlesssteelconcepts.co.ke", href: "mailto:info@elitestainlesssteelconcepts.co.ke" },
                  { icon: MapPin, label: "GEOGRAPHIC_ANCHOR", value: "LANDIES ROAD // ADJ. MUTHURUA PRIMARY // NAIROBI" },
                  { icon: Clock, label: "OPERATIONAL_WINDOW", value: "MON — SAT // 08:00 - 17:30 [EAT]" },
                ].map((row, idx) => {
                  const Icon = row.icon;
                  const inner = (
                    <div className="flex items-center justify-between py-4 group">
                      <div className="flex items-center gap-4 min-w-0">
                        <Icon className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted-foreground)]">
                            {row.label}
                          </div>
                          <div className="mt-0.5 font-mono text-xs font-bold text-[var(--foreground)] break-all tracking-tight uppercase">
                            {row.value}
                          </div>
                        </div>
                      </div>
                      {row.href && (
                        <span className="font-mono text-[10px] text-[var(--border)] group-hover:text-[var(--accent)] translate-x-0 group-hover:translate-x-1 transition-all pr-2 shrink-0">
                          ➔
                        </span>
                      )}
                    </div>
                  );
                  return row.href ? (
                    <a key={idx} href={row.href} className="block hover:bg-[var(--muted)]/20 transition-colors">
                      {inner}
                    </a>
                  ) : (
                    <div key={idx} className="bg-transparent">{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Verification Stamp at base of Column */}
            <div className="mt-12 flex items-center gap-3 border border-[var(--border)] p-4 bg-[var(--card)]">
              <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
              <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)] leading-normal">
                SECURE INTERFACE LINK // RAW INBOUND SPECIFICATIONS ENCRYPTED DIRECT TO NAIROBI PRODUCTION PIPELINE.
              </p>
            </div>
          </div>

          {/* Right Block: Pure Minimalist Technical Form Grid */}
          <form
            onSubmit={onSubmit}
            className="p-8 sm:p-12 bg-[var(--background)]/40 relative flex flex-col justify-between"
          >
            {/* Top Right Blueprint Crosshair Node */}
            <div className="absolute top-0 right-0 font-mono text-[8px] text-[var(--border)] px-3 py-1 select-none">
              [FORM_REF_NBI_99]
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--accent)]" />
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">INTAKE_MATRIX</div>
              </div>
              <h3 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
                TRANSMIT SYSTEM RUNTIMES
              </h3>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Field name="name" label="01 // OPERATOR_NAME" required placeholder="IDENTIFY INITIALS OR NAME" />
                <Field name="email" type="email" label="02 // COMMS_EMAIL" required placeholder="EMAIL@DOMAIN.COM" />
                <Field name="phone" label="03 // ROUTING_PHONE" placeholder="TELEPHONE MATRIX" />
                
                <label className="flex flex-col">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                    04 // SYSTEM_CLASSIFICATION
                  </span>
                  <select
                    name="project"
                    className="mt-2 w-full rounded-none border border-[var(--border)] bg-[var(--background)] px-4 h-11 text-xs font-mono uppercase text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23444444\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                    defaultValue=""
                  >
                    <option value="" className="bg-[var(--background)]">SELECT ARCHITECTURAL AXIS…</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t} className="bg-[var(--card)]">{t.toUpperCase()}</option>)}
                  </select>
                </label>
              </div>

              <label className="mt-6 block">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  05 // PARAMETRIC_DIMENSIONS_AND_BLUEPRINT_METRICS
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="SPECIFY FABRICATION SCOPE, STEEL GRADES (304/316), MEASUREMENTS, OR REFRIGERATION LOAD CAPACITIES..."
                  className="mt-2 w-full resize-none rounded-none border border-[var(--border)] bg-[var(--background)] p-4 font-mono text-xs text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] uppercase placeholder:text-[var(--muted-foreground)]/40 leading-relaxed"
                />
              </label>
            </div>

            {/* Industrial Action Dispatch Button */}
            <div className="mt-10 pt-6 border-t border-[var(--border)] flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-3 border border-[var(--accent)] px-8 font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all cursor-pointer disabled:opacity-50"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                <span>{sending ? "DISPATCHING_DATA..." : "DISPATCH_REQUEST //"}</span>
              </button>
            </div>

          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  name, label, type = "text", required, placeholder,
}: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="flex flex-col">
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder.toUpperCase()}
        className="mt-2 w-full rounded-none border border-[var(--border)] bg-[var(--background)] px-4 h-11 font-mono text-xs text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] placeholder:text-[var(--muted-foreground)]/40 uppercase"
      />
    </label>
  );
}
