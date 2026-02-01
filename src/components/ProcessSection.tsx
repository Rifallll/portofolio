import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Code, Rocket, CheckCircle, Sparkles } from "lucide-react";

const processSteps = [
    {
        icon: Lightbulb,
        step: "01",
        title: "Discovery & Planning",
        description: "Understanding your goals, target audience, and project requirements to create a solid foundation.",
        color: "from-amber-400 to-orange-500"
    },
    {
        icon: Code,
        step: "02",
        title: "Design & Development",
        description: "Crafting intuitive designs and writing clean, efficient code with modern best practices.",
        color: "from-cyan-400 to-blue-500"
    },
    {
        icon: Rocket,
        step: "03",
        title: "Testing & Launch",
        description: "Rigorous testing across devices and browsers, followed by smooth deployment and launch.",
        color: "from-purple-400 to-indigo-500"
    },
    {
        icon: CheckCircle,
        step: "04",
        title: "Support & Iterate",
        description: "Ongoing support, monitoring, and continuous improvements based on user feedback.",
        color: "from-emerald-400 to-teal-500"
    }
];

const ProcessSection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-[#020617]">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-cyan-500/20 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">Strategic Workflow</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
                    >
                        How I <span className="text-gradient-ocean">Create</span> Magic
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        A seamless, expert-led process designed to transform your ambitious ideas into high-performance digital realities.
                    </motion.p>
                </div>

                {/* Process Steps Connection Line (Desktop) */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent hidden lg:block -translate-y-12" />

                {/* Process Steps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative">
                    {processSteps.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="glass-card relative p-8 rounded-[2rem] h-full flex flex-col items-center text-center overflow-hidden border-white/5 hover:border-cyan-500/40 transition-all duration-500">
                                {/* Gradient Orb Background */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />

                                {/* Step Number (Floating Background) */}
                                <div className="absolute -top-4 -left-2 text-8xl font-black text-white/[0.03] group-hover:text-cyan-500/[0.05] transition-colors duration-500 select-none">
                                    {item.step}
                                </div>

                                {/* Icon Hexagon Container */}
                                <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                                    <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center relative border-white/10 group-hover:border-cyan-500/50 shadow-2xl">
                                        <item.icon className="w-10 h-10 text-cyan-400 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-[10px] font-bold text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                        {item.step}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-cyan-300 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                                    {item.description}
                                </p>

                                {/* Bottom Indicator */}
                                <div className={`mt-auto pt-8 w-1/4 h-1 bg-gradient-to-r ${item.color} rounded-full opacity-30 group-hover:w-full group-hover:opacity-100 transition-all duration-700`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Decorative Wave */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-0" />
        </section>
    );
};

export default ProcessSection;
