"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Star, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { DecryptText } from "@/components/ui/DecryptText";

const NOISE_PATTERN = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

interface Project {
  id: number;
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
}

const categories = ["All", "Data Analytics", "Web Dev", "UI/UX Design", "Mobile App", "Machine Learning"];

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("*").order("id", { ascending: false });
      if (data) {
        setProjectsData(data.map(item => ({
          ...item,
          description: item.desc,
          image_url: item.image,
          is_featured: item.featured,
          technologies: item.tech || []
        })));
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projectsData.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("${NOISE_PATTERN}")` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 pt-36 md:pt-40 pb-20 relative z-10 max-w-7xl">
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
              className="flex md:flex-wrap overflow-x-auto gap-3 pb-4 md:pb-0 snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`snap-start shrink-0 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat 
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 border-transparent text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
                      : "bg-[#0f172a]/50 border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

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
                className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase text-white">{project.category}</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
                  <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/5">
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400">
                      View Project <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
