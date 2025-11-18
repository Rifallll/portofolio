import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
// import ResumeModal from "./ResumeModal"; // Remove ResumeModal import from HeroSection

const HeroSection = () => {
  const scrollToSection = useSmoothScroll();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center bg-background text-center pt-20 relative overflow-hidden">
      {/* Subtle background pattern/texture for sanati feel */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <h1 className="text-7xl md:text-8xl font-extrabold text-primary mb-4 relative z-10">Rifal Azhar Permana</h1>
      <p className="text-3xl md:text-4xl text-foreground mb-8 relative z-10">Web Developer</p>
      <p className="text-lg text-muted-foreground max-w-3xl mb-12 px-4 relative z-10">
        Experienced in building responsive and high-performance web applications using modern technologies. Focused on intuitive user experience and clean code.
      </p>
      <div className="flex space-x-4 justify-center mb-8 relative z-10">
        <Button
          onClick={() => scrollToSection("contact")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2 px-8 py-4 text-lg"
        >
          <Mail className="h-5 w-5" />
          <span>Contact Me</span>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
        >
          <a href="/PORTOFOLIO Rifal Azhar Permana (2025).pdf" target="_blank" rel="noopener noreferrer">
            View Portfolio (PDF)
          </a>
        </Button>
      </div>

      {/* Social Media Icons and Text Link */}
      <div className="flex space-x-6 mb-12 items-center relative z-10">
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-foreground hover:text-primary transition-colors duration-200">
          <Linkedin className="h-7 w-7" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-foreground hover:text-primary transition-colors duration-200">
          <Github className="h-7 w-7" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Kaggle Profile" className="text-foreground hover:text-primary transition-colors duration-200 text-lg font-semibold">
          <span>Kaggle</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-foreground hover:text-primary transition-colors duration-200">
          <Instagram className="h-7 w-7" />
        </a>
      </div>

      <button 
        onClick={() => scrollToSection("projects")} 
        className="absolute bottom-8 cursor-pointer relative z-10"
        aria-label="Scroll to projects section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-muted-foreground animate-bounce"
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