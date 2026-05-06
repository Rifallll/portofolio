import React from "react";
import { motion } from "framer-motion";
import { User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutHeroSection = () => {
  return (
    <section id="about" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Ocean Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Profile Image */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-background">
              <img
                src="/p.png"
                alt="Profile"
                className="w-full h-full object-top object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6"
        >
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-300">About Me</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block text-white">Building</span>
          <span className="block text-gradient-ocean">Digital Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
        >
          A creative technologist passionate about blending{" "}
          <span className="text-cyan-400 font-semibold">design</span> and{" "}
          <span className="text-cyan-400 font-semibold">code</span> to create
          meaningful digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant="outline"
            className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
            asChild
          >
            <a href="/Rifal Azhar Permana.CV.pdf" download="Rifal Azhar Permana.CV.pdf">
              <Download className="mr-2 w-5 h-5" />
              <span>Download CV</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeroSection;