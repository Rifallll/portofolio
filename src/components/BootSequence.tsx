import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, Cpu } from 'lucide-react';

interface BootSequenceProps {
    onComplete: () => void;
}

const NOISE_PATTERN = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentLine, setCurrentLine] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const lines = [
        "INITIALIZING_KERNEL...",
        "LOADING_NEURAL_NET...",
        "CONNECTING_TO_SATELLITE...",
        "BYPASSING_FIREWALLS...",
        "DECRYPTING_PORTFOLIO_DATA...",
        "ACCESS_GRANTED"
    ];

    useEffect(() => {
        // Line Step Timer
        const lineInterval = setInterval(() => {
            setCurrentLine(prev => {
                if (prev < lines.length - 1) return prev + 1;
                return prev;
            });
        }, 500);

        // Progress Bar Timer
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 150);

        // Exit Timer
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800); // 800ms for exit animation
        }, 3500);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
            clearTimeout(exitTimer);
        };
    }, [onComplete, lines.length]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[99999] bg-[#02040a] flex flex-col items-center justify-center font-mono text-cyan-500 overflow-hidden cursor-wait"
                >
                    {/* Background Grid */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: `url("${NOISE_PATTERN}")` }}
                    />
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />

                    <div className="w-full max-w-md p-8 relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-8 border-b border-cyan-500/30 pb-4">
                            <Terminal className="w-6 h-6 animate-pulse" />
                            <span className="text-xl font-bold tracking-[0.2em] text-white">SYSTEM_BOOT</span>
                        </div>

                        {/* Terminal Lines */}
                        <div className="space-y-2 mb-12 min-h-[160px]">
                            {lines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: index <= currentLine ? 1 : 0,
                                        x: index <= currentLine ? 0 : -20
                                    }}
                                    className="flex items-center gap-3 text-sm"
                                >
                                    <span className="text-cyan-500/50">{`>`}</span>
                                    <span className={index === lines.length - 1 ? "text-emerald-400 font-bold glow" : "text-cyan-300"}>
                                        {line}
                                    </span>
                                    {index === currentLine && index !== lines.length - 1 && (
                                        <span className="w-2 h-4 bg-cyan-500 animate-pulse" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden mb-4 border border-cyan-900/50">
                            <motion.div
                                className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>

                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-cyan-500/70">
                            <span>Memory: 64TB OK</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </div>

                    {/* Bottom Icons */}
                    <div className="absolute bottom-12 flex gap-8 opacity-50">
                        <Cpu className="w-6 h-6 animate-pulse" />
                        <ShieldCheck className="w-6 h-6 animate-pulse delay-75" />
                        <Zap className="w-6 h-6 animate-pulse delay-150" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BootSequence;
