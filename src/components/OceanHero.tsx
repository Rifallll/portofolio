import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Waves, Code2, Sparkles, Globe, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const OceanHero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    // Parallax Effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const xPos = (e.clientX - left - width / 2) / 25;
        const yPos = (e.clientY - top - height / 2) / 25;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.section
            id="home"
            ref={sectionRef}
            className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20"
            style={{ opacity }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* HOLOGRAPHIC BACKGROUND */}
            <div className="absolute inset-0 bg-[#030712]">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

                {/* Aurora Beams */}
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[-10%] w-[400px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] rotate-45" />

                {/* Animated Grid Floor */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[50vh] opacity-20"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, cyan)',
                        maskImage: 'linear-gradient(to bottom, transparent, black)',
                        transform: 'perspective(1000px) rotateX(60deg) translateY(100px)'
                    }}
                >
                    <div className="w-full h-full"
                        style={{
                            backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left space-y-8 relative"
                    >
                        {/* Status Line */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
                            </div>
                            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Available for Hire</span>
                        </div>

                        {/* Mega Title with Text Gradient */}
                        <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter">
                            <span className="block text-white mix-blend-overlay">Crafting</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                                Digital Dreams
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-xl leading-relaxed border-l-2 border-cyan-500/30 pl-6">
                            Bridging the gap between <strong>Data Analytics</strong> and <strong>Creative Web Development</strong>.
                            Proven track record at <em>Kimia Farma</em> (Big Data) and <em>Nevercode LTD</em>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/projects">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-full overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        Explore Work <ArrowRight className="w-5 h-5" />
                                    </span>
                                </motion.button>
                            </Link>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full border border-white/10 glass hover:bg-white/5 transition-colors flex items-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download CV
                            </motion.button>
                        </div>

                        {/* Floating Tech Stack */}
                        <div className="flex gap-6 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Python', 'SQL', 'React', 'Next.js', 'Data Science'].map((tech) => (
                                <span key={tech} className="text-sm font-mono text-slate-500 border-b border-white/10 pb-1">{tech}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT CONTENT - 3D INTERACTIVE CARD */}
                    <motion.div
                        style={{ rotateX: mouseY, rotateY: mouseX, scale }}
                        className="relative hidden lg:block perspective-1000"
                    >
                        {/* The Glass Monolith */}
                        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                            {/* Floating Orbs around the card */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-40 z-0"
                            />
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500 rounded-full blur-2xl opacity-40 z-0"
                            />

                            {/* Main Card */}
                            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl shadow-cyan-500/20 p-8 flex flex-col justify-between overflow-hidden group">

                                {/* Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Card Header */}
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
                                        R
                                    </div>
                                    <Code2 className="w-12 h-12 text-white/10" />
                                </div>

                                {/* Code Snippet Decoration */}
                                <div className="space-y-2 font-mono text-sm opacity-60 my-8">
                                    <div className="flex gap-2">
                                        <span className="text-purple-400">const</span>
                                        <span className="text-yellow-200">profile</span>
                                        <span className="text-white">=</span>
                                        <span className="text-white">{`{`}</span>
                                    </div>
                                    <div className="pl-4 flex gap-2">
                                        <span className="text-cyan-300">name:</span>
                                        <span className="text-green-300">'Rifal Azhar Permana'</span>,
                                    </div>
                                    <div className="pl-4 flex gap-2">
                                        <span className="text-cyan-300">role:</span>
                                        <span className="text-white">['Data Analyst', 'Web Dev']</span>
                                    </div>
                                    <div className="text-white">{`}`}</div>
                                </div>

                                {/* Card Footer */}
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-[2px] w-12 bg-cyan-500" />
                                        <span className="text-sm tracking-widest uppercase">Portfolio 2024</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">
                                        Full Stack<br />Wizardry
                                    </h2>
                                </div>
                            </div>

                            {/* Floating "Glass" Elements sticking out */}
                            <motion.div
                                animate={{ z: 50, y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-10 right-[-20px] glass px-4 py-2 rounded-xl text-xs font-bold border border-white/20 shadow-xl flex items-center gap-2"
                            >
                                <Sparkles className="w-3 h-3 text-yellow-400" /> Premium UI
                            </motion.div>

                            <motion.div
                                animate={{ z: 30, y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                                className="absolute bottom-20 left-[-30px] glass px-5 py-3 rounded-xl text-xs font-bold border border-white/20 shadow-xl flex items-center gap-2"
                            >
                                <Globe className="w-4 h-4 text-cyan-400" /> Global Scale
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] text-cyan-400/60 uppercase tracking-[0.2em]">Explore</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0" />
                </div>
            </motion.div>
        </motion.section>
    );
};

export default OceanHero;
