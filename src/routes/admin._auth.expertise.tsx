import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Modal, Field, ModalFooter, ConfirmDialog, inputCls } from "./admin._auth.products";

export const Route = createFileRoute("/admin/_auth/expertise")({
  component: ExpertisePage,
});

const ICONS = ["Wrench", "Sparkles", "ShieldCheck", "Factory", "Hammer", "Cog", "Flame", "Hardhat"] as const;

type Item = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  icon: string | null;
  sort_order: number;
};

function ExpertisePage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Item | null | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState<Item | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["expertise-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("expertise" as any).select("*").order("sort_order");
      if (error) throw error;
      return data as Item[];
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("expertise" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Item deleted");
      qc.invalidateQueries({ queryKey: ["expertise-list"] });
      qc.invalidateQueries({ queryKey: ["expertise-public"] });
      setConfirmDelete(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Our Expertise</h1>
          <p className="mt-1 text-sm text-slate-600">Manage the cards shown in the homepage Expertise section.</p>
        </div>
        <button
          onClick={() => setEditing(null)}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="grid h-40 place-items-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : data.length === 0 ? (
          <div className="grid h-40 place-items-center text-sm text-slate-500">No expertise items yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Order</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((it) => (
                <tr key={it.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    {it.image_url ? (
                      <img src={it.image_url} alt="" className="h-12 w-16 rounded object-cover" />
                    ) : (
                      <div className="h-12 w-16 rounded bg-slate-100" />
                    )}
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900">{it.title}</td>
                  <td className="px-5 py-3 text-slate-600">{it.sort_order}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setEditing(it)} className="inline-grid h-8 w-8 place-items-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setConfirmDelete(it)} className="inline-grid h-8 w-8 place-items-center rounded text-slate-600 hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing !== undefined && (
        <ExpertiseDialog
          item={editing}
          onClose={() => setEditing(undefined)}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["expertise-list"] });
            qc.invalidateQueries({ queryKey: ["expertise-public"] });
            setEditing(undefined);
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          title="Delete expertise item?"
          message={`"${confirmDelete.title}" will be permanently removed.`}
          busy={del.isPending}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => del.mutate(confirmDelete.id)}
        />
      )}
    </div>
  );
}

function ExpertiseDialog({ item, onClose, onSaved }: { item: Item | null; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(item?.image_url ?? null);
  const [icon, setIcon] = useState(item?.icon ?? "Wrench");
  const [sortOrder, setSortOrder] = useState<number>(item?.sort_order ?? 99);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return toast.error("Title and description are required");
    setBusy(true);
    const payload = { title: title.trim(), description: description.trim(), image_url: imageUrl, icon, sort_order: sortOrder };
    const { error } = item
      ? await supabase.from("expertise" as any).update(payload).eq("id", item.id)
      : await supabase.from("expertise" as any).insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(item ? "Item updated" : "Item added");
    onSaved();
  }

  return (
    <Modal title={item ? "Edit Expertise" : "Add Expertise"} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Title" required>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} required />
        </Field>
        <Field label="Description" required>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputCls} required />
        </Field>
        <Field label="Image">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Icon">
            <select value={icon} onChange={(e) => setIcon(e.target.value)} className={inputCls}>
              {ICONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Sort Order">
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className={inputCls} />
          </Field>
        </div>
        <ModalFooter busy={busy} onCancel={onClose} />
      </form>
    </Modal>
  );
}
