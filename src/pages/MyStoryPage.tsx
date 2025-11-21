"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

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
          {/* Image Section */}
          <motion.div variants={itemVariants} className="lg:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/30">
              <img
                src="/profile-image-new.jpg"
                alt="Rifal Azhar Permana"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 rounded-3xl border-4 border-primary/50 animate-pulse-slow"></div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div variants={itemVariants} className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight"
              variants={itemVariants}
            >
              My <span className="text-primary">Journey</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-4">
              My journey began with a deep interest in Computer Engineering, which quickly evolved into a passion for Digital Media Strategy and Web Development. I've honed my skills in crafting engaging content strategies, managing social media campaigns, and building responsive web applications. From boosting audience engagement by 150% to developing over 20 websites, I thrive on creating impactful digital solutions.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-4">
              I believe in continuous learning and adapting to new technologies. My goal is to leverage my diverse skill set to create innovative and user-centric digital experiences that make a real impact.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Whether it's through strategic planning, creative design, or robust coding, I am committed to excellence and always eager to take on new challenges.
            </motion.p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MyStoryPage;