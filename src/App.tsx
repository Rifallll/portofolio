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
import NotFound from "./pages/NotFound";
import MyStoryPage from "./pages/MyStoryPage";
import DesignSystemPage from "./pages/DesignSystemPage";
// import SMADetailPage from "./pages/SMADetailPage"; // Removed
// import KuliahDetailPage from "./pages/KuliahDetailPage"; // Removed


const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/my-story-page" element={<MyStoryPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            {/* Removed detail routes */}
            {/* <Route path="/my-story/sma" element={<SMADetailPage />} /> */}
            {/* <Route path="/my-story/kuliah" element={<KuliahDetailPage />} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;