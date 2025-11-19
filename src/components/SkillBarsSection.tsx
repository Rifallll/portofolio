"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay }}
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col items-center h-full justify-end group"
    >
      <div className="relative w-28 h-72 bg-muted rounded-t-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: `${percentage}%` }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="absolute bottom-0 left-0 w-full rounded-t-lg"
          style={{ backgroundColor: color }}
        ></motion.div>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {percentage}%
        </span>
      </div>
      <p className="mt-4 text-lg font-medium text-foreground text-center group-hover:text-primary transition-colors duration-300">{name}</p>
    </motion.div>
  );
};

const SkillBarsSection = () => {
  const skills = [
    { name: "UI/UX Design", percentage: 90, color: "hsl(180 60% 50%)" }, // Teal
    { name: "Web Dev", percentage: 80, color: "hsl(0 60% 70%)" }, // Light Red/Pink
    { name: "Content Strategy", percentage: 95, color: "hsl(40 100% 60%)" }, // Orange-Yellow (Accent)
    { name: "Social Media Ads", percentage: 85, color: "hsl(220 10% 60%)" }, // Medium Gray
  ];

  return (
    <section id="skill-bars" className="py-20 bg-background"> {/* Changed to bg-background */}
      <div className="container mx-auto px-4 text-center max-w-screen-xl">
        <h2 className="text-4xl font-bold text-primary mb-16">My Skills</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {skills.map((skill, index) => (
            <SkillBar key={index} {...skill} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillBarsSection;