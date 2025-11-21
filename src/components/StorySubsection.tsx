"use client";

import React from "react";
import { motion } from "framer-motion";
// Menghapus import Card, CardContent, CardHeader, CardTitle

interface StorySubsectionProps {
  title: string;
  content: string;
  delay?: number; // Optional delay for animation
}

const StorySubsection: React.FC<StorySubsectionProps> = ({ title, content, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="mb-8" // Menghapus py-4 dari sini
    >
      <div className="pb-2 mb-2 border-b border-border"> {/* Mengurangi pb-4 dan mb-4 menjadi pb-2 dan mb-2 */}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      {/* Menghapus kelas prose dari sini, biarkan parent StoryDetailPage yang mengelola */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </motion.div>
  );
};

export default StorySubsection;