import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Waves, User, Code, FolderOpen, Award, Mail, Download } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import Magnetic from './Magnetic';
import useSciFiSound from '@/hooks/use-sound';

const PremiumNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { playSound } = useSciFiSound();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', path: '/', icon: <Waves className="w-3.5 h-3.5" /> },
        { name: 'About', path: '/about', icon: <User className="w-3.5 h-3.5" /> },
        { name: 'Skills', path: '/skills', icon: <Code className="w-3.5 h-3.5" /> },
        { name: 'Projects', path: '/projects', icon: <FolderOpen className="w-3.5 h-3.5" /> },
        { name: 'Certificates', path: '/certificates', icon: <Award className="w-3.5 h-3.5" /> },
        { name: 'Contact', path: '/contact', icon: <Mail className="w-3.5 h-3.5" /> },
    ];

    const isItemActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-[999999] pointer-events-auto transition-all duration-500 ${scrolled
                ? 'py-4'
                : 'py-8'
                }`}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                <div className={`flex items-center justify-between transition-all duration-500 px-6 py-3 ${scrolled
                    ? 'bg-[#0d1520]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-cyan-500/10'
                    : ''}`}>

                    {/* Logo */}
                    <Magnetic strength={0.2} range={50}>
                        <Link to="/" className="group relative flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                                    R
                                </div>
                                <div className="absolute -inset-1 bg-cyan-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-white font-bold tracking-tighter text-lg leading-none block italic">RIFAL</span>
                                <span className="text-cyan-400 font-bold ml-1 text-xs">DEV</span>
                            </div>
                        </Link>
                    </Magnetic>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Magnetic key={item.name} strength={0.2} range={40}>
                                <Link
                                    to={item.path}
                                    onMouseEnter={() => playSound('hover')}
                                    onClick={() => playSound('click')}
                                    className="relative px-4 py-2 group flex items-center gap-2"
                                >
                                    <span className={`relative z-10 transition-transform duration-300 ${isItemActive(item.path) ? 'text-white scale-110' : 'text-slate-500'}`}>
                                        {item.icon}
                                    </span>
                                    <span
                                        className={`relative z-10 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 ${isItemActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                    {isItemActive(item.path) && (
                                        <motion.div
                                            layoutId="navbar-indicator-pill"
                                            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </Magnetic>
                        ))}
                    </div>

                    {/* Weather & CTA */}
                    <div className="flex items-center gap-4">
                        <div className="block">
                            <WeatherWidget />
                        </div>

                        <Magnetic strength={0.3} range={60}>
                            <Link to="/contact">
                                <motion.button
                                    onMouseEnter={() => playSound('active')}
                                    onClick={() => playSound('click')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden sm:block px-6 py-2.5 rounded-full bg-white text-black font-black uppercase tracking-[0.1em] text-[10px] hover:bg-cyan-400 transition-colors shadow-lg shadow-white/5"
                                >
                                    Hire Me
                                </motion.button>
                            </Link>
                        </Magnetic>


                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-3 rounded-xl glass border border-cyan-500/20 text-cyan-400"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-4 right-4 mt-4 bg-[#0d1520]/95 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -z-10" />

                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-6 py-4 rounded-2xl flex items-center justify-between transition-all ${isItemActive(item.path)
                                        ? 'bg-cyan-500/10 border border-cyan-500/30 text-white'
                                        : 'hover:bg-white/5 text-slate-400'
                                        }`}
                                >
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">{item.name}</span>
                                    {isItemActive(item.path) && <motion.div layoutId="mobile-dot" className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />}
                                </Link>
                            ))}
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4">
                                <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-cyan-500/20">
                                    Establish Link
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default PremiumNavbar;
