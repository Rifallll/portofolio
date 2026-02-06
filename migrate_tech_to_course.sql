-- Migrate all Tech certificates to Course category
-- This script updates the category field for all certificates containing "Tech" in their category

UPDATE certificates
SET category = 'Course'
WHERE category LIKE '%Tech%';

-- Verify the update
SELECT id, title, category, issuer
FROM certificates
WHERE category = 'Course'
ORDER BY date DESC;
