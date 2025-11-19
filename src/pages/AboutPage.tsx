import React from "react";
import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/AboutHeroSection";
import MyStorySection from "@/components/MyStorySection";
import RoleSplitSection from "@/components/RoleSplitSection";
import MyDesignSystemSection from "@/components/MyDesignSystemSection";
import RandomFactsSection from "@/components/RandomFactsSection";
import SkillBarsSection from "@/components/SkillBarsSection";
import FeaturedSection from "@/components/FeaturedSection";
import TestimonialsSection from "@/components/TestimonialsSection"; // Import new component
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutHeroSection />
        <MyStorySection />
        <RoleSplitSection />
        <MyDesignSystemSection />
        <RandomFactsSection />
        <SkillBarsSection />
        <FeaturedSection />
        <TestimonialsSection /> {/* Add TestimonialsSection here */}
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;