import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle dihapus

const Navbar = () => {
  const scrollToSection = useSmoothScroll();
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <button onClick={() => scrollToSection("home")} className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
        Home
      </button>
      <button onClick={() => scrollToSection("skills")} className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
        Skills
      </button>
      <button onClick={() => scrollToSection("projects")} className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
        Projects
      </button>
      <button onClick={() => scrollToSection("about")} className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
        About
      </button>
      <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
        Contact
      </button>
    </>
  );

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">John</div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Toggle navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-8">
                {navLinks}
                <Button className="bg-gray-900 text-white hover:bg-gray-700 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </Button>
                {/* <ThemeToggle /> Dihapus */}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            {navLinks}
            <Button className="bg-gray-900 text-white hover:bg-gray-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </Button>
            {/* <ThemeToggle /> Dihapus */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;