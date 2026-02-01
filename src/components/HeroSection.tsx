"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Waves } from "lucide-react";
import ScrollDownIndicator from "./ScrollDownIndicator";

const HeroSection = () => {
  return (
    <motion.section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-teal-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Ocean Background with God Rays */}
      <div className="absolute inset-0 overflow-hidden">
        {/* God Rays - Light from above */}
        <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-cyan-300/20 via-transparent to-transparent blur-3xl opacity-40 animate-wave-pulse" />
        <div className="absolute top-0 right-1/3 w-80 h-full bg-gradient-to-b from-blue-200/15 via-transparent to-transparent blur-3xl opacity-30 animate-wave-pulse" style={{ animationDelay: "1s" }} />

        {/* Floating Bubbles */}
        <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-cyan-400/30 rounded-full blur-sm animate-bubble-rise" />
        <div className="absolute bottom-0 left-[30%] w-3 h-3 bg-cyan-300/40 rounded-full blur-sm animate-bubble-rise" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-[50%] w-5 h-5 bg-teal-400/20 rounded-full blur-sm animate-bubble-rise" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-[70%] w-3 h-3 bg-cyan-400/35 rounded-full blur-sm animate-bubble-rise" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-[85%] w-4 h-4 bg-blue-300/25 rounded-full blur-sm animate-bubble-rise" style={{ animationDelay: "3s" }} />

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-6"
          >
            {/* Freelance Tag with Ocean vibes */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-400/30 text-cyan-300 text-sm font-medium"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>Freelance Work Available</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              <span className="block text-gradient-ocean">Dive Into</span>
              <span className="block text-gradient-biolume">Creative Depths</span>
            </h1>

            <p className="text-xl text-cyan-100/80 max-w-xl">
              A <span className="text-cyan-300 font-semibold">Digital Strategist</span> and{" "}
              <span className="text-teal-300 font-semibold">Web Developer</span> exploring the ocean of possibilities
            </p>

            {/* CTA Buttons - Ocean themed */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="group bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold px-8 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300">
                <span>View My Work</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <Waves className="mr-2 w-5 h-5" />
                <span>Explore Skills</span>
              </Button>
            </div>
          </motion.div>

          {/* Right: Floating Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative animate-float-slow">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 via-teal-500/20 to-blue-500/30 blur-2xl animate-pulse" />

              {/* Glass Card Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full p-1 bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-500 shadow-[0_0_50px_rgba(34,211,238,0.4)]">
                <div className="w-full h-full rounded-full overflow-hidden glass-card relative">
                  <img
                    src="/p.png"
                    alt="Rifal Azhar Permana"
                    className="w-full h-full object-top object-cover hover:scale-110 transition-transform duration-700"
                  />
                  {/* Water Ripple Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent mix-blend-overlay" />
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator targetSectionId="/projects" />
    </motion.section>
  );
};

export default HeroSection;