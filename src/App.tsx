import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Placeholder pages for new routes
const MyStoryPage = () => <div className="min-h-screen flex items-center justify-center text-2xl font-bold">My Story Page (Under Construction)</div>;
const DesignSystemPage = () => <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Design System Page (Under Construction)</div>;


const queryClient = new QueryClient();

const App = () => {
  const location = useLocation(); // Use useLocation hook inside App component

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait"> {/* Wrap Routes with AnimatePresence */}
          <Routes location={location} key={location.pathname}> {/* Pass location and key to Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/my-story-page" element={<MyStoryPage />} /> {/* New route */}
            <Route path="/design-system" element={<DesignSystemPage />} /> {/* New route */}
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