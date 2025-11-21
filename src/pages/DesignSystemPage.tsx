"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DesignSystemPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-xl">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-16 pt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content Section */}
          <motion.div variants={itemVariants} className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight"
              variants={itemVariants}
            >
              My <span className="text-primary">Design System</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-4">
              I've studied hundreds of design systems over the years, even before they were called design systems.
              I wanted to share what I've learned by creating a lean and powerful Figma design system that's
              intuitive, accessible, and beautiful.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
              This system focuses on consistency, reusability, and scalability, ensuring a cohesive user experience across all platforms. It includes a comprehensive set of components, guidelines, and best practices for efficient and effective design and development.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <a href="#" target="_blank" rel="noopener noreferrer"> {/* Placeholder link */}
                  <span>Explore the System</span>
                  <ExternalLink className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div variants={itemVariants} className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/30">
              <img
                src="/design-system-showcase.png"
                alt="Design System Showcase"
                className="w-full h-auto object-cover object-center"
              />
              <div className="absolute inset-0 rounded-3xl border-4 border-primary/50 animate-pulse-slow"></div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DesignSystemPage;