import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Globe, Terminal } from "lucide-react";

// --- VISUAL ASSETS ---

const GridOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0"
    style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
);

const WorldMapEffect = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
    {/* Abstract World Map Representation */}
    <svg className="w-full h-full text-cyan-500" fill="currentColor">
      <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" className="text-slate-700" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
  </div>
);

// --- COMPONENT: REAL-TIME STATUS ---


// --- MAIN PAGE ---

import { useSEO } from "@/hooks/useSEO";

const ContactPage = () => {
  useSEO("Contact | Rifal Azhar", "Get in touch with Rifal Azhar for freelance projects, technical consultation, or data analysis services.");

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate network request
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 5000); // Reset after 5s
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans relative overflow-hidden flex flex-col">
      <GridOverlay />
      <WorldMapEffect />

      <div className="flex-1 container mx-auto px-6 pt-32 pb-20 relative z-10 flex flex-col lg:flex-row items-center gap-16">

        {/* --- LEFT: INFO HUD --- */}
        <div className="lg:w-1/2 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              INITIATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                TRANSMISSION
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed border-l-2 border-cyan-500/30 pl-6">
              Available for freelance projects, technical consultation, and full-time caching.
              My inbox is encrypted and always open.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid gap-6">
            {[
              { icon: Mail, label: "Email Address", value: "rifalazharpermana@gmail.com", link: "mailto:rifalazharpermana@gmail.com" },
              { icon: MapPin, label: "Location", value: "Pandeglang, Indonesia", link: "#" },
              { icon: Linkedin, label: "LinkedIn", value: "in/rifalazharpermana", link: "https://www.linkedin.com/in/rifalazharpermana" }
            ].map((item, i) => (
              <motion.a
                href={item.link}
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="group flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-slate-900 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{item.label}</div>
                  <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors break-all">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Hexagons */}
          <div className="flex gap-4">
            {[Linkedin, Twitter, Globe].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_cyan] transition-all"
              >
                <Icon className="w-5 h-5" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* --- RIGHT: ENCRYPTED FORM --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:w-1/2 w-full"
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            <div className="absolute top-4 right-6 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>

            <div className="mb-8 flex items-center gap-2 text-cyan-500/50 font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>SECURE_CHANNEL_ESTABLISHED</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Identity</label>
                <input
                  type="text"
                  required
                  placeholder="ENTER_YOUR_NAME"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Coordinates</label>
                <input
                  type="email"
                  required
                  placeholder="ENTER_YOUR_EMAIL"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Data Packet</label>
                <textarea
                  rows={4}
                  required
                  placeholder="INPUT_MESSAGE_STREAM..."
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#020617] border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isSent}
                className={`w-full py-4 rounded-xl font-bold text-lg tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${isSent
                  ? 'bg-green-500 text-black'
                  : isSending
                    ? 'bg-slate-700 text-slate-400 cursor-wait'
                    : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_cyan]'
                  }`}
              >
                {isSent ? (
                  <>Message Sent!</>
                ) : isSending ? (
                  <>Transmission in Progress...</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Transmission
                  </>
                )}
              </button>
            </form>

          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;