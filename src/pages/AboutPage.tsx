import React from "react";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/AboutHeroSection";
import RoleSplitSection from "@/components/RoleSplitSection";
import RandomFactsSection from "@/components/RandomFactsSection";
import SkillBarsSection from "@/components/SkillBarsSection";
import FeaturedSection from "@/components/FeaturedSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHeroSection />
      <RoleSplitSection />
      <RandomFactsSection />
      <SkillBarsSection />
      <FeaturedSection />
    </div>
  );
};

export default AboutPage;