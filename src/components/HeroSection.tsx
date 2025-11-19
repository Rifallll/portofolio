"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ResumeModal from "./ResumeModal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import ScrollDownIndicator from "./ScrollDownIndicator";

const HeroSection = () => {
  const scrollToSection = useSmoothScroll();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left pt-24 relative overflow-hidden bg-gradient-to-br from-background to-secondary"
    >
      {/* Animated background elements - more of them with varied animations */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_6s_ease-in-out_infinite] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_8s_ease-in-out_infinite_reverse] z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary-foreground/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_7s_ease-in-out_infinite] z-0"></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-primary/15 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-[float_5s_ease-in-out_infinite_reverse] z-0"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-accent/15 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-[float_9s_ease-in-out_infinite] z-0"></div>
      <div className="absolute top-1/5 left-1/5 w-28 h-28 bg-secondary-foreground/15 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-[float_7s_ease-in-out_infinite_reverse] z-0"></div>
      <div className="absolute bottom-1/5 right-1/5 w-36 h-36 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_6s_ease-in-out_infinite] z-0"></div>


      {/* Konten teks dan tombol */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center lg:justify-between max-w-6xl h-full lg:gap-x-24">
        <div className="flex flex-col items-center lg:items-start lg:w-[60%] mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-snug">
            Hi, I'm <span className="text-primary">Rifal Azhar Permana</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl">
            A passionate Web Developer dedicated to building responsive, high-performance, and user-friendly web applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              View My Work
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
          </div>
        </div>

        {/* Gambar di sebelah kanan */}
        <div className="lg:w-[40%] flex justify-center lg:justify-end lg:items-end h-full">
          <img
            src="/p.png"
            alt="Rifal Azhar Permana"
            className="max-w-full h-auto lg:max-w-md xl:max-w-lg object-contain"
          />
        </div>
      </div>
      <ScrollDownIndicator targetSectionId="about" />
    </section>
  );
};

export default HeroSection;