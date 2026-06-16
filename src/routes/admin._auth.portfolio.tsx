import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { Modal, Field, ModalFooter, ConfirmDialog, inputCls } from "./admin._auth.products";

export const Route = createFileRoute("/admin/_auth/portfolio")({
  component: PortfolioPage,
});

const CATEGORIES = ["Hotels", "Restaurants", "Hospitals", "Schools", "Industrial Plants", "Architectural Projects", "Cold Storage", "Laundries"] as const;
type Item = { id: string; title: string; category: string; description: string | null; project_date: string | null; image_url: string | null; created_at: string };

const PAGE_SIZE = 10;

function PortfolioPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<Item | null | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState<Item | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["portfolio-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Item[];
    },
  });

  const filtered = (data ?? []).filter((p) => {
    if (filter && p.category !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const view = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Removed"); qc.invalidateQueries({ queryKey: ["portfolio-list"] }); setConfirmDelete(null); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-600">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} placeholder="Search…" className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-900" />
        </div>
        <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {isLoading ? (
        <div className="grid h-40 place-items-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
      ) : view.length === 0 ? (
        <div className="grid h-40 place-items-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500">No portfolio items yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {view.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="h-44 w-full object-cover" />
              ) : (
                <div className="h-44 w-full bg-slate-100" />
              )}
              <div className="p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{p.category}</div>
                <h3 className="mt-1 font-display text-base font-bold text-slate-900">{p.title}</h3>
                {p.project_date && <div className="mt-1 text-xs text-slate-500">{new Date(p.project_date).toLocaleDateString()}</div>}
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(p)} className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Edit</button>
                  <button onClick={() => setConfirmDelete(p)} className="rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div>Page {page + 1} of {pages}</div>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50">Prev</button>
            <button disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50">Next</button>
          </div>
        </div>
      )}

      {editing !== undefined && (
        <PortfolioDialog item={editing} onClose={() => setEditing(undefined)} onSaved={() => { qc.invalidateQueries({ queryKey: ["portfolio-list"] }); setEditing(undefined); }} />
      )}

      {confirmDelete && (
        <ConfirmDialog title="Delete item?" message={`"${confirmDelete.title}" will be removed.`} busy={del.isPending} onCancel={() => setConfirmDelete(null)} onConfirm={() => del.mutate(confirmDelete.id)} />
      )}
    </div>
  );
}

function PortfolioDialog({ item, onClose, onSaved }: { item: Item | null; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? CATEGORIES[0]);
  const [description, setDescription] = useState(item?.description ?? "");
  const [date, setDate] = useState(item?.project_date ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(item?.image_url ?? null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");
    setBusy(true);
    const payload = { title: title.trim(), category, description: description.trim() || null, project_date: date || null, image_url: imageUrl };
    const { error } = item
      ? await supabase.from("portfolio").update(payload).eq("id", item.id)
      : await supabase.from("portfolio").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(item ? "Updated" : "Added");
    onSaved();
  }

  return (
    <Modal title={item ? "Edit Portfolio Item" : "Add Portfolio Item"} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Title" required>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} required />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Description">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={inputCls} />
        </Field>
        <Field label="Project Date">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Image">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </Field>
        <ModalFooter busy={busy} onCancel={onClose} />
      </form>
    </Modal>
  );
}
