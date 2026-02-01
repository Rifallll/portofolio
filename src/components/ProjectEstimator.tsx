import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Hourglass, TrendingUp, CheckCircle2, ArrowRight, Layers, Layout, Globe, Code } from 'lucide-react';

const SERVICES = [
    { id: 'web', name: 'Web Dev', icon: Globe, baseDays: 14, color: 'text-cyan-400' },
    { id: 'design', name: 'UI/UX Design', icon: Layout, baseDays: 7, color: 'text-purple-400' },
    { id: 'app', name: 'Mobile App', icon: Layers, baseDays: 21, color: 'text-emerald-400' },
    { id: 'fullstack', name: 'Full Stack', icon: Code, baseDays: 28, color: 'text-blue-400' },
];

const COMPLEXITY = [
    { label: 'Basic', multiplier: 1, desc: 'Simple structure, standard features' },
    { label: 'Advanced', multiplier: 1.5, desc: 'Custom integrations, unique UI' },
    { label: 'Enterprise', multiplier: 2.5, desc: 'Scalable architecture, high security' },
];

const ProjectEstimator = () => {
    const [selectedService, setSelectedService] = useState(SERVICES[0]);
    const [complexity, setComplexity] = useState(COMPLEXITY[0]);

    const estimation = useMemo(() => {
        const days = Math.ceil(selectedService.baseDays * complexity.multiplier);
        const weeks = (days / 7).toFixed(1);
        return { days, weeks };
    }, [selectedService, complexity]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass-card p-10 rounded-[3rem] border-white/5 shadow-2xl overflow-hidden relative"
            >
                {/* Visual Header */}
                <div className="flex items-center gap-3 mb-12">
                    <div className="p-3 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Project Estimator</h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Calculated Delivery Pipeline</p>
                    </div>
                </div>

                {/* Service Selection */}
                <div className="mb-10">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Select Operational Sector</label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {SERVICES.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setSelectedService(service)}
                                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 group ${selectedService.id === service.id
                                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                        : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                                    }`}
                            >
                                <service.icon className={`w-5 h-5 ${selectedService.id === service.id ? service.color : ''}`} />
                                <span className="text-[9px] font-black uppercase tracking-widest">{service.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Complexity Slider/Selection */}
                <div className="mb-12">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Deployment Complexity</label>
                    <div className="space-y-3">
                        {COMPLEXITY.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => setComplexity(item)}
                                className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${complexity.label === item.label
                                        ? 'bg-white/10 border-cyan-500/50'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div>
                                    <p className={`text-[11px] font-black uppercase tracking-widest ${complexity.label === item.label ? 'text-white' : 'text-slate-400'}`}>
                                        {item.label}
                                    </p>
                                    <p className="text-[9px] text-slate-600 font-medium">{item.desc}</p>
                                </div>
                                {complexity.label === item.label && (
                                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Estimation Result */}
                <div className="p-8 rounded-[2rem] bg-black/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-2 text-slate-500">
                                <Hourglass className="w-3 h-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Timeframe</span>
                            </div>
                            <p className="text-3xl font-black text-white leading-none">
                                {estimation.weeks} <span className="text-xs text-slate-600 font-bold uppercase">Weeks</span>
                            </p>
                        </div>
                        <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-2 text-slate-500">
                                <TrendingUp className="w-3 h-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Confidence</span>
                            </div>
                            <p className="text-3xl font-black text-emerald-400 leading-none">
                                92 <span className="text-xs text-slate-600 font-bold uppercase">%</span>
                            </p>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full md:w-auto px-8 py-4 rounded-2xl bg-cyan-600 text-black font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-cyan-500 transition-colors"
                    >
                        Start Expedition
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full -z-10" />
            </motion.div>
        </div>
    );
};

export default ProjectEstimator;
