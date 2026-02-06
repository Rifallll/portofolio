import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Share2, MessageSquare, Terminal, X } from "lucide-react";

interface CertificateRowProps {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  index?: number;
  category?: string;
  image_url?: string;
}

const CertificateCard = React.forwardRef<HTMLDivElement, CertificateRowProps>(({
  title,
  issuer,
  date,
  link,
  category = "Archives",
  image_url,
}, ref) => {
  const getCategoryStyles = () => {
    if (category.includes("Tech")) return { color: "text-blue-400", bg: "bg-blue-500/10", icon: Cpu };
    if (category.includes("Media")) return { color: "text-purple-400", bg: "bg-purple-500/10", icon: Share2 };
    if (category.includes("Comm")) return { color: "text-emerald-400", bg: "bg-emerald-500/10", icon: MessageSquare };
    return { color: "text-slate-400", bg: "bg-white/5", icon: Terminal };
  };

  const style = getCategoryStyles();
  const CategoryIcon = style.icon;

  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  // Lock Body Scroll when Lightbox is Open
  React.useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  // Determine what action to take (Image View vs External Link)
  const ActionButton = () => {
    if (image_url) {
      return (
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-black text-white/40 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 uppercase tracking-widest"
        >
          <span>View</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </button>
      )
    }

    if (link) {
      return (
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
      )
    }

    return null;
  };

  return (
    <>
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="flex flex-col h-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 group">

          {/* 1. Standardized Image Frame (Fixed Aspect Ratio) */}
          <div
            onClick={() => image_url && setIsLightboxOpen(true)}
            className={`relative w-full aspect-[16/10] bg-black/50 border-b border-white/5 overflow-hidden group-inner ${image_url ? 'cursor-pointer' : ''}`}
          >
            {image_url ? (
              <>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <img
                  src={image_url}
                  alt={title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-4 py-2 bg-black/80 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">Expand</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-20">
                <CategoryIcon className="w-8 h-8 text-white" />
                <span className="text-[10px] uppercase tracking-widest font-bold">No Preview</span>
              </div>
            )}
          </div>

          {/* 2. Structured Information */}
          <div className="flex-1 p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                <span>{date}</span>
                <span className={`px-2 py-1 rounded ${style.bg} ${style.color} border border-white/5`}>{category}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2" title={title}>
                {title}
              </h3>
              <p className="mt-2 text-xs font-medium text-slate-400 uppercase tracking-wider">{issuer}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/20">
                <CategoryIcon className="w-4 h-4" />
                <span className="text-[10px] uppercase font-black tracking-widest">Verified</span>
              </div>
              <ActionButton />
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isLightboxOpen && image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[9999] bg-black flex flex-col md:flex-row animate-in fade-in duration-200"
          >
            {/* 1. Image Canvas (Left/Top) - 80% Width */}
            <div
              className="flex-1 h-full w-full bg-black relative flex items-center justify-center pt-16 pb-2 px-2 md:pt-32 md:pb-12 md:px-12 overflow-hidden"
              onClick={() => setIsLightboxOpen(false)}
            >
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={image_url}
                alt={title}
                className="w-full h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* 2. Info Sidebar (Right) - Luxury Transparent */}
            <div className="w-full h-auto md:w-96 md:h-full border-l border-white/5 flex flex-col pt-0 pb-8 px-6 md:pt-32 md:pb-12 md:px-10 shrink-0 z-50 overflow-y-auto backdrop-blur-[2px] bg-gradient-to-t from-black via-black/80 to-transparent md:bg-none">

              <div className="flex-1 flex flex-col justify-start md:justify-center animate-in slide-in-from-right-4 duration-500 fade-in mt-4 md:mt-0">

                {/* Mobile Header: Date + Close */}
                <div className="flex items-start justify-between mb-2 md:mb-8">
                  <span className="inline-block px-3 py-1 rounded-full border border-amber-500/20 bg-amber-950/20 text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] backdrop-blur-md">
                    {date}
                  </span>

                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="group relative p-2 -mr-2 -mt-2 text-white/50 hover:text-white transition-colors"
                  >
                    <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300" />
                    <X className="w-8 h-8 font-light relative z-10" strokeWidth={1} />
                  </button>
                </div>

                <div className="mb-4 md:mb-6">
                  <h2 className="text-2xl md:text-4xl font-light text-white leading-tight mb-2 tracking-tight drop-shadow-lg line-clamp-3">
                    {title}
                  </h2>
                </div>

                <div className="group relative p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] transition-colors duration-500">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 md:p-3 rounded-xl ${style.bg} ring-1 ring-inset ring-white/10`}>
                      <CategoryIcon className={`w-5 h-5 md:w-6 md:h-6 ${style.color}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Issued By Authority</span>
                      <span className="text-base md:text-lg font-medium text-white tracking-wide">{issuer}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-dashed border-white/10 flex flex-col gap-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    Verified Credential
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600 break-all select-all hover:text-amber-500/50 transition-colors cursor-text">
                    ID: {title.substring(0, 4).toUpperCase()}-{Math.random().toString(36).substring(7).toUpperCase()}-{date.split(',')[0]}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
});

CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
