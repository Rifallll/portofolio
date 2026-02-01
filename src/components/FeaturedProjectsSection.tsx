import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Waves, Anchor, Ship } from "lucide-react";
import { Link } from "react-router-dom";

const featuredProjects = [
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
        tags: ["React", "Node.js", "PostgreSQL"],
        link: "/projects",
        github: "#",
        color: "from-cyan-500/20 to-blue-500/20"
    },
    {
        title: "SaaS Dashboard",
        description: "Modern analytics dashboard with data visualization, real-time updates, and team collaboration",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        link: "/projects",
        github: "#",
        color: "from-blue-500/20 to-indigo-500/20"
    },
    {
        title: "Social Media App",
        description: "Real-time social platform with secure messaging, media sharing, and community features",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
        tags: ["React", "Firebase", "Framer"],
        link: "/projects",
        github: "#",
        color: "from-indigo-500/20 to-purple-500/20"
    }
];

const FeaturedProjectsSection = () => {
    return (
        <section id="projects" className="py-32 relative overflow-hidden bg-[#020617]">
            {/* Ocean Waves Background Decor */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent z-0" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
                            <Waves className="w-4 h-4" />
                            <span>Navigating Innovation</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Selected <span className="text-gradient-ocean">Voyages</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            A curated selection of my most challenging and impactful digital expeditions.
                            Each project is a testament to technical excellence and creative problem-solving.
                        </p>
                    </motion.div>

                    <Link to="/projects">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-600 font-black uppercase tracking-widest text-black hover:bg-cyan-500 transition-all"
                        >
                            Explore All Files
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </div>

                {/* Projects Grid: Floating Islands Style */}
                <div className="grid lg:grid-cols-3 gap-10">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 hover:border-cyan-500/40 transition-all duration-700 h-full flex flex-col">
                                {/* Image Container with Parallax Effect */}
                                <div className="relative h-72 overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0d1520] via-transparent to-transparent opacity-80`} />

                                    {/* Action Floating Buttons */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <button className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                                            <Github className="w-5 h-5" />
                                        </button>
                                        <button className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                                            <ExternalLink className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-10 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-[#0d1520]/80">
                                    <div className="flex gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4 tracking-tighter group-hover:text-cyan-300 transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <Anchor className="w-4 h-4" />
                                            Deep Dive
                                        </span>
                                        <Ship className="w-5 h-5 text-cyan-500/20 group-hover:text-cyan-500 group-hover:animate-bounce transition-all" />
                                    </div>
                                </div>

                                {/* Hover Gradient Flare */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-1000 -z-10`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')` }} />
        </section>
    );
};

export default FeaturedProjectsSection;
