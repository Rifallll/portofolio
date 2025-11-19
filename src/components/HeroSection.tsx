"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ResumeModal from "./ResumeModal";
import { Link } from "react-router-dom";
import ScrollDownIndicator from "./ScrollDownIndicator";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Animasi berurutan untuk anak-anak
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }, // Mengubah array cubic-bezier menjadi string "easeInOut"
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center pt-24 relative overflow-hidden bg-gradient-to-br from-background to-secondary"
    >
      {/* Large pulsating circle behind the image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[pulse-opacity_4s_ease-in-out_infinite] z-0 lg:w-[800px] lg:h-[800px] lg:right-[-200px]"></div>

      {/* Konten teks dan tombol */}
      <motion.div
        className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center lg:justify-between max-w-6xl h-full lg:gap-x-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center lg:items-center lg:w-[60%] mb-12 lg:mb-0">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 leading-tight"
            variants={itemVariants}
          >
            Hi, I'm <span className="text-primary">Rifal Azhar Permana</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl"
            variants={itemVariants}
          >
            A passionate Web Developer dedicated to building responsive, high-performance, and user-friendly web applications.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center lg:justify-center items-center gap-4"
            variants={itemVariants}
          >
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link to="/projects">View My Work</Link>
            </Button>
            <ResumeModal>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
              <Download className="h-5 w-5" />
                <span>Download CV</span>
              </Button>
            </ResumeModal>
          </motion.div>
        </div>

        {/* Gambar di sebelah kanan */}
        <motion.div
          className="lg:w-[40%] flex justify-center lg:justify-end lg:items-end h-full"
          variants={itemVariants}
        >
          <img
            src="/p.png"
            alt="Rifal Azhar Permana"
            className="max-w-full h-auto lg:max-w-md xl:max-w-lg object-contain"
          />
        </motion.div>
      </motion.div>
      <ScrollDownIndicator targetSectionId="/about" />
    </section>
  );
};

export default HeroSection;