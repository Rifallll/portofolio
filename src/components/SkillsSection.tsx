import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, Code, BarChart2, LineChart, Table2,
  Brain, Globe, Layers, Zap, Activity, Target, FileCode
} from "lucide-react";

// --- Types ---
interface Skill {
  title: string;
  proficiency: number;
  level: string;
  icon: React.ElementType;
  category: string;
}

const ALL_SKILLS: Skill[] = [
  // DATA CORE
  { title: "SQL", proficiency: 88, level: "ADVANCED", icon: Database, category: "DATA" },
  { title: "Python (Pandas)", proficiency: 82, level: "ADVANCED", icon: FileCode, category: "DATA" },
  { title: "Data Cleaning", proficiency: 85, level: "ADVANCED", icon: Layers, category: "DATA" },
  { title: "EDA", proficiency: 80, level: "ADVANCED", icon: Brain, category: "DATA" },
  // VIZ
  { title: "Tableau", proficiency: 78, level: "ADVANCED", icon: BarChart2, category: "VIZ" },
  { title: "Power BI", proficiency: 75, level: "ADVANCED", icon: LineChart, category: "VIZ" },
  { title: "Matplotlib/Seaborn", proficiency: 80, level: "ADVANCED", icon: BarChart2, category: "VIZ" },
  { title: "Google Looker Studio", proficiency: 72, level: "INTERMEDIATE", icon: Table2, category: "VIZ" },
  // DEV
  { title: "React / Next.js", proficiency: 90, level: "EXPERT", icon: Globe, category: "DEV" },
  { title: "TypeScript", proficiency: 85, level: "ADVANCED", icon: Code, category: "DEV" },
  { title: "REST APIs", proficiency: 82, level: "ADVANCED", icon: Zap, category: "DEV" },
  { title: "Git / GitHub", proficiency: 88, level: "ADVANCED", icon: FileCode, category: "DEV" },
];

const CATEGORIES = ["ALL", "DATA", "VIZ", "DEV"];

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
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px]"
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
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              fill="rgba(6, 182, 212, 0.3)"
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

// --- Skill Bar Card ---
const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-cyan-500/20 transition-all group"
  >
    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
      <skill.icon className="w-5 h-5 text-cyan-400" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-bold text-white truncate">{skill.title}</span>
        <span className="text-[10px] font-black text-cyan-500 ml-2 flex-shrink-0">{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
        />
      </div>
    </div>
    <span className={`text-[9px] font-black px-2 py-1 rounded-full flex-shrink-0 ${
      skill.level === 'EXPERT' ? 'bg-cyan-500/20 text-cyan-400' :
      skill.level === 'ADVANCED' ? 'bg-blue-500/20 text-blue-400' :
      'bg-slate-500/20 text-slate-400'
    }`}>{skill.level}</span>
  </motion.div>
);

// --- Main Section ---
const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredSkills = useMemo(() => {
    return activeCategory === "ALL"
      ? ALL_SKILLS.slice(0, 8)
      : ALL_SKILLS.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const listSkills = useMemo(() => {
    return activeCategory === "ALL"
      ? ALL_SKILLS
      : ALL_SKILLS.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-5 h-5 text-cyan-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-cyan-500">Skill Matrix</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            DATA & TECH <span className="text-gradient-ocean">EXPERTISE</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Core competencies across data analysis, visualization, and full-stack development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'border-white/10 text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
            >
              {cat === "DATA" ? "🗃️ Data" : cat === "VIZ" ? "📊 Visualization" : cat === "DEV" ? "💻 Dev" : "All"}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left: Skill Bars */}
          <div className="lg:w-1/2 w-full space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + "-bars"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {listSkills.map((skill, i) => (
                  <SkillBar key={skill.title} skill={skill} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
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
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Live Skill Radar</span>
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

              {/* Stats Card */}
              <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Avg Proficiency</span>
                </div>
                <p className="text-xl font-black text-white">83 <span className="text-[10px] text-slate-600">%</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;