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
    if (!supabase?.from) {
      setSending(false);
      toast.error("Service unavailable — please try again later.");
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
        eyebrow="Contact Us"
        title="Get In Touch"
        description="Have a question or ready to start your next project? We'd love to hear from you. Get in touch and let's create something amazing together."
      />

      <section className="bg-[var(--background)] font-body">
        <div className="container-page py-16 sm:py-24">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">

            {/* Left Column: Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--foreground)]">
                  Get in touch
                </h2>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Reach out using any of the methods below. We typically respond within 24 hours.
                </p>
              </div>

              {/* Contact Items */}
              <div className="space-y-8">
                {/* Phone Numbers */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                    Phone
                  </h3>
                  <div className="space-y-3">
                    {[
                      { value: "+254 (0) 794 872 338", href: "tel:+254794872338" },
                      { value: "+254 (0) 706 093 060", href: "tel:+254706093060" },
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="flex items-center gap-4 group"
                      >
                        <Phone className="h-5 w-5 text-[var(--accent)] flex-shrink-0" />
                        <span className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                          {item.value}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                    Email
                  </h3>
                  <div className="space-y-3">
                    {[
                      { value: "sales@elitestainlesssteelconcepts.co.ke", href: "mailto:sales@elitestainlesssteelconcepts.co.ke" },
                      { value: "info@elitestainlesssteelconcepts.co.ke", href: "mailto:info@elitestainlesssteelconcepts.co.ke" },
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="flex items-center gap-4 group"
                      >
                        <Mail className="h-5 w-5 text-[var(--accent)] flex-shrink-0" />
                        <span className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors break-all">
                          {item.value}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                    Location
                  </h3>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <p className="text-[var(--foreground)]">
                      Landies Road<br />
                      Adjacent to Muthurua Primary<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                    Business Hours
                  </h3>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <div className="text-[var(--foreground)]">
                      <p>Monday – Saturday</p>
                      <p>8:00 AM – 5:30 PM (EAT)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--foreground)]">
                Send us a message
              </h2>

              <form onSubmit={onSubmit} className="mt-8 space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--foreground)]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+254 ..."
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/10"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-[var(--foreground)]">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/10 appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
                    defaultValue=""
                  >
                    <option value="">Select a project type</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us about your project, requirements, materials, dimensions, or any other details..."
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/10 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex h-12 items-center justify-center gap-3 px-6 rounded-lg bg-[var(--accent)] text-[var(--background)] font-medium hover:bg-[var(--accent)]/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>{sending ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
