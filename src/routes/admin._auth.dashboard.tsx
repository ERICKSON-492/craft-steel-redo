import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, Image as ImageIcon, Star, MessageSquare, Plus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/_auth/dashboard")({
  component: Dashboard,
});

function useCount(table: "products" | "portfolio" | "testimonials" | "messages", filter?: (q: any) => any) {
  return useQuery({
    queryKey: ["count", table, !!filter],
    queryFn: async () => {
      let q = supabase.from(table).select("*", { count: "exact", head: true });
      if (filter) q = filter(q);
      const { count } = await q;
      return count ?? 0;
    },
  });
}

function Dashboard() {
  const products = useCount("products");
  const portfolio = useCount("portfolio");
  const testimonials = useCount("testimonials");
  const unread = useCount("messages", (q) => q.eq("is_read", false));

  const recent = useQuery({
    queryKey: ["recent-messages"],
    queryFn: async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const cards = [
    { label: "Products", value: products.data, icon: Package, to: "/admin/products", color: "bg-blue-500" },
    { label: "Portfolio", value: portfolio.data, icon: ImageIcon, to: "/admin/portfolio", color: "bg-emerald-500" },
    { label: "Testimonials", value: testimonials.data, icon: Star, to: "/admin/testimonials", color: "bg-amber-500" },
    { label: "Unread Messages", value: unread.data, icon: MessageSquare, to: "/admin/messages", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Welcome back. Here's what's happening.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.to}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c.label}</div>
                  <div className="mt-3 font-display text-3xl font-bold text-slate-900">{c.value ?? "—"}</div>
                </div>
                <div className={`grid h-10 w-10 place-items-center rounded-lg text-white ${c.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                Manage <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
        <Link
          to="/admin/portfolio"
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          <Plus className="h-4 w-4" /> Add Portfolio Item
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-display text-lg font-bold text-slate-900">Recent Messages</h2>
          <Link to="/admin/messages" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-slate-200">
          {recent.data && recent.data.length > 0 ? (
            recent.data.map((m) => (
              <Link
                key={m.id}
                to="/admin/messages"
                className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50"
              >
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${m.is_read ? "bg-slate-300" : "bg-rose-500"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold text-slate-900">{m.name}</div>
                    <div className="shrink-0 text-xs text-slate-500">
                      {new Date(m.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="truncate text-xs text-slate-500">{m.email}</div>
                  <div className="mt-1 line-clamp-1 text-sm text-slate-600">{m.message}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-5 py-10 text-center text-sm text-slate-500">No messages yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
