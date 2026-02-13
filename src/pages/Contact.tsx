
import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // 1. Simpan ke Supabase
            const { error } = await supabase.from('panci_messages').insert([{
                name: formData.name,
                email: formData.email,
                message: formData.message,
                ip: localStorage.getItem('panci_cached_ip') || 'Unknown',
                submitted_at: new Date().toISOString()
            }]);

            if (error) throw error;

            // 2. Kirim Notifikasi Telegram
            const BOT_TOKEN = "7608814099:AAH_ObeVFro2gMP6dA7TF1dkusoVSjxtJ3A";
            const CHAT_ID = "6342273524";

            const text = `📩 <b>[CONTACT_PAGE] NEW_TRANSMISSION</b>\n━━━━━━━━━━━━━━━━━━\n<b>👤 FROM:</b> ${formData.name}\n<b>📧 EMAIL:</b> ${formData.email}\n━━━━━━━━━━━━━━━━━━\n<b>📝 MESSAGE:</b>\n<i>"${formData.message}"</i>`;

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'HTML'
                })
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);

        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12">

            {/* Left Column: Info */}
            <div className="w-full md:w-1/2 space-y-6 md:space-y-8 animate-fade-in-left">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-px w-8 bg-cyan-500"></span>
                        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">Contact Uplink</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white mb-2 leading-tight">
                        INITIATE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">TRANSMISSION</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg mt-4 md:mt-6 max-w-md leading-relaxed">
                        Available for freelance projects, technical consultation, and full-time caching. My inbox is encrypted and always open.
                    </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                    <div className="bg-[#0c0c0c] border border-white/5 p-4 md:p-6 rounded-xl flex items-center gap-4 group hover:border-cyan-500/30 transition-colors">
                        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors shrink-0">
                            <Mail size={24} />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Email Address</div>
                            <a href="mailto:rifalazharpermana@gmail.com" className="text-white font-mono text-sm md:text-base hover:text-cyan-400 transition-colors break-all">rifalazharpermana@gmail.com</a>
                        </div>
                    </div>

                    <div className="bg-[#0c0c0c] border border-white/5 p-4 md:p-6 rounded-xl flex items-center gap-4 group hover:border-cyan-500/30 transition-colors">
                        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Location</div>
                            <div className="text-white font-bold text-sm md:text-base">Pandeglang, Indonesia</div>
                        </div>
                    </div>

                    <div className="bg-[#0c0c0c] border border-white/5 p-4 md:p-6 rounded-xl flex items-center gap-4 group hover:border-cyan-500/30 transition-colors">
                        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors shrink-0">
                            <Linkedin size={24} />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">LinkedIn</div>
                            <a href="https://linkedin.com/in/rifalazharpermana" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-sm md:text-base hover:text-cyan-400 transition-colors break-all">in/rifalazharpermana</a>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-2 md:pt-4">
                    <a href="#" aria-label="Github Profile" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-black transition-all">
                        <Github size={20} />
                    </a>
                    <a href="#" aria-label="Website" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-black transition-all">
                        <Globe size={20} />
                    </a>
                </div>
            </div>

            {/* Right Column: Terminal Form */}
            <div className="w-full md:w-1/2 animate-fade-in-right">
                <div className="bg-[#050505] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)] relative">
                    {/* Header Terminal */}
                    <div className="bg-[#0a0a0a] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                        </div>
                        <div className="font-mono text-[10px] text-cyan-500/50 uppercase tracking-widest hidden sm:block">
                            SECURE_CHANNEL_ESTABLISHED
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-5 md:p-8 relative">
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                        <div className="relative z-10 space-y-5 md:space-y-6">
                            <div className="font-mono text-cyan-500/70 text-xs mb-6 md:mb-8">
                                &gt;_ INITIALIZING UPLINK PROTOCOL... <span className="animate-pulse">READY</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="ENTER_YOUR_NAME"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 md:p-4 pl-4 text-cyan-100 placeholder-slate-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all text-sm md:text-base"
                                        />
                                        <div className="absolute inset-0 rounded-lg border border-cyan-500/0 group-hover:border-cyan-500/20 pointer-events-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Coordinates</label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="ENTER_YOUR_EMAIL"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 md:p-4 pl-4 text-cyan-100 placeholder-slate-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Data Packet</label>
                                    <div className="relative group">
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="INPUT_MESSAGE_STREAM..."
                                            rows={5}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 md:p-4 pl-4 text-cyan-100 placeholder-slate-700 font-mono focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all resize-none text-sm md:text-base"
                                        />
                                        <div className="absolute right-4 bottom-4 w-6 h-6 rounded-full border border-cyan-500/30 flex items-center justify-center">
                                            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={`w-full py-3 md:py-4 rounded-lg font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 text-sm md:text-base
                                        ${status === 'success'
                                            ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                                            : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]'
                                        }
                                        disabled:opacity-70 disabled:cursor-not-allowed
                                    `}
                                >
                                    {status === 'sending' ? (
                                        <>SENDING_PACKET...</>
                                    ) : status === 'success' ? (
                                        <>TRANSMISSION_SENT ✅</>
                                    ) : (
                                        <>
                                            SEND TRANSMISSION <span className="text-lg">⚡</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
