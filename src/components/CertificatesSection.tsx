import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Shield, Database, LayoutGrid, Terminal } from "lucide-react";

const CATEGORIES = {
  ALL: "Registry_All",
  TECH: "Engineering",
  MEDIA: "Content_Prod",
  COMM: "Public_Rel"
};

const certificatesData = [
  { title: "Machine Learning Specialist", issuer: "DQLab", date: "2023", link: "#", category: CATEGORIES.TECH },
  { title: "Data Analyst Professional", issuer: "Digital Talent Scholarship", date: "2023", link: "#", category: CATEGORIES.TECH },
  { title: "UI/UX Design Masterclass", issuer: "Gamelab Indonesia", date: "2023", link: "#", category: CATEGORIES.TECH },
  { title: "SQL Fundamental", issuer: "Coding Studio", date: "2023", link: "#", category: CATEGORIES.TECH },
  { title: "Python Programming", issuer: "Rocket Digital Academy", date: "2023", link: "#", category: CATEGORIES.TECH },
  { title: "Video Content Creator", issuer: "Thematic Academy", date: "2023", link: "#", category: CATEGORIES.MEDIA },
  { title: "Social Media Specialist", issuer: "HubSpot Academy", date: "2022", link: "#", category: CATEGORIES.MEDIA },
  { title: "Effective Communication", issuer: "MySkill", date: "2023", link: "#", category: CATEGORIES.COMM },
  { title: "Public Speaking Excellence", issuer: "Bicara.Official", date: "2022", link: "#", category: CATEGORIES.COMM },
  { title: "TOAFL (Arabic Foreign Language)", issuer: "Al Arabiya", date: "2022", link: "#", category: CATEGORIES.COMM },
];

const CertificatesSection = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.ALL);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const filteredCertificates = activeCategory === CATEGORIES.ALL
    ? certificatesData
    : certificatesData.filter(cert => cert.category === activeCategory);

  const displayedCertificates = showAllCertificates
    ? filteredCertificates
    : filteredCertificates.slice(0, 6);

  return (
    <section id="certificates" className="py-40 bg-[#020408] relative overflow-hidden">
      {/* Texture Layer: Subtle Noise & Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Decorative Monolith Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Grand Header & Texture */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32 border-b border-white/5 pb-16">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Shield className="w-4 h-4 text-cyan-500" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/40 italic">Registry v2.0</span>
              </motion.div>

              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                Expertise <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-white/20">Monolith</span>
              </h2>
            </div>

            <div className="flex flex-col items-end text-right md:w-80">
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-6 opacity-60">
                A centralized ledger of technical certifications and professional credentials. Each record is verified for integrity and authenticity.
              </p>
              <div className="flex items-center gap-4 text-white/20">
                <Database className="w-4 h-4" />
                <div className="h-[1px] w-20 bg-white/10" />
                <span className="font-mono text-[10px] tracking-widest uppercase">Verified Archives</span>
              </div>
            </div>
          </div>

          {/* Precision Navigation / Filter */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            {Object.values(CATEGORIES).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAllCertificates(false);
                }}
                className={`px-8 py-3 rounded-md text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 border ${activeCategory === cat
                    ? "bg-white text-black border-white shadow-[0_10px_25px_rgba(255,255,255,0.1)] scale-105"
                    : "bg-white/[0.02] text-slate-500 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
              >
                {cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          {/* The Monolith Grid - Perfect Alignment */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-2 md:p-4 overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Sync Header Table */}
            <div className="grid grid-cols-[80px_1fr_200px_140px] items-center gap-6 px-6 py-6 mb-2 border-b border-white/5 opacity-40">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Year
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em]">Validation_Label</div>
              <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em]">Issuing_Node</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-right">Action</div>
            </div>

            <LayoutGroup>
              <motion.div layout className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {displayedCertificates.map((certificate, index) => (
                    <CertificateCard key={certificate.title} {...certificate} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </div>

          {filteredCertificates.length > 6 && (
            <div className="mt-20 flex justify-center">
              <button
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                className="group relative px-12 py-4 overflow-hidden rounded-xl border border-white/10"
              >
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative text-[10px] font-black uppercase tracking-[0.5em] text-white/60 group-hover:text-white transition-colors">
                  {showAllCertificates ? "Seal Database" : "Expand Registry"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
