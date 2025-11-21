"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Re-import Link
import { Button } from "@/components/ui/button"; // Re-import Button
import { ArrowRight } from "lucide-react"; // Re-import ArrowRight
import { Card, CardContent } from "@/components/ui/card"; // Import Card and CardContent

const MyStorySection = () => {
  return (
    <section id="my-story" className="py-20 bg-background">
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
            <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border rounded-xl overflow-hidden">
              <CardContent className="p-0 relative"> {/* No padding for image */}
                <img
                  src="/desk-setup.png" // Corrected path for desk setup image
                  alt="Desk Setup"
                  className="w-full h-full object-cover rounded-xl" // Apply rounded-xl to image
                />
                <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-primary/50">
                  <img
                    src="/profile-image-new.jpg" // Your profile image
                    alt="Rifal Azhar Permana"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </CardContent>
            </Card>
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
              My journey began with a deep interest in Computer Engineering, which quickly evolved into a passion for Digital Media Strategy and Web Development. I've honed my skills in crafting engaging content strategies, managing social media campaigns, and building responsive web applications. From boosting audience engagement by 150% to developing over 20 websites, I thrive on creating impactful digital solutions.
            </p>
            <Button asChild variant="link" className="text-primary hover:text-primary/80 px-0 text-lg flex items-center space-x-2">
              <Link to="/about"> {/* Currently links to /about. Let me know if you want it to go elsewhere! */}
                <span>View All</span>
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