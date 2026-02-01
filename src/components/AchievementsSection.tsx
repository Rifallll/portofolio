import React from "react";
import { motion } from "framer-motion";
import { Award, Users, CodeSquare, Trophy } from "lucide-react";

const achievements = [
    {
        icon: CodeSquare,
        value: "50+",
        label: "Projects Completed",
        description: "Successful deliveries"
    },
    {
        icon: Users,
        value: "30+",
        label: "Happy Clients",
        description: "Worldwide satisfaction"
    },
    {
        icon: Trophy,
        value: "5+",
        label: "Awards Won",
        description: "Industry recognition"
    },
    {
        icon: Award,
        value: "3+ Years",
        label: "Experience",
        description: "Professional journey"
    }
];

const AchievementsSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/5 to-background" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6">
                        <Trophy className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">Track Record</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient-ocean">Proven Results</span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Numbers that speak for themselves
                    </p>
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-8 rounded-2xl text-center group hover:border-cyan-500/40 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-8 h-8 text-cyan-400" />
                            </div>

                            {/* Value */}
                            <div className="text-4xl md:text-5xl font-bold text-gradient-ocean mb-2">
                                {item.value}
                            </div>

                            {/* Label */}
                            <div className="text-base font-semibold text-foreground mb-1">
                                {item.label}
                            </div>

                            {/* Description */}
                            <div className="text-sm text-muted-foreground">
                                {item.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
