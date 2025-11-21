"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      className="mb-8" // Margin bottom for spacing between subsections
    >
      <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-muted-foreground leading-relaxed text-justify">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StorySubsection;