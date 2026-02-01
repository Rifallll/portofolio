import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumNavbar from "@/components/PremiumNavbar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import {
    ArrowLeft, ExternalLink, Github, Calendar,
    Layers, Code2, CheckCircle2, Monitor, Target, Zap, Trophy, Users, MonitorSmartphone, Cpu, Sparkles
} from "lucide-react";

// --- REAL CASE STUDIES DATA ---
const projectsData = {
    1: {
        title: "AI Quality Assurance",
        subtitle: "Deep Learning • Computer Vision • Automation",
        description: "A state-of-the-art anomaly detection system for pharmaceutical giants. We automated the visual inspection of 500+ items per minute using proprietary CNN models, achieving unparalleled precision in quality control.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        role: "Data Lead",
        duration: "4 Months",
        client: "Kimia Farma",
        tech: ["Python", "TensorFlow", "OpenCV"],
        challenge: "Pharmaceutical packaging requires 99.9% accuracy. Human fatigue was the leading cause of defects reaching the market.",
        solution: "Implemented an edge-computing solution that flags defects in 0.02 seconds using a custom YOLOv8 architecture optimized for pharmaceutical geometry.",
        impact: ["Reduced defects by 94%", "ROI achieved in 6 months", "Automated 24/7 logging"],
        accent: "from-blue-600/20 to-cyan-500/20"
    },
    2: {
        title: "LMS Education Engine",
        subtitle: "Next.js • Scalable Architecture • EdTech",
        description: "Re-engineering how students learn digital skills. Built a high-concurrency LMS capable of hosting thousands of synchronous video streams and automated code validation during live exams.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
        role: "Tech Head",
        duration: "5 Months",
        client: "Frasa Academy",
        tech: ["Next.js", "AWS", "PostgreSQL"],
        challenge: "Legacy systems collapsed under peak traffic. The academy needed a 'Fortress' that wouldn't fail during major marketing launches.",
        solution: "Established a distributed microservices architecture on Vercel and AWS, utilizing edge-caching for instant global availability.",
        impact: ["Zero-downtime launches", "300% faster dashboard load", "1,200+ Active Students"],
        accent: "from-purple-600/20 to-pink-500/20"
    },
    3: {
        title: "MoonTesse Digital",
        subtitle: "Visual Journey • GSAP • Luxury Branding",
        description: "Translating the concept of 'Ambient Gastronomy' into a digital masterpiece. An immersive web experience for an award-winning restaurant that feels as atmospheric as the dining room itself.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        role: "UI/UX Lead",
        duration: "2 Months",
        client: "Gamelab ID",
        tech: ["Framer", "GSAP", "Luxy"],
        challenge: "The brand needed to feel 'exclusive'. Standard scrolling wouldn't work; we needed a poetic flow.",
        solution: "Integrated inertial scroll and custom shaders to mimic the restaurant's lighting and mood, resulting in a hypnotic digital invitation.",
        impact: ["45% higher booking rate", "National Design Award", "Immersive Audio Experience"],
        accent: "from-orange-600/20 to-yellow-500/20"
    },
    4: {
        title: "Report Automation Bot",
        subtitle: "Selenium • Python • Data Engineering",
        description: "Freeing humans from the monotony of copy-pasting. A suite of intelligent web scrapers that navigate complex state-owned portals to extract and clean educational data.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        role: "Logic Developer",
        duration: "1 Month",
        client: "ProCodeCG",
        tech: ["Selenium", "Pandas", "Excel"],
        challenge: "Administrators were losing 60+ man-hours weekly to manual data entry across department portals.",
        solution: "Developed an asynchronous multi-threaded bot that performs deep-link extraction and automated data normalization using Pandas.",
        impact: ["Saved 2,000+ hours yearly", "Zero data-entry errors", "Adopted System-wide"],
        accent: "from-green-600/20 to-emerald-500/20"
    }
};

