"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, color }) => {
  return (
    <div className="flex flex-col items-center h-full justify-end">
      <div className="relative w-24 h-64 bg-muted rounded-t-lg overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full rounded-t-lg"
          style={{ height: `${percentage}%`, backgroundColor: color }}
        ></div>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl z-10">
          {percentage}%
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-foreground text-center">{name}</p>
    </div>
  );
};

const SkillBarsSection = () => {
  const skills = [
    { name: "UI Design", percentage: 95, color: "hsl(180 60% 50%)" }, // Teal
    { name: "Design Systems", percentage: 90, color: "hsl(0 60% 70%)" }, // Light Red/Pink
    { name: "Figma", percentage: 95, color: "hsl(40 100% 60%)" }, // Orange-Yellow (Accent)
    { name: "Coding", percentage: 75, color: "hsl(220 10% 60%)" }, // Medium Gray
  ];

  return (
    <section id="skill-bars" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-4xl font-bold text-primary mb-12">My skills</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill, index) => (
            <SkillBar key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillBarsSection;