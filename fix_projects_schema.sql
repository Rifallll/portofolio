-- Add missing columns to projects table
-- This fixes the error: "Could not find the 'demo_url' column..." AND "Could not find the 'featured' column..."
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS demo_url text,
    ADD COLUMN IF NOT EXISTS repo_url text,
    ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
-- Optional: Update the link column to be nullable if needed
-- ALTER TABLE projects ALTER COLUMN link DROP NOT NULL;