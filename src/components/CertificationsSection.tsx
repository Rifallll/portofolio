import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";

const certifications = [
    {
        name: "AWS Certified Developer",
        organization: "Amazon Web Services",
        year: "2023",
        color: "from-orange-400 to-yellow-500"
    },
    {
        name: "Google UX Design Professional",
        organization: "Google",
        year: "2023",
        color: "from-blue-400 to-cyan-500"
    },
    {
        name: "Meta React Developer",
        organization: "Meta (Facebook)",
        year: "2023",
        color: "from-blue-500 to-cyan-400"
    },
    {
        name: "Advanced JavaScript",
        organization: "freeCodeCamp",
        year: "2022",
        color: "from-green-400 to-cyan-500"
    },
    {
        name: "Full Stack Development",
        organization: "Udemy",
        year: "2022",
        color: "from-purple-400 to-cyan-500"
    },
    {
        name: "UI/UX Design Mastery",
        organization: "Coursera",
        year: "2022",
        color: "from-pink-400 to-cyan-500"
    }
];

const CertificationsSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-card/10">
            {/* Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6">
                        <Award className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">Credentials</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient-wave">Certifications & Skills</span>
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Continuous learning and professional development
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="glass-card p-6 rounded-2xl group hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Gradient Accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center mb-4 relative z-10">
                                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyan-300 transition-colors">
                                    {cert.name}
                                </h3>

                                <p className="text-sm text-muted-foreground mb-1">
                                    {cert.organization}
                                </p>

                                <p className="text-xs text-cyan-400/70 font-medium">
                                    {cert.year}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-sm text-muted-foreground">
                        ✓ Verified credentials • Continuously updated skills
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CertificationsSection;
