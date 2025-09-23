import React, { useState, useCallback, useEffect } from "react";
import SkillItem from "./SkillItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code, Server, Palette, Database } from "lucide-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 mb-12">
          Technologies and tools I use to bring ideas to life
        </p>

        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-4 items-stretch">
              {skillsData.map((skill, index) => (
                <div key={index} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 h-full">
                  <SkillItem {...skill} />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Previous skill</span>
          </Button>
          <Button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Next skill</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;