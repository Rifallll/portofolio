import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ResumeModal from "./ResumeModal"; // Import ResumeModal

const Navbar = () => {
  const scrollToSection = useSmoothScroll();
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary font-medium transition-colors duration-200">
        Home
      </button>
      <button onClick={() => scrollToSection("skills")} className="text-foreground hover:text-primary font-medium transition-colors duration-200">
        Skills
      </button>
      <button onClick={() => scrollToSection("projects")} className="text-foreground hover:text-primary font-medium transition-colors duration-200">
        Projects
      </button>
      <button onClick={() => scrollToSection("certificates")} className="text-foreground hover:text-primary font-medium transition-colors duration-200">
        Certificates
      </button>
      <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary font-medium transition-colors duration-200">
        About
      </button>
      <button onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary font-medium transition-colors duration-200">
        Contact
      </button>
    </>
  );

  return (
    <nav className="w-full bg-card shadow-lg fixed top-0 left-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">Portfolio</div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-secondary text-secondary-foreground border-border hover:bg-muted">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-border">
              <div className="flex flex-col space-y-4 pt-8">
                {navLinks}
                <ResumeModal>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>View/Download CV</span>
                  </Button>
                </ResumeModal>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            {navLinks}
            <ResumeModal>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>View/Download CV</span>
              </Button>
            </ResumeModal>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;