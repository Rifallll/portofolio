import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Star } from "lucide-react"; // Added Star for the circular button

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center bg-background text-center pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column: Main Title */}
        <div className="text-left lg:col-span-1">
          <h1 className="text-6xl md:text-7xl font-extrabold text-primary mb-6 leading-tight">
            Dive Into The World Of Anime!
          </h1>
        </div>

        {/* Right Column: Images and Circular Button */}
        <div className="relative flex flex-col items-center justify-center lg:col-span-1">
          {/* Top Right Image Card */}
          <div className="absolute top-0 right-0 w-[280px] h-[320px] bg-card border-4 border-primary rounded-3xl overflow-hidden shadow-xl transform rotate-3 translate-x-8 -translate-y-8">
            <img src="/placeholder.svg" alt="Anime Character 1" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex flex-col space-y-1">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>

          {/* Circular Start Generate Button */}
          <div className="relative w-48 h-48 rounded-full bg-primary flex items-center justify-center text-center text-primary-foreground font-bold text-lg shadow-2xl z-20 mt-20 lg:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm uppercase tracking-widest transform rotate-90 origin-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                Character Generation. Anime Character Generation.
              </span>
            </div>
            <Button variant="ghost" className="relative z-10 w-32 h-32 rounded-full bg-white text-primary flex flex-col items-center justify-center text-center text-base font-bold hover:bg-gray-100">
              <Star className="h-5 w-5 mb-1 text-yellow-500 fill-yellow-500" />
              <span>START</span>
              <span>GENERATE</span>
            </Button>
          </div>

          {/* Bottom Left Image Card */}
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-card border-4 border-primary rounded-3xl overflow-hidden shadow-xl transform -rotate-6 -translate-x-8 translate-y-8">
            <img src="/placeholder.svg" alt="Anime Character 2" className="w-full h-full object-cover" />
            <Button variant="ghost" className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 flex items-center space-x-1 text-xs hover:bg-primary/90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>CREATE MEMES</span>
            </Button>
          </div>

          {/* Smartphone App Memes Card */}
          <div className="absolute bottom-0 right-0 w-[350px] bg-card border-4 border-primary rounded-3xl p-6 shadow-xl transform translate-x-12 translate-y-12 text-left">
            <h3 className="text-lg font-bold text-primary mb-2">SMARTPHONE APP MEMES</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The smartphone application MEMES, where ANIMAGI serves as the core technology behind, is now available in apple app store google pay.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2 px-6 py-2 rounded-full">
              <Download className="h-4 w-4" />
              <span>DOWNLOAD</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;