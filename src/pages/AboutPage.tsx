import React from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar />
      <AboutSection />
    </div>
  );
};

export default AboutPage;