import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Modal, Field, ModalFooter, ConfirmDialog, inputCls } from "./admin._auth.products";

export const Route = createFileRoute("/admin/_auth/testimonials")({
  component: TestimonialsPage,
});

type T = { id: string; client_name: string; client_business: string | null; content: string; visible: boolean; created_at: string };
const PAGE_SIZE = 10;

function TestimonialsPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<T | null | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState<T | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as T[];
    },
  });

  const list = data ?? [];
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const view = list.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Removed"); qc.invalidateQueries({ queryKey: ["testimonials-list"] }); setConfirmDelete(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleVisible = useMutation({
    mutationFn: async (t: T) => {
      const { error } = await supabase.from("testimonials").update({ visible: !t.visible }).eq("id", t.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials-list"] }),
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-600">{list.length} testimonial{list.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="grid h-40 place-items-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : view.length === 0 ? (
          <div className="grid h-40 place-items-center text-sm text-slate-500">No testimonials yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">Client</th>
                <th className="px-5 py-3 text-left">Business</th>
                <th className="px-5 py-3 text-left">Preview</th>
                <th className="px-5 py-3 text-left">Visible</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {view.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-900">{t.client_name}</td>
                  <td className="px-5 py-3 text-slate-600">{t.client_business ?? "—"}</td>
                  <td className="px-5 py-3 max-w-xs truncate text-slate-600">{t.content}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleVisible.mutate(t)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        t.visible ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {t.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {t.visible ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setEditing(t)} className="inline-grid h-8 w-8 place-items-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setConfirmDelete(t)} className="inline-grid h-8 w-8 place-items-center rounded text-slate-600 hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
        <TestimonialDialog item={editing} onClose={() => setEditing(undefined)} onSaved={() => { qc.invalidateQueries({ queryKey: ["testimonials-list"] }); setEditing(undefined); }} />
      )}

      {confirmDelete && (
        <ConfirmDialog title="Delete testimonial?" message={`"${confirmDelete.client_name}" will be removed.`} busy={del.isPending} onCancel={() => setConfirmDelete(null)} onConfirm={() => del.mutate(confirmDelete.id)} />
      )}
    </div>
  );
}

function TestimonialDialog({ item, onClose, onSaved }: { item: T | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(item?.client_name ?? "");
  const [business, setBusiness] = useState(item?.client_business ?? "");
  const [content, setContent] = useState(item?.content ?? "");
  const [visible, setVisible] = useState(item?.visible ?? true);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return toast.error("Name and content are required");
    setBusy(true);
    const payload = { client_name: name.trim(), client_business: business.trim() || null, content: content.trim(), visible };
    const { error } = item
      ? await supabase.from("testimonials").update(payload).eq("id", item.id)
      : await supabase.from("testimonials").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(item ? "Updated" : "Added");
    onSaved();
  }

  return (
    <Modal title={item ? "Edit Testimonial" : "Add Testimonial"} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Client Name" required>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required />
        </Field>
        <Field label="Client Business">
          <input value={business} onChange={(e) => setBusiness(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Content" required>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className={inputCls} required />
        </Field>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Show on public site
        </label>
        <ModalFooter busy={busy} onCancel={onClose} />
      </form>
    </Modal>
  );
}
