import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Navbar = () => {
  const isMobile = useIsMobile();
  const scrollToSection = useSmoothScroll();

  const navLinks = (
    <>
      <Button variant="ghost" onClick={() => scrollToSection("home")} className="text-primary hover:text-accent font-bold transition-colors duration-200 px-4 py-2 rounded-md">
        HOME
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("about")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        ABOUT
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("skills")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        SKILLS
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("projects")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        PROJECTS
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("certificates")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        CERTIFICATES
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("contact")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        CONTACT
      </Button>
    </>
  );

  return (
    <nav className="w-full bg-card shadow-lg fixed top-0 left-0 z-50 border-b border-border rounded-b-3xl overflow-hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {isMobile ? (
          <>
            {/* Mobile logo and menu */}
            <div className="text-2xl font-bold text-primary">Rifal Azhar Permana</div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-secondary text-secondary-foreground border-border hover:bg-muted">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border">
                <div className="flex flex-col space-y-4 pt-8">
                  {navLinks} {/* All links for mobile */}
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          // Desktop Navigation with central "hole" effect
          <div className="flex w-full items-center justify-between">
            {/* Left side navigation links */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => scrollToSection("home")} className="text-primary hover:text-accent font-bold transition-colors duration-200 px-4 py-2 rounded-md">
                HOME
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection("about")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
                ABOUT
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection("skills")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
                SKILLS
              </Button>
            </div>

            {/* Central Logo Area - the "hole" */}
            <div className="relative flex-shrink-0 h-24 w-24 bg-secondary rounded-full flex items-center justify-center shadow-md border border-border -mt-12"> {/* -mt-12 to make it slightly pop out */}
              <span className="text-center text-lg font-bold text-primary leading-tight p-2">
                Rifal Azhar Permana
              </span>
            </div>

            {/* Right side navigation links */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => scrollToSection("projects")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
                PROJECTS
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection("certificates")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
                CERTIFICATES
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection("contact")} className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
                CONTACT
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;