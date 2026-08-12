"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Star, Github, ArrowUpRight, Sparkles, X, Download, ExternalLink, Target, Lightbulb, CheckCircle, CircleDot } from "lucide-react";
import { DecryptText } from "@/components/ui/DecryptText";

const NOISE_PATTERN = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

interface Project {
  id: string | number; // String for dummy, number for DB to avoid collision
  title: string;
  category: string;
  technologies: string[];
  image_url?: string;
  image?: string;
  year?: string | number;
  is_featured?: boolean;
  client?: string;
  description: string;
  demo_url?: string;
  repo_url?: string;
  link?: string;
  
  // Extra fields for Excel projects (Optional for standard DB projects)
  subtitle?: string;
  downloadUrl?: string;
  driveUrl?: string;
  stats?: { label: string; value: string }[];
  caseStudy?: {
    problem: string;
    process: string[];
    result: string;
    skills: string[];
  };
}

const categories = ["All", "Data Analytics", "Web Dev", "UI/UX Design", "Mobile App", "Machine Learning"];

const excelProjects: Project[] = [
  {
    id: "excel-1",
    title: "Sales Analytics Dashboard",
    category: "Data Analytics",
    subtitle: "Monthly Performance Tracker",
    description: "Dashboard interaktif untuk memantau performa penjualan bulanan. Menggunakan Pivot Table, Slicer, dan Chart dinamis untuk visualisasi data.",
    image_url: "/excel-dashboard-preview.png",
    downloadUrl: "#", // Ganti dengan link download Google Drive kamu
    driveUrl: "#",   // Ganti dengan link Google Drive preview
    technologies: ["Pivot Table", "VLOOKUP", "Slicer", "Bar Chart", "Conditional Formatting"],
    stats: [
      { label: "Data Rows", value: "5.000+" },
      { label: "KPI Tracked", value: "12" },
      { label: "Time Saved", value: "3 jam/minggu" },
    ],
    caseStudy: {
      problem: "Tim sales kesulitan memantau performa harian karena data tersebar di banyak sheet tanpa ringkasan yang jelas.",
      process: [
        "Kumpulkan & bersihkan data raw dari 5 sumber berbeda",
        "Buat Pivot Table dinamis dengan slicer per region & kategori",
        "Desain KPI cards menggunakan formula INDEX/MATCH",
        "Tambahkan conditional formatting untuk highlight target tercapai",
        "Buat automated chart yang update otomatis saat data baru masuk",
      ],
      result: "Dashboard selesai real-time, tim bisa lihat performa dalam 30 detik tanpa manual report. Menghemat 3 jam kerja per minggu.",
      skills: ["Excel", "Pivot Table", "VLOOKUP", "Data Cleaning", "Dashboard Design"],
    },
  },
  {
    id: "excel-2",
    title: "Customer Segmentation Analysis",
    category: "Data Analytics",
    subtitle: "RFM Analysis with Excel",
    description: "Analisis segmentasi pelanggan menggunakan metode RFM (Recency, Frequency, Monetary) untuk identifikasi pelanggan prioritas.",
    image_url: "/excel-dashboard-preview.png",
    downloadUrl: "#",
    driveUrl: "#",
    technologies: ["RFM Formula", "COUNTIFS", "SUMIFS", "Pie Chart", "Data Validation"],
    stats: [
      { label: "Pelanggan", value: "2.500+" },
      { label: "Segmen", value: "5" },
      { label: "Akurasi", value: "92%" },
    ],
    caseStudy: {
      problem: "Marketing tidak tahu pelanggan mana yang harus diprioritaskan untuk kampanye, sehingga budget marketing tidak efisien.",
      process: [
        "Import data transaksi 12 bulan terakhir ke Excel",
        "Hitung skor Recency, Frequency, dan Monetary per pelanggan",
        "Buat scoring matrix dengan formula PERCENTRANK",
        "Klasifikasi ke 5 segmen: Champion, Loyal, At Risk, dll",
        "Visualisasikan distribusi segmen dengan chart interaktif",
      ],
      result: "Tim marketing berhasil fokus ke 450 Champion customers, meningkatkan conversion rate kampanye sebesar 35%.",
      skills: ["Excel", "RFM Analysis", "SUMIFS", "COUNTIFS", "Customer Analytics"],
    },
  },
  {
    id: "excel-3",
    title: "Financial Report Automation",
    category: "Data Analytics",
    subtitle: "Monthly P&L Statement",
    description: "Template laporan keuangan otomatis yang menghasilkan Profit & Loss statement bulanan hanya dengan input data minimal.",
    image_url: "/excel-dashboard-preview.png",
    downloadUrl: "#",
    driveUrl: "#",
    technologies: ["Advanced Formula", "Named Range", "Data Validation", "Waterfall Chart", "VBA Macro"],
    stats: [
      { label: "Input Manual", value: "-80%" },
      { label: "Sheet", value: "8" },
      { label: "Waktu Laporan", value: "15 menit" },
    ],
    caseStudy: {
      problem: "Proses pembuatan laporan keuangan bulanan membutuhkan 3 hari kerja karena masih manual dan error-prone.",
      process: [
        "Rancang struktur template modular dengan named ranges",
        "Buat formula otomatis untuk kalkulasi COGS, Gross Profit, Net Profit",
        "Tambahkan data validation untuk mencegah input error",
        "Desain waterfall chart untuk visualisasi P&L",
        "Implementasi VBA macro untuk generate PDF otomatis",
      ],
      result: "Laporan yang tadinya 3 hari selesai dalam 15 menit. Error rate turun dari 12% menjadi 0%.",
      skills: ["Excel", "VBA Macro", "Financial Modeling", "Advanced Formula", "Process Automation"],
    },
  },
];

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("*").order("id", { ascending: false });
      if (data) {
        const dbProjects = data.map(item => ({
          ...item,
          description: item.desc,
          image_url: item.image,
          is_featured: item.featured,
          technologies: item.tech || []
        }));
        
        // Combine DB projects with Local Excel Projects
        setProjectsData([...excelProjects, ...dbProjects]);
      } else {
        // If Supabase fetch fails or is empty, still show Excel projects
        setProjectsData(excelProjects);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projectsData.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-noise" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 pt-36 md:pt-40 pb-20 relative z-10 max-w-7xl">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Proof of <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"><DecryptText text="Excellence." revealDirection="end" /></span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              A curated collection of my work in <span className="text-cyan-300">Data Science</span>, <span className="text-purple-300">Web Development</span>, and <span className="text-pink-300">UI/UX Design</span>.
            </p>
          </motion.div>

          <div className="relative w-full max-w-[100vw] overflow-hidden -mx-4 px-4 md:mx-0 md:px-0">
            <div 
              className="flex md:flex-wrap overflow-x-auto gap-2 md:gap-3 pb-4 md:pb-0 snap-x hide-scrollbar"
            >
              <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`snap-start shrink-0 px-5 py-2.5 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 border-transparent text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                      : "bg-[#0f172a]/50 border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none md:hidden z-20" />
            <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none md:hidden z-20" />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase text-white">{project.category}</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                  
                  {/* Tool badges */}
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300">
                        {tech}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 3 && (
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300">
                        +{(project.technologies?.length || 0) - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                    {project.downloadUrl && (
                      <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                        Download <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {project.driveUrl && (
                      <a href={project.driveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300">
                        View <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300">
                        Demo <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {project.repo_url && (
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">
                        Code <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
