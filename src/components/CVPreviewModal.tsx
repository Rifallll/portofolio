import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CVPreviewModalProps {
    cvUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function CVPreviewModal({ cvUrl, isOpen, onClose }: CVPreviewModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[99999]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 pt-32 md:pt-36 pb-8"
                    >
                        <div className="relative w-full max-w-6xl h-[80vh] bg-gradient-to-br from-[#0d1520] to-[#1a1f2e] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10">

                            {/* Decorative Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                            {/* Header */}
                            <div className="relative h-20 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm z-10 flex items-center justify-between px-8 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
                                    <h2 className="text-white font-bold text-xl tracking-tight">CV Preview</h2>
                                    <span className="text-xs text-cyan-400/60 font-mono">View Only</span>
                                </div>

                                <button
                                    onClick={onClose}
                                    aria-label="Close CV preview"
                                    className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                                >
                                    <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                                    <div className="absolute inset-0 rounded-xl bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors" />
                                </button>
                            </div>

                            {/* PDF Viewer Container */}
                            <div className="relative h-[calc(100%-5rem)] p-6">
                                <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                                    <iframe
                                        src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                                        className="w-full h-full border-0"
                                        title="CV Preview"
                                    />
                                </div>
                            </div>

                            {/* Bottom Watermark */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                                <div className="px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                    <p className="text-white/40 text-xs font-mono tracking-wider">
                                        🔒 Preview Only • No Download Available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
