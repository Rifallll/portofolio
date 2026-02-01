import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, LayoutList, Megaphone, MessageSquareText, Palette,
  Image, Monitor, Video, Globe, Code, Terminal, Crown,
  Mic, Lightbulb, Zap, Activity, Target
} from "lucide-react";
import Magnetic from "./Magnetic";

// --- Types ---
interface Skill {
  title: string;
  proficiency: number;
  level: string;
  icon: React.ElementType;
  category: string;
}

const ALL_SKILLS: Skill[] = [
  { title: "Social Media Strategy", proficiency: 95, level: "EXPERT", icon: Users, category: "STRATEGY" },
  { title: "Content Strategy", proficiency: 90, level: "EXPERT", icon: LayoutList, category: "STRATEGY" },
  { title: "Social Media Ads", proficiency: 85, level: "EXPERT", icon: Megaphone, category: "STRATEGY" },
  { title: "Public Relations", proficiency: 80, level: "ADVANCED", icon: MessageSquareText, category: "STRATEGY" },
  { title: "Canva Design", proficiency: 95, level: "EXPERT", icon: Palette, category: "DESIGN" },
  { title: "Adobe Photoshop", proficiency: 90, level: "EXPERT", icon: Image, category: "DESIGN" },
  { title: "UI/UX Design", proficiency: 80, level: "ADVANCED", icon: Monitor, category: "DESIGN" },
  { title: "Video Editing", proficiency: 75, level: "ADVANCED", icon: Video, category: "TECH" },
  { title: "WordPress", proficiency: 70, level: "ADVANCED", icon: Globe, category: "TECH" },
  { title: "HTML/CSS", proficiency: 75, level: "ADVANCED", icon: Code, category: "TECH" },
  { title: "Basic Python", proficiency: 60, level: "INTERMEDIATE", icon: Terminal, category: "TECH" },
  { title: "Leadership", proficiency: 90, level: "EXPERT", icon: Crown, category: "SOFT" },
  { title: "Public Speaking", proficiency: 85, level: "EXPERT", icon: Mic, category: "SOFT" },
  { title: "Team Collaboration", proficiency: 90, level: "EXPERT", icon: Users, category: "SOFT" },
  { title: "Problem Solving", proficiency: 85, level: "EXPERT", icon: Lightbulb, category: "SOFT" },
];

const CATEGORIES = ["ALL", "STRATEGY", "DESIGN", "TECH", "SOFT"];

// --- Radar Sub-Component ---
const PulseRadar = ({ skills }: { skills: Skill[] }) => {
  const size = 400;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / skills.length;

  const points = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (skill.proficiency / 100) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        labelX: center + (radius + 30) * Math.cos(angle),
        labelY: center + (radius + 30) * Math.sin(angle),
        ...skill
      };
    });
  }, [skills, radius, angleStep, center]);

  const pathData = useMemo(() => {
    if (points.length === 0) return "";
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  }, [points]);

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      {/* Background Rings */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/5"
          style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
        />
      ))}

      {/* Pulsing Core */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
      />

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full relative z-10 overflow-visible">
        {/* Radar Polygon */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          d={pathData}
          fill="rgba(6, 182, 212, 0.1)"
          stroke="rgba(6, 182, 212, 0.5)"
          strokeWidth="2"
        />

        {/* Skill Nodes & Labels */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Connection Line */}
            <line x1={center} y1={center} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

            {/* Pulse Effect */}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              fill="rgba(6, 182, 212, 0.4)"
            />

            {/* Node Dot */}
            <circle cx={p.x} cy={p.y} r="4" fill="#06b6d4" />

            {/* Icon/Label */}
            <foreignObject x={p.labelX - 40} y={p.labelY - 10} width="80" height="40">
              <div className="flex flex-col items-center justify-center">
                <p className="text-[7px] font-black text-white/40 uppercase tracking-tighter text-center leading-tight">
                  {p.title.split(' ')[0]}
                </p>
                <div className="w-4 h-4 text-cyan-400 mt-1 opacity-60"><p.icon className="w-full h-full" /></div>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- Main Section ---
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const filteredSkills = useMemo(() => {
    return activeCategory === "ALL"
      ? ALL_SKILLS.slice(0, 8) // Limit "ALL" to keep radar clean
      : ALL_SKILLS.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Text & Categories */}
          <div className="lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-cyan-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-cyan-500">Mastery Matrix</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                COMPLEX <br />
                <span className="text-gradient-ocean">EXPERTISE</span> <br />
                RADAR
              </h2>

              <p className="text-slate-500 text-lg mb-10 max-w-md leading-relaxed">
                Visualisasi data real-time untuk pemetaan keahlian strategis & teknis dalam ekosistem digital.
              </p>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                      ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'border-white/10 text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: The Radar */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[3rem] bg-slate-950/20 border border-white/5 backdrop-blur-sm shadow-2xl"
            >
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <Zap className="w-3 h-3 text-cyan-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Live Pulse Radar</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, rotate: -10 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <PulseRadar skills={filteredSkills} />
                </motion.div>
              </AnimatePresence>

              {/* Stats Preview Card */}
              <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Efficiency</span>
                </div>
                <p className="text-xl font-black text-white">92.4 <span className="text-[10px] text-slate-600">%</span></p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Global Particle Pulse Effect (Decorative) */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          {ALL_SKILLS.slice(0, 4).map((skill, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
              <skill.icon className="w-6 h-6 text-slate-500 mb-4 group-hover:text-cyan-400 transition-colors" />
              <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">{skill.title}</h4>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  className="h-full bg-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;