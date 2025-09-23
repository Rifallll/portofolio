import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">John</div>
        <div className="flex items-center space-x-6">
          <a href="#home" className="text-gray-700 hover:text-gray-900 font-medium">
            Home
          </a>
          <a href="#skills" className="text-gray-700 hover:text-gray-900 font-medium">
            Skills
          </a>
          <a href="#projects" className="text-gray-700 hover:text-gray-900 font-medium">
            Projects
          </a>
          <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium">
            About
          </a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">
            Contact
          </a>
          <Button className="bg-gray-900 text-white hover:bg-gray-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download CV</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;