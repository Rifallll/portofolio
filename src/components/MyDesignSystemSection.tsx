"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MyDesignSystemSection = () => {
  return (
    <section id="my-design-system" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-screen-xl text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl mx-auto md:mx-0"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">My design system</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I've studied hundreds of design systems over the years, even before they were called design systems.
            I wanted to share what I've learned by creating a lean and powerful Figma design system that's
            intuitive, accessible, and beautiful.
          </p>
          <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0 text-lg flex items-center space-x-2">
            <Link to="/design-system"> {/* Placeholder link */}
              <span>View the design system</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MyDesignSystemSection;