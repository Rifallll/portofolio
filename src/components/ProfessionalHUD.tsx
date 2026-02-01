import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, Zap, Activity, Signal } from 'lucide-react';

const ProfessionalHUD = () => {
    const [time, setTime] = useState(new Date());
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="w-full max-w-md mx-auto lg:ml-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass border border-white/10 p-6 rounded-[2.5rem] flex flex-col gap-6 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
                {/* Background Scanning Effect */}
                <motion.div
                    animate={{ y: [0, 100, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 top-0 h-[1px] bg-cyan-500/50 blur-sm z-0"
                />

                {/* Status Section */}
                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                        <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-50" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1">Developer Status</span>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest">Available for Hire</span>
                            <Signal className="w-3 h-3 text-emerald-500/50" />
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Time Section */}
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-cyan-400">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Local Time (GMT+7)</span>
                        <span className="text-xl font-black text-white font-mono tabular-nums leading-none">
                            {formatTime(time)}
                        </span>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* System Stats Section */}
                <div className="flex items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-slate-600" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Jakarta, ID</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Activity className="w-3 h-3 text-cyan-500/50" />
                            <span className="text-[9px] font-black text-white">99.9%</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-yellow-500/50" />
                            <span className="text-[9px] font-black text-white">LOW LATENCY</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfessionalHUD;
