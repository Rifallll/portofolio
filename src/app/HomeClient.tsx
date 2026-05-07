"use client";

import { Suspense, lazy } from "react";
import OceanHero from "@/components/OceanHero";
import AboutHeroSection from "@/components/AboutHeroSection";
import AnalyticalProcessSection from "@/components/AnalyticalProcessSection";
import TechStackSection from "@/components/TechStackSection";
import SkillsSection from "@/components/SkillsSection";
import DataDashboardSection from "@/components/DataDashboardSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import { motion } from "framer-motion";

// Lazy load heavy sections
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
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
      <AnalyticalProcessSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <DataDashboardSection />

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-cyan-500 font-mono">LOADING_MODULE...</div>}>
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </motion.div>
  );
}
