"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import StoryChapter from "@/components/StoryChapter"; // Import the new StoryChapter component

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
    image: "/placeholder-story-1.jpg",
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
    image: "/placeholder-story-2.jpg",
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
    image: "/placeholder-story-3.jpg",
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
    image: "/placeholder-story-4.jpg",
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
    image: "/placeholder-story-5.jpg",
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
    image: "/placeholder-story-6.jpg",
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
    image: "/placeholder-story-7.jpg",
  },
];

const MyStoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-xl"
        >
          <div className="pb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              My Journey: A Detailed Story
            </h1>
            <p className="text-lg text-muted-foreground">
              Jelajahi setiap bab perjalanan hidup dan karier saya.
            </p>
          </div>

          <Accordion type="multiple" className="w-full">
            {storyChapters.map((chapter) => (
              <StoryChapter key={chapter.id} {...chapter} />
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate("/about")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-6 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali ke About</span>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MyStoryPage;