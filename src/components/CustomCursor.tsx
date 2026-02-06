import React, { useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    // 1. Core Position Tracking
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 2. Spring Config for "Fluid" movement - OPTIMIZED for weight
    const mainSpring = { damping: 25, stiffness: 300, mass: 0.4 };
    const trailSpring = { damping: 40, stiffness: 180, mass: 0.6 };

    const posX = useSpring(mouseX, mainSpring);
    const posY = useSpring(mouseY, mainSpring);
    const tPosX = useSpring(mouseX, trailSpring);
    const tPosY = useSpring(mouseY, trailSpring);

    // 3. State Management
    const [cursorType, setCursorType] = useState<'default' | 'hover' | 'click' | 'text'>('default');
    const [isVisible, setIsVisible] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isVisible) setIsVisible(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        const target = e.target as HTMLElement;
        const isInteractive = !!target.closest('a, button, input, textarea, [role="button"], .magnetic-area');
        const isText = !!target.closest('p, h1, h2, h3, h4, h5, h6, span, li');

        if (isInteractive) setCursorType('hover');
        else if (isText) setCursorType('text');
        else setCursorType('default');
    }, [isVisible, mouseX, mouseY]);

    const handleMouseDown = (e: MouseEvent) => {
        setCursorType('click');
        const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 1000);
    };
    const handleMouseUp = () => setCursorType('hover');

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseenter', () => setIsVisible(true));
        window.addEventListener('mouseleave', () => setIsVisible(false));

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[1000000] pointer-events-none overflow-hidden">
            {/* Ripples Effect */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        initial={{ opacity: 0.5, scale: 0 }}
                        animate={{ opacity: 0, scale: 4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute w-10 h-10 border border-cyan-400/50 rounded-full"
                        style={{ left: ripple.x - 20, top: ripple.y - 20 }}
                    />
                ))}
            </AnimatePresence>

            {/* 1. MAIN CURSOR CORE */}
            <motion.div
                className="absolute top-0 left-0 flex items-center justify-center"
                style={{ x: posX, y: posY, translateX: '-50%', translateY: '-50%' }}
            >
                {/* Inner Glow Core */}
                <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                    animate={{
                        scale: cursorType === 'click' ? 0.5 : cursorType === 'hover' ? 1.5 : 1,
                    }}
                />

                {/* Outer Fluid Ring */}
                <motion.div
                    className="absolute rounded-full border border-cyan-400/30"
                    animate={{
                        width: cursorType === 'hover' ? 60 : cursorType === 'text' ? 4 : 32,
                        height: cursorType === 'hover' ? 60 : cursorType === 'text' ? 40 : 32,
                        opacity: cursorType === 'text' ? 0.8 : 1,
                        rotate: cursorType === 'hover' ? 90 : 0,
                        borderRadius: cursorType === 'text' ? '2px' : '50%'
                    }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                />

                {/* Status Text (Optional Mega Touch) */}
                <AnimatePresence>
                    {cursorType === 'hover' && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-10 text-[8px] font-black uppercase tracking-[0.3em] text-cyan-400 whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10"
                        >
                            Explore
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* 2. TRAILING GHOST FLUID */}
            <motion.div
                className="absolute top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-xl will-change-transform"
                style={{ x: tPosX, y: tPosY, translateX: '-50%', translateY: '-50%', translateZ: 0 }}
                animate={{
                    scale: cursorType === 'hover' ? 2 : 1.2,
                    opacity: cursorType === 'click' ? 0.2 : 0.6
                }}
            />

            {/* 3. PARTICLE TRAIL (Micro-detail) */}
            <motion.div
                className="absolute w-1 h-1 bg-white/20 rounded-full will-change-transform"
                style={{ x: tPosX, y: tPosY, translateX: '-10px', translateY: '15px', translateZ: 0 }}
            />
        </div>
    );
};

export default CustomCursor;
