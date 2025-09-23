import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const HeroSection = () => {
  const scrollToSection = useSmoothScroll();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center bg-white text-center pt-20">
      <h1 className="text-7xl md:text-8xl font-extrabold text-gray-900 mb-4">Rifal Azhar Permana</h1>
      <p className="text-3xl md:text-4xl text-gray-700 mb-8">Full Stack Developer</p>
      <p className="text-lg text-gray-600 max-w-3xl mb-12 px-4">
        Passionate developer creating modern web applications with clean code and elegant
        design. I love turning complex problems into simple, beautiful solutions.
      </p>
      <div className="flex space-x-4 justify-center"> {/* Menambahkan justify-center di sini */}
        <Button
          onClick={() => scrollToSection("contact")}
          className="bg-gray-900 text-white hover:bg-gray-700 flex items-center space-x-2 px-8 py-4 text-lg"
        >
          <Mail className="h-5 w-5" />
          <span>Contact Me</span>
        </Button>
        <Button
          onClick={() => scrollToSection("projects")}
          variant="outline"
          className="border-gray-900 text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg"
        >
          View Projects
        </Button>
      </div>
      <button 
        onClick={() => scrollToSection("projects")} 
        className="absolute bottom-8 cursor-pointer"
        aria-label="Scroll to projects section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-500 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;