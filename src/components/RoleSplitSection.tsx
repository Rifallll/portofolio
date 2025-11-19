"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ExpertiseItem {
  title: string;
  icon: LucideIcon;
  list: string[];
  percentage: number;
  color: string;
}

const expertiseData: ExpertiseItem[] = [
  {
    title: "Part Designer",
    icon: Palette,
    list: [
      "UI/UX Design",
      "User Research",
      "Wireframing & Prototyping",
      "Graphic Design",
      "Video Editing",
    ],
    percentage: 60,
    color: "hsl(var(--primary))", // Purple
  },
  {
    title: "Part Coder",
    icon: Code,
    list: [
      "Front-end development",
      "HTML / CSS",
      "JavaScript (Basic)",
      "Web Development",
      "Basic Python",
      "Fundamental SQL",
      "Web Scraping",
    ],
    percentage: 40,
    color: "hsl(var(--foreground))", // Black
  },
];

const RoleSplitSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Calculate conic gradient stops
  let currentDegree = 0;
  const conicGradientStops = expertiseData
    .map((item) => {
      const start = currentDegree;
      currentDegree += (item.percentage / 100) * 360;
      const end = currentDegree;
      return `${item.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  const DesignerIcon = expertiseData[0].icon;
  const CoderIcon = expertiseData[1].icon;

  return (
    <section id="role-split" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-4xl font-bold text-foreground text-center mb-12">My Dual Expertise</h2>

        {/* Pie Chart and Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Left Card: Part Designer */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-sm"
          >
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-primary">{expertiseData[0].title}</CardTitle>
                <DesignerIcon className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent className="flex-grow">
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="list-disc list-inside text-base text-muted-foreground space-y-1"
                >
                  {expertiseData[0].list.map((item, itemIndex) => (
                    <motion.li key={itemIndex} variants={listItemVariants}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex justify-center items-center w-full lg:w-auto"
          >
            <div className="relative w-64 h-64 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-lg shadow-inner">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${conicGradientStops})`,
                }}
              ></div>
              <div className="absolute w-52 h-52 rounded-full bg-background z-10 flex flex-col items-center justify-center border-2 border-border">
                <span className="text-primary text-xl font-bold text-center">60% Designer</span>
                <span className="text-foreground text-xl font-bold text-center">40% Coder</span>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Part Coder */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-sm"
          >
            <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-foreground">{expertiseData[1].title}</CardTitle>
                <CoderIcon className="h-6 w-6 text-foreground" />
              </CardHeader>
              <CardContent className="flex-grow">
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="list-disc list-inside text-base text-muted-foreground space-y-1"
                >
                  {expertiseData[1].list.map((item, itemIndex) => (
                    <motion.li key={itemIndex} variants={listItemVariants}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoleSplitSection;