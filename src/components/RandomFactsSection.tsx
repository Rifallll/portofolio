"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const RandomFactsSection = () => {
  return (
    <section id="random-facts" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/public/yoda.png" // Placeholder for Yoda image
              alt="Yoda on a monitor"
              className="max-w-full h-auto rounded-lg shadow-2xl border border-border transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Random Facts List */}
          <div className="md:w-1/2 text-left">
            <h3 className="text-4xl font-bold text-primary mb-8 flex items-center space-x-3">
              <Lightbulb className="h-8 w-8" />
              <span>Random Facts</span>
            </h3>
            <ul className="list-none text-lg text-muted-foreground space-y-4">
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I'm slightly addicted to social media.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>Gardening is my zen time.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I want to live on Pandora.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I'm a bit of a clean freak.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I love to cook (and eat).</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I'm into interior design.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I enjoy creating things.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>Yoda is my mentor.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-2xl leading-none">&bull;</span>
                <span>I drink a lot of tea.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomFactsSection;