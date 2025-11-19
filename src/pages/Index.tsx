import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion"; // Import motion

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Animasi awal: sedikit transparan dan bergeser ke bawah
      animate={{ opacity: 1, y: 0 }} // Animasi saat ini: sepenuhnya terlihat dan di posisi normal
      exit={{ opacity: 0, y: -20 }} // Animasi keluar: sedikit transparan dan bergeser ke atas
      transition={{ duration: 0.5 }} // Durasi animasi
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />
      <HeroSection />
    </motion.div>
  );
};

export default Index;