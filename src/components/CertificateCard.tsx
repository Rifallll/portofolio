import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Share2, MessageSquare, Terminal } from "lucide-react";

interface CertificateRowProps {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  index?: number;
  category?: string;
}

const CertificateCard = React.forwardRef<HTMLDivElement, CertificateRowProps>(({
  title,
  issuer,
  date,
  link,
  category = "Archives",
}, ref) => {
  const getCategoryStyles = () => {
    if (category.includes("Tech")) return { color: "text-blue-400", bg: "bg-blue-500/10", icon: Cpu };
    if (category.includes("Media")) return { color: "text-purple-400", bg: "bg-purple-500/10", icon: Share2 };
    if (category.includes("Comm")) return { color: "text-emerald-400", bg: "bg-emerald-500/10", icon: MessageSquare };
    return { color: "text-slate-400", bg: "bg-white/5", icon: Terminal };
  };

  const style = getCategoryStyles();
  const CategoryIcon = style.icon;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="grid grid-cols-[80px_1fr_200px_140px] items-center gap-6 py-4 px-6 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group">

        {/* Column 1: Year (Fixed 80px) */}
        <div className="flex items-center">
          <span className="font-mono text-[11px] font-black text-slate-600 group-hover:text-cyan-400 transition-colors">
            {date}
          </span>
        </div>

        {/* Column 2: Title (Flexible) */}
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-md ${style.bg} border border-white/5`}>
            <CategoryIcon className={`w-3.5 h-3.5 ${style.color}`} />
          </div>
          <h3 className="text-[13px] md:text-sm font-black text-white group-hover:text-white transition-colors tracking-tight">
            {title}
          </h3>
        </div>

        {/* Column 3: Issuer (Fixed 200px) */}
        <div className="hidden md:block">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors">
            {issuer}
          </span>
        </div>

        {/* Column 4: Action (Fixed 140px) */}
        <div className="flex justify-end">
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-black text-white/40 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 uppercase tracking-widest"
            >
              <span>Verify</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </motion.a>
          )}
        </div>

        {/* Hover Texture: Subtle Scanline */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
});

CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
