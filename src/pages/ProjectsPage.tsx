import React from "react";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar />
      <ProjectsSection />
    </div>
  );
};

export default ProjectsPage;