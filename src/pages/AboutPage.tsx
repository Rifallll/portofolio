import React from "react";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import MyJourneySection from "@/components/MyJourneySection";
import WhatIDoSection from "@/components/WhatIDoSection";
import AboutFeatureCards from "@/components/AboutFeatureCards"; // Import the new component
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar />
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionHeader
            title="About Me"
            description="Learn more about my journey and what drives me"
          />
          <div className="mt-12">
            <MyJourneySection />
          </div>
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-primary mb-8">What I Do</h3>
            <WhatIDoSection />
          </div>
          <AboutFeatureCards /> {/* Add the feature cards here */}
        </div>
      </section>
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default AboutPage;