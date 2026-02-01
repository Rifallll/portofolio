import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Code2, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const UltraPremiumHero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <motion.section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            style={{ opacity }}
        >
            {/* Ultra Dark Background with Neon Gradient Mesh */}
            <div className="absolute inset-0 bg-[#0a0a0f]">
                {/* Animated Gradient Blobs */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob" />
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000" />
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 102, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 255, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px'
                }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Bold Typography */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Status Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-blue-500/30"
                            >
                                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                                <span className="text-sm font-medium text-gradient-electric">
                                    Available for Collaborations
                                </span>
                            </motion.div>

                            {/* Massive Display Text */}
                            <div className="space-y-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight"
                                >
                                    <span className="block text-gradient-neon">Digital</span>
                                    <span className="block text-white">Craftsman</span>
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex items-center gap-3 text-lg text-muted-foreground"
                                >
                                    <Code2 className="w-5 h-5 text-blue-400" />
                                    <span>+</span>
                                    <Palette className="w-5 h-5 text-pink-400" />
                                    <span className="ml-2">= Exceptional Experiences</span>
                                </motion.div>
                            </div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl"
                            >
                                Building <span className="text-blue-400 font-semibold">cutting-edge web applications</span> with
                                modern technologies. Specializing in <span className="text-pink-400 font-semibold">React, TypeScript</span>, and
                                innovative UI/UX design.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <Link to="/projects">
                                    <Button
                                        size="lg"
                                        className="group relative px-10 py-7 text-lg font-bold rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white glow-blue transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            View Portfolio
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </Link>

                                <Link to="/contact">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="px-10 py-7 text-lg font-bold rounded-full border-2 border-blue-500/50 text-foreground hover:bg-blue-500/10 hover:border-blue-400 backdrop-blur-sm transition-all duration-300"
                                    >
                                        Let's Talk
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right: Visual Element / Stats */}
                        <motion.div
                            style={{ y: y2 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="relative"
                        >
                            {/* Large Number Display */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />

                                <div className="relative grid grid-cols-2 gap-6">
                                    {/* Stat Cards */}
                                    {[
                                        { number: '20+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500' },
                                        { number: '3+', label: 'Years Experience', color: 'from-purple-500 to-pink-500' },
                                        { number: '15+', label: 'Happy Clients', color: 'from-pink-500 to-rose-500' },
                                        { number: '12+', label: 'Tech Stack', color: 'from-amber-500 to-yellow-500' },
                                    ].map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                                            className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
                                        >
                                            <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                                                {stat.number}
                                            </div>
                                            <div className="text-sm text-foreground/60 font-medium uppercase tracking-wider">
                                                {stat.label}
                                            </div>

                                            {/* Hover Glow Effect */}
                                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color} blur-xl -z-10`} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tech Stack Marquee */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        className="mt-24 relative overflow-hidden"
                    >
                        <div className="flex items-center gap-8 text-muted-foreground/40 text-sm font-medium uppercase tracking-wider mb-4">
                            <span>Powered by</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                        </div>

                        <div className="flex gap-8 overflow-hidden">
                            {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'PostgreSQL', 'AWS'].map((tech) => (
                                <div key={tech} className="px-6 py-3 glass rounded-full text-foreground/60 font-medium whitespace-nowrap">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-blue-500/40 flex justify-center p-2"
                    >
                        <div className="w-1.5 h-3 bg-blue-400 rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default UltraPremiumHero;
