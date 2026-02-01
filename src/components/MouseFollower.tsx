import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.matches('a, button, input, textarea, [role="button"]');
            setIsHovering(isInteractive);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-cyan-400/50 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 10,
                    y: mousePosition.y - 10,
                    scale: isHovering ? 1.5 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28
                }}
            />

            {/* Trailing Glow */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 rounded-full bg-cyan-400/10 blur-xl pointer-events-none z-[9998]"
                animate={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                    scale: isHovering ? 1.3 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                }}
            />
        </>
    );
};

export default MouseFollower;
