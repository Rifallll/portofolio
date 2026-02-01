import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFound from "./pages/NotFound";
import DesignSystemPage from "./pages/DesignSystemPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import CustomCursor from "./components/CustomCursor";
import ParticleSystem from "./components/ParticleSystem";
import CommandCenter from "./components/CommandCenter";
import PageTransition from "./components/PageTransition";


import PremiumNavbar from "@/components/PremiumNavbar";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor /> {/* Menambahkan Kursor Kustom */}
        <CommandCenter /> {/* Terminal Rahasia */}
        <ParticleSystem /> {/* Background Particle Effect */}
        <PremiumNavbar /> {/* GLOBAL NAVBAR - FIXED Z-INDEX ISSUE */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="/certificates" element={<PageTransition><CertificatesPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/project/:id" element={<PageTransition><ProjectDetailPage /></PageTransition>} />

            {/* Catch-all */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const WrappedApp = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);

export default WrappedApp;