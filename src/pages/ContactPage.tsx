import React from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ContactSection />
    </div>
  );
};

export default ContactPage;