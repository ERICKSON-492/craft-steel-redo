
CREATE POLICY "Public read website-images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'website-images');
CREATE POLICY "Admins upload website-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'website-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update website-images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'website-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete website-images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'website-images' AND public.has_role(auth.uid(), 'admin'));
