"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/rifalazharpermana", label: "GitHub" }, // Placeholder, update if user provides
    { icon: Linkedin, href: "https://www.linkedin.com/in/rifalazharpermana", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/rifalazharpermana", label: "Instagram" }, // Placeholder, update if user provides
    { icon: Mail, href: "mailto:rifalazharpermana@gmail.com", label: "Email" },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <motion.footer
      id="footer"
      className="bg-card border-t border-border py-10 mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 max-w-screen-xl text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300">
            Rifal Azhar Permana
          </Link>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Rifal Azhar Permana. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;