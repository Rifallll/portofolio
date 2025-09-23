import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection"; // Import AboutSection
import ContactSection from "@/components/ContactSection";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection /> {/* Tambahkan AboutSection di sini */}
      <ContactSection />
      <MadeWithDyad />
    </div>
  );
};

export default Index;