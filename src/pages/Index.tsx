import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
// import { motion } from "framer-motion"; // Import motion - Dihapus

const Index = () => {
  return (
    // <motion.div // Dihapus
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0, y: -20 }}
    //   transition={{ duration: 0.5 }}
    //   className="min-h-screen bg-background text-foreground"
    // >
    <div className="min-h-screen bg-background text-foreground"> {/* Menggunakan div biasa */}
      <Navbar />
      <HeroSection />
    </div>
    // </motion.div> // Dihapus
  );
};

export default Index;