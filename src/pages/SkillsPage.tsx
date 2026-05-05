import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import Footer from "@/components/Footer";
import {
  Code2, Database, Palette, Cpu, Globe, Zap,
  Terminal, Layers, Shield, Search, Smartphone, Cloud,
  Orbit, Lock, Server, Laptop, Sparkles, Briefcase, GraduationCap, Award,
  Download, Command
} from "lucide-react";
import { DecryptText } from "@/components/ui/DecryptText";
import useSciFiSound from "@/hooks/use-sound";

// --- CUSTOM HUD COMPONENTS ---

const Scanline = () => (
  <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden opacity-10">
    <div className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_cyan] animate-scanline" />
  </div>
);

const GlowingOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-300px] left-[-100px] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
    <div className="absolute bottom-[-300px] right-[-100px] w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
  </div>
);

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />;
};

const SystemLog = () => {
  const [logs, setLogs] = useState<{ id: number; text: string; type: 'info' | 'success' | 'warn' | 'error' }[]>([]);

  useEffect(() => {
    const events = [
      { text: "ESTABLISHING_SECURE_CONN...", type: 'info' },
      { text: "HANDSHAKE_COMPLETE", type: 'success' },
      { text: "ENCRYPTING_DATA_STREAM", type: 'warn' },
      { text: "OPTIMIZING_VIEWPORT_X", type: 'info' },
      { text: "PACKET_LOSS_DETECTED (0.001%)", type: 'error' },
      { text: "RENDER_ENGINE_READY", type: 'success' },
      { text: "FETCHING_ASSETS...", type: 'info' },
      { text: "MEMORY_HEAP_STABLE", type: 'success' },
      { text: "BYPASSING_FIREWALL...", type: 'warn' },
      { text: "ACCESS_GRANTED_LEVEL_5", type: 'success' },
      { text: "SCANNING_VULNERABILITIES", type: 'info' },
      { text: "INDEXING_DB_NODES", type: 'info' },
    ] as const;

    let count = 0;
    const interval = setInterval(() => {
      const event = events[Math.floor(Math.random() * events.length)];
      const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

      const newLog = {
        id: Date.now() + Math.random(),
        text: `[${timestamp}] 0x${hex} // ${event.text}`,
        type: event.type
      };

      setLogs(prev => [newLog, ...prev].slice(0, 12));
      count++;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 p-4 rounded-xl bg-black/90 border border-white/10 font-mono text-[9px] overflow-hidden hidden lg:block shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group">
      {/* GLOWING BORDER EFFECT */}
      <div className="absolute inset-0 border border-cyan-500/20 rounded-xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 relative z-10">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-3 h-3" />
          <span className="tracking-widest font-bold">KERNEL_LOG</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        </div>
      </div>

      {/* LOGS CONTAINER */}
      <div className="space-y-1.5 h-40 overflow-hidden flex flex-col pt-2 relative z-10 mask-linear-fade-bottom">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`truncate font-medium tracking-tight animate-in fade-in slide-in-from-left-2 duration-300 ${log.type === 'success' ? 'text-green-400' :
              log.type === 'warn' ? 'text-yellow-400' :
                log.type === 'error' ? 'text-red-400' :
                  'text-cyan-600'
              }`}
          >
            <span className="opacity-50 mr-2">{">"}</span>
            {log.text}
          </div>
        ))}
        {/* BLINKING CURSOR AT BOTTOM */}
        <div className="text-cyan-500 animate-pulse mt-auto pt-2">_</div>
      </div>

      {/* SCANLINES OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
    </div>
  );
};

// Local playSfx removed in favor of useSciFiSound hook for performance and AudioContext safety.

const radarData = [
  { subject: 'Frontend', A: 98, fullMark: 100 },
  { subject: 'Backend', A: 90, fullMark: 100 },
  { subject: 'DevOps', A: 85, fullMark: 100 },
  { subject: 'Design', A: 92, fullMark: 100 },
  { subject: 'Mobile', A: 85, fullMark: 100 },
  { subject: 'Architecture', A: 88, fullMark: 100 },
];

// --- DATA ---

const MODULES = {
  SKILLS: "skills",
  EXPERIENCE: "experience",
  EDUCATION: "education"
};



interface SkillDisplay {
  name: string;
  level: number;
  icon: React.ElementType | string;
  desc: string;
}

interface SkillGroup {
  category: string;
  icon: React.ElementType;
  skills: SkillDisplay[];
}

const initialSkillData: SkillGroup[] = [
  {
    category: "Core Engineering",
    icon: Laptop,
    skills: []
  },
  {
    category: "Creative Dev",
    icon: Sparkles,
    skills: []
  },
  {
    category: "Backend & Cloud",
    icon: Server,
    skills: []
  },
  {
    category: "AI & Emerging Tech",
    icon: Cpu,
    skills: []
  }
];

// Helper to map icon string to Component
const iconMap: Record<string, string> = {
  "Atom": "atom",
  "Code": "code",
  "Triangle": "triangle",
  "Wind": "wind",
  "Box": "box",
  "Move": "move",
  "Zap": "zap",
  "Image": "image",
  "Hexagon": "hexagon",
  "Database": "database",
  "Server": "server",
  "Container": "container",
  "Bot": "bot",
  "Brain": "brain",
  "Link": "link"
};

const educationData = [
  {
    degree: "Bachelor of Computer Engineering",
    school: "Telkom University",
    year: "2020 - Present",
    grade: "GPA 3.00",
    icon: GraduationCap
  },
  {
    degree: "Science Major (IPA)",
    school: "MAN 1 Pandeglang",
    year: "2019 - 2022",
    grade: "Graduated with Honors",
    icon: Award
  }
];

// --- DATA ---
interface Experience {
  id?: number;
  role: string;
  company: string;
  period?: string;
  year?: string;
  desc: string;
  tech: string[];
  created_at?: string;
}

interface SupabaseSkill {
  category: string;
  name: string;
  proficiency: number;
  icon_name: string;
}

import { useSEO } from "@/hooks/useSEO";

const SkillsPage = () => {
  useSEO("Skills & Stack | Rifal Azhar", "Explore Rifal Azhar's technical arsenal: React, Python, Data Science, and Digital Strategy.");

  const { playSound } = useSciFiSound();
  const [activeModule, setActiveModule] = useState(MODULES.SKILLS);
  const [lastKey, setLastKey] = useState<string | null>(null);

  // DYNAMIC DATA STATE
  const [skillData, setSkillData] = useState<SkillGroup[]>(initialSkillData);
  const [experienceData, setExperienceData] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Skills
        const skillsRes = await fetch('/api/skills');
        const skills = skillsRes.ok ? await skillsRes.json() : [];

        if (skills.length > 0) {
          const mappedData: SkillGroup[] = [
            { category: "Core Engineering", icon: Laptop, skills: [] },
            { category: "Creative Dev", icon: Sparkles, skills: [] },
            { category: "Backend & Cloud", icon: Server, skills: [] },
            { category: "AI & Emerging Tech", icon: Cpu, skills: [] },
          ];

          skills.forEach((s: SupabaseSkill) => {
            let targetCat = 0;
            if (s.category === 'Frontend') targetCat = 0;
            else if (s.category === 'Design') targetCat = 1;
            else if (s.category === 'Backend' || s.category === 'DevOps') targetCat = 2;
            else if (s.category === 'Tools') targetCat = 3;

            mappedData[targetCat].skills.push({
              name: s.name,
              level: s.proficiency,
              icon: iconMap[s.icon_name] || "code",
              desc: s.category
            });
          });
          setSkillData(mappedData);
        }

        // 2. Fetch Experience
        const expRes = await fetch('/api/experience');
        const exp = expRes.ok ? await expRes.json() : [];
        if (exp.length > 0) {
          const mapped = exp.map((e: Record<string, unknown>) => ({
            ...e,
            tech: Array.isArray(e.tech)
              ? e.tech
              : (typeof e.tech === 'string' ? JSON.parse(e.tech as string) : [])
          }));
          setExperienceData(mapped);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const changeModule = React.useCallback((module: string) => {
    if (module !== activeModule) {
      playSound('click');
      setActiveModule(module);
    }
  }, [activeModule, playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') { changeModule(MODULES.SKILLS); setLastKey('1'); }
      if (e.key === '2') { changeModule(MODULES.EXPERIENCE); setLastKey('2'); }
      if (e.key === '3') { changeModule(MODULES.EDUCATION); setLastKey('3'); }
      setTimeout(() => setLastKey(null), 500);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModule, changeModule]);

  // Mouse interaction for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { innerWidth, innerHeight } = window;
    const xPos = (e.clientX - innerWidth / 2) / 50;
    const yPos = (e.clientY - innerHeight / 2) / 50;
    x.set(xPos);
    y.set(yPos);
  };
  return (
    <div
      className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden lg:overflow-hidden relative font-sans"
      onMouseMove={handleMouseMove}
    >
      <Scanline />
      <GlowingOrbs />
      <ParticleNetwork />

      {/* BACKGROUND GRID FLOOR */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(200px) scale(3)',
        }}
      />

      <div className="relative z-10 pt-36 lg:pt-40 pb-10 px-4 md:px-8 container mx-auto min-h-screen lg:h-screen flex flex-col">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-8 border-b border-cyan-500/20 pb-6 relative"
        >
          <div className="absolute bottom-[-1px] left-0 w-32 h-[3px] bg-cyan-500 shadow-[0_0_15px_cyan]" />
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.3em] mb-8 md:mb-10">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              SYSTEM_READY // V.3.1.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 uppercase leading-snug">
              <DecryptText text="Developer Database" speed={60} />
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://drive.google.com/file/d/1YysZCMvXb4kFLG9UkDN93tCk6hbyCbxs/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all group"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              ACCESS_RESUME_CV
            </a>
            <div className="w-48 h-32 relative opacity-80 mix-blend-screen pointer-events-none">
              <RadarChart width={192} height={128} cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(6,182,212,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'cyan', fontSize: 8 }} />
                <Radar name="Skills" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
              </RadarChart>
            </div>
          </div>
        </motion.div>

        {/* MAIN HUD LAYOUT */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-0">

          {/* LEFT: NAVIGATION SIDEBAR */}
          <div className="lg:col-span-3 space-y-3">
            {[
              { id: MODULES.SKILLS, label: "TECH ARSENAL", icon: Code2, sub: "LANGUAGES & TOOLS", key: "1" },
              { id: MODULES.EXPERIENCE, label: "CAREER LOG", icon: Briefcase, sub: "WORK HISTORY", key: "2" },
              { id: MODULES.EDUCATION, label: "CREDENTIALS", icon: GraduationCap, sub: "ACADEMIC RECORDS", key: "3" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => changeModule(item.id)}
                className={`w-full group relative overflow-hidden rounded-xl p-[1px] transition-all duration-300 ${activeModule === item.id ? 'scale-105' : 'hover:scale-102 opacity-60 hover:opacity-100'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${activeModule === item.id ? 'from-cyan-500 via-blue-500 to-purple-500' : 'from-slate-700 to-slate-800'} transition-all`} />
                <div className="relative bg-[#030712] rounded-[10px] p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${activeModule === item.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <div className={`font-bold ${activeModule === item.id ? 'text-white' : 'text-slate-400'}`}>
                      {item.label}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-wider">
                      {item.sub}
                    </div>
                  </div>
                  <div className={`hidden lg:flex items-center justify-center w-6 h-6 rounded border border-white/10 text-[10px] font-mono ${lastKey === item.key ? 'bg-cyan-500 text-black scale-110' : 'text-slate-500'} transition-all`}>
                    {item.key}
                  </div>
                  {activeModule === item.id && (
                    <div className="absolute right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping lg:hidden" />
                  )}
                </div>
              </button>
            ))}

            {/* DECORATIVE TERMINAL WIDGET */}
            <SystemLog />
          </div>

          {/* CENTER: VIEWPORT 3D */}
          <motion.div
            className="lg:col-span-9 relative h-auto lg:h-full lg:overflow-y-auto pb-20 scrollbar-none lg:[perspective:1500px]"
          >
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, rotateX: isMobile ? 0 : 20, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: isMobile ? 0 : -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                rotateX: isMobile ? 0 : mouseY,
                rotateY: isMobile ? 0 : mouseX
              }}
              className="min-h-full"
            >
              {/* --- MODULE: SKILLS --- */}
              {activeModule === MODULES.SKILLS && (
                <div className="grid gap-8">
                  {skillData.map((group, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-3 text-cyan-400 border-b border-cyan-500/20 pb-2">
                        <group.icon className="w-5 h-5" />
                        <h3 className="font-bold tracking-wider">{group.category.toUpperCase()}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {group.skills.map((skill, sIdx) => (
                          <div key={skill.name} className="group relative bg-slate-900/40 border border-white/10 rounded-xl p-4 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all duration-300">
                            <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-600">{skill.level}%</div>
                            <div className="mb-3 p-2 w-fit rounded-lg bg-white/5 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                              {/* Placeholder icon rendering based on name first letter if icon component not mapped */}
                              <span className="font-bold">{skill.name[0]}</span>
                            </div>
                            <div className="font-bold text-slate-200 group-hover:text-white">{skill.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{skill.desc}</div>
                            <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div style={{ width: `${skill.level}%` }} className="h-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-all duration-1000" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* --- MODULE: EXPERIENCE --- */}
              {activeModule === MODULES.EXPERIENCE && (
                <div className="space-y-6 max-w-4xl">
                  {experienceData.map((job, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-slate-800 hover:border-cyan-500/50 transition-colors duration-300 group">
                      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_cyan] transition-all" />
                      <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6 backdrop-blur-sm group-hover:border-cyan-500/30 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{job.role}</h3>
                            <div className="text-cyan-500 font-mono text-sm">{job.company}</div>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400 border border-white/5">
                            {job.period}
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{job.desc}</p>
                        <div className="flex gap-2">
                          {job.tech.map((t, i) => (
                            <span key={i} className="text-[10px] uppercase font-bold text-slate-500 px-2 py-1 rounded bg-slate-950 border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* --- MODULE: EDUCATION --- */}
              {activeModule === MODULES.EDUCATION && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {educationData.map((edu, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 rounded-2xl p-8 hover:border-purple-500/40 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all" />
                      <edu.icon className="w-10 h-10 text-slate-700 group-hover:text-purple-400 mb-6 transition-colors" />
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-200">{edu.degree}</h3>
                      <p className="text-purple-400 font-mono mb-4">{edu.school}</p>
                      <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4 text-slate-400">
                        <span>{edu.year}</span>
                        <span className="text-white font-bold">{edu.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          </motion.div>

        </div >
      </div >

      {/* Footer fixed at bottom or normal flow? Putting it in flow for mobile scrolling */}
      < Footer />
    </div >
  );
};

export default SkillsPage;