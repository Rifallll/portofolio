import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import Footer from "@/components/Footer";
import {
  Code2, Database, Palette, Cpu, Globe, Zap,
  Terminal, Layers, Shield, Search, Smartphone, Cloud,
  Orbit, Lock, Server, Laptop, Sparkles, Briefcase, GraduationCap, Award,
  Download, Command
} from "lucide-react";

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
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const messages = ["SYSTEM_CHECK", "CONNECTED", "RENDERING", "ENCRYPTING", "SCANNING"];
    const interval = setInterval(() => {
      const newLog = `> ${messages[Math.floor(Math.random() * messages.length)]} [${Math.floor(Math.random() * 99)}ms]`;
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-white/5 font-mono text-[10px] text-cyan-500/80 overflow-hidden hidden lg:block shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
        <Terminal className="w-3 h-3" /> SYSTEM_LOG
      </div>
      <div className="space-y-1 h-32 overflow-hidden flex flex-col-reverse">
        {logs.map((log, i) => <div key={i} className="truncate opacity-70">{log}</div>)}
      </div>
    </div>
  );
};

const playSfx = () => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silent catch for potential audio context issues
  }
};

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

const skillData = [
  {
    category: "Core Engineering",
    icon: Laptop,
    skills: [
      { name: "React.js", level: 98, icon: "atom", desc: "Advanced Component Patterns" },
      { name: "TypeScript", level: 95, icon: "code", desc: "Type-Safe Architecture" },
      { name: "Next.js", level: 95, icon: "triangle", desc: "Server Actions & SSR" },
      { name: "Tailwind", level: 99, icon: "wind", desc: "Atomic Design Systems" },
    ]
  },
  {
    category: "Creative Dev",
    icon: Sparkles,
    skills: [
      { name: "Three.js", level: 88, icon: "box", desc: "WebGL Experiences" },
      { name: "Framer Motion", level: 92, icon: "move", desc: "Complex Gestures" },
      { name: "GSAP", level: 85, icon: "zap", desc: "High-Perf Animation" },
      { name: "Canvas API", level: 80, icon: "image", desc: "Generative Art" },
    ]
  },
  {
    category: "Backend & Cloud",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90, icon: "hexagon", desc: "Scalable APIs" },
      { name: "PostgreSQL", level: 88, icon: "database", desc: "Relational Data" },
      { name: "Supabase", level: 94, icon: "database-zap", desc: "BaaS Integration" },
      { name: "Docker", level: 82, icon: "container", desc: "Containerization" },
    ]
  },
  {
    category: "AI & Emerging Tech",
    icon: Cpu,
    skills: [
      { name: "OpenAI API", level: 85, icon: "bot", desc: "LLM Integration" },
      { name: "Python", level: 80, icon: "code", desc: "Data Processing" },
      { name: "TensorFlow.js", level: 75, icon: "brain", desc: "Browser AI Models" },
      { name: "Solidity", level: 70, icon: "link", desc: "Smart Contracts" },
    ]
  }
];

const experienceData = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Giant Corp",
    period: "2023 - PRESENT",
    desc: "Leading a team of 10+ developers building the future of e-commerce.",
    tech: ["Next.js", "GraphQL", "AWS"]
  },
  {
    role: "Creative Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
    desc: "Created award-winning immersive websites for Fortune 500 clients.",
    tech: ["WebGL", "Three.js", "GLSL"]
  },
  {
    role: "Full Stack Developer",
    company: "Startup Inc",
    period: "2019 - 2021",
    desc: "Built MVP from scratch and scaled to 100k+ active users.",
    tech: ["React", "Node.js", "Postgres"]
  }
];

const educationData = [
  {
    degree: "B.S. Computer Science",
    school: "University of Technology",
    year: "2019",
    grade: "GPA 3.8/4.0",
    icon: GraduationCap
  },
  {
    degree: "Full Stack Certification",
    school: "Advanced Code Academy",
    year: "2020",
    grade: "Top 1% Graduate",
    icon: Award
  }
];

const SkillsPage = () => {
  const [activeModule, setActiveModule] = useState(MODULES.SKILLS);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const changeModule = React.useCallback((module: string) => {
    if (module !== activeModule) {
      playSfx();
      setActiveModule(module);
    }
  }, [activeModule]);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const xPos = (e.clientX - innerWidth / 2) / 50;
    const yPos = (e.clientY - innerHeight / 2) / 50;
    x.set(xPos);
    y.set(yPos);
  };

  return (
    <div
      className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 overflow-hidden relative font-sans"
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

      <div className="relative z-10 pt-32 pb-10 px-4 md:px-8 container mx-auto h-screen flex flex-col">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-8 border-b border-cyan-500/20 pb-6 relative"
        >
          <div className="absolute bottom-[-1px] left-0 w-32 h-[3px] bg-cyan-500 shadow-[0_0_15px_cyan]" />
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.3em] mb-2">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              SYSTEM_READY // V.3.1.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 uppercase">
              Developer Database
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSfx()}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all group"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              ACCESS_RESUME_CV
            </motion.button>
            <div className="w-48 h-32 relative opacity-80 mix-blend-screen pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(6,182,212,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'cyan', fontSize: 8 }} />
                  <Radar name="Skills" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
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
            className="lg:col-span-9 relative h-full overflow-y-auto pb-20 scrollbar-none"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, rotateX: 20, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ rotateX: mouseY, rotateY: mouseX }}
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

        </div>
      </div>

      {/* Footer fixed at bottom or normal flow? Putting it in flow for mobile scrolling */}
      <Footer />
    </div>
  );
};

export default SkillsPage;