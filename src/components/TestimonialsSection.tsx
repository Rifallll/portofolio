import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Quote, Star, Building2, Globe, Sparkles } from "lucide-react";

// --- MOCK CLIENT LOGOS ---
const clients = [
  { name: "TechFlow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
  { name: "CreativeSpace", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "GlobalSolutions", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png" },
  { name: "InnovateLabs", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png" },
  { name: "FutureWorks", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png" },
];

const testimonials = [
  {
    name: "Andi Wijaya",
    role: "Project Manager",
    company: "TechFlow",
    content: "Rifal memiliki kemampuan luar biasa dalam menerjemahkan visi brand menjadi strategi konten yang tajam. Hasil kerjanya sangat impactful dan meningkatkan engagement kami secara signifikan.",
    rating: 5,
    accent: "from-blue-500 to-cyan-400"
  },
  {
    name: "Siti Aminah",
    role: "Founder",
    company: "CreativeSpace",
    content: "Sangat profesional dan detail. Desain UI/UX yang dibuat melebihi ekspektasi kami. Benar-benar talenta dunia teknologi yang solid yang sulit ditemukan.",
    rating: 5,
    accent: "from-purple-500 to-pink-500"
  },
  {
    name: "Budi Santoso",
    role: "CTO",
    company: "GlobalSolutions",
    content: "Kepemimpinan dan cara komunikasinya sangat matang. Rifal bukan sekadar eksekutor, tapi partner strategis yang handal dalam menyelesaikan masalah teknis yang kompleks.",
    rating: 5,
    accent: "from-emerald-500 to-green-400"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#02040a]">
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500"></span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Trusted By Leaders</span>
            </div>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            CLIENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500">STORIES</span>
          </h2>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative group"
            >
              {/* Card Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-b ${t.accent} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />

              <div className="relative h-full p-8 rounded-[2rem] bg-[#0d1520]/80 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-300">
                {/* Decorative Quote */}
                <Quote className="absolute top-6 right-8 w-24 h-24 text-white/[0.03] rotate-12" />

                {/* Rating */}
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 text-lg leading-loose mb-10 flex-1 relative z-10">
                  "{t.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${t.accent} p-[2px]`}>
                    <div className="w-full h-full rounded-full bg-[#0d1520] flex items-center justify-center">
                      <span className="font-black text-white text-sm">{t.name[0]}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{t.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Building2 className="w-3 h-3" />
                      <span>{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- LOGO SCROLL (MARQUEE) --- */}
        <div className="relative border-y border-white/5 bg-white/[0.02] py-12 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-10" />

          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex min-w-full gap-20 items-center px-10"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[...clients, ...clients, ...clients].map((client, i) => (
                <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer group">
                  {/* Simple Text Placeholder for logos to avoid external image 404s if URLs break, or use the URLs if stable */}
                  {/* We will simulate 'Logos' with lucid icons for stability + text */}
                  <Globe className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xl font-black uppercase text-white tracking-widest">{client.name}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="flex min-w-full gap-20 items-center px-10 absolute left-full top-0 h-full"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[...clients, ...clients, ...clients].map((client, i) => (
                <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer group">
                  <Globe className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xl font-black uppercase text-white tracking-widest">{client.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;