-- Add missing columns to projects table
-- This fixes the error: "Could not find the 'demo_url' column of 'projects' in the schema cache"
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS demo_url text,
    ADD COLUMN IF NOT EXISTS repo_url text;
-- Optional: Update the link column to be nullable if needed
-- ALTER TABLE projects ALTER COLUMN link DROP NOT NULL;