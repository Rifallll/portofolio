import OceanHero from "@/components/OceanHero";
import AboutHeroSection from "@/components/AboutHeroSection";
import TechStackSection from "@/components/TechStackSection";
import SkillsSection from "@/components/SkillsSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#02040a] text-white relative overflow-x-hidden selection:bg-cyan-500/30"
    >
      <OceanHero />
      <TechStackSection />
      <AboutHeroSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Index;