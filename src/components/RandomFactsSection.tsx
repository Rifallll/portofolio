"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RandomFactsSection = () => {
  return (
    <section id="random-facts" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/public/yoda.png" // Placeholder for Yoda image
              alt="Yoda on a monitor"
              className="max-w-full h-auto rounded-lg shadow-lg border border-border"
            />
          </div>

          {/* Random Facts List */}
          <div className="md:w-1/2 text-left">
            <h3 className="text-3xl font-bold text-primary mb-6">Random facts</h3>
            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-3">
              <li>I'm slightly addicted to social media.</li>
              <li>Gardening is my zen time.</li>
              <li>I want to live on Pandora.</li>
              <li>I'm a bit of a clean freak.</li>
              <li>I love to cook (and eat).</li>
              <li>I'm into interior design.</li>
              <li>I enjoy creating things.</li>
              <li>Yoda is my mentor.</li>
              <li>I drink a lot of tea.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomFactsSection;