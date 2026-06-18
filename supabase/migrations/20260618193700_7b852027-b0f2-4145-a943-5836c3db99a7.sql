
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  cta_label TEXT,
  cta_href TEXT,
  data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_content (key, title, subtitle, description, image_url, cta_label, cta_href)
VALUES (
  'home_hero',
  'Commercial stainless steel, engineered to last.',
  'Nairobi · Kenya · Since 2014',
  'We design, fabricate and install commercial stainless steel for kitchens, refrigeration, laundry and architectural projects across Kenya — built in-house in 304 / 316 grade steel.',
  NULL,
  'Speak to our experts',
  '/contact'
)
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.site_content (key, title, description, image_url)
VALUES (
  'expertise_section',
  'From concept to installation, finished in steel.',
  'We work in 304 and 316 grade stainless steel and finish every join, edge and weld for the environment it will live in — wet, hot, cold or seen.',
  NULL
)
ON CONFLICT (key) DO NOTHING;
