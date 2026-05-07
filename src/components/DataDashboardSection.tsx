"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Activity, Users, Globe, Monitor, Terminal } from "lucide-react";
import { supabase } from "@/lib/supabase";

const COLORS = ["#06b6d4", "#818cf8", "#f472b6", "#34d399"];

export default function DataDashboardSection() {
  const [pageViews, setPageViews] = useState<{ date: string; count: number }[]>([]);
  const [browserStats, setBrowserStats] = useState<{ name: string; value: number }[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // 1. Track the visit
    const trackVisit = async () => {
      if (sessionStorage.getItem("tracked_visit")) return; // Only track once per session

      // Simple browser detection
      const userAgent = navigator.userAgent;
      let browser = "Other";
      if (userAgent.includes("Chrome")) browser = "Chrome";
      else if (userAgent.includes("Firefox")) browser = "Firefox";
      else if (userAgent.includes("Safari")) browser = "Safari";
      else if (userAgent.includes("Edge")) browser = "Edge";

      let os = "Other";
      if (userAgent.includes("Win")) os = "Windows";
      else if (userAgent.includes("Mac")) os = "MacOS";
      else if (userAgent.includes("Linux")) os = "Linux";
      else if (userAgent.includes("Android")) os = "Android";
      else if (userAgent.includes("like Mac")) os = "iOS";

      try {
        await supabase.from('page_views').insert([
          { path: window.location.pathname, browser, os }
        ]);
        sessionStorage.setItem("tracked_visit", "true");
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };

    trackVisit();

    // 2. Fetch real-time stats
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from('page_views').select('*');
        if (error || !data) return;

        setTotalVisits(data.length);

        // Group by Date (last 7 days mock if empty)
        const dateMap: Record<string, number> = {};
        const browserMap: Record<string, number> = {};

        data.forEach(view => {
          // Format date as DD MMM
          const date = new Date(view.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
          dateMap[date] = (dateMap[date] || 0) + 1;
          
          const br = view.browser || "Unknown";
          browserMap[br] = (browserMap[br] || 0) + 1;
        });

        const formattedDates = Object.keys(dateMap).map(k => ({ date: k, count: dateMap[k] }));
        setPageViews(formattedDates.length > 0 ? formattedDates : [{ date: "Today", count: 0 }]);

        const formattedBrowsers = Object.keys(browserMap).map(k => ({ name: k, value: browserMap[k] }));
        setBrowserStats(formattedBrowsers.length > 0 ? formattedBrowsers : [{ name: "Awaiting Data", value: 1 }]);
      } catch (err) {
        console.error("Fetch stats error:", err);
      }
    };

    fetchStats();

    // 3. Real-time Subscription
    const subscription = supabase
      .channel('public:page_views')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'page_views' }, payload => {
        setIsTracking(true);
        fetchStats(); // Refetch on new visit
        setTimeout(() => setIsTracking(false), 2000);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Activity className={`w-4 h-4 ${isTracking ? 'text-green-400 animate-pulse' : 'text-cyan-400'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                {isTracking ? 'New Visitor Detected' : 'Live Portfolio Analytics'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Traffic</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-lg">
              Live metrics tracking who is viewing this portfolio right now. Data is stored in Supabase and visualized in real-time.
            </p>
          </motion.div>

          {/* Total Counter Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 border-white/10 min-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Users className="w-4 h-4 text-indigo-400" />
              Total Visitors
            </div>
            <div className="text-5xl font-black text-white">{totalVisits}</div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Chart: Traffic Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 border-white/5"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Visitor Traffic</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Page views over time</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pageViews} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}
                    itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="count" name="Visits" stroke="#06b6d4" strokeWidth={3} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Secondary Chart: Browser Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-6 border-white/5 flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">Browser Usage</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Client distribution</p>
            </div>

            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {browserStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}
                    itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {browserStats.map((stat, i) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-[11px] font-bold text-slate-300">{stat.name}</span>
                  <span className="text-[11px] text-slate-500 ml-auto">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
