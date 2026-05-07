import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages_legacy/Index";
import AboutPage from "./pages_legacy/AboutPage";
import SkillsPage from "./pages_legacy/SkillsPage";
import ProjectsPage from "./pages_legacy/ProjectsPage";
import CertificatesPage from "./pages_legacy/CertificatesPage";
import Contact from "./pages_legacy/Contact";
import NotFound from "./pages_legacy/NotFound";
import BootSequence from "./components/BootSequence";
import ParticleSystem from "./components/ParticleSystem";
import PageTransition from "./components/PageTransition";
// HACKER IMPORTS
import { CyberCursor } from "./components/ui/CyberCursor";
import { HackerTerminal } from "./components/HackerTerminal";
import { MatrixRain } from "./components/ui/MatrixRain";
import PremiumNavbar from "@/components/PremiumNavbar";
// ADMIN IMPORTS
import AdminLoginPage from "./pages_legacy/admin/AdminLoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./pages_legacy/admin/AdminDashboard";
// SEO IMPORTS
import { PersonSchema, WebSiteSchema } from "./components/SEOSchema";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"cyan" | "green" | "red">("cyan");

  useEffect(() => {
    // Apply Ghost Mode styles to body
    if (ghostMode) {
      document.body.classList.add("stealth-mode");
    } else {
      document.body.classList.remove("stealth-mode");
    }
  }, [ghostMode]);

  useEffect(() => {
    // Apply Theme to body
    document.body.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("has_booted");
    if (hasBooted) {
      setIsLoading(false);
    }
    // Visitor logging has been consolidated into components/HackerTerminal.tsx
  }, []);

  const handleBootComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("has_booted", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && <BootSequence onComplete={handleBootComplete} />}

        <Toaster />
        <Sonner />

        {/* SEO Structured Data */}
        <PersonSchema />
        <WebSiteSchema />

        <CyberCursor /> {/* HACKER CURSOR */}
        <HackerTerminal
          onMatrixToggle={() => setMatrixActive(!matrixActive)}
          onGhostToggle={() => setGhostMode(!ghostMode)}
          onThemeChange={(theme) => setActiveTheme(theme)}
        /> {/* CLI TERMINAL */}
        <MatrixRain isActive={matrixActive} /> {/* MATRIX RAIN OVERLAY */}
        {/* <CommandCenter />  Replaced by HackerTerminal */}
        <ParticleSystem /> {/* Background Particle Effect */}
        {!location.pathname.startsWith("/admin") && <PremiumNavbar />} {/* Hide Navbar on Admin pages */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
            <Route path="/certificates" element={<PageTransition><CertificatesPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

            {/* ADMIN ROUTES */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

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