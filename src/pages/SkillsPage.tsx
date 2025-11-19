import React from "react";
import Navbar from "@/components/Navbar";
import SkillsSection from "@/components/SkillsSection";

const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SkillsSection />
    </div>
  );
};

export default SkillsPage;