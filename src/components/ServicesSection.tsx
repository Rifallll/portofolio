import React from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Smartphone, Globe, Database, Zap } from "lucide-react";

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "Building responsive and performant web applications using modern frameworks and best practices."
    },
    {
        icon: Smartphone,
        title: "UI/UX Design",
        description: "Creating beautiful and intuitive user interfaces that provide exceptional user experiences."
    },
    {
        icon: Database,
        title: "Backend Development",
        description: "Developing robust APIs and server-side logic with scalable architecture and security."
    },
    {
        icon: Code2,
        title: "Frontend Development",
        description: "Crafting pixel-perfect interfaces with attention to detail and modern design principles."
    },
    {
        icon: Zap,
        title: "Performance Optimization",
        description: "Optimizing applications for speed, SEO, and best performance across all devices."
    },
    {
        icon: Palette,
        title: "Creative Development",
        description: "Blending creativity with code to build unique and engaging digital experiences."
    }
];

const ServicesSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">What I Do</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-gradient-ocean">Services & Expertise</span>
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive digital solutions from concept to deployment
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-8 rounded-2xl group hover:border-cyan-500/40 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-600/20 group-hover:border-cyan-500/40 transition-all duration-300">
                                <service.icon className="w-7 h-7 text-cyan-400" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-cyan-300 transition-colors">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
