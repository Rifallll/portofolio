import React from "react";
import Navbar from "@/components/Navbar";
import CertificatesSection from "@/components/CertificatesSection";

const CertificatesPage = () => {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      <Navbar />
      <CertificatesSection />
    </div>
  );
};

export default CertificatesPage;