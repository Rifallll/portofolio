import React, { useState, useCallback, useEffect } from "react";
import SkillItem from "./SkillItem";
import { Users, LayoutList, Megaphone, MessageSquareText, Palette, Image, Monitor, Video, Globe, Code, Terminal, Crown, Mic, Lightbulb } from "lucide-react"; // Import ikon baru
import useEmblaCarousel from "embla-carousel-react";

const skillsData = [
  { title: "Social Media Strategy", proficiency: 95, level: "EXPERT", icon: Users },
  { title: "Content Strategy", proficiency: 90, level: "EXPERT", icon: LayoutList },
  { title: "Social Media Ads", proficiency: 85, level: "EXPERT", icon: Megaphone },
  { title: "Public Relations Strategy", proficiency: 80, level: "ADVANCED", icon: MessageSquareText },
  { title: "Canva", proficiency: 95, level: "EXPERT", icon: Palette },
  { title: "Adobe Photoshop", proficiency: 90, level: "EXPERT", icon: Image },
  { title: "UI/UX Design", proficiency: 80, level: "ADVANCED", icon: Monitor },
  { title: "Video Editing", proficiency: 75, level: "ADVANCED", icon: Video },
  { title: "WordPress", proficiency: 70, level: "ADVANCED", icon: Globe },
  { title: "HTML/CSS", proficiency: 75, level: "ADVANCED", icon: Code },
  { title: "Basic Python", proficiency: 60, level: "INTERMEDIATE", icon: Terminal },
  { title: "Leadership", proficiency: 90, level: "EXPERT", icon: Crown },
  { title: "Public Speaking", proficiency: 85, level: "EXPERT", icon: Mic },
  { title: "Team Collaboration", proficiency: 90, level: "EXPERT", icon: Users },
  { title: "Problem Solving", proficiency: 85, level: "EXPERT", icon: Lightbulb },
];

const SkillsSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' });

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 mb-12">
          The skills and tools I use to bring ideas to life
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