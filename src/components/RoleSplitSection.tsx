"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Users, Megaphone, LucideIcon } from "lucide-react"; // Import semua ikon yang dibutuhkan
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
    title: "Social Media Strategy",
    icon: Users,
    list: [
      "Content Strategy Development",
      "Social Media Management",
      "Campaign Planning",
      "Trend & Hashtag Analysis",
      "Performance Analytics (Insights, GA)",
      "Community Engagement",
      "Copywriting & Brand Tone",
    ],
    percentage: 35,
    color: "hsl(var(--primary))", // Purple
  },
  {
    title: "UI/UX & Digital Design",
    icon: Palette,
    list: [
      "UI/UX Design",
      "Wireframing & Prototyping (Figma)",
      "User Research & Usability Testing",
      "Interaction Design",
      "Design Systems",
      "Visual Content Direction",
      "Graphic & Video Editing",
    ],
    percentage: 30,
    color: "hsl(var(--accent))", // Orange-Yellow
  },
  {
    title: "Web Development & Automation",
    icon: Code,
    list: [
      "Front-End Development (HTML/CSS)",
      "Basic Web Development Workflow",
      "Web Scraping (Python)",
      "Basic Python Scripting",
      "SQL Fundamentals",
      "Automation for Reporting",
      "Technical Debugging",
    ],
    percentage: 20,
    color: "hsl(var(--blue-custom))", // Custom Blue
  },
  {
    title: "Communication & Public Relations",
    icon: Megaphone,
    list: [
      "Public Speaking",
      "Effective Communication",
      "Media Relations",
      "Crisis Management",
      "Partnership & Sponsorship Handling",
      "Event Representation",
      "Team Leadership & Coordination",
    ],
    percentage: 15,
    color: "hsl(var(--green-custom))", // Custom Green
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
        staggerChildren: 0.05, // Sedikit lebih cepat untuk 7-8 item
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

  return (
    <section id="role-split" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-4xl font-bold text-foreground text-center mb-12">My Quad Expertise</h2>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex justify-center items-center mb-16"
        >
          <div className="relative w-64 h-64 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-lg shadow-inner">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${conicGradientStops})`,
              }}
            ></div>
            <div className="absolute w-52 h-52 rounded-full bg-background z-10 flex flex-col items-center justify-center border-2 border-border">
              <span className="text-foreground text-xl font-bold text-center">My Quad Expertise</span>
            </div>
          </div>
        </motion.div>

        {/* Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseData.map((expertise, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }} // Animasi berurutan untuk kartu
            >
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-xl font-bold text-foreground">{expertise.title}</CardTitle>
                  <expertise.icon className="h-6 w-6 text-primary" /> {/* Icon color matches segment */}
                </CardHeader>
                <CardContent className="flex-grow">
                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="list-disc list-inside text-base text-muted-foreground space-y-1"
                  >
                    {expertise.list.map((item, itemIndex) => (
                      <motion.li key={itemIndex} variants={listItemVariants}>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleSplitSection;