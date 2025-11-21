"use client";

import React from "react";
import DetailedStoryLayout from "@/components/DetailedStoryLayout";

const KuliahDetailPage = () => {
  const title = "Kuliah di Telkom University – Teknik Komputer";
  const paragraphs = [
    `Setelah lulus, aku memilih untuk memperluas pemahaman teknisku dengan melanjutkan pendidikan di Telkom University, jurusan Teknik Komputer. Kampus ini membuka ruang baru dengan materi yang jauh lebih kompleks: sistem komputer, jaringan, arsitektur perangkat keras, hingga pemrograman tingkat lanjut. Lingkungan akademik yang disiplin dan dinamis membuatku membangun pola pikir yang lebih terstruktur dan analitis dalam menghadapi tantangan teknologi.`,
    `Di Telkom University, aku mendalami berbagai mata kuliah yang relevan dengan pengembangan web dan digital media. Aku belajar tentang algoritma, struktur data, basis data, dan rekayasa perangkat lunak. Ini memberiku fondasi teknis yang kuat untuk membangun aplikasi yang lebih kompleks dan efisien. Selain itu, aku juga terlibat dalam proyek-proyek kelompok yang menuntut kemampuan kolaborasi dan pemecahan masalah.`,
    `Salah satu fokus utamaku selama kuliah adalah bagaimana mengintegrasikan pengetahuan teknik komputer dengan strategi digital. Aku mulai mengeksplorasi topik seperti UI/UX design, web scraping untuk analisis data, dan dasar-dasar Python untuk otomatisasi. Ini membantuku melihat gambaran besar tentang bagaimana teknologi dapat digunakan untuk mencapai tujuan bisnis dan komunikasi.`,
    `Pengalaman di Telkom University tidak hanya tentang akademis, tetapi juga tentang membangun jaringan dan mengembangkan diri. Aku aktif dalam organisasi mahasiswa dan mengikuti berbagai seminar serta workshop. Ini memberiku kesempatan untuk bertemu dengan para ahli di bidangnya dan belajar dari pengalaman mereka, yang sangat berharga dalam membentuk visi karierku.`
  ];
  const images = [
    { src: "/placeholder-story-7.jpg", alt: "Modern university campus" },
    { src: "/placeholder-story-8.jpg", alt: "Students studying in a library" },
    { src: "/public/ft2.png", alt: "Telkom University logo" }, // Contoh gambar tambahan
  ];

  return (
    <DetailedStoryLayout
      title={title}
      paragraphs={paragraphs}
      images={images}
    />
  );
};

export default KuliahDetailPage;