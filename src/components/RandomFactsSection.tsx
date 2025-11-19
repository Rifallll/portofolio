"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Sparkles } from "lucide-react"; // Import Sparkles icon
import { motion } from "framer-motion";

const RandomFactsSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="random-facts" className="py-20 bg-background"> {/* Changed from bg-secondary to bg-background */}
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src="/public/yoda.png" // Placeholder for Yoda image - Consider replacing with a relevant image
              alt="Yoda on a monitor"
              className="max-w-full h-auto rounded-lg shadow-2xl border border-border transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Random Facts List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 text-left"
          >
            <h3 className="text-4xl font-bold text-primary mb-8 flex items-center space-x-3">
              <Lightbulb className="h-8 w-8" />
              <span>Random Facts</span>
            </h3>
            <ul className="list-none text-lg text-muted-foreground space-y-4">
              {[
                "I'm slightly addicted to social media.",
                "Gardening is my zen time.",
                "I want to live on Pandora.",
                "I'm a bit of a clean freak.",
                "I love to cook (and eat).",
                "I'm into interior design.",
                "I enjoy creating things.",
                "Yoda is my mentor.",
                "I drink a lot of tea.",
              ].map((fact, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.1 * index + 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex items-start"
                >
                  <Sparkles className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" /> {/* Custom icon */}
                  <span>{fact}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RandomFactsSection;