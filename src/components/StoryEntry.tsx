"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoryEntryProps {
  title: string;
  description: string;
  imageSrcs: string[]; // Array untuk beberapa gambar
  imageAlt: string;
  delay?: number; // Untuk animasi bertahap
  isReversed?: boolean; // Properti baru untuk membalik tata letak
}

const StoryEntry: React.FC<StoryEntryProps> = ({
  title,
  description,
  imageSrcs,
  imageAlt,
  delay = 0,
  isReversed = false,
}) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay, ease: "easeOut" } },
  };

  const textContainerVariants = {
    hidden: { opacity: 0, x: isReversed ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: delay + 0.2, ease: "easeOut" } },
  };

  const imageItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-12 lg:py-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text Content */}
      <motion.div
        variants={textContainerVariants}
        className="lg:w-[48%] text-center lg:text-left p-8 rounded-xl shadow-lg border border-border bg-card"
      >
        <h2 className="text-4xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </motion.div>

      {/* Images */}
      {imageSrcs.length > 0 && (
        <div className="lg:w-[48%] flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            {imageSrcs.map((src, idx) => (
              <motion.div
                key={idx}
                variants={imageItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: delay + 0.4 + idx * 0.1 }}
              >
                <img
                  src={src}
                  alt={`${imageAlt} ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md border border-border transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default StoryEntry;