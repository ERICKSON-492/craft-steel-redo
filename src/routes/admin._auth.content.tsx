import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { inputCls, Field } from "./admin._auth.products";

export const Route = createFileRoute("/admin/_auth/content")({
  component: ContentPage,
});

type Row = {
  id: string;
  key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
};

const SECTIONS: { key: string; label: string; helper: string; fields: ("title" | "subtitle" | "description" | "image" | "cta")[] }[] = [
  { key: "home_hero", label: "Homepage Hero", helper: "The big banner at the top of the homepage.", fields: ["subtitle", "title", "description", "image", "cta"] },
  { key: "expertise_section", label: "Our Expertise Section", helper: "Heading, intro and side image on the homepage expertise area.", fields: ["title", "description", "image"] },
];

function ContentPage() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["site-content-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content" as any).select("*");
      if (error) throw error;
      return (data as unknown) as Row[];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Site Content</h1>
        <p className="mt-1 text-sm text-slate-600">Edit the editable sections of the public website.</p>
      </div>

      {isLoading ? (
        <div className="grid h-40 place-items-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin" /></div>
      ) : (
        <div className="space-y-8">
          {SECTIONS.map((s) => {
            const row = data.find((r) => r.key === s.key);
            return <SectionEditor key={s.key} meta={s} row={row} onSaved={() => {
              qc.invalidateQueries({ queryKey: ["site-content-admin"] });
              qc.invalidateQueries({ queryKey: ["site-content", s.key] });
            }} />;
          })}
        </div>
      )}
    </div>
  );
}

function SectionEditor({ meta, row, onSaved }: { meta: typeof SECTIONS[number]; row?: Row; onSaved: () => void }) {
  const [title, setTitle] = useState(row?.title ?? "");
  const [subtitle, setSubtitle] = useState(row?.subtitle ?? "");
  const [description, setDescription] = useState(row?.description ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(row?.image_url ?? null);
  const [ctaLabel, setCtaLabel] = useState(row?.cta_label ?? "");
  const [ctaHref, setCtaHref] = useState(row?.cta_href ?? "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setTitle(row?.title ?? "");
    setSubtitle(row?.subtitle ?? "");
    setDescription(row?.description ?? "");
    setImageUrl(row?.image_url ?? null);
    setCtaLabel(row?.cta_label ?? "");
    setCtaHref(row?.cta_href ?? "");
  }, [row?.id]);

  async function onSave() {
    setBusy(true);
    const payload = {
      key: meta.key,
      title: title.trim() || null,
      subtitle: subtitle.trim() || null,
      description: description.trim() || null,
      image_url: imageUrl,
      cta_label: ctaLabel.trim() || null,
      cta_href: ctaHref.trim() || null,
    };
    const { error } = row
      ? await supabase.from("site_content" as any).update(payload).eq("id", row.id)
      : await supabase.from("site_content" as any).insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`${meta.label} saved`);
    onSaved();
  }

  const f = meta.fields;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-4 border-b border-slate-100 pb-4">
        <h2 className="font-display text-lg font-bold text-slate-900">{meta.label}</h2>
        <p className="mt-1 text-xs text-slate-500">{meta.helper}</p>
      </div>
      <div className="space-y-4">
        {f.includes("subtitle") && (
          <Field label="Eyebrow / Subtitle">
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputCls} placeholder="Short tagline above the title" />
          </Field>
        )}
        {f.includes("title") && (
          <Field label="Title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
          </Field>
        )}
        {f.includes("description") && (
          <Field label="Description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputCls} />
          </Field>
        )}
        {f.includes("image") && (
          <Field label="Image">
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </Field>
        )}
        {f.includes("cta") && (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button label">
              <input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Button link">
              <input value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} className={inputCls} placeholder="/contact" />
            </Field>
          </div>
        )}
        <div className="flex justify-end">
          <button onClick={onSave} disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
