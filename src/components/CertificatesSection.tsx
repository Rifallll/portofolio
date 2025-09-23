import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import { Button } from "@/components/ui/button"; // Import Button component

const certificatesData = [
  {
    title: "Machine Learning",
    issuer: "DQLab",
    date: "2023",
    link: "#", // Ganti dengan tautan sertifikat yang sebenarnya
  },
  {
    title: "Data Analyst",
    issuer: "Digital Talent Scholarship",
    date: "2023",
    link: "#",
  },
  {
    title: "Komunikasi Efektif",
    issuer: "MySkill",
    date: "2023",
    link: "#",
  },
  {
    title: "UI/UX Design",
    issuer: "Gamelab Indonesia",
    date: "2023",
    link: "#",
  },
  {
    title: "Video Content Creator",
    issuer: "Thematic Academy",
    date: "2023",
    link: "#",
  },
  {
    title: "SQL Fundamental",
    issuer: "Coding Studio",
    date: "2023",
    link: "#",
  },
  {
    title: "Python Programming",
    issuer: "Rocket Digital Academy",
    date: "2023",
    link: "#",
  },
  {
    title: "TOAFL (Test of Arabic as a Foreign Language)",
    issuer: "Al Arabiya",
    date: "2022",
    link: "#",
  },
  {
    title: "Public Speaking",
    issuer: "Bicara.Official",
    date: "2022",
    link: "#",
  },
];

const CertificatesSection = () => {
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const displayedCertificates = showAllCertificates
    ? certificatesData
    : certificatesData.slice(0, 6);

  const handleToggleShowAll = () => {
    setShowAllCertificates(!showAllCertificates);
  };

  return (
    <section id="certificates" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
        <p className="text-lg text-gray-600 mb-12">
          Certifications I have obtained to enhance my skills
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCertificates.map((certificate, index) => (
            <CertificateCard key={index} {...certificate} />
          ))}
        </div>

        {certificatesData.length > 6 && ( // Hanya tampilkan tombol jika ada lebih dari 6 sertifikasi
          <Button
            onClick={handleToggleShowAll}
            className="mt-12 bg-gray-900 text-white hover:bg-gray-700 px-8 py-4 text-lg"
          >
            {showAllCertificates ? "Show Less" : "View All Certificates"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;