"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
            const { error } = await supabase.from('panci_messages').insert([{
                name: formData.name,
                email: formData.email,
                message: formData.message,
                submitted_at: new Date().toISOString()
            }]);

            if (error) throw error;

            // Telegram Notification
            const BOT_TOKEN = "7608814099:AAH_ObeVFro2gMP6dA7TF1dkusoVSjxtJ3A";
            const CHAT_ID = "6342273524";
            const text = `📩 <b>[NEXT_CONTACT] NEW_TRANSMISSION</b>\n━━━━━━━━━━━━━━━━━━\n<b>👤 FROM:</b> ${formData.name}\n<b>📧 EMAIL:</b> ${formData.email}\n━━━━━━━━━━━━━━━━━━\n<b>📝 MESSAGE:</b>\n<i>"${formData.message}"</i>`;

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: 'HTML' })
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
        <div className="min-h-screen bg-[#02040a] text-white">
            <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12">
                <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
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
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="bg-[#050505] border border-cyan-500/30 rounded-2xl overflow-hidden relative p-8">
                        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="ENTER_YOUR_NAME"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-cyan-100 placeholder-slate-700 font-mono focus:outline-none focus:border-cyan-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Coordinates</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="ENTER_YOUR_EMAIL"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-cyan-100 placeholder-slate-700 font-mono focus:outline-none focus:border-cyan-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Data Packet</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="INPUT_MESSAGE_STREAM..."
                                    rows={5}
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-4 text-cyan-100 placeholder-slate-700 font-mono focus:outline-none focus:border-cyan-500 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-4 rounded-lg font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${status === 'success' ? 'bg-green-500 text-black' : 'bg-cyan-500 text-black hover:bg-cyan-400'}`}
                            >
                                {status === 'sending' ? 'SENDING_PACKET...' : status === 'success' ? 'TRANSMISSION_SENT ✅' : 'SEND TRANSMISSION ⚡'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
