import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
// Removed other portfolio sections as they are not part of the new design

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      {/* Other sections like SkillsSection, ProjectsSection, AboutSection, CertificatesSection, ContactSection are removed for this new design */}
    </div>
  );
};

export default Index;