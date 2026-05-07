'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, User, Database, FolderOpen, Award, Home } from 'lucide-react';
import WeatherWidget from './WeatherWidget';

const NAV_ITEMS = [
    { name: 'Home',         path: '/',             icon: Home },
    { name: 'About',        path: '/about',         icon: User },
    { name: 'Skills',       path: '/skills',        icon: Database },
    { name: 'Projects',     path: '/projects',      icon: FolderOpen },
    { name: 'Certificates', path: '/certificates',  icon: Award },
    { name: 'Contact',      path: '/contact',       icon: Mail },
];

const PremiumNavbar = () => {
    const [scrolled, setScrolled]         = useState(false);
    const [mobileOpen, setMobileOpen]     = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    };

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto"
        >
            {/* ── Main Bar ── */}
            <div className="mx-auto max-w-7xl px-4 pt-4">
                <div className={`
                    flex items-center justify-between gap-4
                    px-5 py-3 rounded-2xl
                    transition-all duration-500
                    ${scrolled
                        ? 'bg-[#080f1a]/85 backdrop-blur-2xl border border-white/8 shadow-2xl shadow-black/40'
                        : 'bg-transparent border border-transparent'}
                `}>

                    {/* ── LEFT: Logo ── */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                        <div className="relative">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                                R
                            </div>
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
                        </div>
                        <div className="hidden sm:flex flex-col leading-none">
                            <span className="text-white font-bold text-base tracking-tight">Rifal</span>
                            <span className="text-cyan-400 text-[10px] font-semibold uppercase tracking-[0.18em]">Data Analyst</span>
                        </div>
                    </Link>

                    {/* ── CENTER: Nav Links (desktop) ── */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`
                                        relative px-4 py-2 rounded-xl flex items-center gap-2
                                        text-[11px] font-semibold uppercase tracking-widest
                                        transition-all duration-200
                                        ${active
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'}
                                    `}
                                >
                                    {active && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/25 rounded-xl"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <item.icon className={`w-3.5 h-3.5 relative z-10 ${active ? 'text-cyan-400' : ''}`} />
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ── RIGHT: Weather + CTA + Mobile toggle ── */}
                    <div className="flex items-center gap-3 flex-shrink-0">

                        {/* Weather — compact pill */}
                        <div className="hidden md:block">
                            <WeatherWidget />
                        </div>

                        {/* CTA Button */}
                        <Link href="/contact" className="hidden sm:block">
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/40 transition-shadow cursor-pointer"
                            >
                                <Mail className="w-3 h-3" />
                                Contact
                            </motion.div>
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileOpen
                                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.div>
                                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.div>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden mx-4 mt-2 bg-[#080f1a]/95 backdrop-blur-2xl border border-white/8 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-1">
                            {NAV_ITEMS.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-4 py-3.5 rounded-xl
                                            text-sm font-semibold uppercase tracking-widest
                                            transition-all duration-200
                                            ${active
                                                ? 'bg-cyan-500/10 border border-cyan-500/25 text-white'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                        `}
                                    >
                                        <item.icon className={`w-4 h-4 ${active ? 'text-cyan-400' : ''}`} />
                                        {item.name}
                                        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="px-4 pb-4">
                            <Link href="/contact" onClick={() => setMobileOpen(false)}>
                                <button className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg">
                                    Get In Touch
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default PremiumNavbar;
