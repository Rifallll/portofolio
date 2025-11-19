"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink
import ResumeModal from "./ResumeModal";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const isMobile = useIsMobile();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SKILLS", path: "/skills" },
    { name: "PROJECTS", path: "/projects" },
    { name: "CERTIFICATES", path: "/certificates" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo/Name */}
        <Link to="/" className="text-xl font-bold text-foreground">Rifal Azhar Permana</Link>

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
                    key={item.path}
                    variant="ghost"
                    asChild
                    className="text-foreground hover:text-primary font-medium transition-colors duration-200 px-4 py-2 rounded-md justify-start"
                  >
                    <NavLink to={item.path} className={({ isActive }) => isActive ? "text-primary" : ""}>
                      {item.name}
                    </NavLink>
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
          <div className="flex-grow flex justify-center"> {/* This div centers the nav links */}
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1"> {/* Reduced space-x for a tighter look */}
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            isActive ? "text-primary" : "text-foreground hover:text-primary"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
        {!isMobile && (
          <ResumeModal>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-6 py-2 text-base rounded-full shadow-sm transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </Button>
          </ResumeModal>
        )}
      </div>
    </nav>
  );
};

export default Navbar;