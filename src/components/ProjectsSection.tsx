import React, { useState, useCallback, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const allProjectsData = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and secure payments.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["TypeScript", "React", "Socket.io", "PostgreSQL", "Prisma"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio website built with privacy-first principles. No tracking, no analytics, just clean code and great UX.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Social Media Dashboard",
    description:
      "An analytics dashboard for social media performance, built with React and Recharts for data visualization.",
    technologies: ["React", "Chart.js", "Tailwind CSS", "API Integration"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Recipe Finder App",
    description:
      "A web application that allows users to search for recipes based on ingredients and dietary preferences.",
    technologies: ["React", "API Fetch", "CSS Modules"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Real-time Chat Application",
    description:
      "A real-time chat application with user authentication and private messaging capabilities.",
    technologies: ["Node.js", "Express", "Socket.io", "React", "MongoDB"],
    liveDemoLink: "#",
    codeLink: "#",
  },
];

const ProjectsSection = () => {
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
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        <p className="text-lg text-gray-600 mb-12">
          A selection of my best work showcasing different technologies and
          approaches
        </p>

        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-4 items-stretch">
              {allProjectsData.map((project, index) => (
                <div key={index} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 h-full px-2"> {/* Menambahkan px-2 di sini */}
                  <ProjectCard {...project} />
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
            <span className="sr-only">Previous project</span>
          </Button>
          <Button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Next project</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;