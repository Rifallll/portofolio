import React from "react";
import { motion } from "framer-motion";

const techStack = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "shadow-cyan-500/20" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "shadow-blue-500/20" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "shadow-white/10" },
    { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", color: "shadow-cyan-400/20" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "shadow-green-500/20" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "shadow-blue-600/20" },
    { name: "Framer Motion", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg", color: "shadow-purple-500/20" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "shadow-orange-500/20" },
    { name: "Three.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg", color: "shadow-white/20" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "shadow-yellow-500/20" },
    { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", color: "shadow-purple-400/20" },
];

const TechStackSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-[#020617] border-y border-white/5">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">
                        Arsenals & Tools
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                        Powered by World-Class Tech
                    </h2>
                </motion.div>

                {/* Marquee Effect Container */}
                <div className="relative group w-full">
                    {/* Faded Edges Mask */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

                    <div className="flex overflow-hidden">
                        <motion.div
                            animate={{ x: [0, -2000] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="flex gap-8 py-4 flex-shrink-0"
                        >
                            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                                <motion.div
                                    key={`${tech.name}-${index}`}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className={`flex items-center gap-4 px-8 py-4 glass border-white/5 rounded-3xl group/item cursor-pointer transition-all ${tech.color} hover:bg-white/5 hover:border-cyan-500/30 shadow-xl`}
                                >
                                    <div className="w-10 h-10 p-2 glass-card rounded-xl border border-white/10 group-hover/item:border-cyan-500/50 transition-colors">
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-contain filter grayscale group-hover/item:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <span className="font-bold text-slate-400 group-hover/item:text-white transition-colors tracking-tight">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none z-0">
                STACK
            </div>
        </section>
    );
};

export default TechStackSection;
