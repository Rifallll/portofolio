import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <a href="#" className="text-primary hover:text-accent font-bold transition-colors duration-200 px-4 py-2 rounded-md bg-secondary">
        HOME
      </a>
      <a href="#" className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        BLOG
      </a>
      <a href="#" className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        CONTACT US
      </a>
      <a href="#" className="text-primary hover:text-accent font-medium transition-colors duration-200 px-4 py-2">
        DOWNLOAD
      </a>
    </>
  );

  return (
    <nav className="w-full bg-card shadow-lg fixed top-0 left-0 z-50 border-b border-border rounded-b-3xl overflow-hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Custom shape for the logo background */}
        <div className="absolute left-0 top-0 h-full w-48 bg-primary rounded-br-3xl flex items-center justify-center">
          <div className="text-2xl font-bold text-primary-foreground">AniMagi</div>
        </div>
        
        <div className="flex-grow flex justify-end items-center pl-52"> {/* Adjusted padding to make space for the custom logo background */}
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
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    LOGIN
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center space-x-6">
              {navLinks}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2">
                LOGIN
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;