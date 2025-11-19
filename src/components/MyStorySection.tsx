"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MyStorySection = () => {
  return (
    <section id="my-story" className="py-20 bg-secondary"> {/* Changed from bg-background to bg-secondary */}
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-md h-auto rounded-lg shadow-2xl border border-border overflow-hidden">
              <img
                src="/public/desk-setup.png" // Placeholder for desk setup image
                alt="Desk Setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-primary/50">
                <img
                  src="/profile-image-new.jpg" // Your profile image
                  alt="Rifal Azhar Permana"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">My story</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Learn a little bit more about me, how I got into design, and how I built my career as a product
              designer. I've included key things I've learned, book recommendations, and even some sneak peeks of
              the first websites I created.
            </p>
            <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0 text-lg flex items-center space-x-2">
              <Link to="/my-story-page"> {/* Placeholder link */}
                <span>Read my story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MyStorySection;