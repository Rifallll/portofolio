"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CyberCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Custom cursor position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for trail
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const trailX = useSpring(cursorX, springConfig);
    const trailY = useSpring(cursorY, springConfig);

    const hoverRef = useRef(false);

    useEffect(() => {
        // Only enable on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest('[role="button"]') ||
                target.classList.contains("cursor-pointer");

            // Only update state if changed
            if (Boolean(isClickable) !== hoverRef.current) {
                hoverRef.current = Boolean(isClickable);
                setIsHovering(Boolean(isClickable));
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);

        // Hide default cursor
        document.documentElement.style.cursor = "none";
        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.style.cursor = "auto";
            document.body.style.cursor = "auto";
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* TRAILING DOT */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[2000000] mix-blend-screen"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className={`w-full h-full border rounded-full transition-all duration-300 ${isHovering ? 'border-cyan-400 scale-150 rotate-45' : 'border-cyan-500/30 scale-100 rotate-0'}`} />
            </motion.div>

            {/* MAIN CURSOR (CROSSHAIR) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[2000001]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Center Dot */}
                <div className={`w-1 h-1 bg-cyan-400 rounded-full transition-all ${isHovering ? 'scale-[2] bg-white' : ''}`} />

                {/* Crosshair Lines */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[1px] bg-cyan-500/50 transition-all ${isHovering ? 'w-0' : ''}`} />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[24px] bg-cyan-500/50 transition-all ${isHovering ? 'h-0' : ''}`} />

                {/* Text Label on Clickable */}
                {isHovering && (
                    <div className="absolute top-4 left-4 text-[8px] font-mono text-cyan-400 tracking-widest bg-black/80 px-1 rounded border border-cyan-500/50 whitespace-nowrap">
                        EXECUTE
                    </div>
                )}
            </motion.div>
        </>
    );
};
