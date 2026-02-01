import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, Github, Linkedin, MessageCircle } from "lucide-react";

const FloatingActions = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { icon: Github, href: "https://github.com/Rifallll", label: "GitHub", color: "hover:bg-slate-600" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/rifalazharpermana", label: "LinkedIn", color: "hover:bg-blue-600" },
        { icon: Mail, href: "mailto:rifalazharpermana@gmail.com", label: "Email", color: "hover:bg-cyan-600" }
    ];

    return (
        <div className="fixed bottom-8 left-8 z-[100000] flex flex-col gap-3">
            {/* Social Links */}
            <div className="flex flex-col gap-3">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-full glass border border-cyan-500/20 flex items-center justify-center text-cyan-400 ${social.color} transition-all duration-300 group`}
                        title={social.label}
                    >
                        <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </motion.a>
                ))}
            </div>

            {/* Quick Contact */}
            <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 group"
                title="Quick Contact"
            >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.a>

            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full glass border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-600/20 transition-all duration-300 group mt-3"
                        title="Scroll to Top"
                    >
                        <ArrowUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActions;
