import React from "react";
import SkillItem from "./SkillItem";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { ArrowRight, Code, Server, Palette, Database } from "lucide-react"; // Import specific icons

const skillsData = [
  { title: "React & TypeScript", proficiency: 95, level: "EXPERT", icon: Code }, // Add icon
  { title: "Node.js & Express", proficiency: 88, level: "EXPERT", icon: Server }, // Add icon
  { title: "UI/UX Design", proficiency: 85, level: "EXPERT", icon: Palette }, // Add icon
  { title: "Database Design", proficiency: 82, level: "EXPERT", icon: Database }, // Add icon
];

const SkillsSection = () => {
  const scrollToSection = useSmoothScroll();

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 mb-12">
          Technologies and tools I use to bring ideas to life
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {skillsData.map((skill, index) => (
            <SkillItem key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;