"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoryEntryProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean; // Untuk menukar posisi gambar dan teks
  delay?: number; // Untuk animasi bertahap
}

const StoryEntry: React.FC<StoryEntryProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  isReversed = false,
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
      className={`flex flex-col md:flex-row items-center gap-12 py-12 border-b border-border last:border-b-0 ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:w-1/2 flex justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default StoryEntry;