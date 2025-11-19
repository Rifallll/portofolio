import React from "react";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/AboutHeroSection";
import MyStorySection from "@/components/MyStorySection"; // Import new component
import RoleSplitSection from "@/components/RoleSplitSection";
import MyDesignSystemSection from "@/components/MyDesignSystemSection"; // Import new component
import RandomFactsSection from "@/components/RandomFactsSection";
import SkillBarsSection from "@/components/SkillBarsSection";
import FeaturedSection from "@/components/FeaturedSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHeroSection />
      <MyStorySection /> {/* Add MyStorySection here */}
      <RoleSplitSection />
      <MyDesignSystemSection /> {/* Add MyDesignSystemSection here */}
      <RandomFactsSection />
      <SkillBarsSection />
      <FeaturedSection />
    </div>
  );
};

export default AboutPage;