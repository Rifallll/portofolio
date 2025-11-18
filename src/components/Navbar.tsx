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
      <Button variant="ghost" onClick={() => scrollToSection("home")} className="text-primary-foreground hover:text-accent font-bold transition-colors duration-200 px-4 py-2 rounded-md">
        HOME
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("about")} className="text-primary-foreground hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        ABOUT
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("skills")} className="text-primary-foreground hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        SKILLS
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("projects")} className="text-primary-foreground hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        PROJECTS
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("certificates")} className="text-primary-foreground hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        CERTIFICATES
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("contact")} className="text-primary-foreground hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        CONTACT
      </Button>
    </>
  );

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-lg">
      <div className="relative bg-primary rounded-b-3xl h-20 flex items-center justify-center"> {/* Ini adalah bilah tengah gelap */}
        <div className="container mx-auto h-full relative">
          {isMobile ? (
            <>
              {/* Mobile: Logo di kiri, hamburger di kanan */}
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
            </>
          ) : (
            // Desktop: Tata letak kompleks dengan "tab"
            <div className="grid grid-cols-[auto_1fr_auto] items-center h-full gap-4"> {/* Menggunakan grid untuk kontrol yang lebih baik */}
              {/* "Tab" kiri untuk logo */}
              <div className="bg-card text-foreground px-8 py-3 rounded-full shadow-md z-10 -ml-4">
                <span className="text-xl font-bold">Rifal Azhar Permana</span>
              </div>

              {/* Tautan navigasi tengah */}
              <div className="flex justify-center items-center space-x-4">
                {navLinks}
              </div>

              {/* "Tab" kanan untuk tombol */}
              <div className="bg-card text-foreground px-8 py-3 rounded-full shadow-md z-10 -mr-4">
                <ResumeModal>
                  <Button variant="outline" className="border-none bg-transparent text-foreground hover:bg-muted">
                    Download CV
                  </Button>
                </ResumeModal>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;