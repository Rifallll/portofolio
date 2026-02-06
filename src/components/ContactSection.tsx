import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Shield, Activity, Share2, FileCode } from "lucide-react";

// Tipe data untuk item kontak
// Menggunakan Bahasa Indonesia untuk penjelasan kode sesuai permintaan
interface ContactNode {
  icon: any;
  label: string;
  value: string;
  id: string;
  color: string;
  desc: string; // Deskripsi tambahan dalam bahasa Indonesia
}

const ContactSection = () => {
  // Data kontak dengan gaya 'Cyber'
  const contactNodes: ContactNode[] = [
    {
      icon: Mail,
      label: "ENCRYPTED_MAIL",
      value: "rifalazharpermana@gmail.com",
      id: "NODE_ALPHA",
      color: "text-cyan-400",
      desc: "Jalur komunikasi utama. Respon dalam 24 jam."
    },
    {
      icon: Phone,
      label: "SECURE_VOICE",
      value: "085217421701",
      id: "NODE_BETA",
      color: "text-emerald-400",
      desc: "Saluran suara langsung. Hanya untuk urusan mendesak."
    },
    {
      icon: MapPin,
      label: "PHYSICAL_LOC",
      value: "Pandeglang, Indonesia",
      id: "NODE_GAMMA",
      color: "text-rose-400",
      desc: "Koordinat markas operasional saat ini."
    },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#020617] min-h-[80vh] flex items-center">
      {/* Latar Belakang Grid Digital */}
      {/* Efek grid bergerak untuk nuansa futuristik */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Efek Radial Gradient sebagai pencahayaan ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Seksi */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/20 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
              System Online // Ready for Connection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
          >
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Protocol</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-mono text-sm max-w-lg leading-relaxed"
          >
            [STATUS]: Server siap menerima transmisi data.<br />
            Silakan pilih metode enkripsi komunikasi di bawah ini untuk memulai kolaborasi.
          </motion.p>
        </div>

        {/* Konten Utama: Tampilan Kartu Kontak */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />

              <div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-cyan-500/30 p-8 rounded-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                {/* Garis dekoratif di pojok */}
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <Activity className="w-4 h-4 text-slate-700 group-hover:text-cyan-500 transition-colors" />
                </div>

                <div className="flex flex-col h-full bg-transparent relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-slate-800/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${node.color}`}>
                    <node.icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono group-hover:text-cyan-400 transition-colors">
                        //{node.label}
                      </span>
                      <div className="h-[1px] flex-1 bg-slate-800 group-hover:bg-cyan-900 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white break-words">{node.value}</h3>
                  </div>

                  <p className="text-sm text-slate-400 font-mono flex-1 border-l-2 border-slate-800 pl-3 mt-2 group-hover:border-cyan-500/50 transition-colors">
                    {node.desc}
                  </p>

                  <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-4">
                    <span className="text-[9px] font-mono text-slate-600 group-hover:text-cyan-500/70">
                      ID: {node.id}
                    </span>
                    <Shield className="w-3 h-3 text-slate-700 group-hover:text-cyan-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Panel Info Bawah */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-center items-center gap-6 text-center md:text-left"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-slate-900/50 border border-white/5">
            <Globe className="w-5 h-5 text-indigo-400 animate-pulse" />
            <div className="text-xs font-mono text-slate-400">
              <div className="text-indigo-300 font-bold tracking-wider">NETWORK STATUS</div>
              <div>Semua sistem beroperasi normal (100%)</div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-slate-900/50 border border-white/5">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <div className="text-xs font-mono text-slate-400">
              <div className="text-emerald-300 font-bold tracking-wider">SOCIAL FLUX</div>
              <div>Tersedia di semua platform mayor</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
