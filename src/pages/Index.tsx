import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
// import TestimonialsSection from "@/components/TestimonialsSection"; // Remove the import

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      {/* Remove the TestimonialsSection here */}
    </div>
  );
};

export default Index;