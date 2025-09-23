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
    categories: ["Full-stack", "Web Development"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["TypeScript", "React", "Socket.io", "PostgreSQL", "Prisma"],
    categories: ["Full-stack", "Web Development"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern, responsive portfolio website built with privacy-first principles. No tracking, no analytics, just clean code and great UX.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    categories: ["Frontend", "Web Development", "UI/UX"],
    codeLink: "#",
  },
  {
    title: "Social Media Dashboard",
    description:
      "An analytics dashboard for social media performance, built with React and Recharts for data visualization.",
    technologies: ["React", "Chart.js", "Tailwind CSS", "API Integration"],
    categories: ["Frontend", "Data Visualization"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Recipe Finder App",
    description:
      "A web application that allows users to search for recipes based on ingredients and dietary preferences.",
    technologies: ["React", "API Fetch", "CSS Modules"],
    categories: ["Frontend", "Web Development"],
    liveDemoLink: "#",
    codeLink: "#",
  },
  {
    title: "Real-time Chat Application",
    description:
      "A real-time chat application with user authentication and private messaging capabilities.",
    technologies: ["Node.js", "Express", "Socket.io", "React", "MongoDB"],
    categories: ["Full-stack", "Web Development"],
    liveDemoLink: "#",
    codeLink: "#",
  },
];

const ProjectsSection = () => {
  // Mengubah loop: true menjadi loop: false
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All"); // State untuk kategori aktif

  // Ekstrak kategori unik dari semua proyek
  const allCategories = ["All", ...new Set(allProjectsData.flatMap(project => project.categories))];

  // Proyek yang difilter berdasarkan kategori aktif
  const filteredProjects = activeCategory === "All"
    ? allProjectsData
    : allProjectsData.filter(project => project.categories.includes(activeCategory));

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return; // Pastikan emblaApi sudah siap
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
    // Cleanup event listeners saat komponen unmount atau emblaApi berubah
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-initialize Embla Carousel when filtered projects change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0); // Scroll ke slide pertama saat filter berubah
    }
  }, [filteredProjects, emblaApi]);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        <p className="text-lg text-gray-600 mb-8">
          A selection of my best work showcasing different technologies and approaches
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 rounded-full text-sm md:text-base"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6 items-stretch">
              {filteredProjects.map((project, index) => (
                <div key={index} className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 h-full">
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
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 md:-left-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Previous project</span>
          </Button>
          <Button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 md:-right-8"
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