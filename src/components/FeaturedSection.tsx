"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedSection = () => {
  return (
    <section id="featured" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Column: Text */}
          <div className="md:w-1/2 text-left">
            <div className="text-6xl font-extrabold text-primary mb-4">40%</div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Featured here & there</h3>
            <p className="text-lg text-muted-foreground mb-6">
              I've been lucky enough to have my work featured in books, magazines and websites around the world.
              I've also spoken at various design events and enjoy sharing my love of design on social media.
            </p>
            <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0 text-lg">
              <Link to="/projects">View featured work</Link>
            </Button>
          </div>

          {/* Right Column: Images */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-auto">
              <img
                src="/public/magazine1.png" // Placeholder for magazine image 1
                alt="Magazine cover 1"
                className="w-full h-auto rounded-lg shadow-xl transform rotate-3 translate-x-4 -translate-y-4"
              />
              <img
                src="/public/magazine2.png" // Placeholder for magazine image 2
                alt="Magazine cover 2"
                className="absolute top-0 left-0 w-full h-auto rounded-lg shadow-xl transform -rotate-6 -translate-x-4 translate-y-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;