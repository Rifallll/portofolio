"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Database, TrendingUp, ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DataProject {
  title: string;
  category: string;
  description: string;
  insight: string;
  kpi: { label: string; value: string; color: string }[];
  tools: string[];
  dataset: string;
  repo?: string;
  demo?: string;
  color: string;
  icon: React.ElementType;
}

const DATA_PROJECTS: DataProject[] = [
  {
    title: "E-Commerce Sales Performance Analysis",
    category: "Business Intelligence",
    description:
      "12-month e-commerce sales analysis using SQL & Python to identify seasonal trends, top-performing product categories, and high-value customer segments. Dataset: 99K+ orders from Olist Brazil (Kaggle).",
    insight:
      "Top 3 product categories account for 42% of total revenue. Q4 shows a consistent 31% revenue spike — driven by the 'bed & bath' category. Repeat customers generate 3.1× higher AOV than first-time buyers. Recommendation: concentrate Q4 marketing budget on top 3 categories and implement a loyalty program targeting first-time buyers.",
    kpi: [
      { label: "Orders Analyzed", value: "99K+", color: "text-emerald-400" },
      { label: "Top Categories", value: "42%", color: "text-cyan-400" },
      { label: "Repeat AOV Lift", value: "3.1×", color: "text-blue-400" },
    ],
    tools: ["Python", "Pandas", "SQL", "Matplotlib", "Seaborn"],
    dataset: "Kaggle — Olist Brazilian E-Commerce",
    repo: "https://github.com/Rifallll",
    color: "from-cyan-500/20 to-blue-500/20",
    icon: TrendingUp,
  },
  {
    title: "Telecom Customer Churn Analysis",
    category: "Exploratory Data Analysis",
    description:
      "End-to-end EDA on a telecom customer dataset (7,043 records) to identify key churn drivers. Used SQL for cohort segmentation and Python for statistical analysis and visualization of behavioral patterns.",
    insight:
      "Customers on month-to-month contracts churn at 43% vs 11% on two-year contracts. High monthly charges (> $65) combined with < 12 months tenure is the strongest churn predictor. Recommendation: offer discounted annual contract upgrades to high-risk month-to-month customers in months 3–6.",
    kpi: [
      { label: "Records", value: "7,043", color: "text-purple-400" },
      { label: "Monthly Churn", value: "43%", color: "text-cyan-400" },
      { label: "Annual Churn", value: "11%", color: "text-emerald-400" },
    ],
    tools: ["Python", "Pandas", "SQL", "Seaborn", "Matplotlib"],
    dataset: "Kaggle — Telco Customer Churn (IBM)",
    repo: "https://github.com/Rifallll",
    color: "from-purple-500/20 to-indigo-500/20",
    icon: Database,
  },
  {
    title: "COVID-19 Indonesia Provincial Dashboard",
    category: "Data Visualization",
    description:
      "Interactive visualization of Indonesia's COVID-19 data across 34 provinces using public Ministry of Health data. Covers case trends, vaccination coverage, and cross-variable correlation analysis over a 2-year period.",
    insight:
      "Strong positive correlation (r = 0.73) found between population density and active case rates. Central Java showed a positive anomaly — high density but above-average vaccination coverage — suggesting effective local health policy as a replicable model for other dense provinces.",
    kpi: [
      { label: "Provinces", value: "34", color: "text-cyan-400" },
      { label: "Density Correlation", value: "r=0.73", color: "text-yellow-400" },
      { label: "Data Period", value: "2 Years", color: "text-blue-400" },
    ],
    tools: ["Python", "Plotly", "Tableau", "SQL", "Pandas"],
    dataset: "Ministry of Health Indonesia — Public COVID-19 Data",
    repo: "https://github.com/Rifallll",
    color: "from-blue-500/20 to-teal-500/20",
    icon: BarChart2,
  },
];

export default function DataProjectsSection() {
  return (
    <section id="data-projects" className="py-32 relative overflow-hidden bg-[#030712]">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
              <Database className="w-4 h-4" />
              <span>Data Analytics Projects</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Data{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Case Studies
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Proyek analisis data nyata dengan dataset publik, dilengkapi SQL queries, EDA, visualisasi, dan <strong className="text-white">business insights</strong> yang terukur.
            </p>
          </motion.div>

          <Link href="/projects">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-600 font-black uppercase tracking-widest text-black hover:bg-cyan-500 transition-all flex-shrink-0"
            >
              All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {DATA_PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04]"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              <div className="relative z-10 p-8 md:p-10">
                <div className="grid lg:grid-cols-[1fr_auto] gap-8">
                  {/* Left Content */}
                  <div>
                    {/* Top Row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/10">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        📦 {project.dataset}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 leading-relaxed mb-5 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Insight Box */}
                    <div className="relative mb-6 pl-4 border-l-2 border-cyan-500/50 bg-cyan-500/5 rounded-r-xl py-3 pr-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-cyan-500 mb-1">💡 Key Insight</p>
                      <p className="text-sm text-cyan-100/80 leading-relaxed">{project.insight}</p>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span key={tool} className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-white/5">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Content: KPIs + Links */}
                  <div className="flex flex-col gap-4 lg:items-end">
                    {/* KPI Cards */}
                    <div className="flex lg:flex-col gap-3">
                      {project.kpi.map((k) => (
                        <div key={k.label} className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center min-w-[90px]">
                          <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{k.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all text-sm font-bold text-white"
                        >
                          <Github className="w-4 h-4" /> Repo
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all text-sm font-bold text-cyan-400"
                        >
                          <ExternalLink className="w-4 h-4" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
