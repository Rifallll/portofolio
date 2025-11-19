import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import ResumeModal from "./ResumeModal";

const Navbar = () => {
  const isMobile = useIsMobile();
  const scrollToSection = useSmoothScroll();

  const navLinks = (
    <>
      <Button variant="ghost" onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-md">
        HOME
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2">
        ABOUT
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("skills")} className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2">
        SKILLS
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("projects")} className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2">
        PROJECTS
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("certificates")} className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2">
        CERTIFICATES
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("contact")} className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2">
        CONTACT
      </Button>
    </>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      {isMobile ? (
        // Mobile: Logo di kiri, hamburger di kanan, full-width primary bar
        <div className="relative bg-primary rounded-b-3xl h-20 flex items-center justify-center shadow-lg">
          <div className="container mx-auto h-full relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary-foreground">Rifal Azhar Permana</div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground border-border hover:bg-muted">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border">
                <div className="flex flex-col space-y-4 pt-8">
                  {navLinks}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      ) : (
        // Desktop: Single, centered, rounded bar
        <div className="flex justify-center w-full bg-card shadow-md">
          <div className="container mx-auto flex items-center justify-center py-3">
            <div className="flex space-x-4">
              {navLinks}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;