"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoryEntryProps {
  id: string; // Add id for scrolling
  title: string;
  description: string;
  imageSrcs: string[]; // Array untuk beberapa gambar
  imageAlt: string;
  delay?: number; // Untuk animasi bertahap
}

const StoryEntry: React.FC<StoryEntryProps> = ({
  id,
  title,
  description,
  imageSrcs,
  imageAlt,
  delay = 0,
}) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay, ease: "easeOut" } },
  };

  const imageItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id={id} // Add id here
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full py-12 lg:py-16" // Simplified layout
    >
      {/* Text Content */}
      <div className="p-8 rounded-xl"> {/* Removed shadow, border, bg-card */}
        <h2 className="text-4xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">{description}</p>
      </div>

      {/* Images */}
      {imageSrcs.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl"> {/* Adjusted max-w for images */}
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