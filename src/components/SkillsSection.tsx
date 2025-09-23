import React, { useState, useCallback, useEffect } from "react";
import SkillItem from "./SkillItem";
import { Code, Server, Palette, Database } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const skillsData = [
  { title: "React & TypeScript", proficiency: 95, level: "EXPERT", icon: Code },
  { title: "Node.js & Express", proficiency: 88, level: "EXPERT", icon: Server },
  { title: "UI/UX Design", proficiency: 85, level: "EXPERT", icon: Palette },
  { title: "Database Design", proficiency: 82, level: "EXPERT", icon: Database },
  { title: "Git & GitHub", proficiency: 90, level: "EXPERT", icon: Code },
  { title: "Cloud Deployment", proficiency: 75, level: "ADVANCED", icon: Server },
  { title: "Responsive Design", proficiency: 92, level: "EXPERT", icon: Palette },
];

const SkillsSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' });

  return (
    <section id="skills" className="py-20 bg-gray-50"> {/* Mengubah bg-white menjadi bg-gray-50 */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 mb-12">
          Technologies and tools I use to bring ideas to life
        </p>

        <div className="relative mx-auto max-w-6xl">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-4 items-stretch">
              {skillsData.map((skill, index) => (
                <div key={index} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 min-w-0 px-2">
                  <SkillItem {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;