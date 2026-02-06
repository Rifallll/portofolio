
-- SEED DATA FOR PORTFOLIO
-- Run this script in the Supabase SQL Editor to populate your database with initial data.

-- 1. SEED PROJECTS
INSERT INTO projects (title, client, category, description, image_url, technologies, year, link, is_featured) VALUES
(
    'E-Commerce Platform',
    'Global Retail Inc.',
    'Web Dev',
    'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
    'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
    ARRAY['React', 'Node.js', 'PostgreSQL'],
    '2024',
    '/projects',
    TRUE
),
(
    'SaaS Dashboard',
    'Analytics Co.',
    'Data Analysis',
    'Modern analytics dashboard with data visualization, real-time updates, and team collaboration features.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    ARRAY['Next.js', 'TypeScript', 'Tailwind'],
    '2024',
    '/projects',
    TRUE
),
(
    'Social Media App',
    'Community Connect',
    'Mobile App',
    'Real-time social platform with secure messaging, media sharing, and community features.',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
    ARRAY['React', 'Firebase', 'Framer'],
    '2023',
    '/projects',
    TRUE
);

-- 2. SEED EXPERIENCE
INSERT INTO experience (role, company, period, "desc", tech) VALUES
(
    'Big Data Analyst (Internship)',
    'PT. KIMIA FARMA, TBK',
    'Dec 2025 - Present',
    'Data Processing & Quality assurance using AI/Machine Learning. Creating BI dashboards for strategic decision-making.',
    ARRAY['AI', 'ML', 'BI Dashboards']
),
(
    'Head of Technical Dept.',
    'FRASA ACADEMY',
    'Nov 2025 - Present',
    'Leading the dev team for Learning Management System (LMS). Defining technical strategies and conducting code reviews.',
    ARRAY['LMS', 'Technical Strategy', 'Leadership']
),
(
    'Freelance Web Developer',
    'NEVERCODE LTD',
    'Oct 2024 - Present',
    'Developed 20+ responsive websites. Optimized code to improve load time by up to 40%.',
    ARRAY['React', 'Performance', 'Web Dev']
),
(
    'Web Developer (Internship)',
    'ProCodeCG',
    'Jun 2025 - Oct 2025',
    'Built a web scraper for student progress reports. Reduced manual data entry time by 70%.',
    ARRAY['Web Scraping', 'Python', 'Automation']
);

-- 3. SEED CERTIFICATES
INSERT INTO certificates (title, issuer, date, link, category) VALUES
('Machine Learning: K-Means', 'DQLab', 'March 2025', '#', 'Course'),
('Mastering UI/UX w/ Figma', 'Gamelab Indonesia', 'Aug 2024', '#', 'Bootcamp'),
('Public Speaking Mastery', 'Bicara.Official', 'July 2024', '#', 'Workshop'),
('Python for Data Science', 'DQLab', 'Feb 2024', '#', 'Course'),
('Social Media Marketing', 'HubSpot Academy', 'Mar 2022', '#', 'Certification');

-- 4. SEED SKILLS
INSERT INTO skills (name, category, proficiency, icon_name) VALUES
-- Core Engineering
('React.js', 'Frontend', 98, 'Atom'),
('TypeScript', 'Frontend', 95, 'Code'),
('Next.js', 'Frontend', 95, 'Triangle'),
('Tailwind', 'Frontend', 99, 'Wind'),
-- Creative Dev
('Three.js', 'Design', 88, 'Box'),
('Framer Motion', 'Design', 92, 'Move'),
('GSAP', 'Design', 85, 'Zap'),
('Canvas API', 'Design', 80, 'Image'),
-- Backend & Cloud
('Node.js', 'Backend', 90, 'Hexagon'),
('PostgreSQL', 'Backend', 88, 'Database'),
('Supabase', 'Backend', 94, 'Server'),
('Docker', 'DevOps', 82, 'Container'),
-- AI & Emerging
('OpenAI API', 'Tools', 85, 'Bot'),
('Python', 'Backend', 80, 'Code'),
('TensorFlow.js', 'Tools', 75, 'Brain'),
('Solidity', 'Tools', 70, 'Link');
