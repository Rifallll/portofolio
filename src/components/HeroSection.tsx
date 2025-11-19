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
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center text-center lg:text-left pt-24 relative overflow-hidden bg-background"
    >
      {/* Konten teks dan tombol */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center lg:justify-between max-w-6xl h-full">
        <div className="flex flex-col items-center lg:items-start lg:w-[55%] mb-12 lg:mb-0"> {/* Lebar kolom teks diubah menjadi 55% */}
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
        <div className="lg:w-[45%] flex justify-center lg:justify-end lg:items-end h-full"> {/* Lebar kolom gambar diubah menjadi 45% */}
          <img
            src="/p.png"
            alt="Rifal Azhar Permana"
            className="max-w-full h-auto lg:max-w-lg xl:max-w-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;