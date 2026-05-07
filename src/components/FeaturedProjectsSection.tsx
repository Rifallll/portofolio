import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Waves, Anchor, Ship } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    color: string;
    repo_url?: string;
    demo_url?: string;
    // Add other properties from Supabase if needed
}

const PROJECT_COLORS = [
    "from-cyan-500/20 to-blue-500/20",
    "from-blue-500/20 to-indigo-500/20",
    "from-indigo-500/20 to-purple-500/20",
    "from-purple-500/20 to-pink-500/20"
];

const FeaturedProjectsSection = () => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('featured', true)
                .limit(3)
                .order('id', { ascending: false });

            if (data) {
                const enhancedData = data.map((p, i) => ({
                    ...p,
                    description: p.desc,
                    image: p.image,
                    tags: p.tech || [],
                    color: PROJECT_COLORS[i % PROJECT_COLORS.length]
                }));
                setFeaturedProjects(enhancedData);
            }
        };
        fetchFeatured();

        const subscription = supabase
            .channel('featured-projects-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'projects' },
                () => {
                    toast.info("New featured content!", { duration: 2000 });
                    fetchFeatured();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

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

                    <Link href="/projects">
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
                            key={project.id} // Use ID instead of title for key
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 hover:border-cyan-500/40 transition-all duration-700 h-full flex flex-col relative">

                                {/* BLUEPRINT OVERLAY (Visible on Hover) */}
                                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay bg-blue-900/40 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-[length:20px_20px]" />

                                {/* Image Container with Parallax Effect */}
                                <div className="relative h-72 overflow-hidden">
                                    {/* Tech Spec HUD (Only on hover) */}
                                    <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col gap-1">
                                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-black/80 px-2 py-0.5 border-l-2 border-cyan-500">IMG_SRC: LOADED</span>
                                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-black/80 px-2 py-0.5 border-l-2 border-cyan-500">RES: 1080p_HQ</span>
                                    </div>

                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-70 group-hover:opacity-100 group-hover:filter group-hover:contrast-125 group-hover:brightness-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0d1520] via-transparent to-transparent opacity-80`} />

                                    {/* Action Floating Buttons */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-40">
                                        {project.repo_url && (
                                            <a
                                                href={project.repo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="View Source Code"
                                                className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="View Live Demo"
                                                className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-10 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-[#0d1520]/80 group-hover:bg-[#020617]/90 transition-colors duration-500">
                                    <div className="flex gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/5 group-hover:bg-cyan-500/20 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4 tracking-tighter group-hover:text-cyan-300 transition-colors font-mono group-hover:uppercase">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 leading-relaxed mb-8 flex-1 group-hover:text-cyan-100/70 group-hover:font-mono text-sm">
                                        {project.description}
                                    </p>

                                    {/* Blueprint Data Grid */}
                                    <div className="hidden group-hover:grid grid-cols-2 gap-2 mb-6 border-t border-dashed border-cyan-500/30 pt-4">
                                        <div className="flex justify-between text-[9px] font-mono text-cyan-500"><span>BUILD_VER:</span><span>v2.4.0</span></div>
                                        <div className="flex justify-between text-[9px] font-mono text-cyan-500"><span>LATENCY:</span><span>12ms</span></div>
                                        <div className="flex justify-between text-[9px] font-mono text-cyan-500"><span>STATUS:</span><span>DEPLOYED</span></div>
                                        <div className="flex justify-between text-[9px] font-mono text-cyan-500"><span>SEC_LVL:</span><span>HIGH</span></div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-cyan-500/30">
                                        <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-cyan-400">
                                            <Anchor className="w-4 h-4" />
                                            Deep Dive
                                        </span>
                                        <Ship className="w-5 h-5 text-cyan-500/20 group-hover:text-cyan-500 group-hover:animate-bounce transition-all" />
                                    </div>
                                </div>

                                {/* Hover Gradient Flare */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -z-10`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </section>
    );
};

export default FeaturedProjectsSection;
