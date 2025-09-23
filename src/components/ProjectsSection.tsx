import React from "react";
import ProjectCard from "./ProjectCard";

const projectsData = [
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
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        <p className="text-lg text-gray-600 mb-12">
          A selection of my best work showcasing different technologies and
          approaches
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;