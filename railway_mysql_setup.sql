-- ============================================================
--  PORTFOLIO DATABASE - RAILWAY MYSQL
--  Jalankan file ini di Railway MySQL console atau phpMyAdmin
-- ============================================================

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Web Dev',
  `tech` JSON DEFAULT NULL COMMENT 'Array of tech strings, e.g. ["React","TypeScript"]',
  `image` TEXT DEFAULT NULL,
  `year` VARCHAR(10) DEFAULT NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `client` VARCHAR(255) DEFAULT NULL,
  `desc` TEXT DEFAULT NULL,
  `demo_url` TEXT DEFAULT NULL,
  `repo_url` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS `experience` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NOT NULL,
  `period` VARCHAR(100) DEFAULT NULL,
  `year` VARCHAR(50) DEFAULT NULL,
  `desc` TEXT DEFAULT NULL,
  `tech` JSON DEFAULT NULL COMMENT 'Array of tech strings',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SKILLS TABLE
CREATE TABLE IF NOT EXISTS `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(100) NOT NULL COMMENT 'Frontend / Backend / Design / DevOps / Tools',
  `name` VARCHAR(100) NOT NULL,
  `proficiency` INT DEFAULT 80 COMMENT 'Nilai 0-100',
  `icon_name` VARCHAR(50) DEFAULT 'Code',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `org` VARCHAR(255) DEFAULT NULL,
  `year` VARCHAR(50) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT 'Engineering',
  `image_url` TEXT DEFAULT NULL,
  `credential_url` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  SEED DATA - ISI DATA AWAL
-- ============================================================

-- PROJECTS
INSERT INTO `projects` (`title`, `category`, `tech`, `image`, `year`, `featured`, `client`, `desc`, `demo_url`, `repo_url`) VALUES
('Climate Change Environmental Monitoring', 'Data Analytics', '["Python", "Tableau", "SQL", "Pandas"]', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop', '2024', 1, 'Personal Project', 'Dashboard interaktif untuk memantau data lingkungan dan perubahan iklim menggunakan analisis data Python dan visualisasi Tableau.', 'https://portofolio-nine-opal.vercel.app', 'https://github.com/rifalazhar'),
('Portfolio Website - Rifal Dev', 'Web Dev', '["React", "TypeScript", "Tailwind CSS", "Framer Motion"]', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop', '2025', 1, 'Personal', 'Portfolio website modern dengan dark cyberpunk aesthetic, animasi framer motion, dan integrasi database real-time.', 'https://portofolio-nine-opal.vercel.app', 'https://github.com/rifalazhar'),
('Data Analytics Dashboard', 'Data Analytics', '["Python", "SQL", "Pandas", "Matplotlib"]', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop', '2024', 0, 'DQLab', 'Analisis data komprehensif dengan visualisasi interaktif menggunakan Python dan SQL untuk business intelligence.', NULL, 'https://github.com/rifalazhar'),
('UI/UX Design System', 'UI/UX Design', '["Figma", "Adobe XD", "Prototyping"]', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop', '2024', 0, 'Gamelab Indonesia', 'Design system lengkap dengan komponen UI yang konsisten, guidelines tipografi, dan color palette untuk aplikasi mobile.', NULL, NULL),
('Web Scraping & Data Pipeline', 'Data Analytics', '["Python", "BeautifulSoup", "Pandas", "SQL"]', 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&auto=format&fit=crop', '2023', 0, 'Personal Project', 'Pipeline otomatis untuk scraping, cleaning, dan penyimpanan data dari berbagai sumber web ke database SQL.', NULL, 'https://github.com/rifalazhar'),
('Social Media Analytics Tool', 'Data Analytics', '["Python", "Google Analytics", "Tableau", "SQL"]', 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&auto=format&fit=crop', '2023', 0, 'Nevercode LTD', 'Tool analitik untuk memantau performa konten media sosial, engagement rate, dan growth metrics secara real-time.', NULL, NULL);

-- EXPERIENCE
INSERT INTO `experience` (`role`, `company`, `period`, `year`, `desc`, `tech`) VALUES
('Digital Marketing & Data Analyst', 'Nevercode LTD', 'Jan 2024 - Present', '2024', 'Mengelola strategi konten digital, analisis data kampanye, dan optimasi SEO. Berhasil meningkatkan engagement rate hingga 150% dalam 6 bulan pertama.', '["Google Analytics", "SQL", "Python", "Tableau", "SEO"]'),
('Freelance Web Developer', 'Self-Employed', 'Jun 2023 - Present', '2023', 'Mengembangkan website dan aplikasi web untuk klien lokal menggunakan React, Next.js, dan WordPress. Menangani 5+ proyek selesai dengan kepuasan klien 100%.', '["React", "Next.js", "WordPress", "HTML/CSS", "JavaScript"]'),
('Content & Social Media Strategist', 'Berbagai Klien', '2022 - 2023', '2022', 'Merancang dan mengeksekusi strategi konten media sosial, analisis kompetitor, dan pelaporan performa untuk klien UMKM.', '["Content Strategy", "Social Media", "Canva", "Analytics"]');

-- SKILLS
INSERT INTO `skills` (`category`, `name`, `proficiency`, `icon_name`) VALUES
-- Frontend
('Frontend', 'React.js', 92, 'Atom'),
('Frontend', 'TypeScript', 88, 'Code'),
('Frontend', 'Next.js', 85, 'Triangle'),
('Frontend', 'Tailwind CSS', 95, 'Wind'),
-- Backend
('Backend', 'Node.js', 80, 'Server'),
('Backend', 'SQL / MySQL', 90, 'Database'),
('Backend', 'Python', 92, 'Zap'),
('Backend', 'REST API', 85, 'Link'),
-- Design
('Design', 'Figma', 90, 'Move'),
('Design', 'UI/UX Design', 88, 'Image'),
('Design', 'Adobe XD', 75, 'Hexagon'),
-- Tools
('Tools', 'Git & GitHub', 88, 'Code'),
('Tools', 'Tableau', 85, 'Box'),
('Tools', 'Web Scraping', 87, 'Bot');

-- CERTIFICATES
INSERT INTO `certificates` (`title`, `org`, `year`, `category`, `image_url`, `credential_url`) VALUES
('Machine Learning: K-Means Clustering', 'DQLab', 'March 2025', 'Engineering', NULL, NULL),
('Mastering UI/UX with Figma', 'Gamelab Indonesia', 'August 2024', 'Engineering', NULL, NULL),
('Public Speaking Mastery', 'Bicara.Official', 'July 2024', 'Content_Prod', NULL, NULL),
('Python for Data Science', 'DQLab', 'February 2024', 'Engineering', NULL, NULL),
('Social Media Marketing Certified', 'HubSpot Academy', 'March 2022', 'Content_Prod', NULL, NULL),
('Data Analysis with SQL', 'DQLab', 'January 2024', 'Engineering', NULL, NULL),
('Digital Marketing Strategy', 'Google Digital Garage', 'November 2023', 'Public_Rel', NULL, NULL);
