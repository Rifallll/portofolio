import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Star, Code, Database, Layout, Sparkles, FolderOpen, ArrowUpRight } from "lucide-react";
import { DecryptText } from "@/components/ui/DecryptText";
import { toast } from "sonner";

const NOISE_PATTERN = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

// --- REAL PROJECT DATA FROM CV & EXPANSION ---
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
const allTech = ["All", "Python", "React", "Next.js", "SQL", "Figma", "Tableau", "TypeScript"];

import { useSEO } from "@/hooks/useSEO";

const ProjectsPage = () => {
  useSEO("Projects | Rifal Azhar", "Explore Rifal Azhar's portfolio of Data Science, Web Development, and UI/UX projects.");

  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false });

      if (data) {
        const mappedData = data.map(item => ({
          ...item,
          description: item.desc,         // Map desc -> description
          image_url: item.image,          // Map image -> image_url
          is_featured: item.featured,     // Map featured -> is_featured
          technologies: item.tech || []   // Map tech -> technologies
        }));
        setProjectsData(mappedData);
      }
      setLoading(false);
    };

    fetchProjects();

    // Realtime Subscription
    const subscription = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          toast.success("Project list updated!", { duration: 2000 });
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortBy, setSortBy] = useState("Recommended"); // Recommended, Newest, Popular
  const [activeTech, setActiveTech] = useState("All");

  // Filter & Sort Logic
  const filteredProjects = projectsData
    .filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const technologies = p.technologies || [];
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        technologies.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTech = activeTech === "All" || technologies.includes(activeTech);

      return matchesCategory && matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") return Number(b.year) - Number(a.year);
      if (sortBy === "Popular") return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      return 0; // Recommended (Default ID order)
    });

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">

      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("${NOISE_PATTERN}")` }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 pt-36 md:pt-40 pb-20 relative z-10 max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-left md:text-left"
          >

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Proof of <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"><DecryptText text="Excellence." revealDirection="end" /></span>
            </h1>

            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed hidden md:block">
              A curated collection of my work in <span className="text-cyan-300">Data Science</span>, <span className="text-purple-300">Web Development</span>, and <span className="text-pink-300">UI/UX Design</span>.
            </p>

            <p className="text-slate-400 text-base mb-8 max-w-lg leading-relaxed md:hidden">
              Explore my journey in building digital solutions that merge creativity with logic.
            </p>

            {/* SEARCH BAR */}
            <div className="relative max-w-md mt-4 group w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono text-sm"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* MAIN CATEGORY TABS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md w-full md:w-auto overflow-x-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${activeCategory === cat
                  ? "text-black font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-400 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ADVANCED CONTROL BAR (Sort & Tech Filter) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-white/5"
        >
          {/* Tech Stack Chips */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Filter by Tech:</span>
            {allTech.map(tech => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all whitespace-nowrap ${activeTech === tech
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort by:</span>
            <select
              aria-label="Sort projects"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 cursor:pointer hover:bg-white/5 transition-colors"
            >
              <option value="Recommended">Recommended</option>
              <option value="Newest">Newest Year</option>
              <option value="Popular">Most Popular</option>
            </select>
          </div>
        </motion.div>

        {/* PROJECTS GRID (MASONRY-ISH) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10 opacity-60" />
                  <img
                    src={project.image_url || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 group-hover:skew-x-1 group-hover:brightness-125"
                  />
                  {/* GLITCH OVERLAYS */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 pointer-events-none mix-blend-screen bg-cyan-500 translate-x-1 animate-pulse" />
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 pointer-events-none mix-blend-screen bg-red-500 -translate-x-1 animate-pulse delay-75" />

                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                      {project.category}
                    </span>
                    {project.is_featured && (
                      <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/50 rounded-full text-[10px] font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </span>
                    )}
                  </div>

                  {/* HOVER METRICS */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        <ArrowUpRight className="w-3 h-3 text-green-400" /> 1.2k Views
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        <Star className="w-3 h-3 text-yellow-400" /> 48 Likes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="text-xs text-cyan-400 font-mono mb-2">{project.client} // {project.year}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.technologies || []).map((t: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <a
                        href={project.demo_url || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors"
                      >
                        View Project <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <a
                        href={project.repo_url || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Source Code"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-auto"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LOAD MORE BUTTON */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="group relative px-8 py-3 bg-[#0F0F0F] text-white font-bold rounded-full overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                Load More Projects <ArrowUpRight className="w-4 h-4 animate-bounce" />
              </span>
            </button>
          </div>
        )}

        {/* CTA FOOTER */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Want to see more?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a href="https://github.com/rifalazhar" target="_blank" rel="noreferrer noopener" className="px-8 py-4 rounded-full bg-[#111] border border-white/10 text-white font-bold hover:bg-white/5 transition-all hover:scale-105 flex items-center gap-3">
              <Github className="w-5 h-5" />
              Visit GitHub Profile
            </a>
            <a href="/contact" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-50 transition-all hover:scale-105 flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <Sparkles className="w-5 h-5" />
              Start a Project
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div >
  );
};

export default ProjectsPage;