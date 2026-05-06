
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rqavqiuepoarwbgfqpkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYXZxaXVlcG9hcndiZ2ZxcGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTg3MTUsImV4cCI6MjA5MzUzNDcxNX0.Fhiz5d2n44l5wksp7aXcMPIfPyqW7_FCXmN9_Om7LnA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
    try {
        console.log('Seeding projects...');
        const { error: pErr } = await supabase.from('projects').insert([
            {
                title: 'Climate Change Environmental Monitoring',
                category: 'Data Analytics',
                tech: ["Python", "Tableau", "SQL", "Pandas"],
                image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop',
                year: '2024',
                featured: true,
                client: 'Personal Project',
                desc: 'Dashboard interaktif untuk memantau data lingkungan dan perubahan iklim menggunakan analisis data Python dan visualisasi Tableau.',
                demo_url: 'https://portofolio-nine-opal.vercel.app',
                repo_url: 'https://github.com/rifalazhar'
            },
            {
                title: 'Portfolio Website - Rifal Dev',
                category: 'Web Dev',
                tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
                year: '2025',
                featured: true,
                client: 'Personal',
                desc: 'Portfolio website modern dengan dark cyberpunk aesthetic, animasi framer motion, dan integrasi database real-time.',
                demo_url: 'https://portofolio-nine-opal.vercel.app',
                repo_url: 'https://github.com/rifalazhar'
            }
        ]);
        if (pErr) console.error('Projects Error:', pErr);

        console.log('Seeding experience...');
        const { error: eErr } = await supabase.from('experience').insert([
            {
                role: 'Digital Marketing & Data Analyst',
                company: 'Nevercode LTD',
                period: 'Jan 2024 - Present',
                year: '2024',
                desc: 'Mengelola strategi konten digital, analisis data kampanye, dan optimasi SEO. Berhasil meningkatkan engagement rate hingga 150% dalam 6 bulan pertama.',
                tech: ["Google Analytics", "SQL", "Python", "Tableau", "SEO"]
            },
            {
                role: 'Freelance Web Developer',
                company: 'Self-Employed',
                period: 'Jun 2023 - Present',
                year: '2023',
                desc: 'Mengembangkan website dan aplikasi web untuk klien lokal menggunakan React, Next.js, dan WordPress. Menangani 5+ proyek selesai dengan kepuasan klien 100%.',
                tech: ["React", "Next.js", "WordPress", "HTML/CSS", "JavaScript"]
            }
        ]);
        if (eErr) console.error('Experience Error:', eErr);

        console.log('Seeding skills...');
        const { error: sErr } = await supabase.from('skills').insert([
            { category: 'Frontend', name: 'React.js', proficiency: 92, icon_name: 'Atom' },
            { category: 'Frontend', name: 'TypeScript', proficiency: 88, icon_name: 'Code' },
            { category: 'Backend', name: 'SQL / MySQL', proficiency: 90, icon_name: 'Database' },
            { category: 'Backend', name: 'Python', proficiency: 92, icon_name: 'Zap' },
            { category: 'Tools', name: 'Git & GitHub', proficiency: 88, icon_name: 'Code' }
        ]);
        if (sErr) console.error('Skills Error:', sErr);

        console.log('Seeding certificates...');
        const { error: cErr } = await supabase.from('certificates').insert([
            { title: 'Machine Learning: K-Means Clustering', org: 'DQLab', year: 'March 2025', category: 'Engineering' },
            { title: 'Mastering UI/UX with Figma', org: 'Gamelab Indonesia', year: 'August 2024', category: 'Engineering' }
        ]);
        if (cErr) console.error('Certificates Error:', cErr);

        console.log('Done!');
    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

seedData();
