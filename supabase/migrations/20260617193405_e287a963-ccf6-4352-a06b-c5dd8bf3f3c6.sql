CREATE TABLE public.expertise (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.expertise TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.expertise TO authenticated;
GRANT ALL ON public.expertise TO service_role;

ALTER TABLE public.expertise ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view expertise" ON public.expertise FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage expertise" ON public.expertise FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_expertise_updated_at BEFORE UPDATE ON public.expertise FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.expertise (title, description, icon, sort_order) VALUES
  ('Custom Fabrication', 'Precision stainless steel fabrication tailored to residential, commercial and industrial needs.', 'Wrench', 1),
  ('Commercial Kitchens', 'Durable, hygienic stainless kitchen solutions for hotels, restaurants and food businesses.', 'Sparkles', 2),
  ('Railings & Balustrades', 'Modern stainless railings designed for safety, durability and architectural appeal.', 'ShieldCheck', 3),
  ('Industrial Fabrication', 'Heavy-duty stainless structures and components built for industrial performance.', 'Factory', 4),
  ('Custom Installations', 'Professional on-site installation ensuring precise fitting and long-term performance.', 'Hammer', 5);
