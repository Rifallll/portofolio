
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import {
  Briefcase, GraduationCap, Award, User,
  MapPin, Globe, Cpu, Rocket, Calendar, Database, Layout, Terminal, Download
} from "lucide-react";

// --- REAL DATA FROM CV ---

const experiences = [
  {
    role: "Big Data Analyst (Internship)",
    company: "PT. KIMIA FARMA, TBK",
    year: "Dec 2025 - Present",
    desc: "Data Processing & Quality assurance using AI/Machine Learning. Creating BI dashboards for strategic decision-making."
  },
  {
    role: "Head of Technical Dept.",
    company: "FRASA ACADEMY",
    year: "Nov 2025 - Present",
    desc: "Leading the dev team for Learning Management System (LMS). Defining technical strategies and conducting code reviews."
  },
  {
    role: "Freelance Web Developer",
    company: "NEVERCODE LTD",
    year: "Oct 2024 - Present",
    desc: "Developed 20+ responsive websites. Optimized code to improve load time by up to 40%."
  },
  {
    role: "Web Developer (Internship)",
    company: "ProCodeCG",
    year: "Jun 2025 - Oct 2025",
    desc: "Built a web scraper for student progress reports. Reduced manual data entry time by 70%."
  },
  {
    role: "UI/UX Designer (Internship)",
    company: "Gamelab Indonesia",
    year: "Aug 2024 - Sep 2024",
    desc: "Managed end-to-end design of 'MoonTesse' restaurant website. Executed usability testing & user research."
  },
];

const certificates = [
  { name: "Machine Learning: K-Means", org: "DQLab", year: "March 2025" },
  { name: "Mastering UI/UX w/ Figma", org: "Gamelab Indonesia", year: "Aug 2024" },
  { name: "Public Speaking Mastery", org: "Bicara.Official", year: "July 2024" },
  { name: "Python for Data Science", org: "DQLab", year: "Feb 2024" },
  { name: "Social Media Marketing", org: "HubSpot Academy", year: "Mar 2022" },
];

const techStack = [
  "HTML/CSS", "Web Scraping", "Python", "SQL", "Figma",
  "WordPress", "Data Analysis", "Machine Learning", "Social Media Strategy"
];

// --- ASSETS ---

const Background = () => (
  <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-[#050505]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
  </div>
);

// --- COMPONENTS ---

const BentoItem = ({ children, className = "", delay = 0 }) => {
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
      {/* Bioluminescence Glow Effect */}
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

const Marquee = ({ children }) => (
  <div className="relative flex overflow-hidden group select-none mask-linear-fade">
    <motion.div
      className="flex flex-nowrap gap-6 min-w-full"
      animate={{ x: ["0%", "-100%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
    >
      {children}
      {children}
      {children} {/* Render thrice for safety on ultra-wide screens */}
    </motion.div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30">
      <Background />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 max-w-7xl">

        {/* --- HEADER --- */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            About <span className="text-slate-500">Me.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            Deeply rooted in Computer Engineering with a proven track record in Digital Media Strategy.
            I bridge the gap between <span className="text-white">Data Analytics</span> and <span className="text-white">Creative Development</span>.
          </p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* 1. PROFILE (Fixed) */}
          <BentoItem className="md:col-span-2 lg:col-span-2 row-span-2 p-8 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div className="w-20 h-20 rounded-full bg-slate-800 overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/50 transition-colors">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 animate-pulse" />
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

          {/* 2. STATS - UPDATED WITH DIGITAL STRATEGY */}
          <BentoItem className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-900 to-[#0A0A0A]">
            <div className="text-4xl font-bold text-green-400 mb-1">+150%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Engagement Growth</div>
          </BentoItem>

          <BentoItem className="p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-900 to-[#0A0A0A]">
            <div className="text-4xl font-bold text-white mb-1">10+</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Data Campaigns</div>
          </BentoItem>

          {/* 3. LOCATION */}
          <BentoItem className="md:col-span-2 p-6 flex items-center justify-between group">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Based In</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Pandeglang, Indonesia</h3>
            </div>
            <Globe className="w-24 h-24 text-slate-800 -mr-4 -mb-4 group-hover:text-cyan-900/20 transition-colors" />
          </BentoItem>

          {/* 4. EXPERIENCE (SCROLLABLE VAULT) */}
          <BentoItem className="md:col-span-2 lg:col-span-2 row-span-2 p-0 flex flex-col">
            <div className="p-8 pb-4 border-b border-white/5 bg-[#0A0A0A] z-10">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Professional Experience</h3>
              </div>
            </div>

            {/* Scroll Area */}
            <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-8 max-h-[350px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
                      <span>{job.year}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Fade at bottom */}
            <div className="h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none -mt-12 z-10" />
          </BentoItem>

          {/* 5. EDUCATION - CORRECTED */}
          <BentoItem className="md:col-span-2 p-8">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>
            <div className="space-y-6">
              <div className="group">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-white font-bold text-lg">Telkom University</div>
                  <div className="text-green-400 font-mono text-xs border border-green-500/30 px-2 py-1 rounded">2020-Present</div>
                </div>
                <div className="text-sm text-slate-400 mb-1">Bachelor of Computer Engineering</div>
                <div className="text-xs text-slate-500">GPA: 3.00 • Web Dev & Data Science</div>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="group">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-white font-bold text-lg">MAN 1 Pandeglang</div>
                  <div className="text-slate-500 font-mono text-xs border border-white/10 px-2 py-1 rounded">2019-2022</div>
                </div>
                <div className="text-sm text-slate-400">Science Major (IPA)</div>
                <div className="text-xs text-slate-500">Graduated with Honors</div>
              </div>
            </div>
          </BentoItem>

          {/* 6. SKILLS - EXPANDED WITH DIGITAL STRATEGY */}
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
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Digital Strategy</h4>
                <div className="flex flex-wrap gap-2">
                  {["Social Media Analytics", "SEO", "Content Strategy", "Google Analytics", "Ads Management"].map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-purple-500/10 text-xs text-purple-300 border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoItem>

        </div>
        {/* END BENTO GRID CONTAINER */}

        {/* 7. CERTIFICATES MARQUEE (REAL CV DATA) - MOVED OUTSIDE GRID TO BE FULL WIDTH */}
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

          {/* CTA */}
          <div className="mt-12 p-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20">
            <div className="p-8 rounded-[22px] bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

              <div className="text-center md:text-left relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to optimize your data?</h2>
                <p className="text-slate-400 mb-4 md:mb-0">
                  Proven track record with <span className="text-green-400 font-bold">100% Client Satisfaction</span> at Nevercode LTD.
                </p>
              </div>

              <div className="flex gap-4 relative z-10">
                <button className="px-6 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
                <a href="/contact" className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
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
};

export default AboutPage;