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

// Data untuk bab cerita Anda
const storyChapters = [
  {
    id: "chapter-1",
    title: "Masa SMA di MAN 1 Pandeglang",
    years: "(2018 – 2021)",
    points: [
      "Pertemanan & Lingkungan Sekolah",
      "Organisasi yang Pernah Diikuti",
      "Ekskul & Aktivitas Tambahan",
      "Pengalaman Berkesan / Cerita Lapangan",
      "Penghargaan & Prestasi SMA",
      "Kegiatan Lomba / Kompetisi",
      "Momen Terpenting di Masa SMA",
    ],
  },
  {
    id: "chapter-2",
    title: "Perjalanan Kuliah di Telkom University",
    years: "(2021 – Sekarang)",
    points: [
      "Adaptasi & Kehidupan Kampus",
      "Belajar di Teknik Komputer",
      "Organisasi Kampus / Kepanitiaan",
      "Project Tugas Kuliah yang Bermakna",
      "Pengalaman Magang / Proyek Riset",
      "Teman & Komunitas yang Berpengaruh",
      "Cerita Pencapaian Selama Kuliah",
    ],
  },
  {
    id: "chapter-3",
    title: "Awal Masuk Dunia Web Development",
    points: [
      "Belajar HTML/CSS Pertama Kali",
      "Proyek Website Pertama",
      "Kesalahan & Pembelajaran Awal",
      "Mulai Membuat Website untuk Orang Lain",
      "Perjalanan Mengembangkan Skill Frontend",
      "Menguasai UI/UX Dasar",
    ],
  },
  {
    id: "chapter-4",
    title: "Pengalaman Organisasi & Project Nyata",
    points: [
      "Organisasi SMA & Kampus",
      "Kepanitiaan Event & Peranmu",
      "Kolaborasi dengan Teman / Tim",
      "Project Website untuk Klien",
      "Project Social Media / Branding",
      "Apa yang Dipelajari dari Proyek Nyata",
    ],
  },
  {
    id: "chapter-5",
    title: "Merambah ke Digital Media & Content Strategy",
    points: [
      "Awal Tertarik Digital Marketing",
      "Membuat Konten & Copywriting",
      "Strategi Media Sosial Pertama",
      "Kesuksesan Kampanye (150% Engagement)",
      "Kolaborasi dengan Brand / UMKM",
      "Perjalanan Mengembangkan Personal Branding",
    ],
  },
  {
    id: "chapter-6",
    title: "Professional Career & Portfolio Project",
    points: [
      "Daftar Project Website yang Pernah Dibuat",
      "Project Digital Campaign / Social Media",
      "Skill Teknis yang Dikuasai",
      "Hasil Kerja yang Terukur (Metrics)",
      "Cerita Dibalik Proyek-Proyek Terbaik",
      "Testimoni / Feedback Klien",
    ],
  },
  {
    id: "chapter-7",
    title: "Visi & Perjalanan ke Depan",
    points: [
      "Target Karier 1–3 Tahun Kedepan",
      "Skill yang Ingin Dikembangkan",
      "Mimpi Besar dalam Dunia Teknologi",
      "Rencana Membangun Personal Brand",
      "Proyek Masa Depan yang Ingin Diciptakan",
      "Pesan Penutup / Filosofi Hidup",
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
        <h3 className="text-xl font-bold text-white mb-4">MY JOURNEY</h3> {/* Mengubah judul */}
        <Accordion type="multiple" className="w-full">
          {storyChapters.map((chapter) => (
            <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-gray-700">
              <AccordionTrigger className="flex flex-col items-start py-2 text-gray-300 hover:text-primary transition-colors duration-200 text-left">
                <div className="flex justify-between items-baseline w-full">
                  <span className="text-lg font-semibold">{chapter.title}</span>
                  {chapter.years && <span className="text-sm text-gray-400 ml-2">{chapter.years}</span>}
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