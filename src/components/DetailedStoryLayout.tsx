"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Import Button
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface DetailedStoryLayoutProps {
  title: string;
  paragraphs: string[];
  images: { src: string; alt: string }[];
}

const DetailedStoryLayout: React.FC<DetailedStoryLayoutProps> = ({
  title,
  paragraphs,
  images,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-screen-lg relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-xl" // Menghapus shadow, border, dan bg-card
        >
          <div className="pb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground text-center">
              {title}
            </h1>
          </div>
          <div>
            <div className="space-y-8 mb-12">
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index + 0.3 }}
                  className="text-lg text-muted-foreground leading-relaxed text-justify"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: paragraphs.length * 0.1 + 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              >
                {images.map((image, index) => (
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
                onClick={() => navigate("/my-story-page")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Kembali ke Cerita Saya</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailedStoryLayout;