import React from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection"; // Import new section
import CallToActionSection from "@/components/CallToActionSection"; // Import new section

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar />
      <AboutSection />
      <TestimonialsSection /> {/* Add Testimonials Section */}
      <CallToActionSection /> {/* Add Call to Action Section */}
    </div>
  );
};

export default AboutPage;