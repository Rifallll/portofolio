import React from "react";
import SkillItem from "./SkillItem";

const skillsData = [
  { title: "React & TypeScript", proficiency: 95, level: "EXPERT" },
  { title: "Node.js & Express", proficiency: 88, level: "EXPERT" },
  { title: "UI/UX Design", proficiency: 85, level: "EXPERT" },
  { title: "Database Design", proficiency: 82, level: "EXPERT" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 mb-12">
          Technologies and tools I use to bring ideas to life
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((skill, index) => (
            <SkillItem key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;