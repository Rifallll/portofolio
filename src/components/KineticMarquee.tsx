import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';

// Custom wrap function to replace @motionone/utils
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface MarqueeProps {
    baseVelocity?: number;
    text: string;
    className?: string;
}

const ParqueeItem = ({ baseVelocity = 5, text, className }: MarqueeProps) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        stiffness: 400,
        damping: 50
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be 
     * enough to fill the screen width.
     */
    return (
        <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
            <motion.div className="flex whitespace-nowrap gap-12" style={{ x }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <span key={i} className="block">{text}</span>
                ))}
            </motion.div>
        </div>
    );
};

const KineticMarquee = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 flex flex-col justify-around py-20 opacity-[0.03]">
            <ParqueeItem baseVelocity={-2} text="RIFAL AZHAR PERMANA • FULLSTACK DEVELOPER •" className="text-[15vh] font-black" />
            <ParqueeItem baseVelocity={2} text="CREATIVE ENGINEERING • DATA SCIENCE •" className="text-[15vh] font-black" />
            <ParqueeItem baseVelocity={-1} text="STRATEGIC INNOVATION • SYSTEM ARCHITECT •" className="text-[15vh] font-black" />
        </div>
    );
};

export default KineticMarquee;
