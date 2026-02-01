import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Magnetic from "./Magnetic";

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-background to-background" />
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center glass-card p-12 md:p-16 rounded-3xl border-cyan-500/30"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 flex items-center justify-center"
                    >
                        <MessageSquare className="w-10 h-10 text-cyan-400" />
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        <span className="text-gradient-ocean">Let's Work Together</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Have a project in mind? Let's discuss how we can bring your ideas to life with modern web solutions.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Magnetic strength={0.4} range={100}>
                            <Link to="/contact">
                                <Button
                                    size="lg"
                                    className="group px-10 py-7 text-lg font-bold rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                                >
                                    <span className="flex items-center gap-2">
                                        <Mail className="w-5 h-5" />
                                        Start a Project
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                        </Magnetic>

                        <Magnetic strength={0.2} range={60}>
                            <a href="mailto:your.email@example.com">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-10 py-7 text-lg font-bold rounded-full border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
                                >
                                    Send Email
                                </Button>
                            </a>
                        </Magnetic>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 pt-8 border-t border-cyan-500/10"
                    >
                        <p className="text-sm text-muted-foreground">
                            ⚡ Typically responds within 24 hours • 🌟 100% satisfaction guaranteed
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
