"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code } from "lucide-react";
import { motion } from "framer-motion";

const RoleSplitSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="role-split" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-4xl font-bold text-foreground text-center mb-12">My Dual Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Part Designer */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-2xl font-bold text-primary">Part Designer</CardTitle>
                <Palette className="h-7 w-7 text-primary" />
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
                  <li>UI Design</li>
                  <li>UX Design</li>
                  <li>Design Systems</li>
                  <li>Interaction Design</li>
                  <li>"Making it pop"</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-64 h-64 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-lg shadow-inner">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    hsl(var(--primary)) 0% 60%,
                    hsl(var(--foreground)) 60% 100%
                  )`,
                }}
              ></div>
              <div className="absolute w-52 h-52 rounded-full bg-background z-10 flex flex-col items-center justify-center border-2 border-border">
                <span className="text-primary text-xl font-bold">60% Designer</span>
                <span className="text-foreground text-xl font-bold">40% Coder</span>
              </div>
            </div>
          </motion.div>

          {/* Part Coder */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Part Coder</CardTitle>
                <Code className="h-7 w-7 text-foreground" />
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
                  <li>Front-end development</li>
                  <li>HTML / CSS</li>
                  <li>JavaScript (kinda)</li>
                  <li>Swearing at my computer</li>
                  <li>Eating pizza</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoleSplitSection;