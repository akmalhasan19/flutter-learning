-- Enable storage if needed (usually enabled by default in valid Supabase instances)
-- Create the public bucket for assets like badges and thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-assets', 'public-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create the private bucket for videos (requires authenticated read)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-videos', 'course-videos', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Everyone can read public-assets
CREATE POLICY "Public Access for public-assets" 
ON storage.objects FOR SELECT
USING (bucket_id = 'public-assets');

-- Policy: Authenticated users can read course-videos
CREATE POLICY "Authenticated Read for course-videos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'course-videos' AND
  auth.role() = 'authenticated'
);

-- Policy: Only service role or admin can write (Insert/Update/Delete) for MVP
-- Typically done via dashboard for MVP, no client-side insert needed unless they submit assignments.
-- We'll allow authenticated users to view but insertions remain manual or via service keys.
