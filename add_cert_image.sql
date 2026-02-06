-- Add image_url column to certificates table
ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Verify it worked
SELECT * FROM certificates LIMIT 1;
