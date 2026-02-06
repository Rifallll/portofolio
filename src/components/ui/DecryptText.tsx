"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface DecryptTextProps {
    text: string;
    speed?: number;
    className?: string;
    parentClassName?: string;
    animateOnHover?: boolean;
    revealDirection?: "center" | "start" | "end";
}

export const DecryptText: React.FC<DecryptTextProps> = ({
    text,
    speed = 50,
    className = "",
    parentClassName = "",
    animateOnHover = true,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    const scramble = useCallback(() => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((_letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Controls the ease of reveal
        }, speed);
    }, [text, speed]);

    useEffect(() => {
        // Initial scramble on mount
        scramble();

        // Cleanup
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [scramble]);

    const handleMouseEnter = () => {
        if (animateOnHover) {
            setIsHovered(true);
            scramble();
        }
    };

    return (
        <span
            className={parentClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
};
