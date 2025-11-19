"use client";

import React from "react";
import { motion } from "framer-motion"; // Assuming framer-motion is available or will be added
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutHeroSection = () => {
  return (
    <section id="about-hero" className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-background to-secondary overflow-hidden">
      {/* Subtle background pattern or gradient for elegance */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" stroke="hsl(var(--border))" strokeOpacity="0.2" fill="none"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-screen-xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-foreground leading-tight mb-6">
            About <span className="text-primary">Me</span>.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg lg:max-w-none mx-auto lg:mx-0">
            I'm a passionate Web Developer based in Pandeglang, Indonesia. Since 2020, I've enjoyed turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you'll find me exploring new technologies, reading, or enjoying nature.
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
            <Link to="/contact">
              <span>Let's Connect</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Right Column: Main Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary/30">
            <img
              src="/profile-image-new.jpg" // Use your main profile image
              alt="Rifal Azhar Permana"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle pulsating border effect */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse-slow"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeroSection;