"use client";

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const storyData = [
  {
    title: "Awal Perjalananku",
    description: `Sejak kecil, rasa ingin tahuku terhadap teknologi tumbuh tanpa batas. Aku sering duduk berlama-lama di depan komputer tua di rumah, mencoba memahami apa yang terjadi di balik layar setiap kali aku menekan sebuah tombol. Dari tampilan sederhana hingga sistem yang terlihat rumit, semuanya membuatku penasaran. Saat itu aku tidak tahu, tetapi momen kecil ini menjadi pintu pertama menuju dunia yang kelak menjadi jalur karierku.`,
    imagePrompt: "warm nostalgic desk setup with an old computer, gentle light, cinematic shadows, hands typing on a keyboard, early technology exploration mood, minimalistic professional photography",
    imageSrc: "/placeholder-story-1.jpg",
    imageAlt: "Nostalgic desk setup with an old computer"
  },
  {
    title: "Masa Sekolah di MAN 1 Pandeglang",
    description: `Ketika aku mulai bersekolah di MAN 1 Pandeglang, rasa penasaran itu berubah menjadi pengalaman eksplorasi yang lebih nyata. Di sini aku mulai mengenal struktur web, dasar HTML, dan bagaimana sebuah halaman sederhana bisa hidup di layar. Setiap kali sebuah kode berhasil berjalan, aku merasa seperti menemukan potongan puzzle baru dari dunia digital. Pengalaman sekolah ini menjadi pijakan penting dalam membangun arah yang akan aku pilih.`,
    imagePrompt: "clean modern classroom scene with a laptop on a desk, notebooks, natural daylight, academic atmosphere, no identifiable faces, minimal professional style photo",
    imageSrc: "/placeholder-story-2.jpg",
    imageAlt: "Modern classroom scene with a laptop"
  },
  {
    title: "Jatuh Cinta pada Web Development",
    description: `Momen ketika aku menyadari bahwa web development bukan sekadar hobi menjadi titik balik penting dalam perjalanan ini. Setiap baris kode yang kutulis terasa seperti menciptakan sesuatu dari ketidakadaan. Saat aku berhasil membuat tampilan yang berjalan sesuai keinginan, ada rasa kepuasan yang sulit dijelaskan. Dari eksperimen-eksperimen kecil inilah aku akhirnya jatuh cinta pada dunia pengembangan web.`,
    imagePrompt: "modern coding workspace with laptop showing HTML/CSS code, focused lighting, clean and sleek desk setup, tech-driven environment, crisp professional photography",
    imageSrc: "/placeholder-story-3.jpg",
    imageAlt: "Modern coding workspace with laptop"
  },
  {
    title: "Kuliah di Telkom University – Teknik Komputer",
    description: `Setelah lulus, aku memilih untuk memperluas pemahaman teknisku dengan melanjutkan pendidikan di Telkom University, jurusan Teknik Komputer. Kampus ini membuka ruang baru dengan materi yang jauh lebih kompleks: sistem komputer, jaringan, arsitektur perangkat keras, hingga pemrograman tingkat lanjut. Lingkungan akademik yang disiplin dan dinamis membuatku membangun pola pikir yang lebih terstruktur dan analitis dalam menghadapi tantangan teknologi.`,
    imagePrompt: "modern university campus inspired by Telkom University red building, clean architectural composition, bright daylight, academic atmosphere, professional campus photography",
    imageSrc: "/placeholder-story-4.jpg",
    imageAlt: "Modern university campus"
  },
  {
    title: "Membangun Karier Web Development Secara Profesional",
    description: `Selama menjalani perkuliahan, web development bukan lagi sekadar sesuatu yang kupelajari—tetapi mulai menjadi bagian nyata dari karierku. Aku membangun website untuk berbagai kebutuhan: mulai dari UMKM, personal brand, hingga proyek skala lebih besar. Setiap website memberikan tantangan baru, mulai dari UI/UX, performa, hingga strategi struktur konten. Kini aku telah membangun lebih dari dua puluh website, masing-masing menjadi perjalanan belajar yang memperkuat kualitas kerjaku.`,
    imagePrompt: "premium developer workspace with dual monitors showing web dashboards and layouts, soft ambient lighting, modern corporate style, detail-rich professional photography",
    imageSrc: "/placeholder-story-5.jpg",
    imageAlt: "Premium developer workspace with dual monitors"
  },
  {
    title: "Memperluas Keahlian ke Digital Media & Content Strategy",
    description: `Ketika semakin dalam masuk ke industri digital, aku menyadari bahwa website hanyalah fondasi awal. Konten, strategi komunikasi, dan identitas digital adalah elemen yang membuat sebuah produk benar-benar hidup. Karena itu, aku memperluas fokusku ke content strategy, digital media, dan social media management. Aku mulai merancang alur konten, membuat visual direction, hingga menyusun strategi kampanye digital yang mampu memberikan peningkatan engagement signifikan.`,
    imagePrompt: "creative content strategy workspace with content boards, sticky notes, charts, social media analytics on laptop, bright lighting, dynamic collaborative mood, professional photography",
    imageSrc: "/placeholder-story-6.jpg",
    imageAlt: "Creative content strategy workspace"
  },
  {
    title: "Pengalaman Profesional & Pencapaian",
    description: `Dalam beberapa tahun terakhir, aku berkesempatan membantu berbagai brand membangun kehadiran digital mereka. Beberapa kampanye yang aku rancang berhasil meningkatkan engagement hingga 150%. Website yang kubuat membantu brand tampil lebih profesional dan kredibel. Pengalaman ini membentuk pemahamanku tentang pentingnya strategi digital yang kuat, efektif, dan berorientasi pada hasil.`,
    imagePrompt: "professional analytics dashboard with rising graphs, hand pointing at presentation screen, business environment, clean workspace, high-resolution corporate photography",
    imageSrc: "/placeholder-story-7.jpg",
    imageAlt: "Professional analytics dashboard"
  },
  {
    title: "Melangkah Menuju Masa Depan",
    description: `Perjalananku belum selesai—justru baru dimulai. Dunia teknologi terus berevolusi, dan aku berkomitmen untuk terus berkembang, belajar, dan menciptakan solusi digital yang tidak hanya fungsional tetapi juga bermakna. Dari rasa penasaran saat kecil hingga menjadi sebuah profesi yang sekarang aku jalani, perjalanan ini mengajarkanku bahwa inovasi tidak pernah berhenti, dan begitu juga aku.`,
    imagePrompt: "futuristic silhouette looking at glowing digital screens, soft blue lighting, modern technology aesthetic, minimalist composition, cinematic inspirational style",
    imageSrc: "/placeholder-story-8.jpg",
    imageAlt: "Futuristic silhouette looking at digital screens"
  },
];

const MyStoryPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-12">My Story</h1>

        <div className="relative mx-auto max-w-6xl">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6 items-stretch">
              {storyData.map((story, index) => (
                <div
                  key={index}
                  className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 min-w-0 px-2"
                >
                  <StoryCard {...story} delay={index * 0.1} />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-card text-foreground border-border rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 md:-left-8 hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Previous story section</span>
          </Button>
          <Button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-card text-foreground border-border rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 md:-right-8 hover:bg-muted"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Next story section</span>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyStoryPage;