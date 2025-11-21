"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

interface StoryEntryProps {
  id: string;
  title: string;
  description: string;
  imageSrcs: string[];
  imageAlt: string;
  position: "left" | "right"; // Add position prop for timeline layout
  delay?: number;
}

const StoryEntry: React.FC<StoryEntryProps> = ({
  id,
  title,
  description,
  imageSrcs,
  imageAlt,
  position,
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

  const isLeft = position === "left";

  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex justify-center w-full py-12 lg:py-16"
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full z-10" />

      <div className={`flex w-full max-w-screen-lg items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
        {/* Content Card */}
        <div className="w-full md:w-1/2 p-4">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed text-justify">{description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Images */}
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          {imageSrcs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
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
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default StoryEntry;