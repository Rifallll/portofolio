import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ResumeModal from "./ResumeModal";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const HeroSection = () => {
  const scrollToSection = useSmoothScroll();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-12 relative overflow-hidden bg-background"
    >
      {/* Konten teks dan tombol tetap di dalam container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
          Rifal Azhar Permana
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
          A passionate Web Developer crafting engaging and high-performance digital experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
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
    </section>
  );
};

export default HeroSection;