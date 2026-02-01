"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, useLocation } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SKILLS", path: "/skills" },
    { name: "PROJECTS", path: "/projects" },
    { name: "CERTIFICATES", path: "/certificates" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
        scrolled
          ? "py-2 glass bg-background/60"
          : "py-6 bg-transparent"
      )}
    >
      <div className="mx-auto flex items-center justify-between max-w-7xl">
        {/* Logo/Name */}
        <Link to="/" className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
          <span className="text-gradient-gold">Rifal Azhar Permana</span>
        </Link>

        {isMobile ? (
          // Mobile Navigation
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-white/10 w-[300px]">
              <div className="flex flex-col space-y-6 pt-12 items-center">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "text-lg font-medium transition-all duration-300 hover:text-primary hover:tracking-wider",
                        isActive ? "text-primary font-bold" : "text-foreground/80"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <div className="pt-8">
                  <ResumeModal>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download CV</span>
                    </Button>
                  </ResumeModal>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          // Desktop Navigation
          <div className="flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-1 bg-white/5 backdrop-blur-md rounded-full px-4 py-1 border border-white/10">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary",
                            isActive ? "text-primary" : "text-foreground/80"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {item.name}
                            {isActive && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_2px_rgba(255,215,0,0.6)]" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <ResumeModal>
              <Button
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white border-0 px-6 py-2 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 flex items-center space-x-2 font-medium"
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