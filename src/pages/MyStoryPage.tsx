"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import InfoCard from "@/components/InfoCard"; // Import the new InfoCard component

const MyStoryPage = () => {
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

  const myStoryDescription = `My journey began with a deep interest in Computer Engineering, which quickly evolved into a passion for Digital Media Strategy and Web Development. I've honed my skills in crafting engaging content strategies, managing social media campaigns, and building responsive web applications. From boosting audience engagement by 150% to developing over 20 websites, I thrive on creating impactful digital solutions.

I believe in continuous learning and adapting to new technologies. My goal is to leverage my diverse skill set to create innovative and user-centric digital experiences that make a real impact.

Whether it's through strategic planning, creative design, or robust coding, I am committed to excellence and always eager to take on new challenges.`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-xl flex items-center justify-center">
        <InfoCard
          title="My Journey"
          description={myStoryDescription}
          stripeColor="hsl(var(--primary))"
        />
      </main>
      <Footer />
    </div>
  );
};

export default MyStoryPage;