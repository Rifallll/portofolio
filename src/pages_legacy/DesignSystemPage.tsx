"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import InfoCard from "@/components/InfoCard"; // Import the new InfoCard component

const DesignSystemPage = () => {
  const designSystemDescription = `I've studied hundreds of design systems over the years, even before they were called design systems.
I wanted to share what I've learned by creating a lean and powerful Figma design system that's
intuitive, accessible, and beautiful.

This system focuses on consistency, reusability, and scalability, ensuring a cohesive user experience across all platforms. It includes a comprehensive set of components, guidelines, and best practices for efficient and effective design and development.`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-xl flex items-center justify-center">
        <InfoCard
          title="My Design System"
          description={designSystemDescription}
          stripeColor="hsl(var(--primary))"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mt-8">
              <a href="#" target="_blank" rel="noopener noreferrer"> {/* Placeholder link */}
                <span>Explore the System</span>
                <ExternalLink className="h-5 w-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </InfoCard>
      </main>
      <Footer />
    </div>
  );
};

export default DesignSystemPage;