"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import Footer from "@/components/Footer";
import {
  Code2, Briefcase, GraduationCap, Award,
  Download, Sparkles, Server, Laptop, Cpu, Terminal
} from "lucide-react";
import { DecryptText } from "@/components/ui/DecryptText";
import { supabase } from "@/lib/supabase";

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

const MODULES = {
  SKILLS: "skills",
  EXPERIENCE: "experience",
  EDUCATION: "education"
};

const radarData = [
  { subject: 'Frontend', A: 98, fullMark: 100 },
  { subject: 'Backend', A: 90, fullMark: 100 },
  { subject: 'DevOps', A: 85, fullMark: 100 },
  { subject: 'Design', A: 92, fullMark: 100 },
  { subject: 'Mobile', A: 85, fullMark: 100 },
  { subject: 'Architecture', A: 88, fullMark: 100 },
];

export default function SkillsPage() {
  const [activeModule, setActiveModule] = useState(MODULES.SKILLS);
  const [experienceData, setExperienceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: exp } = await supabase.from("experience").select("*").order("created_at", { ascending: false });
      if (exp) setExperienceData(exp);
    };
    fetchData();
  }, []);

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
      className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden relative font-sans"
      onMouseMove={handleMouseMove}
    >
      <Scanline />
      <GlowingOrbs />
      <ParticleNetwork />

      <div className="relative z-10 pt-36 lg:pt-40 pb-10 px-4 md:px-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-8 border-b border-cyan-500/20 pb-6 relative"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 uppercase">
              <DecryptText text="Developer Database" speed={60} />
            </h1>
          </div>

        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-3">
            {[
              { id: MODULES.SKILLS, label: "TECH ARSENAL", icon: Code2 },
              { id: MODULES.EXPERIENCE, label: "CAREER LOG", icon: Briefcase },
              { id: MODULES.EDUCATION, label: "CREDENTIALS", icon: GraduationCap },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeModule === item.id ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' : 'bg-slate-900/40 border border-white/10 text-slate-400 hover:bg-slate-800/40'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </div>

          <motion.div className="lg:col-span-9">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ rotateX: mouseY, rotateY: mouseX }}
            >
              {activeModule === MODULES.SKILLS && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Basic Skills Display for Migration */}
                  {["React", "Next.js", "Python", "SQL", "Figma", "Tailwind"].map(skill => (
                    <div key={skill} className="p-6 bg-slate-900/40 border border-white/10 rounded-xl">
                       <h3 className="text-xl font-bold">{skill}</h3>
                       <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 w-[80%]" />
                       </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModule === MODULES.EXPERIENCE && (
                <div className="space-y-6">
                  {experienceData.map((job, idx) => (
                    <div key={idx} className="p-6 bg-slate-900/40 border border-white/5 rounded-xl">
                      <h3 className="text-xl font-bold text-white">{job.role}</h3>
                      <div className="text-cyan-500 font-mono">{job.company}</div>
                      <p className="text-slate-400 text-sm mt-2">{job.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
