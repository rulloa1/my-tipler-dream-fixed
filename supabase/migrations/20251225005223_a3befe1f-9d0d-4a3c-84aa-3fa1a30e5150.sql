-- Create a storage bucket for project gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-gallery', 'project-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view gallery images (public bucket)
CREATE POLICY "Anyone can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-gallery');

-- Allow admins to upload gallery images
CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-gallery' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update gallery images
CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-gallery' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete gallery images
CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-gallery' 
  AND has_role(auth.uid(), 'admin'::app_role)
);