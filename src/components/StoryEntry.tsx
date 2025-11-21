"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

interface StoryEntryProps {
  title: string;
  description: string;
  imageSrcs: string[]; // Array untuk beberapa gambar
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
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay, ease: "easeOut" } },
  };

  const imageItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full"
    >
      <Card className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border">
        <CardHeader className="text-center md:text-left pb-4">
          <CardTitle className="text-3xl font-bold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-left">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{description}</p>

          {imageSrcs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {imageSrcs.map((src, idx) => (
                <motion.div
                  key={idx}
                  variants={imageItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: delay + 0.2 + idx * 0.1 }}
                >
                  <img
                    src={src}
                    alt={`${imageAlt} ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-md shadow-md border border-border transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StoryEntry;