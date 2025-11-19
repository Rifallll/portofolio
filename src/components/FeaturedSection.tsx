"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react"; // Import ArrowRight

const FeaturedSection = () => {
  return (
    <section id="featured" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Column: Text */}
          <div className="md:w-1/2 text-left">
            <div className="text-7xl font-extrabold text-primary mb-4">40%</div>
            <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center space-x-3">
              <Star className="h-8 w-8" />
              <span>Featured Here & There</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              I've been lucky enough to have my work featured in books, magazines and websites around the world.
              I've also spoken at various design events and enjoy sharing my love of design on social media.
            </p>
            <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0 text-lg flex items-center space-x-2">
              <Link to="/projects">
                <span>View Featured Work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right Column: Images */}
          <div className="md:w-1/2 flex justify-center md:justify-end relative min-h-[300px]">
            <div className="relative w-full max-w-md h-auto">
              <img
                src="/public/magazine1.png" // Placeholder for magazine image 1
                alt="Magazine cover 1"
                className="absolute w-[80%] h-auto rounded-lg shadow-2xl transform rotate-6 translate-x-8 -translate-y-8 transition-transform duration-500 hover:rotate-3 hover:translate-x-4 hover:-translate-y-4"
              />
              <img
                src="/public/magazine2.png" // Placeholder for magazine image 2
                alt="Magazine cover 2"
                className="absolute w-[80%] h-auto rounded-lg shadow-2xl transform -rotate-6 -translate-x-8 translate-y-8 transition-transform duration-500 hover:-rotate-3 hover:-translate-x-4 hover:translate-y-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;