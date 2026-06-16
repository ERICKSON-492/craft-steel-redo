import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Loader2, Download, Mail, Phone, Calendar, Tag } from "lucide-react";
import { Modal, ConfirmDialog } from "./admin._auth.products";

export const Route = createFileRoute("/admin/_auth/messages")({
  component: MessagesPage,
});

type M = { id: string; name: string; email: string; phone: string | null; project_type: string | null; message: string; is_read: boolean; created_at: string };
const PAGE_SIZE = 10;

function MessagesPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<M | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<M | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["messages-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as M[];
    },
  });

  const list = data ?? [];
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const view = list.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleRead = useMutation({
    mutationFn: async (m: M) => {
      const { error } = await supabase.from("messages").update({ is_read: !m.is_read }).eq("id", m.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages-list"] }); qc.invalidateQueries({ queryKey: ["unread-messages"] }); qc.invalidateQueries({ queryKey: ["count", "messages", true] }); },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["messages-list"] }); qc.invalidateQueries({ queryKey: ["unread-messages"] }); setConfirmDelete(null); setOpen(null); },
    onError: (e: any) => toast.error(e.message),
  });

  function exportCsv() {
    const rows = [["Name", "Email", "Phone", "Project Type", "Message", "Read", "Created"]];
    list.forEach((m) => rows.push([m.name, m.email, m.phone ?? "", m.project_type ?? "", m.message.replace(/\n/g, " "), m.is_read ? "Yes" : "No", new Date(m.created_at).toISOString()]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-600">{list.length} message{list.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={exportCsv} disabled={list.length === 0} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-50">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="grid h-40 place-items-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : view.length === 0 ? (
          <div className="grid h-40 place-items-center text-sm text-slate-500">No messages yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Project</th>
                <th className="px-5 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {view.map((m) => (
                <tr key={m.id} onClick={() => { setOpen(m); if (!m.is_read) toggleRead.mutate(m); }} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${m.is_read ? "bg-slate-100 text-slate-600" : "bg-rose-100 text-rose-700"}`}>
                      {m.is_read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900">{m.name}</td>
                  <td className="px-5 py-3 text-slate-600">{m.email}</td>
                  <td className="px-5 py-3 text-slate-600">{m.project_type ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-500">{new Date(m.created_at).toLocaleDateString()}</td>
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

      {open && (
        <Modal title="Message Details" onClose={() => setOpen(null)}>
          <div className="space-y-4">
            <div>
              <div className="font-display text-lg font-bold text-slate-900">{open.name}</div>
              <div className="text-sm text-slate-500">{new Date(open.created_at).toLocaleString()}</div>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-700"><Mail className="h-4 w-4 text-slate-400" /> <a href={`mailto:${open.email}`} className="hover:underline">{open.email}</a></div>
              {open.phone && <div className="flex items-center gap-2 text-slate-700"><Phone className="h-4 w-4 text-slate-400" /> <a href={`tel:${open.phone}`} className="hover:underline">{open.phone}</a></div>}
              {open.project_type && <div className="flex items-center gap-2 text-slate-700"><Tag className="h-4 w-4 text-slate-400" /> {open.project_type}</div>}
              <div className="flex items-center gap-2 text-slate-700"><Calendar className="h-4 w-4 text-slate-400" /> {new Date(open.created_at).toLocaleDateString()}</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm whitespace-pre-wrap text-slate-700">
              {open.message}
            </div>
            <div className="flex flex-wrap justify-between gap-2 pt-2">
              <button onClick={() => toggleRead.mutate(open)} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Mark as {open.is_read ? "Unread" : "Read"}
              </button>
              <button onClick={() => setConfirmDelete(open)} className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <ConfirmDialog title="Delete message?" message={`Message from "${confirmDelete.name}" will be permanently removed.`} busy={del.isPending} onCancel={() => setConfirmDelete(null)} onConfirm={() => del.mutate(confirmDelete.id)} />
      )}
    </div>
  );
}
