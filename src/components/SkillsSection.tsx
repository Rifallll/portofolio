"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, Code, BarChart2, LineChart, Table2,
  Brain, Globe, Layers, Zap, FileCode, Target, TrendingUp
} from "lucide-react";

interface Skill {
  title: string;
  proficiency: number;
  level: string;
  levelColor: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

interface Category {
  id: string;
  label: string;
  emoji: string;
  description: string;
  accentColor: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "DATA",
    label: "Data Analysis",
    emoji: "🗃️",
    description: "Core analytical skills for querying, cleaning, and exploring datasets",
    accentColor: "from-cyan-500 to-blue-600",
    skills: [
      { title: "SQL", proficiency: 65, level: "Intermediate", levelColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: Database, iconColor: "text-cyan-400", bgColor: "bg-cyan-500/5", borderColor: "border-cyan-500/20" },
      { title: "Python · Pandas", proficiency: 60, level: "Intermediate", levelColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: FileCode, iconColor: "text-cyan-400", bgColor: "bg-cyan-500/5", borderColor: "border-cyan-500/20" },
      { title: "Data Cleaning", proficiency: 65, level: "Intermediate", levelColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: Layers, iconColor: "text-cyan-400", bgColor: "bg-cyan-500/5", borderColor: "border-cyan-500/20" },
      { title: "EDA", proficiency: 60, level: "Intermediate", levelColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: Brain, iconColor: "text-cyan-400", bgColor: "bg-cyan-500/5", borderColor: "border-cyan-500/20" },
    ]
  },
  {
    id: "VIZ",
    label: "Visualization & BI",
    emoji: "📊",
    description: "Tools for building dashboards and communicating data insights visually",
    accentColor: "from-purple-500 to-indigo-600",
    skills: [
      { title: "Tableau", proficiency: 55, level: "Learning", levelColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: BarChart2, iconColor: "text-purple-400", bgColor: "bg-purple-500/5", borderColor: "border-purple-500/20" },
      { title: "Power BI", proficiency: 50, level: "Learning", levelColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: LineChart, iconColor: "text-purple-400", bgColor: "bg-purple-500/5", borderColor: "border-purple-500/20" },
      { title: "Matplotlib · Seaborn", proficiency: 65, level: "Intermediate", levelColor: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: TrendingUp, iconColor: "text-purple-400", bgColor: "bg-purple-500/5", borderColor: "border-purple-500/20" },
      { title: "Looker Studio", proficiency: 55, level: "Learning", levelColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", icon: Table2, iconColor: "text-purple-400", bgColor: "bg-purple-500/5", borderColor: "border-purple-500/20" },
    ]
  },
  {
    id: "DEV",
    label: "Web Development",
    emoji: "💻",
    description: "Frontend engineering skills used to build this portfolio and data interfaces",
    accentColor: "from-emerald-500 to-teal-600",
    skills: [
      { title: "React · Next.js", proficiency: 85, level: "Proficient", levelColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: Globe, iconColor: "text-emerald-400", bgColor: "bg-emerald-500/5", borderColor: "border-emerald-500/20" },
      { title: "TypeScript", proficiency: 80, level: "Proficient", levelColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: Code, iconColor: "text-emerald-400", bgColor: "bg-emerald-500/5", borderColor: "border-emerald-500/20" },
      { title: "REST APIs", proficiency: 75, level: "Proficient", levelColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: Zap, iconColor: "text-emerald-400", bgColor: "bg-emerald-500/5", borderColor: "border-emerald-500/20" },
      { title: "Git · GitHub", proficiency: 80, level: "Proficient", levelColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: FileCode, iconColor: "text-emerald-400", bgColor: "bg-emerald-500/5", borderColor: "border-emerald-500/20" },
    ]
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className={`p-4 rounded-2xl border ${skill.bgColor} ${skill.borderColor} hover:scale-[1.02] transition-transform`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg ${skill.bgColor} border ${skill.borderColor} flex items-center justify-center`}>
          <skill.icon className={`w-4 h-4 ${skill.iconColor}`} />
        </div>
        <span className="text-sm font-bold text-white">{skill.title}</span>
      </div>
      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${skill.levelColor}`}>
        {skill.level}
      </span>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-slate-500">
        <span>Proficiency</span>
        <span className="font-bold text-slate-400">{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.06, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${
            skill.iconColor.includes("cyan") ? "from-cyan-500 to-blue-500" :
            skill.iconColor.includes("purple") ? "from-purple-500 to-indigo-500" :
            "from-emerald-500 to-teal-500"
          }`}
        />
      </div>
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const [activeId, setActiveId] = useState("DATA");
  const activeCategory = CATEGORIES.find(c => c.id === activeId)!;

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
            <Target className="w-3.5 h-3.5" />
            <span>Skill Matrix</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            Tools &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Expertise</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Competencies across data analysis, BI visualization, and web development.
            Skill levels reflect honest, current capability — not aspirations.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeId === cat.id
                  ? `bg-gradient-to-r ${cat.accentColor} border-transparent text-white shadow-lg`
                  : "border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Description */}
            <p className="text-center text-slate-500 text-sm mb-8">{activeCategory.description}</p>

            {/* Skill Cards Grid — 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {activeCategory.skills.map((skill, i) => (
                <SkillCard key={skill.title} skill={skill} index={i} />
              ))}
            </div>

            {/* Summary bar below the cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 max-w-5xl mx-auto p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCategory.accentColor} flex items-center justify-center text-xl`}>
                  {activeCategory.emoji}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{activeCategory.label}</p>
                  <p className="text-slate-500 text-[11px]">{activeCategory.skills.length} skills tracked</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-black text-white">
                    {Math.round(activeCategory.skills.reduce((a, s) => a + s.proficiency, 0) / activeCategory.skills.length)}
                    <span className="text-xs text-slate-600 ml-1">%</span>
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Avg. Proficiency</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-white">
                    {activeCategory.skills.filter(s => s.level !== "Learning").length}
                    <span className="text-xs text-slate-600 ml-1">/{activeCategory.skills.length}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Active Use</p>
                </div>
                <div className="w-32 hidden sm:block">
                  <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest">Overall</div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${activeCategory.accentColor}`}
                      style={{ width: `${Math.round(activeCategory.skills.reduce((a, s) => a + s.proficiency, 0) / activeCategory.skills.length)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;