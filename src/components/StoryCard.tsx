"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  delay: number;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border flex flex-col h-full">
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-foreground text-left">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow text-left">
          <p className="text-base text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StoryCard;