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
      className="mb-8 py-4" // Menghapus bg-secondary, shadow-md, border, dan p-6. Menambahkan py-4 untuk padding vertikal.
    >
      <div className="pb-4 mb-4 border-b border-border"> {/* Menambahkan border-b untuk pemisah judul */}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="text-lg text-muted-foreground leading-relaxed text-justify">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </motion.div>
  );
};

export default StorySubsection;