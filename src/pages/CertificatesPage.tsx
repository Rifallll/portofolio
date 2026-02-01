import React from "react";
import CertificatesSection from "@/components/CertificatesSection";
import Footer from "@/components/Footer";

const CertificatesPage = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-white overflow-x-hidden">
      <div className="pt-20">
        <CertificatesSection />
      </div>
      <Footer />
    </div>
  );
};

export default CertificatesPage;