import { Suspense, lazy } from "react";
import OceanHero from "@/components/OceanHero";
import AboutHeroSection from "@/components/AboutHeroSection";
import TechStackSection from "@/components/TechStackSection";
import SkillsSection from "@/components/SkillsSection";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

// Lazy load heavy sections
const FeaturedProjectsSection = lazy(() => import("@/components/FeaturedProjectsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useSEO("Rifal Azhar | Creative Developer & Data Analyst", "Portfolio of Rifal Azhar Permana. Blending Data Science with High-End Web Development to create immersive digital experiences.");

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

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-cyan-500 font-mono">LOADING_MODULE...</div>}>
        <FeaturedProjectsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;