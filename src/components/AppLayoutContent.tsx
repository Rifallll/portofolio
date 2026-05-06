"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BootSequence from "./BootSequence";
import ParticleSystem from "./ParticleSystem";
import { CyberCursor } from "./ui/CyberCursor";
import { HackerTerminal } from "./HackerTerminal";
import { MatrixRain } from "./ui/MatrixRain";
import PremiumNavbar from "@/components/PremiumNavbar";
import { PersonSchema, WebSiteSchema } from "./SEOSchema";

export default function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"cyan" | "green" | "red">("cyan");

  useEffect(() => {
    if (ghostMode) {
      document.body.classList.add("stealth-mode");
    } else {
      document.body.classList.remove("stealth-mode");
    }
  }, [ghostMode]);

  useEffect(() => {
    document.body.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("has_booted");
    if (hasBooted) {
      setIsLoading(false);
    }
  }, []);

  const handleBootComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("has_booted", "true");
  };

  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {isLoading && <BootSequence onComplete={handleBootComplete} />}
      
      {/* SEO Structured Data */}
      <PersonSchema />
      <WebSiteSchema />

      <CyberCursor />
      <HackerTerminal
        onMatrixToggle={() => setMatrixActive(!matrixActive)}
        onGhostToggle={() => setGhostMode(!ghostMode)}
        onThemeChange={(theme) => setActiveTheme(theme)}
      />
      <MatrixRain isActive={matrixActive} />
      <ParticleSystem />
      {!isAdminPage && <PremiumNavbar />}
      
      <main>
        {children}
      </main>
    </>
  );
}
