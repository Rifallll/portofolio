"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import ResumeModal from "./ResumeModal";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const scrollToSection = useSmoothScroll();

  const navItems = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "SKILLS", id: "skills" },
    { name: "PROJECTS", id: "projects" },
    { name: "CERTIFICATES", id: "certificates" },
    { name: "CONTACT", id: "contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo/Name */}
        <span className="text-xl font-bold text-foreground">Rifal Azhar Permana</span>

        {isMobile ? (
          // Mobile Navigation
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-secondary text-secondary-foreground border-border hover:bg-muted">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-border">
              <div className="flex flex-col space-y-4 pt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-md justify-start"
                  >
                    {item.name}
                  </Button>
                ))}
                <ResumeModal>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 px-4 py-2 text-base rounded-md flex items-center space-x-2 justify-start"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download CV</span>
                  </Button>
                </ResumeModal>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          // Desktop Navigation
          <div className="flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink
                      onClick={() => scrollToSection(item.id)}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 text-foreground"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <ResumeModal>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 py-2 text-base rounded-full shadow-sm transition-all duration-300 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </Button>
            </ResumeModal>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;