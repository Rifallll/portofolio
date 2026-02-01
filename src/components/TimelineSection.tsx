"use client";

import React from "react";
import { motion } from "framer-motion";

const timelineData = [
    {
        year: "2020",
        title: "The Beginning",
        description: "Started learning web development and fell in love with creating digital experiences.",
    },
    {
        year: "2021",
        title: "First Client",
        description: "Landed my first freelance project, building a responsive website for a local business.",
    },
    {
        year: "2022",
        title: "Full-Stack Dive",
        description: "Expanded my skills to the backend, mastering Node.js and database management.",
    },
    {
        year: "2023",
        title: "Senior Role",
        description: "Led a team of developers to deliver complex web applications for enterprise clients.",
    },
    {
        year: "Present",
        title: "Innovation Focus",
        description: "Currently exploring advanced animations, 3D web experiences, and AI integration.",
    },
];

const TimelineSection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-6">My Journey</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A timeline of my professional growth and milestones.
                    </p>
                </motion.div>

                <div className="relative border-l border-primary/20 ml-4 md:ml-1/2 md:translate-x-[-1px] space-y-12">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_10px_rgba(255,215,0,0.5)] z-20"></div>

                            {/* Content Spacer for Desktop */}
                            <div className="hidden md:block w-1/2" />

                            {/* Content Card */}
                            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"}`}>
                                <div className="glass-card p-6 rounded-xl hover:border-sidebar-primary/50 transition-all duration-300">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
