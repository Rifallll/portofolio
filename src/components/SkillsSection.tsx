import React from "react";
import SkillItem from "./SkillItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const skillsData = [
  { title: "React & TypeScript", proficiency: 95, level: "EXPERT" },
  { title: "Node.js & Express", proficiency: 88, level: "EXPERT" },
  { title: "UI/UX Design", proficiency: 85, level: "EXPERT" },
  { title: "Database Design", proficiency: 82, level: "EXPERT" },
  { title: "Cloud Computing", proficiency: 75, level: "ADVANCED" },
  { title: "DevOps", proficiency: 70, level: "ADVANCED" },
  { title: "Mobile Development", proficiency: 65, level: "INTERMEDIATE" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 mb-12">
          Technologies and tools I use to bring ideas to life
        </p>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {skillsData.map((skill, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1">
                  <SkillItem {...skill} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default SkillsSection;