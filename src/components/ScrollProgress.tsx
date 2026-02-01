import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Circular Progress Indicator */}
            <motion.div
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full border-4 border-cyan-500/20 flex items-center justify-center z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{
                            pathLength: scrollYProgress
                        }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                    </defs>
                </svg>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold text-cyan-400"
                    style={{
                        opacity: useSpring(scrollYProgress)
                    }}
                >
                    <motion.span>
                        {scrollYProgress.get() > 0 && Math.round(scrollYProgress.get() * 100)}%
                    </motion.span>
                </motion.div>
            </motion.div>
        </>
    );
};

export default ScrollProgress;
