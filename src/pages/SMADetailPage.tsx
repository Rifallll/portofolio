"use client";

import React from "react";
import DetailedStoryLayout from "@/components/DetailedStoryLayout";

const SMADetailPage = () => {
  const title = "Masa Sekolah di MAN 1 Pandeglang";
  const paragraphs = [
    `Ketika aku mulai bersekolah di MAN 1 Pandeglang, rasa penasaran itu berubah menjadi pengalaman eksplorasi yang lebih nyata. Di sini aku mulai mengenal struktur web, dasar HTML, dan bagaimana sebuah halaman sederhana bisa hidup di layar. Setiap kali sebuah kode berhasil berjalan, aku merasa seperti menemukan potongan puzzle baru dari dunia digital. Pengalaman sekolah ini menjadi pijakan penting dalam membangun arah yang akan aku pilih.`,
    `Selama di MAN 1 Pandeglang, aku tidak hanya fokus pada pelajaran formal, tetapi juga aktif dalam berbagai kegiatan ekstrakurikuler yang berkaitan dengan teknologi dan media. Aku bergabung dengan klub komputer dan mulai belajar lebih dalam tentang desain grafis dan pengeditan video. Ini adalah masa di mana aku mulai menyadari bahwa aku memiliki ketertarikan yang kuat pada bagaimana teknologi dapat digunakan untuk menciptakan dan menyampaikan pesan.`,
    `Salah satu proyek yang paling berkesan adalah ketika aku dan tim membuat website sederhana untuk acara sekolah. Meskipun masih sangat dasar, pengalaman itu memberiku pemahaman langsung tentang proses pengembangan web, mulai dari perencanaan, desain, hingga implementasi. Aku belajar tentang pentingnya kolaborasi tim dan bagaimana setiap bagian kecil dari kode berkontribusi pada hasil akhir yang lebih besar.`,
    `Lingkungan sekolah yang mendukung juga memberiku kesempatan untuk mengembangkan kemampuan presentasi dan komunikasi. Aku sering diminta untuk menjelaskan proyek-proyek teknologi kepada teman-teman dan guru, yang membantuku mengasah keterampilan berbicara di depan umum. Ini adalah fondasi yang kuat untuk perjalananku selanjutnya di dunia digital.`
  ];
  const images = [
    { src: "/placeholder-story-3.jpg", alt: "Modern classroom scene with a laptop" },
    { src: "/placeholder-story-4.jpg", alt: "Students collaborating on a project" },
    { src: "/public/1.jpeg", alt: "School event with students" }, // Contoh gambar tambahan
  ];

  return (
    <DetailedStoryLayout
      title={title}
      paragraphs={paragraphs}
      images={images}
    />
  );
};

export default SMADetailPage;