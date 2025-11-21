"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryEntry from "@/components/StoryEntry";

const storyData = [
  {
    title: "Awal Perjalananku",
    description: `Sejak kecil, rasa ingin tahuku terhadap teknologi tumbuh tanpa batas. Aku sering duduk berlama-lama di depan komputer tua di rumah, mencoba memahami apa yang terjadi di balik layar setiap kali aku menekan sebuah tombol. Dari tampilan sederhana hingga sistem yang terlihat rumit, semuanya membuatku penasaran. Saat itu aku tidak tahu, tetapi momen kecil ini menjadi pintu pertama menuju dunia yang kelak menjadi jalur karierku.`,
    imageSrcs: ["/placeholder-story-1.jpg", "/placeholder-story-2.jpg"],
    imageAlt: "Nostalgic desk setup with an old computer"
  },
  {
    title: "Masa Sekolah di MAN 1 Pandeglang",
    description: `Ketika aku mulai bersekolah di MAN 1 Pandeglang, rasa penasaran itu berubah menjadi pengalaman eksplorasi yang lebih nyata. Di sini aku mulai mengenal struktur web, dasar HTML, dan bagaimana sebuah halaman sederhana bisa hidup di layar. Setiap kali sebuah kode berhasil berjalan, aku merasa seperti menemukan potongan puzzle baru dari dunia digital. Pengalaman sekolah ini menjadi pijakan penting dalam membangun arah yang akan aku pilih.`,
    imageSrcs: ["/placeholder-story-3.jpg", "/placeholder-story-4.jpg"],
    imageAlt: "Modern classroom scene with a laptop"
  },
  {
    title: "Jatuh Cinta pada Web Development",
    description: `Momen ketika aku menyadari bahwa web development bukan sekadar hobi menjadi titik balik penting dalam perjalanan ini. Setiap baris kode yang kutulis terasa seperti menciptakan sesuatu dari ketidakadaan. Saat aku berhasil membuat tampilan yang berjalan sesuai keinginan, ada rasa kepuasan yang sulit dijelaskan. Dari eksperimen-eksperimen kecil inilah aku akhirnya jatuh cinta pada dunia pengembangan web.`,
    imageSrcs: ["/placeholder-story-5.jpg", "/placeholder-story-6.jpg"],
    imageAlt: "Modern coding workspace with laptop"
  },
  {
    title: "Kuliah di Telkom University – Teknik Komputer",
    description: `Setelah lulus, aku memilih untuk memperluas pemahaman teknisku dengan melanjutkan pendidikan di Telkom University, jurusan Teknik Komputer. Kampus ini membuka ruang baru dengan materi yang jauh lebih kompleks: sistem komputer, jaringan, arsitektur perangkat keras, hingga pemrograman tingkat lanjut. Lingkungan akademik yang disiplin dan dinamis membuatku membangun pola pikir yang lebih terstruktur dan analitis dalam menghadapi tantangan teknologi.`,
    imageSrcs: ["/placeholder-story-7.jpg", "/placeholder-story-8.jpg"],
    imageAlt: "Modern university campus"
  },
  {
    title: "Membangun Karier Web Development Secara Profesional",
    description: `Selama menjalani perkuliahan, web development bukan lagi sekadar sesuatu yang kupelajari—tetapi mulai menjadi bagian nyata dari karierku. Aku membangun website untuk berbagai kebutuhan: mulai dari UMKM, personal brand, hingga proyek skala lebih besar. Setiap website memberikan tantangan baru, mulai dari UI/UX, performa, hingga strategi struktur konten. Kini aku telah membangun lebih dari dua puluh website, masing-masing menjadi perjalanan belajar yang memperkuat kualitas kerjaku.`,
    imageSrcs: ["/placeholder-story-1.jpg", "/placeholder-story-3.jpg", "/placeholder-story-5.jpg"],
    imageAlt: "Premium developer workspace with dual monitors"
  },
  {
    title: "Memperluas Keahlian ke Digital Media & Content Strategy",
    description: `Ketika semakin dalam masuk ke industri digital, aku menyadari bahwa website hanyalah fondasi awal. Konten, strategi komunikasi, dan identitas digital adalah elemen yang membuat sebuah produk benar-benar hidup. Karena itu, aku memperluas fokusku ke content strategy, digital media, dan social media management. Aku mulai merancang alur konten, membuat visual direction, hingga menyusun strategi kampanye digital yang mampu memberikan peningkatan engagement signifikan.`,
    imageSrcs: ["/placeholder-story-2.jpg", "/placeholder-story-4.jpg", "/placeholder-story-6.jpg"],
    imageAlt: "Creative content strategy workspace"
  },
  {
    title: "Pengalaman Profesional & Pencapaian",
    description: `Dalam beberapa tahun terakhir, aku berkesempatan membantu berbagai brand membangun kehadiran digital mereka. Beberapa kampanye yang aku rancang berhasil meningkatkan engagement hingga 150%. Website yang kubuat membantu brand tampil lebih profesional dan kredibel. Pengalaman ini membentuk pemahamanku tentang pentingnya strategi digital yang kuat, efektif, dan berorientasi pada hasil.`,
    imageSrcs: ["/placeholder-story-5.jpg", "/placeholder-story-7.jpg", "/placeholder-story-1.jpg"],
    imageAlt: "Professional analytics dashboard"
  },
  {
    title: "Melangkah Menuju Masa Depan",
    description: `Perjalananku belum selesai—justru baru dimulai. Dunia teknologi terus berevolusi, dan aku berkomitmen untuk terus berkembang, belajar, dan menciptakan solusi digital yang tidak hanya fungsional tetapi juga bermakna. Dari rasa penasaran saat kecil hingga menjadi sebuah profesi yang sekarang aku jalani, perjalanan ini mengajarkanku bahwa inovasi tidak pernah berhenti, dan begitu juga aku.`,
    imageSrcs: ["/placeholder-story-6.jpg", "/placeholder-story-8.jpg", "/placeholder-story-2.jpg"],
    imageAlt: "Futuristic silhouette looking at digital screens"
  },
];

const MyStoryPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-xl relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-12 text-center">My Story</h1>

        <div className="relative space-y-20 lg:space-y-24">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden lg:block"></div>

          {storyData.map((story, index) => (
            <div key={index} className="relative">
              {/* Timeline dot for large screens */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md"></div>

              {/* Story Entry */}
              <StoryEntry
                {...story}
                delay={index * 0.1}
                isReversed={index % 2 !== 0} // Alternate layout for every other entry
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyStoryPage;