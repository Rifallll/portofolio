"use client";

import React from "react";
import SectionHeader from "./SectionHeader";

const AboutHeroSection = () => {
  // Placeholder images for the gallery
  const galleryImages = [
    "/public/1.jpeg", // Replace with actual image paths
    "/public/9.jpg",
    "/public/placeholder.svg",
    "/public/placeholder.svg",
    "/public/placeholder.svg",
    "/public/placeholder.svg",
  ];

  return (
    <section id="about-hero" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Column: Text and Gallery */}
          <div className="lg:w-2/3 text-left">
            <h1 className="text-5xl font-extrabold text-foreground mb-4">about.</h1>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a passionate Web Developer based in Pandeglang, Indonesia.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Since 2020, I've enjoyed turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you'll find me exploring new technologies, reading, or enjoying nature.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {galleryImages.map((src, index) => (
                <div key={index} className="w-full h-20 bg-muted rounded-md overflow-hidden shadow-sm border border-border flex items-center justify-center">
                  <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Main Profile Image */}
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <img
              src="/profile-image-new.jpg" // Use your main profile image
              alt="Rifal Azhar Permana"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg border-4 border-primary/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;