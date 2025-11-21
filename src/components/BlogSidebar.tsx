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
import { Search, CircleDot } from "lucide-react";

const blogNavItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
];

// Data untuk bab cerita Anda dengan slug untuk setiap poin
const storyChapters = [
  {
    id: "chapter-1",
    title: "MAN 1 Pandeglang",
    points: [
      { title: "IPA 1", slug: "man1-pertemanan" }, // Diubah dari "Pertemanan" menjadi "IPA 1"
      { title: "Organisasi", slug: "man1-organisasi" },
      { title: "Ekskul", slug: "man1-ekskul" },
      { title: "Penghargaan", slug: "man1-penghargaan" },
      { title: "Lomba", slug: "man1-lomba" },
      { title: "Pengalaman", slug: "man1-pengalaman" },
    ],
  },
  {
    id: "chapter-2",
    title: "Telkom University",
    points: [
      { title: "Perkuliahan", slug: "telkom-perkuliahan" },
      { title: "Organisasi", slug: "telkom-organisasi" },
      { title: "Proyek", slug: "telkom-proyek" },
      { title: "Magang", slug: "telkom-magang" },
      { title: "Komunitas", slug: "telkom-komunitas" },
      { title: "Kegiatan Kampus", slug: "telkom-kegiatan-kampus" },
    ],
  },
  {
    id: "chapter-3",
    title: "Web Development Journey",
    points: [
      { title: "Belajar Dasar", slug: "webdev-belajar-dasar" },
      { title: "Project Pertama", slug: "webdev-project-pertama" },
      { title: "Tools & Skill", slug: "webdev-tools-skill" },
      { title: "Website Klien", slug: "webdev-website-klien" },
    ],
  },
  {
    id: "chapter-4",
    title: "Digital Media & Content Strategy",
    points: [
      { title: "Copywriting", slug: "digital-copywriting" },
      { title: "Social Media", slug: "digital-social-media" },
      { title: "Campaign", slug: "digital-campaign" },
      { title: "Portfolio", slug: "digital-portfolio" },
    ],
  },
  {
    id: "chapter-5",
    title: "Professional Career",
    points: [
      { title: "Project Website", slug: "career-project-website" },
      { title: "Digital Campaign", slug: "career-digital-campaign" },
      { title: "Skill Set", slug: "career-skill-set" },
      { title: "Pencapaian", slug: "career-pencapaian" },
    ],
  },
  {
    id: "chapter-6",
    title: "Visi & Masa Depan",
    points: [
      { title: "Target", slug: "future-target" },
      { title: "Skill Baru", slug: "future-skill-baru" },
      { title: "Proyek Impian", slug: "future-proyek-impian" },
    ],
  },
];

const BlogSidebar = () => {
  return (
    <aside className="w-full lg:w-72 bg-card text-foreground p-6 flex flex-col space-y-8 overflow-y-auto scroll-smooth hide-scrollbar
                  lg:fixed lg:top-0 lg:left-0 lg:h-screen border-r border-border shadow-lg"> {/* Updated styling */}
      <Link to="/" className="text-3xl font-bold leading-tight text-primary mb-8"> {/* Updated styling */}
        Life Is An <br /> Absurd <br /> Journey
      </Link>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search the site"
          className="w-full bg-muted border-border text-foreground placeholder-muted-foreground pl-10" // Updated styling
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /> {/* Updated styling */}
      </div>

      <nav className="space-y-3">
        {blogNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block text-lg font-medium hover:text-primary transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground" // Updated styling
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="story-chapters">
        <h3 className="text-xl font-bold text-foreground mb-4">MY JOURNEY</h3> {/* Updated styling */}
        <Accordion type="multiple" className="w-full">
          {storyChapters.map((chapter) => (
            <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-border"> {/* Updated styling */}
              <AccordionTrigger className="flex flex-col items-start py-2 text-foreground hover:text-primary transition-colors duration-200 text-left"> {/* Updated styling */}
                <div className="flex justify-between items-baseline w-full">
                  <span className="text-lg font-semibold">{chapter.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4 py-2 text-muted-foreground text-sm space-y-1"> {/* Updated styling */}
                {chapter.points.map((point, index) => (
                  <NavLink
                    key={index}
                    to={`/story/${point.slug}`}
                    className={({ isActive }) =>
                      `flex items-start py-1 hover:text-primary transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted-foreground" // Updated styling
                      }`
                    }
                  >
                    <CircleDot className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>{point.title}</span>
                  </NavLink>
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