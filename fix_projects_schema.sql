-- Add ALL potentially missing columns to projects table
-- This fixes errors for: "tech", "desc", "image", "featured", "demo_url", "repo_url"
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS "tech" text [],
    -- Array of text for technologies
ADD COLUMN IF NOT EXISTS "desc" text,
    ADD COLUMN IF NOT EXISTS image text,
    ADD COLUMN IF NOT EXISTS demo_url text,
    ADD COLUMN IF NOT EXISTS repo_url text,
    ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
-- Force reload of schema cache (helps if columns exist but are not seen)
NOTIFY pgrst,
'reload config';