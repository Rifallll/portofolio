"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoryEntryProps {
  title: string;
  description: string;
  imageSrcs: string[]; // Mengubah menjadi array untuk beberapa gambar
  imageAlt: string;
  delay?: number; // Untuk animasi bertahap
}

const StoryEntry: React.FC<StoryEntryProps> = ({
  title,
  description,
  imageSrcs,
  imageAlt,
  delay = 0,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col gap-8 py-12 border-b border-border last:border-b-0" // Tata letak selalu vertikal
    >
      {/* Konten teks */}
      <div className="text-center md:text-left"> {/* Blok teks mengambil lebar penuh */}
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Beberapa gambar di bawah teks */}
      {imageSrcs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {imageSrcs.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${imageAlt} ${idx + 1}`}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)] h-auto rounded-lg shadow-lg object-cover"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StoryEntry;