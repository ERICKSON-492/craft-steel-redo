import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
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

const PROJECT_TYPES = ["Commercial Kitchen", "Refrigeration / Cold Room", "Laundry", "Ventilation / Hoods", "Storage / Shelving", "Architectural / Railings", "Other"];

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
        eyebrow="Contact"
        title="Let's build something durable."
        description="Send us your dimensions, drawings or a rough sketch — we'll respond with a quote and timeline within 48 hours."
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="eyebrow">Reach us directly</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
              Workshop & office
            </h2>

            <div className="mt-8 space-y-5">
              {[
                { icon: Phone, label: "Telephone", value: "+254 794 872 338", href: "tel:+254794872338" },
                { icon: Phone, label: "Telephone", value: "+254 706 093 060", href: "tel:+254706093060" },
                { icon: Mail, label: "Sales", value: "sales@elitestainlesssteelconcepts.co.ke", href: "mailto:sales@elitestainlesssteelconcepts.co.ke" },
                { icon: Mail, label: "General", value: "info@elitestainlesssteelconcepts.co.ke", href: "mailto:info@elitestainlesssteelconcepts.co.ke" },
                { icon: MapPin, label: "Location", value: "Landies Road, near Muthurua Primary School, Nairobi" },
                { icon: Clock, label: "Hours", value: "Mon — Sat · 8:00 to 17:30" },
              ].map((row) => {
                const Icon = row.icon;
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-foreground text-background">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </div>
                      <div className="mt-0.5 break-words font-display text-sm font-bold text-foreground sm:text-base">
                        {row.value}
                      </div>
                    </div>
                  </div>
                );
                return row.href ? (
                  <a key={row.value} href={row.href} className="block group hover:opacity-80">
                    {inner}
                  </a>
                ) : (
                  <div key={row.value}>{inner}</div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-md border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <div className="eyebrow">Request a quote</div>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">Tell us about your project</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Full name" required placeholder="Jane Doe" />
              <Field name="email" type="email" label="Email" required placeholder="you@company.com" />
              <Field name="phone" label="Phone" placeholder="+254..." />
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Project type
                </span>
                <select
                  name="project"
                  className="mt-1.5 w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  defaultValue=""
                >
                  <option value="">Select…</option>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Project details
              </span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Dimensions, quantities, intended use…"
                className="mt-1.5 w-full resize-none rounded-sm border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </label>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-foreground px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-background transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-60 sm:w-auto"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? "Sending…" : "Send request"}
            </button>
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
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}
