"use client";

import React from "react";
import Footer from "@/components/Footer";
import BlogSidebar from "@/components/BlogSidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
// import RelatedPostsSection from "@/components/RelatedPostsSection"; // Import the new component - Dihapus

const StoryDetailPage = () => {
  // Placeholder content for the blog post
  const storyContent = {
    title: "Make It Happen! Go Travel!",
    tags: ["#MAKEITHAPPEN", "LIFE LESSONS", "LIFE TALK", "LUMIA", "MAKE IT HAPPEN", "TRAVEL"],
    postedBy: "Rifal Azhar Permana",
    date: "2024-11-21",
    mainImage: "/1.jpeg", // Using an existing image from public folder
    paragraphs: [
      `Jika ada kalimat "Don't work hard, work smart" saya kurang setuju. Saya lebih pilih "Work smart and work hard".`,
      `Bekerja keras adalah fondasi, tetapi bekerja cerdas adalah kunci untuk mencapai hasil yang maksimal. Dalam perjalanan hidup ini, saya selalu percaya bahwa setiap usaha yang kita lakukan, baik itu besar maupun kecil, akan membawa kita selangkah lebih dekat pada tujuan.`,
      `Perjalanan adalah salah satu cara terbaik untuk belajar dan tumbuh. Setiap tempat baru, setiap budaya yang berbeda, dan setiap tantangan yang dihadapi di perjalanan memberikan pelajaran berharga yang tidak bisa didapatkan di bangku sekolah. Ini adalah investasi terbaik untuk diri sendiri.`,
      `Jadi, jangan ragu untuk mewujudkan impian Anda. Buatlah rencana, bekerja keras dan cerdas, dan jangan takut untuk menjelajahi dunia. Karena pada akhirnya, pengalaman adalah guru terbaik, dan setiap langkah adalah bagian dari cerita hidup yang luar biasa.`,
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row"> {/* Root container: flex-col on mobile, flex-row on large */}
      <BlogSidebar /> {/* On large screens, this is fixed. On mobile, it's part of the flex-col flow */}
      <div className="flex-1 flex flex-col overflow-y-auto lg:ml-72"> {/* This div will contain the main content and footer, and will be scrollable */}
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
          {/* <RelatedPostsSection /> Dihapus */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default StoryDetailPage;