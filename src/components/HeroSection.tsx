import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const HeroSection = () => {
  const scrollToSection = useSmoothScroll();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center pt-20"> {/* Menghapus bg-white dan menyesuaikan warna teks */}
      <h1 className="text-7xl md:text-8xl font-extrabold text-white mb-4">John Doe</h1> {/* Mengubah text-gray-900 menjadi text-white */}
      <p className="text-3xl md:text-4xl text-gray-200 mb-8">Full Stack Developer</p> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
      <p className="text-lg text-gray-300 max-w-3xl mb-12 px-4"> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
        Passionate developer creating modern web applications with clean code and elegant
        design. I love turning complex problems into simple, beautiful solutions.
      </p>
      <div className="flex space-x-4">
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
          className="border-gray-300 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg" {/* Menyesuaikan warna border dan teks */}
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
          className="h-8 w-8 text-gray-300 animate-bounce" {/* Mengubah text-gray-500 menjadi text-gray-300 */}
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