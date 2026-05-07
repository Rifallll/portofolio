import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import CertificateCard from "./CertificateCard";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Shield, Database, LayoutGrid, Terminal } from "lucide-react";

const NOISE_PATTERN = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

const CATEGORIES = {
  ALL: "Registry_All",
  TECH: "Engineering",
  MEDIA: "Content_Prod",
  COMM: "Public_Rel"
};

// Removed static data
const initialCertificatesData: any[] = [];

const CertificatesSection = () => {
  const [certificatesData, setCertificatesData] = useState<any[]>(initialCertificatesData);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase.from('certificates').select('*').order('id', { ascending: false });
      if (data) {
        const mappedData = data.map(item => ({
          ...item,
          issuer: item.org,
          date: item.year,
          link: item.credential_url
        }));
        setCertificatesData(mappedData);
        // Extract unique categories
        const uniqueCats = Array.from(new Set(mappedData.map(c => c.category as string)));
        setCategories(["All", ...uniqueCats]);
      }
    };
    fetchCertificates();

    // Realtime Subscription
    const subscription = supabase
      .channel('certificates-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'certificates' },
        (payload) => {
          (payload) => {
            toast.success("Certificates registry updated");
            fetchCertificates();
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const filteredCertificates = activeCategory === "All"
    ? certificatesData
    : certificatesData.filter(cert => cert.category === activeCategory);

  const displayedCertificates = showAllCertificates
    ? filteredCertificates
    : filteredCertificates.slice(0, 6);

  return (
    <section id="certificates" className="py-40 bg-[#020408] relative overflow-hidden">
      {/* Texture Layer: Subtle Noise & Grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("${NOISE_PATTERN}")` }}
      />

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
            {categories.map((cat) => (
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
                {cat}
              </button>
            ))}
          </div>

          {/* The Monolith Grid - Perfect Alignment */}
          <div className="relative z-10">
            {/* No Table Header - Pure Grid */}

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayedCertificates.map((certificate, index) => (
                  <CertificateCard key={certificate.title} {...certificate} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
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
