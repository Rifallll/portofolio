"use client";

import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";

interface StoryChapterProps {
  id: string;
  title: string;
  years?: string;
  points: string[];
  image?: string;
}

const StoryChapter: React.FC<StoryChapterProps> = ({
  id,
  title,
  years,
  points,
  image,
}) => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AccordionItem value={id} className="border-b border-border">
      <AccordionTrigger className="flex justify-between items-center py-4 text-foreground hover:text-primary transition-colors duration-200 text-left">
        <span className="text-xl md:text-2xl font-semibold">
          {title} {years && <span className="text-muted-foreground text-lg md:text-xl font-normal">{years}</span>}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pt-4 pb-6 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {image && (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-60 object-cover rounded-lg shadow-md mb-6 border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          )}
          <ul className="space-y-3">
            {points.map((point, index) => (
              <motion.li key={index} variants={listItemVariants} className="flex items-start text-lg text-muted-foreground">
                <CircleDot className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default StoryChapter;