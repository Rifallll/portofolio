import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

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

const INITIAL_PROJECT_COUNT = 3;

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects
    ? allProjectsData
    : allProjectsData.slice(0, INITIAL_PROJECT_COUNT);

  const remainingProjectsCount = allProjectsData.length - INITIAL_PROJECT_COUNT;

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        <p className="text-lg text-gray-600 mb-12">
          A selection of my best work showcasing different technologies and
          approaches
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {remainingProjectsCount > 0 && (
          <div className="mt-12 flex justify-center"> {/* Added flex justify-center here */}
            <Button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="bg-gray-900 text-white hover:bg-gray-700 flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <Eye className="h-5 w-5" />
              <span>
                {showAllProjects
                  ? "Show Less"
                  : `View All Projects (${remainingProjectsCount} more)`}
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;