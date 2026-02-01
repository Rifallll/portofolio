import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Zap, Code, User, Mail, Download, Search, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = [
    { cmd: '/help', desc: 'Show available commands', icon: <Terminal className="w-4 h-4" /> },
    { cmd: '/cv', desc: 'Download Professional Résumé', icon: <Download className="w-4 h-4" /> },
    { cmd: '/about', desc: 'Go to About page', icon: <User className="w-4 h-4" /> },
    { cmd: '/projects', desc: 'View my engineering works', icon: <Code className="w-4 h-4" /> },
    { cmd: '/contact', desc: 'Initiate contact protocol', icon: <Mail className="w-4 h-4" /> },
    { cmd: '/clear', desc: 'Purge terminal logs', icon: <Zap className="w-4 h-4" /> },
    { cmd: '/tsunami', desc: 'Trigger high-tide visuals', icon: <Waves className="w-4 h-4 text-cyan-400" /> },
    { cmd: '/deepsea', desc: 'Enter bioluminescent mode', icon: <Zap className="w-4 h-4 text-blue-500" /> },
];

const CommandCenter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<string[]>(['Welcome to Rifal Azhar Command Center v1.0.0', 'Type /help for instructions.']);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '`') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        if (!cmd) return;

        setLogs(prev => [...prev, `> ${input}`].slice(-15));

        switch (cmd) {
            case '/help':
                setLogs(prev => [...prev, 'Available commands:', ...COMMANDS.map(c => `${c.cmd} - ${c.desc}`), '/ping - Test system latency', '/stats - View analytical profile'].slice(-15));
                break;
            case '/cv':
            case '/resume':
                setLogs(prev => [...prev, 'STATUS: Locating R_AZHAR_RESUME.PDF...', 'STATUS: Uplink established. Initiating download...'].slice(-15));
                window.open('/CV_RIFAL.pdf', '_blank');
                break;
            case '/ping':
                const latency = Math.floor(Math.random() * 50) + 10;
                setLogs(prev => [...prev, `PONG: Response from core in ${latency}ms. System optimal.`].slice(-15));
                break;
            case '/stats':
                setLogs(prev => [...prev,
                    '--- ANALYTICAL PROFILE v3 ---',
                    'PROJECTS_DEPLOYED: 25+',
                    'DATA_SCRIPTS: 12 (70% efficiency gain)',
                    'CORE_STACK: Python, React, SQL',
                    'COFFEE_CONSUMPTION: 404_ERR_OVERFLOW',
                    '--- END OF LOG ---'
                ].slice(-15));
                break;
            case '/theme':
                setLogs(prev => [...prev, 'Adjusting environmental aesthetics...'].slice(-15));
                const colors = ['#06b6d4', '#10b981', '#8b5cf6', '#f43f5e'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                document.documentElement.style.setProperty('--primary', randomColor);
                setLogs(prev => [...prev, `Theme synchronization COMPLETE. Primary color set to ${randomColor}.`].slice(-15));
                break;
            case '/about':
                setLogs(prev => [...prev, 'Navigating to About Node...'].slice(-15));
                setTimeout(() => { navigate('/about'); setIsOpen(false); }, 1000);
                break;
            case '/projects':
                setLogs(prev => [...prev, 'Accessing Project Archives...'].slice(-15));
                setTimeout(() => { navigate('/projects'); setIsOpen(false); }, 1000);
                break;
            case '/contact':
                setLogs(prev => [...prev, 'Establishing Contact Link...'].slice(-15));
                setTimeout(() => { navigate('/contact'); setIsOpen(false); }, 1000);
                break;
            case '/clear':
                setLogs(['Terminal purged. System awaiting instructions.']);
                break;
            case '/tsunami':
                setLogs(prev => [...prev, 'WARNING: High-tide event triggered. Scanning waves...'].slice(-15));
                document.body.style.overflow = 'hidden';
                const wave = document.createElement('div');
                wave.className = 'fixed inset-0 z-[999999] bg-cyan-600/30 backdrop-blur-md transition-all duration-1000 translate-y-full';
                document.body.appendChild(wave);
                setTimeout(() => wave.style.transform = 'translateY(0)', 10);
                setTimeout(() => wave.style.transform = 'translateY(-100%)', 1000);
                setTimeout(() => {
                    document.body.removeChild(wave);
                    document.body.style.overflow = 'auto';
                    setLogs(prev => [...prev, 'Wave passed. System stabilized.'].slice(-15));
                }, 2000);
                break;
            case '/deepsea':
                setLogs(prev => [...prev, 'Diving into the abyss... Bioluminescence ACTIVE.'].slice(-15));
                document.documentElement.style.setProperty('--background', '220 50% 2%');
                document.documentElement.style.setProperty('--primary', '180 100% 50%');
                setTimeout(() => {
                    setLogs(prev => [...prev, 'Depth reached. Environmental parameters adjusted.'].slice(-15));
                }, 1500);
                break;
            default:
                setLogs(prev => [...prev, `Error: Unknown directive "${cmd}". Type /help for valid protocols.`].slice(-15));
        }

        setInput('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.1, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, scale: 1, backdropFilter: 'blur(20px)' }}
                    exit={{ opacity: 0, scale: 1.1, backdropFilter: 'blur(0px)' }}
                    className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 md:p-10 bg-black/60"
                >
                    <motion.div
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 50 }}
                        className="w-full max-w-4xl h-[600px] bg-[#0d1520]/90 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col relative"
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-20" />

                        {/* Top Bar */}
                        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md relative z-30">
                            <div className="flex items-center gap-3">
                                <Terminal className="w-5 h-5 text-cyan-400" />
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">Rifal Terminal v1.0</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 md:p-10 font-mono text-sm overflow-y-auto custom-scrollbar relative z-30">
                            <div className="space-y-2">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`${log.startsWith('>') ? 'text-cyan-400' : log.startsWith('Error') ? 'text-red-400' : 'text-slate-400'}`}
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Command Input Area */}
                            <form onSubmit={handleCommand} className="mt-6 flex items-center gap-3">
                                <ChevronRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-700"
                                    placeholder="Type /help..."
                                />
                            </form>
                        </div>

                        {/* Visual Footer (Suggestions) */}
                        <div className="p-5 bg-black/40 border-t border-white/5 relative z-30 flex gap-4 overflow-x-auto hide-scrollbar">
                            {COMMANDS.map((c) => (
                                <button
                                    key={c.cmd}
                                    onClick={() => setInput(c.cmd)}
                                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center gap-2 shrink-0 group"
                                >
                                    <div className="text-slate-500 group-hover:text-cyan-400">{c.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{c.cmd}</span>
                                </button>
                            ))}
                        </div>

                        {/* Decorative Background Ornaments */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full -z-10" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandCenter;
