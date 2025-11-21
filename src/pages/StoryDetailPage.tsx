"use client";

import React from "react";
import Footer from "@/components/Footer";
import BlogSidebar from "@/components/BlogSidebar";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dummy data for all stories based on slugs
const allStoriesContent: { [key: string]: { title: string; tags: string[]; postedBy: string; date: string; mainImage: string; paragraphs: string[]; additionalImages?: { src: string; alt: string }[] } } = {
  "make-it-happen-go-travel": {
    title: "Make It Happen! Go Travel!",
    tags: ["#MAKEITHAPPEN", "LIFE LESSONS", "LIFE TALK", "LUMIA", "MAKE IT HAPPEN", "TRAVEL"],
    postedBy: "Rifal Azhar Permana",
    date: "2024-11-21",
    mainImage: "/1.jpeg",
    paragraphs: [
      `Jika ada kalimat "Don't work hard, work smart" saya kurang setuju. Saya lebih pilih "Work smart and work hard".`,
      `Bekerja keras adalah fondasi, tetapi bekerja cerdas adalah kunci untuk mencapai hasil yang maksimal. Dalam perjalanan hidup ini, saya selalu percaya bahwa setiap usaha yang kita lakukan, baik itu besar maupun kecil, akan membawa kita selangkah lebih dekat pada tujuan.`,
      `Perjalanan adalah salah satu cara terbaik untuk belajar dan tumbuh. Setiap tempat baru, setiap budaya yang berbeda, dan setiap tantangan yang dihadapi di perjalanan memberikan pelajaran berharga yang tidak bisa didapatkan di bangku sekolah. Ini adalah investasi terbaik untuk diri sendiri.`,
      `Jadi, jangan ragu untuk mewujudkan impian Anda. Buatlah rencana, bekerja keras dan cerdas, dan jangan takut untuk menjelajahi dunia. Karena pada akhirnya, pengalaman adalah guru terbaik, dan setiap langkah adalah bagian dari cerita hidup yang luar biasa.`,
    ],
  },
  "man1-pertemanan": {
    title: "IPA 1 MAN 1 Pandeglang", // Diperbarui
    tags: ["SMA", "IPA 1", "MAN 1 Pandeglang", "Kenangan"], // Diperbarui
    postedBy: "Rifal Azhar Permana",
    date: "2021-05-10",
    mainImage: "/public/placeholder-story-1.jpg", // Ganti dengan gambar yang relevan
    paragraphs: [
      `Pertemanan di SMA itu aneh, lucu, menyebalkan, tapi justru itulah yang membuatnya tidak tergantikan. Semuanya dimulai pada tahun 2019 saat kita pertama kali melangkah masuk ke MAN 1 Pandeglang dengan wajah polos dan pikiran penuh tanda tanya. Di hari-hari awal itu, kita masih saling menebak siapa yang cerewet, siapa yang pendiam, siapa yang pintar matematika, dan siapa yang hanya pintar meramaikan kelas. Lambat laun, kelas berubah menjadi rumah kedua. Kita terbiasa tertawa di momen yang bahkan guru pun tidak paham apa lucunya. Kita terbiasa saling curi pandang ketika sedang bosan, lalu sama-sama menahan tawa saat ada teman yang ketiduran di jam pelajaran paling serius.`,
      `Jam kosong menjadi legenda tersendiri. Kadang kita gunakan untuk mengerjakan tugas, tapi lebih sering justru untuk melakukan apa saja selain itu. Dari ngobrol panjang sampai cerita hidup, dari iseng menggoda teman sampai membuat rencana jalan-jalan yang biasanya tidak jadi tetapi tetap seru dibahas. Dan tentu saja, tidak ada satu hari pun yang berlalu tanpa candaan receh yang hanya bisa dipahami oleh kita sendiri.`,
      `Tahun 2020 datang seperti plot twist besar. Mendadak sekolah pindah ke layar laptop dan koneksi internet menjadi penentu nasib. Kita belajar dengan suara yang putus-putus, kamera yang tiba-tiba mati, dan tugas yang seakan tidak ada akhirnya. Namun meski berjauhan, pertemanan itu tetap hidup. Kita saling menghibur lewat chat tengah malam, saling menguatkan saat lelah, dan saling menertawakan momen kocak saat suara kita delay dan terdengar seperti robot. Banyak yang berubah, tapi rasa dekat itu justru semakin kuat.`,
      `Di antara semua itu, ada satu tempat yang tidak bisa dilupakan: warung nasi Teteh di sebelah kanan sekolah. Tempat makan yang rasanya seperti markas rahasia versi kita sendiri. Di sana kita sering menunggu hujan reda, makan sambil bergosip, atau sekadar duduk sambil membicarakan hal paling random. Teteh mungkin tidak tahu, tapi warung kecilnya menjadi tempat di mana banyak cerita penting dimulai.`,
      `Aktivitas sekolah juga selalu penuh kejutan. Praktikum di lab kimia sering berakhir dengan suara panik yang kemudian berubah menjadi tawa karena racikan kita tidak pernah mirip hasil buku. Festival bahasa membuat kita tampil percaya diri meski latihan selalu kacau. Manasik haji menjadi pengalaman hangat karena kita belajar bekerja sama sambil tetap bercanda di sela-sela barisan. Ada pula momen ketika kita pergi ke pantai dan melupakan semua tugas sekolah untuk menikmati angin sore dan cerita panjang yang tidak pernah selesai.`,
      `Kelas tiga menjadi masa yang paling emosional. Ada perasaan ingin cepat lulus, tetapi di saat yang sama kita takut kehilangan rutinitas yang sudah menjadi bagian dari hidup. Setiap hari terasa lebih berarti. Kita semakin sering berfoto bersama, makan di warung Teteh lebih lama dari biasanya, dan mencoba menikmati setiap detik seolah semuanya akan berhenti dalam waktu dekat. Hingga akhirnya datang hari ketika kita duduk bersama di ruang wisuda, ruangan yang menjadi saksi bagaimana tawa, haru, dan rasa bangga bercampur menjadi satu. Saat itu kita tahu bahwa masa SMA benar-benar berakhir, tetapi kenangan yang kita tinggalkan tidak pernah mengikuti kata selesai.`,
      `Pertemanan ini adalah perjalanan penuh warna, penuh kejutan, dan penuh perasaan yang sulit dijelaskan dengan kata sederhana. Ini adalah cerita yang tumbuh dari kebiasaan kecil, dari momen lucu yang selalu muncul tiba-tiba, dari perjalanan ke tempat-tempat yang tidak terhitung jumlahnya, dan dari kesempatan terakhir yang kita habiskan bersama sebelum masing-masing melangkah ke dunia baru. Semoga setiap langkah yang kita ambil setelah ini selalu membawa ingatan bahwa kita pernah menjalani masa yang begitu lengkap, begitu hidup, dan begitu berarti.`,
    ],
    additionalImages: [
      { src: "/Man 1/IPA/12 (2).jpg", alt: "Kenangan SMA 2" },
      { src: "/Man 1/IPA/13.jpg", alt: "Kenangan SMA 3" },
      { src: "/Man 1/IPA/14.jpg", alt: "Kenangan SMA 4" },
      { src: "/Man 1/IPA/15.jpg", alt: "Kenangan SMA 5" },
      { src: "/Man 1/IPA/2.JPG", alt: "Kenangan SMA 6" },
      { src: "/Man 1/IPA/3.JPG", alt: "Kenangan SMA 7" },
    ],
  },
  "man1-organisasi": {
    title: "Organisasi yang Pernah Diikuti di MAN 1 Pandeglang",
    tags: ["SMA", "Organisasi", "MAN 1 Pandeglang"],
    postedBy: "Rifal Azhar Permana",
    date: "2020-11-15",
    mainImage: "/public/placeholder-story-2.jpg", // Ganti dengan gambar yang relevan
    paragraphs: [
      `Selama di MAN 1 Pandeglang, saya aktif mengikuti beberapa organisasi. Salah satunya adalah OSIS, di mana saya belajar banyak tentang kepemimpinan, kerja tim, dan bagaimana mengelola sebuah acara. Pengalaman ini sangat berharga dalam membentuk kemampuan organisasi saya.`,
      `Selain OSIS, saya juga terlibat dalam organisasi keagamaan yang membantu saya memperdalam pemahaman spiritual dan sosial. Melalui organisasi-organisasi ini, saya tidak hanya mendapatkan teman baru, tetapi juga mengembangkan soft skill yang sangat berguna di masa depan.`,
    ],
  },
  // Tambahkan konten untuk slug lainnya di sini
  "telkom-perkuliahan": {
    title: "Perkuliahan di Telkom University",
    tags: ["Kuliah", "Telkom University", "Teknik Komputer"],
    postedBy: "Rifal Azhar Permana",
    date: "2023-03-01",
    mainImage: "/public/placeholder-story-3.jpg",
    paragraphs: [
      `Memasuki dunia perkuliahan di Telkom University adalah babak baru yang penuh tantangan. Jurusan Teknik Komputer menuntut pemahaman mendalam tentang logika dan pemrograman. Setiap mata kuliah adalah petualangan baru yang mengasah kemampuan analitis dan problem-solving saya.`,
      `Lingkungan kampus yang dinamis dengan berbagai kegiatan akademik dan non-akademik membuat pengalaman kuliah semakin kaya. Saya belajar untuk beradaptasi dengan ritme perkuliahan yang cepat dan berinteraksi dengan dosen serta teman-teman dari berbagai latar belakang.`,
    ],
  },
  "webdev-belajar-dasar": {
    title: "Belajar HTML/CSS Pertama Kali",
    tags: ["Web Development", "HTML", "CSS", "Belajar Coding"],
    postedBy: "Rifal Azhar Permana",
    date: "2022-08-01",
    mainImage: "/public/placeholder-story-4.jpg",
    paragraphs: [
      `Awal mula saya terjun ke dunia web development adalah ketika pertama kali belajar HTML dan CSS. Rasanya seperti menemukan bahasa baru yang memungkinkan saya untuk menciptakan sesuatu yang bisa dilihat dan diinteraksikan oleh banyak orang. Dari sekadar membuat halaman statis, saya mulai memahami struktur dasar sebuah website.`,
      `Setiap baris kode yang saya tulis adalah langkah kecil menuju pemahaman yang lebih besar. Tantangan dalam menata layout dan membuat desain responsif menjadi motivasi untuk terus belajar dan bereksperimen. Ini adalah fondasi yang kuat untuk perjalanan saya sebagai seorang web developer.`,
    ],
  },
  "digital-copywriting": {
    title: "Membuat Konten & Copywriting",
    tags: ["Digital Media", "Content Strategy", "Copywriting"],
    postedBy: "Rifal Azhar Permana",
    date: "2023-01-15",
    mainImage: "/public/placeholder-story-5.jpg",
    paragraphs: [
      `Dunia digital media tidak hanya tentang visual, tetapi juga tentang bagaimana kita menyampaikan pesan. Saya mulai mendalami copywriting, seni menulis teks yang persuasif dan menarik. Belajar bagaimana merangkai kata-kata agar audiens tertarik dan tergerak untuk bertindak adalah tantangan yang menyenangkan.`,
      `Membuat konten yang relevan dan menarik adalah kunci. Saya bereksperimen dengan berbagai gaya penulisan dan format konten untuk menemukan apa yang paling efektif. Ini adalah proses kreatif yang terus berkembang seiring dengan tren dan kebutuhan audiens.`,
    ],
  },
  "career-project-website": {
    title: "Daftar Project Website yang Pernah Dibuat",
    tags: ["Professional Career", "Project Website", "Portfolio"],
    postedBy: "Rifal Azhar Permana",
    date: "2024-01-01",
    mainImage: "/public/placeholder-story-6.jpg",
    paragraphs: [
      `Dalam perjalanan karir profesional saya, saya telah mengerjakan berbagai proyek website, mulai dari e-commerce, portofolio pribadi, hingga sistem manajemen konten. Setiap proyek memberikan pelajaran baru dan kesempatan untuk mengaplikasikan teknologi terbaru.`,
      `Saya bangga dengan setiap website yang saya bangun, karena di dalamnya terdapat dedikasi untuk menciptakan pengalaman pengguna yang optimal dan fungsionalitas yang solid. Ini adalah bukti nyata dari kemampuan saya dalam menerjemahkan ide menjadi solusi digital yang nyata.`,
    ],
  },
  "future-target": {
    title: "Target Karier 1–3 Tahun Kedepan",
    tags: ["Visi", "Masa Depan", "Target Karier"],
    postedBy: "Rifal Azhar Permana",
    date: "2024-12-01",
    mainImage: "/public/placeholder-story-7.jpg",
    paragraphs: [
      `Dalam 1-3 tahun ke depan, saya memiliki target untuk terus mengembangkan diri sebagai seorang Full-stack Developer yang handal. Saya ingin mendalami teknologi backend seperti Node.js dan Python, serta menguasai framework frontend yang lebih kompleks.`,
      `Selain itu, saya juga berencana untuk mengambil sertifikasi profesional di bidang web development dan digital marketing untuk memperkuat kredibilitas saya. Saya percaya bahwa pembelajaran berkelanjutan adalah kunci untuk tetap relevan di industri yang terus berubah ini.`,
    ],
  },
};

const StoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>(); // Mengambil slug dari URL
  const storyContent = slug ? allStoriesContent[slug] : undefined; // Mencari konten berdasarkan slug

  if (!storyContent) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
        <BlogSidebar />
        <div className="flex-1 flex flex-col overflow-y-auto lg:ml-72">
          <main className="flex-grow p-8 lg:p-12 bg-white text-gray-800 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Story Not Found</h1>
              <p className="text-lg text-gray-600 mb-8">
                Maaf, cerita yang Anda cari tidak ditemukan.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 px-6 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto">
                <Link to="/about">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Kembali ke About</span>
                </Link>
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col lg:flex-row">
      <BlogSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto lg:ml-72">
        <main className="flex-grow p-8 lg:p-12 bg-white text-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {storyContent.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {storyContent.title}
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                POSTED BY: <span className="font-semibold text-primary">{storyContent.postedBy}</span> - {storyContent.date}
              </p>
              <div className="flex space-x-2 mb-8">
                {/* Placeholder for social share buttons */}
                <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26L21.61 21.75h-5.21L8.79 13.542 1.807 2.25H5.12L10.73 10.474 18.244 2.25zM17.29 20.75h2.139L7.03 3.75H4.892L17.29 20.75z"></path></svg>
                  Post
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-700 text-white hover:bg-blue-800">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 2.063H3.553A1.49 1.49 0 002.063 3.553v16.894c0 .823.667 1.49 1.49 1.49h16.894c.823 0 1.49-.667 1.49-1.49V3.553c0-.823-.667-1.49-1.49-1.49zM8.89 19.89H5.11V9.11h3.78v10.78zM7 7.33a2.33 2.33 0 110-4.66 2.33 2.33 0 010 4.66zm12.89 12.56h-3.78v-5.33c0-1.22-.44-2.06-1.56-2.06-1.11 0-1.78.89-1.78 2.06v5.33h-3.78V9.11h3.78v1.67c.56-.89 1.22-1.67 2.22-1.67 2.44 0 3.33 1.67 3.33 4.11v6.67z"></path></svg>
                  Share
                </Button>
              </div>
            </div>

            <img
              src={storyContent.mainImage}
              alt={storyContent.title}
              className="w-full h-auto object-cover rounded-lg shadow-md mb-8"
            />

            <div className="prose prose-lg max-w-none text-gray-800">
              {storyContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {storyContent.additionalImages && storyContent.additionalImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: storyContent.paragraphs.length * 0.1 + 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              >
                {storyContent.additionalImages.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-60 object-cover rounded-lg shadow-md border border-border transition-transform duration-300 hover:scale-105"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  />
                ))}
              </motion.div>
            )}

            <div className="mt-12 text-center">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Link to="/about">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Kembali ke About</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default StoryDetailPage;