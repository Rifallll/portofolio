import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import CertificatesSection from "@/components/CertificatesSection"; // Import komponen baru
import ContactSection from "@/components/ContactSection";
// import { MadeWithDyad } from "@/components/made-with-dyad"; // Dihapus

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <CertificatesSection /> {/* Menambahkan CertificatesSection di sini */}
      <ContactSection />
      {/* <MadeWithDyad /> Dihapus */}
    </div>
  );
};

export default Index;