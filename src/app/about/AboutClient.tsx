"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import {
  Briefcase, GraduationCap, Award, User,
  Layout, Rocket, Download
} from "lucide-react";
import { DecryptText } from "@/components/ui/DecryptText";
import { supabase } from "@/lib/supabase";

const NOISE_PATTERN = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

interface Experience {
  role: string;
  company: string;
  period?: string;
  year?: string;
  desc: string;
  created_at?: string;
}

const initialExperiences: Experience[] = [];

const certificates = [
  { name: "Machine Learning: K-Means", org: "DQLab", year: "March 2025" },
  { name: "Mastering UI/UX w/ Figma", org: "Gamelab Indonesia", year: "Aug 2024" },
  { name: "Public Speaking Mastery", org: "Bicara.Official", year: "July 2024" },
  { name: "Python for Data Science", org: "DQLab", year: "Feb 2024" },
  { name: "Social Media Marketing", org: "HubSpot Academy", year: "Mar 2022" },
];

const Background = () => (
  <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-[#050505]" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("${NOISE_PATTERN}")` }}
    />
  </div>
);

const BentoItem = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all ${className}`}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none z-0"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

const Marquee = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex overflow-hidden group select-none mask-linear-fade">
    <motion.div
      className="flex flex-nowrap gap-6 min-w-full"
      animate={{ x: ["0%", "-100%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
    >
      {children}
      {children}
      {children}
    </motion.div>
  </div>
);

const MapCard = () => {
  const [filterMode, setFilterMode] = useState("dark");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFilterStyle = () => {
    switch (filterMode) {
      case "heat": return "contrast(120%) hue-rotate(180deg) invert(100%)";
      case "satellite": return "none";
      default: return "grayscale(100%) invert(95%) contrast(85%) opacity(0.7)";
    }
  };

  return (
    <BentoItem className="md:col-span-2 p-0 relative overflow-hidden group min-h-[280px]">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg group-hover:border-cyan-500/30 transition-colors">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
          <span className="relative block w-2 h-2 rounded-full bg-cyan-400"></span>
        </div>
        <span className="text-[10px] font-bold text-white uppercase tracking-widest pl-1">Based in Pandeglang</span>
      </div>

      <div className="absolute inset-0 w-full h-full bg-[#050505] transition-all duration-500">
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.203067341386!2d106.1042573!3d-6.308943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42236b252033b3%3A0x4441584288019050!2sAlun-Alun%20Pandeglang!5e0!3m2!1sen!2sid"
          width="100%"
          height="100%"
          className="w-full h-full object-cover border-0"
          style={{ filter: getFilterStyle(), transition: "filter 0.5s ease" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {[{ id: "dark", label: "NVG" }, { id: "heat", label: "HEAT" }, { id: "satellite", label: "SAT" }].map(mode => (
          <button
            key={mode.id}
            onClick={() => setFilterMode(mode.id)}
            className={`px-2 py-1 text-[8px] font-mono font-bold rounded border transition-all ${filterMode === mode.id ? "bg-cyan-500 text-black border-cyan-500" : "bg-black/50 text-cyan-500 border-cyan-900/50 hover:border-cyan-500"}`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 z-20 flex flex-col pointer-events-none mix-blend-screen">
        <span className="text-[9px] text-slate-400 font-mono tracking-widest mb-0.5">EST. TIME</span>
        <span className="text-sm font-bold text-white font-mono">
          UTC+7 // {time.toLocaleTimeString('en-US', { hour12: false })}
        </span>
      </div>
    </BentoItem>
  );
};

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Rifal Azhar Permana, a Computer Engineering student at Telkom University specializing in Data Analysis and Creative Development.",
};

export default function AboutPage() {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data } = await supabase
        .from("experience")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setExperiences(data);
      }
    };
    fetchExperiences();

    const subscription = supabase
      .channel('experience-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'experience' }, () => fetchExperiences())
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30">
      <Background />
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            About <span className="text-slate-500"><DecryptText text="Me." revealDirection="end" /></span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            Deeply rooted in Computer Engineering with a proven track record in Digital Media Strategy.
            I bridge the gap between <span className="text-white">Data Analytics</span> and <span className="text-white">Creative Development</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
          <BentoItem className="md:col-span-2 lg:col-span-2 row-span-2 p-8 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div className="w-20 h-20 rounded-full bg-slate-800 overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/50 transition-colors">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Rifal Azhar Permana</h2>
              <p className="text-cyan-400 font-mono text-sm mb-4">DATA_ANALYST && WEB_DEV</p>
              <p className="text-slate-400 leading-relaxed text-sm">
                As a Computer Engineering student at Telkom University, I combine technical hard skills
                in Python & Web Dev with strategic expertise in Digital Marketing.
                I build solutions that are both communicative and analytically driven.
              </p>
            </div>
          </BentoItem>

          <BentoItem className="p-0 bg-gradient-to-br from-slate-900 to-[#0A0A0A]">
            <div className="flex flex-col justify-center items-center h-full w-full p-4">
              <div className="text-3xl font-bold text-green-400 mb-1">+150%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Engagement Growth</div>
            </div>
          </BentoItem>

          <BentoItem className="p-0 bg-gradient-to-br from-slate-900 to-[#0A0A0A]">
            <div className="flex flex-col justify-center items-center h-full w-full p-4">
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Data Campaigns</div>
            </div>
          </BentoItem>

          <MapCard />

          <BentoItem className="md:col-span-2 lg:col-span-2 row-span-2 p-0 flex flex-col">
            <div className="p-8 pb-4 border-b border-white/5 bg-[#0A0A0A] z-10">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Professional Experience</h3>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-8 max-h-[350px]">
              {experiences.map((job, i) => (
                <div key={i} className="flex gap-4 group cursor-default">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div className="w-[1px] h-full bg-white/5 mt-2 group-last:hidden" />
                  </div>
                  <div className="pb-2">
                    <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors text-lg">{job.role}</h4>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 mb-2">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span>{job.period || job.year}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoItem>

          <BentoItem className="md:col-span-2 p-8">
            <div className="flex items-center gap-3 mb-4">
              < GraduationCap className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>
            <div className="space-y-6">
              <div className="group">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-white font-bold text-lg">Telkom University</div>
                  <div className="text-green-400 font-mono text-xs border border-green-500/30 px-2 py-1 rounded">2020-Present</div>
                </div>
                <div className="text-sm text-slate-400 mb-1">Bachelor of Computer Engineering</div>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="group">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-white font-bold text-lg">MAN 1 Pandeglang</div>
                  <div className="text-slate-500 font-mono text-xs border border-white/10 px-2 py-1 rounded">2019-2022</div>
                </div>
                <div className="text-sm text-slate-400">Science Major (IPA)</div>
              </div>
            </div>
          </BentoItem>

          <BentoItem className="md:col-span-2 lg:col-span-2 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <Layout className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Hybrid Skillset</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Technical Core</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "SQL", "Web Scraping", "HTML/CSS", "Figma", "WordPress"].map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-white/5 text-xs text-slate-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoItem>
        </div>

        <div className="mt-20 pb-8 overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 px-4">
            <Award className="w-6 h-6 text-yellow-500" />
            Certifications & Courses
          </h3>
          <Marquee>
            {certificates.map((cert, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] p-5 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-yellow-500/30 transition-all group cursor-pointer mr-6">
                <div className="flex justify-between items-start mb-3">
                  <Award className="w-8 h-8 text-slate-700 group-hover:text-yellow-500 transition-colors" />
                  <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 rounded">{cert.year}</span>
                </div>
                <h4 className="text-white font-bold text-sm leading-tight mb-2 group-hover:text-yellow-200">{cert.name}</h4>
                <p className="text-xs text-slate-500">{cert.org}</p>
              </div>
            ))}
          </Marquee>

          <div className="mt-12 p-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20">
            <div className="p-8 rounded-[22px] bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="text-center md:text-left relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to optimize your data?</h2>
                <p className="text-slate-400 mb-4 md:mb-0">
                  Proven track record with <span className="text-green-400 font-bold">100% Client Satisfaction</span>.
                </p>
              </div>
              <div className="flex gap-4 relative z-10">
                <a
                  href="/Rifal Azhar Permana.CV.pdf"
                  download
                  className="px-6 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
                <a href="/contact" className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Hire Me Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
