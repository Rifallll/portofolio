"use client";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const blogNavItems = [
  { name: "HOME", path: "/" },
  { name: "HOW TO SUPPORT", path: "#" }, // Placeholder
  { name: "ABOUT", path: "/about" },
  { name: "THE TEAM", path: "#" }, // Placeholder
  { name: "SOCIAL MEDIA", path: "#" }, // Placeholder
  { name: "DESTINATIONS", path: "#" }, // Placeholder
];

const blogArchiveData = [
  { year: "2024", count: 5 },
  { year: "2023", count: 3 },
  { year: "2022", count: 12 },
  { year: "2021", count: 8 },
  { year: "2020", count: 19 },
  { year: "2019", count: 22 },
  { year: "2018", count: 21 },
  { year: "2017", count: 47 },
  { year: "2016", count: 93 },
];

const BlogSidebar = () => {
  return (
    <aside className="w-full lg:w-72 bg-gray-900 text-gray-100 p-6 flex flex-col space-y-8 sticky top-0 h-screen overflow-y-auto scroll-smooth hide-scrollbar">
      <Link to="/" className="text-3xl font-serif font-bold leading-tight text-white">
        Life Is An <br /> Absurd <br /> Journey
      </Link>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search the site"
          className="w-full bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <nav className="space-y-3">
        {blogNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block text-lg font-medium hover:text-primary transition-colors duration-200 ${
                isActive ? "text-primary" : "text-gray-300"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="blog-archive">
        <h3 className="text-xl font-bold text-white mb-4">BLOG ARCHIVE</h3>
        <Accordion type="multiple" className="w-full">
          {blogArchiveData.map((archive) => (
            <AccordionItem key={archive.year} value={archive.year} className="border-b border-gray-700">
              <AccordionTrigger className="flex justify-between items-center py-2 text-gray-300 hover:text-primary transition-colors duration-200">
                <span className="text-lg">{archive.year}</span>
                <span className="text-sm text-gray-400">({archive.count})</span>
              </AccordionTrigger>
              <AccordionContent className="pl-4 py-2 text-gray-400 text-sm">
                {/* You can add specific month links here if needed */}
                No entries for this month.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
};

export default BlogSidebar;