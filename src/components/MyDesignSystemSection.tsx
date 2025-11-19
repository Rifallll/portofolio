"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MyDesignSystemSection = () => {
  return (
    <section id="my-design-system" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">My design system</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I've studied hundreds of design systems over the years, even before they were called design systems.
              I wanted to share what I've learned by creating a lean and powerful Figma design system that's
              intuitive, accessible, and beautiful.
            </p>
            <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0 text-lg flex items-center space-x-2">
              <Link to="/design-system">
                <span>View the design system</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right Column: Design System Showcase Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-lg rounded-lg shadow-2xl border border-border overflow-hidden">
              <img
                src="/design-system-showcase.png" // Placeholder image for design system showcase
                alt="Design System Showcase"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MyDesignSystemSection;