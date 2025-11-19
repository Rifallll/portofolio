import React from "react";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/AboutHeroSection";
import MyStorySection from "@/components/MyStorySection";
import RoleSplitSection from "@/components/RoleSplitSection";
import MyDesignSystemSection from "@/components/MyDesignSystemSection";
import RandomFactsSection from "@/components/RandomFactsSection";
import SkillBarsSection from "@/components/SkillBarsSection";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer"; // Import Footer component

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow"> {/* Use main to push footer to bottom */}
        <AboutHeroSection />
        <MyStorySection />
        <RoleSplitSection />
        <MyDesignSystemSection />
        <RandomFactsSection />
        <SkillBarsSection />
        <FeaturedSection />
      </main>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default AboutPage;