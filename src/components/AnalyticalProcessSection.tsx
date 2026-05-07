import React from "react";
import { motion } from "framer-motion";
import { Database, Filter, LineChart, Lightbulb, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "1. Data Extraction",
    desc: "Writing complex SQL queries to extract millions of rows from relational databases (PostgreSQL, MySQL).",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    icon: Filter,
    title: "2. Data Wrangling",
    desc: "Cleaning, handling missing values, and transforming data structures using Python (Pandas & NumPy).",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    icon: LineChart,
    title: "3. Exploratory Analysis",
    desc: "Finding hidden patterns, correlations, and anomalies using statistical methods and Python libraries.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    icon: Lightbulb,
    title: "4. Business Insights",
    desc: "Translating data into actionable business strategies via interactive dashboards (Tableau, Power BI).",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  }
];

const AnalyticalProcessSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#02040a] border-y border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0 hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Methodology</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            My Analytical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pipeline</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            How I transform raw, chaotic data into clear, actionable business strategies that drive revenue and growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className={`h-full glass-card p-6 rounded-3xl border ${step.border} hover:border-cyan-500/50 transition-colors bg-[#080f1a]/80 backdrop-blur-sm z-10 relative`}>
                <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>

              {/* Arrow connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 text-slate-600">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticalProcessSection;