const ProjectDetailPage = () => {
    const { id } = useParams();
    const project = projectsData[Number(id) as keyof typeof projectsData] || projectsData[1];

    // Parallax Effects
    const { scrollYProgress } = useScroll();
    const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="bg-[#020617] text-white overflow-hidden scroll-smooth">
            <PremiumNavbar />

            {/* --- CINEMA HERO --- */}
            <section className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Background Fullscreen Parallax */}
                <motion.div
                    style={{ scale: imageScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#020617] z-10" />
                    <img src={project.image} className="w-full h-full object-cover opacity-60" alt="" />
                </motion.div>

                {/* Floating Meta Labels */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-32 left-10 hidden lg:block z-20"
                >
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-500/50">
                        <span className="w-10 h-[1px] bg-cyan-500/30" />
                        Project Dossier No. 00{id}
                    </div>
                </motion.div>

                {/* Center Content */}
                <div className="relative z-20 container mx-auto text-center max-w-5xl">
                    <motion.div style={{ opacity: opacityHero, y: titleY }}>
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-8"
                        >
                            {project.role} • CASE STUDY
                        </motion.span>
                        <h1 className="text-6xl md:text-[8rem] font-black leading-none mb-4 tracking-tighter uppercase whitespace-normal lg:whitespace-nowrap">
                            {project.title.split(' ').map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className={i % 2 !== 0 ? 'text-cyan-500' : ''}
                                >
                                    {word}{' '}
                                </motion.span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto uppercase tracking-widest">{project.subtitle}</p>
                    </motion.div>
                </div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50"
                >
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Protocol Scroll</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
                </motion.div>
            </section>

            {/* --- KINETIC MARQUEE --- */}
            <div className="py-6 border-y border-white/5 bg-white/[0.02] flex overflow-hidden whitespace-nowrap">
                {[1, 2, 3, 4].map(k => (
                    <div key={k} className="flex gap-12 items-center animate-scroll-text">
                        {project.tech.map(t => (
                            <span key={t} className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-tighter">
                                {t} •
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* --- CORE NARRATIVE --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-20">
                        {/* Specs Panel */}
                        <div className="lg:col-span-4 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 -z-10`} />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-8">Metadata</h3>
                                <div className="space-y-8">
                                    {[
                                        { label: "Client", val: project.client, icon: Users },
                                        { label: "Period", val: project.duration, icon: Calendar },
                                        { label: "Target", val: project.role, icon: Target },
                                        { label: "Stack", val: project.tech.join(', '), icon: Cpu }
                                    ].map((item, i) => (
                                        <div key={i} className="group">
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                                                <p className="font-black text-white uppercase text-sm">{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 flex gap-4">
                                    <Magnetic strength={0.3}>
                                        <a href="#" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white text-black hover:bg-cyan-400 transition-colors inline-block">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                    <Magnetic strength={0.3}>
                                        <a href="https://github.com/Rifallll" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl border border-white/20 hover:border-white transition-colors inline-block">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Body */}
                        <div className="lg:col-span-8 space-y-24">
                            {/* The Story */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">The Mission</h2>
                                <p className="text-2xl md:text-4xl font-bold leading-tight text-slate-100">
                                    {project.description}
                                </p>
                            </motion.div>

                            {/* Dual Logic */}
                            <div className="grid md:grid-cols-2 gap-10">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="p-10 rounded-[2rem] bg-red-500/5 border border-red-500/10"
                                >
                                    <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-400 mb-6">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-black uppercase mb-4 text-white">The Conflict</h4>
                                    <p className="text-slate-400 leading-relaxed font-medium">{project.challenge}</p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="p-10 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10"
                                >
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-black uppercase mb-4 text-white">The Solution</h4>
                                    <p className="text-slate-400 leading-relaxed font-medium">{project.solution}</p>
                                </motion.div>
                            </div>

                            {/* Impact Numbers */}
                            <div className="space-y-12">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Impact Metrics</h2>
                                <div className="grid sm:grid-cols-3 gap-6">
                                    {project.impact.map((text, i) => (
                                        <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:bg-white/5 transition-colors">
                                            <Trophy className="w-6 h-6 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                                            <p className="font-black text-xl uppercase leading-tight">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BACK ACTION --- */}
            <section className="py-20 border-t border-white/5 text-center">
                <Link to="/projects">
                    <Magnetic strength={0.2}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex flex-col items-center gap-6 group"
                        >
                            <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                                <ArrowLeft className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.5em]">Command: Return Gallery</span>
                        </motion.div>
                    </Magnetic>
                </Link>
            </section>

            <Footer />
        </div>
    );
};

export default ProjectDetailPage;
