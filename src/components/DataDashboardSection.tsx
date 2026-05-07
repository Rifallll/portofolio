"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { BarChart2, TrendingUp, Users, DollarSign, Activity } from "lucide-react";

// --- SAMPLE DATA ---
const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 38000, target: 40000 },
  { month: "Mar", revenue: 51000, target: 45000 },
  { month: "Apr", revenue: 47000, target: 45000 },
  { month: "May", revenue: 63000, target: 50000 },
  { month: "Jun", revenue: 58000, target: 50000 },
  { month: "Jul", revenue: 71000, target: 55000 },
  { month: "Aug", revenue: 69000, target: 55000 },
  { month: "Sep", revenue: 82000, target: 60000 },
  { month: "Oct", revenue: 78000, target: 60000 },
  { month: "Nov", revenue: 95000, target: 65000 },
  { month: "Dec", revenue: 103000, target: 65000 },
];

const categoryData = [
  { name: "Electronics", value: 38, fill: "#06b6d4" },
  { name: "Fashion", value: 27, fill: "#818cf8" },
  { name: "Food & Bev", value: 18, fill: "#34d399" },
  { name: "Home", value: 10, fill: "#f59e0b" },
  { name: "Others", value: 7, fill: "#64748b" },
];

const churnData = [
  { month: "Jan", churn: 8.2, retained: 91.8 },
  { month: "Feb", churn: 7.8, retained: 92.2 },
  { month: "Mar", churn: 9.1, retained: 90.9 },
  { month: "Apr", churn: 6.5, retained: 93.5 },
  { month: "May", churn: 5.9, retained: 94.1 },
  { month: "Jun", churn: 4.2, retained: 95.8 },
];

const KPIS = [
  { label: "Total Revenue", value: "Rp 797M", change: "+23.4%", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Active Users", value: "12,489", change: "+8.1%", icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { label: "Avg Order Value", value: "Rp 63.8K", change: "+5.7%", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { label: "Churn Rate", value: "4.2%", change: "-3.9%", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
];

type ChartView = "revenue" | "category" | "churn";

const customTooltipStyle = {
  backgroundColor: "#0d1520",
  border: "1px solid rgba(6,182,212,0.2)",
  borderRadius: "12px",
  color: "#e2e8f0",
  fontSize: "12px",
};

export default function DataDashboardSection() {
  const [activeChart, setActiveChart] = useState<ChartView>("revenue");

  return (
    <section id="dashboard" className="py-32 relative overflow-hidden bg-[#020617]">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
            <BarChart2 className="w-4 h-4" />
            <span>Interactive Dashboard</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            Live{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Data Dashboard
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Sample analysis output — interactive visualizations built from a real e-commerce dataset.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {KPIS.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-2xl border ${kpi.bg} hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between mb-3">
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                <span className={`text-xs font-bold ${kpi.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-black text-white">{kpi.value}</p>
              <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart Selector */}
        <div className="flex gap-3 mb-6">
          {(["revenue", "category", "churn"] as ChartView[]).map((chart) => (
            <button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeChart === chart
                  ? "bg-cyan-500 border-cyan-500 text-black"
                  : "border-white/10 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              {chart === "revenue" ? "📈 Revenue Trend" : chart === "category" ? "🥧 Category Mix" : "📉 Churn Rate"}
            </button>
          ))}
        </div>

        {/* Charts Panel */}
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-10"
        >
          {activeChart === "revenue" && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Revenue vs Target 2024</h3>
                  <p className="text-slate-500 text-sm mt-1">Monthly revenue performance against annual targets</p>
                </div>
                <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">SQL + Pandas</span>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}K`} />
                  <Tooltip contentStyle={customTooltipStyle} formatter={(v: number) => [`Rp ${v.toLocaleString()}`, ""]} />
                  <Area type="monotone" dataKey="target" stroke="#818cf8" strokeWidth={2} fill="url(#colorTarget)" name="Target" />
                  <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} fill="url(#colorRevenue)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                <p className="text-[11px] font-black text-cyan-500 uppercase tracking-widest mb-1">💡 Insight</p>
                <p className="text-sm text-slate-400">Revenue consistently exceeded targets from Q2, peaking in December at +58% above baseline. The Sep–Dec surge reveals a predictable seasonal effect — a key input for 2025 planning and inventory allocation.</p>
              </div>
            </>
          )}

          {activeChart === "category" && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Revenue Mix by Category</h3>
                  <p className="text-slate-500 text-sm mt-1">Revenue share breakdown by product category</p>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">GROUP BY SQL</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={3} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={customTooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                    <Legend formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 min-w-[200px]">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.fill }} />
                        <span className="text-sm text-slate-400">{cat.name}</span>
                      </div>
                      <span className="font-black text-white">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                <p className="text-[11px] font-black text-purple-400 uppercase tracking-widest mb-1">💡 Insight</p>
                <p className="text-sm text-slate-400">Electronics dominates at 38% of revenue. Recommendation: increase Electronics inventory in Q4 and run cross-sell bundling campaigns with Fashion (27%) to capture higher combined basket value.</p>
              </div>
            </>
          )}

          {activeChart === "churn" && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Customer Churn Rate Trend</h3>
                  <p className="text-slate-500 text-sm mt-1">Post-model implementation: churn reduction tracking</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">Scikit-learn + SQL</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={churnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={customTooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
                  <Bar dataKey="retained" name="Retained" stackId="a" fill="#34d399" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="churn" name="Churn" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  <Legend formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-1">💡 Insight</p>
                <p className="text-sm text-slate-400">After deploying the churn prediction model (Feb), churn rate dropped from 8.2% → 4.2% over 5 months — a 49% reduction. Early intervention via email and retention promos proved effective for high-risk customer segments.</p>
              </div>
            </>
          )}
        </motion.div>

        {/* Bottom note */}
        <p className="text-center text-[11px] text-slate-600 mt-6 font-mono">
          * Visualizations use synthetic data modeled on public Kaggle datasets. Tools: Python (Pandas, Matplotlib), SQL, Recharts.
        </p>
      </div>
    </section>
  );
}
