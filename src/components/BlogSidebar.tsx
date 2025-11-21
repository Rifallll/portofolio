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
import { Search, CircleDot } from "lucide-react"; // Import CircleDot for list items

const blogNavItems = [
  { name: "HOME", path: "/" },
  { name: "HOW TO SUPPORT", path: "#" }, // Placeholder
  { name: "ABOUT", path: "/about" },
  { name: "THE TEAM", path: "#" }, // Placeholder
  { name: "SOCIAL MEDIA", path: "#" }, // Placeholder
  { name: "DESTINATIONS", path: "#" }, // Placeholder
];

// Data untuk bab cerita Anda yang baru
const storyChapters = [
  {
    id: "chapter-1",
    title: "MAN 1 Pandeglang",
    points: [
      "Pertemanan",
      "Organisasi",
      "Ekskul",
      "Penghargaan",
      "Lomba",
      "Pengalaman",
    ],
  },
  {
    id: "chapter-2",
    title: "Telkom University",
    points: [
      "Perkuliahan",
      "Organisasi",
      "Proyek",
      "Magang",
      "Komunitas",
      "Kegiatan Kampus",
    ],
  },
  {
    id: "chapter-3",
    title: "Web Development Journey",
    points: [
      "Belajar Dasar",
      "Project Pertama",
      "Tools & Skill",
      "Website Klien",
    ],
  },
  {
    id: "chapter-4",
    title: "Digital Media & Content Strategy",
    points: [
      "Copywriting",
      "Social Media",
      "Campaign",
      "Portfolio",
    ],
  },
  {
    id: "chapter-5",
    title: "Professional Career",
    points: [
      "Project Website",
      "Digital Campaign",
      "Skill Set",
      "Pencapaian",
    ],
  },
  {
    id: "chapter-6",
    title: "Visi & Masa Depan",
    points: [
      "Target",
      "Skill Baru",
      "Proyek Impian",
    ],
  },
];

const BlogSidebar = () => {
  return (
    <aside className="w-full lg:w-72 bg-gray-900 text-gray-100 p-6 flex flex-col space-y-8 overflow-y-auto scroll-smooth hide-scrollbar
                  lg:fixed lg:top-0 lg:left-0 lg:h-screen">
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

      <div className="story-chapters">
        <h3 className="text-xl font-bold text-white mb-4">MY JOURNEY</h3>
        <Accordion type="multiple" className="w-full">
          {storyChapters.map((chapter) => (
            <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-gray-700">
              <AccordionTrigger className="flex flex-col items-start py-2 text-gray-300 hover:text-primary transition-colors duration-200 text-left">
                <div className="flex justify-between items-baseline w-full">
                  <span className="text-lg font-semibold">{chapter.title}</span>
                  {/* Menghapus chapter.years karena tidak ada di data baru */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4 py-2 text-gray-400 text-sm space-y-1">
                {chapter.points.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
};

export default BlogSidebar;