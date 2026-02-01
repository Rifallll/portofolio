import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Star, Code, Database, Layout, Sparkles, FolderOpen, ArrowUpRight } from "lucide-react";

// --- REAL PROJECT DATA FROM CV & EXPANSION ---
const projects = [
  {
    id: 1,
    title: "AI Quality Assurance Dashboard",
    client: "PT. Kimia Farma, Tbk",
    category: "Data Analytics",
    desc: "Machine Learning powered dashboard for automated product quality inspection and anomaly detection.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tech: ["Python", "TensorFlow", "React", "Tableau"],
    year: "2025",
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "LMS Platform Architecture",
    client: "Frasa Academy",
    category: "Web Dev",
    desc: "Scalable Learning Management System handling 1000+ students with real-time progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
    tech: ["Next.js", "PostgreSQL", "AWS", "TypeScript"],
    year: "2025",
    link: "#",
    featured: true
  },
  {
    id: 3,
    title: "MoonTesse Restaurant Experience",
    client: "Gamelab Indonesia",
    category: "UI/UX Design",
    desc: "Immersive culinary web experience focusing on visual storytelling and seamless reservation flow.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    tech: ["Figma", "React", "Framer Motion"],
    year: "2024",
    link: "#",
    featured: false
  },
  {
    id: 4,
    title: "Student Report Scraper",
    client: "ProCodeCG",
    category: "Data Analytics",
    desc: "Automated scraping engine reducing manual data entry for student progress reports by 70%.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tech: ["Python", "Selenium", "Pandas", "Excel"],
    year: "2025",
    link: "#",
    featured: false
  },
  {
    id: 5,
    title: "Sentiment Analysis Engine",
    client: "Personal Research",
    category: "Data Analytics",
    desc: "NLP model analyzing social media sentiment trends for brand monitoring.",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
    tech: ["Python", "NLTK", "Flask", "D3.js"],
    year: "2024",
    link: "#",
    featured: false
  },
  {
    id: 6,
    title: "Nevercode Corporate Site",
    client: "Nevercode LTD",
    category: "Web Dev",
    desc: "High-performance corporate website with 100% SEO score and sub-second load times.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tech: ["Astro", "Tailwind", "Vercel"],
    year: "2024",
    link: "#",
    featured: false
  },
  {
    id: 7,
    title: "E-Commerce Analytics Hub",
    client: "Freelance",
    category: "Data Analytics",
    desc: "Comprehensive sales dashboard visualizing conversion funnels and customer retention.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tech: ["PowerBI", "SQL", "Python"],
    year: "2023",
    link: "#",
    featured: false
  },
  {
    id: 8,
    title: "Crypto Portfolio Tracker",
    client: "Concept",
    category: "Web Dev",
    desc: "Real-time cryptocurrency tracking app with price alerts and portfolio balancing.",
    image: "https://images.unsplash.com/photo-1621504450168-38f6d50d54a2?q=80&w=1954&auto=format&fit=crop",
    tech: ["React Native", "CoinGecko API", "Firebase"],
    year: "2023",
    link: "#",
    featured: false
  },
  {
    id: 9,
    title: "Travel Wisata App",
    client: "Personal",
    category: "UI/UX Design",
    desc: "Mobile app design for discovering hidden gems and booking local experiences in Banten.",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1974&auto=format&fit=crop",
    tech: ["Figma", "Prototyping"],
    year: "2022",
    link: "#",
    featured: false
  },
];

const categories = ["All", "Data Analytics", "Web Dev", "UI/UX Design"];
const allTech = ["All", "Python", "React", "Next.js", "SQL", "Figma", "Tableau", "TypeScript"];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortBy, setSortBy] = useState("Recommended"); // Recommended, Newest, Popular
  const [activeTech, setActiveTech] = useState("All");

  // Filter & Sort Logic
  const filteredProjects = projects
    .filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTech = activeTech === "All" || p.tech.includes(activeTech);

      return matchesCategory && matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") return Number(b.year) - Number(a.year);
      if (sortBy === "Popular") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); // Featured first as proxy for popular
      return 0; // Recommended (Default ID order)
    });

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">

      {/* BACKGROUND NOISE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 text-cyan-400 mb-4">
              <FolderOpen className="w-5 h-5" />
              <span className="text-sm font-mono tracking-widest uppercase">My Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Proof of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Excellence.</span>
            </h1>

            {/* SEARCH BAR */}
            <div className="relative max-w-md mt-8 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono text-sm"
                placeholder="Search projects by name, client, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* MAIN CATEGORY TABS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${activeCategory === cat
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
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                      {project.category}
                    </span>
                    {project.featured && (
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
                      {project.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <Link to={`/project/${project.id}`} className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                        View Case Study <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <a href={project.link} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-auto">
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
            <a href="https://github.com/rifalazhar" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-[#111] border border-white/10 text-white font-bold hover:bg-white/5 transition-all hover:scale-105 flex items-center gap-3">
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
    </div>
  );
};

export default ProjectsPage;