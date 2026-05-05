"use client";

import React from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h2 className="text-3xl font-serif font-bold text-gradient-gold mb-4 inline-block">Rifal Azhar.</h2>
            <p className="max-w-md text-muted-foreground">
              Creating magnificent digital experiences that merge technical precision with aesthetic excellence. Let's build something extraordinary.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="https://github.com/Rifallll" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rifalazharpermana" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <div className="flex flex-col space-y-3">
              <a href="/" className="text-muted-foreground hover:text-cyan-400 transition-colors w-fit group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                Home
              </a>
              <a href="/about" className="text-muted-foreground hover:text-cyan-400 transition-colors w-fit group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                About
              </a>
              <a href="/projects" className="text-muted-foreground hover:text-cyan-400 transition-colors w-fit group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                Projects
              </a>
              <a href="/blog" className="text-muted-foreground hover:text-cyan-400 transition-colors w-fit group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                Blog & Insights
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-cyan-400 transition-colors w-fit group flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                Contact
              </a>

            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>Pandeglang, Indonesia</li>
              <li>rifalazharpermana@gmail.com</li>
              <li><a href="https://www.linkedin.com/in/rifalazharpermana" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">LinkedIn Profile</a></li>
            </ul>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="mt-8 rounded-full border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rifal Azhar Permana. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <Link to="/admin/login" className="hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;