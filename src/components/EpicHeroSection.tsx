import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const EpicHeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    return (
        <motion.section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ opacity }}
        >
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-teal-950">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
                    <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-teal-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-0 left-1/3 w-[800px] h-[800px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000" />
                </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Floating Grid Pattern */}
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{ y: y1 }}
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px'
                }} />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center space-y-8"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-cyan-400/30"
                        >
                            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-300">
                                Available for Freelance Projects
                            </span>
                        </motion.div>

                        {/* Main Heading with Stagger Animation */}
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-none tracking-tight"
                            >
                                <span className="block text-gradient-ocean">Creative</span>
                                <span className="block text-gradient-biolume">Developer</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-xl md:text-2xl text-cyan-100/70 max-w-3xl mx-auto leading-relaxed"
                            >
                                Crafting <span className="text-cyan-300 font-semibold">exceptional digital experiences</span> through
                                code, design, and innovation. Let's build something magnificent together.
                            </motion.p>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                        >
                            <Link to="/projects">
                                <Button
                                    size="lg"
                                    className="group relative px-10 py-7 text-lg font-bold rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore My Work
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Button>
                            </Link>

                            <Link to="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-10 py-7 text-lg font-bold rounded-full border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 backdrop-blur-sm transition-all duration-300"
                                >
                                    Let's Connect
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Floating Stats Cards */}
                    <motion.div
                        style={{ y: y2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
                    >
                        {[
                            { label: 'Projects', value: '20+' },
                            { label: 'Experience', value: '3+ Yrs' },
                            { label: 'Happy Clients', value: '15+' },
                            { label: 'Technologies', value: '12+' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                                className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-gradient-ocean mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-cyan-200/60 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs text-cyan-400/60 font-medium uppercase tracking-wider">Scroll to Explore</span>
                    <div className="w-6 h-10 rounded-full border-2 border-cyan-400/40 flex justify-center p-2">
                        <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default EpicHeroSection;
