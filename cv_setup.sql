-- Create cv_uploads table
CREATE TABLE IF NOT EXISTS cv_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Only one active CV at a time
CREATE UNIQUE INDEX IF NOT EXISTS idx_active_cv ON cv_uploads (is_active)
WHERE is_active = true;
-- Enable RLS
ALTER TABLE cv_uploads ENABLE ROW LEVEL SECURITY;
-- Allow public read access (for downloading CV)
CREATE POLICY "Allow public read access" ON cv_uploads FOR
SELECT USING (is_active = true);
-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON cv_uploads FOR ALL USING (auth.role() = 'authenticated');
-- Create storage bucket for CV files
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-files', 'cv-files', true) ON CONFLICT (id) DO NOTHING;
-- Storage policies
CREATE POLICY "Allow public read access to CV files" ON storage.objects FOR
SELECT USING (bucket_id = 'cv-files');
CREATE POLICY "Allow authenticated users to upload CV files" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'cv-files'
        AND auth.role() = 'authenticated'
    );
CREATE POLICY "Allow authenticated users to delete CV files" ON storage.objects FOR DELETE USING (
    bucket_id = 'cv-files'
    AND auth.role() = 'authenticated'
);