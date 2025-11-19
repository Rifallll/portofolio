"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RoleSplitSection = () => {
  return (
    <section id="role-split" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Part Designer */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-foreground mb-4">Part Designer</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>UI Design</li>
              <li>UX Design</li>
              <li>Design Systems</li>
              <li>Interaction Design</li>
              <li>"Making it pop"</li>
            </ul>
          </div>

          {/* Pie Chart */}
          <div className="flex justify-center items-center">
            <div className="relative w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center text-foreground font-semibold text-lg">
              {/* This is a simplified CSS pie chart. For a real chart, consider a library like Recharts. */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    hsl(var(--primary)) 0% 60%,
                    hsl(var(--foreground)) 60% 100%
                  )`,
                }}
              ></div>
              <div className="absolute w-40 h-40 rounded-full bg-secondary z-10"></div> {/* Inner circle to create donut effect */}
              <div className="absolute z-20 flex flex-col">
                <span className="text-primary">60% Designer</span>
                <span className="text-foreground">40% Coder</span>
              </div>
            </div>
          </div>

          {/* Part Coder */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-foreground mb-4">Part Coder</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Front-end development</li>
              <li>HTML / CSS</li>
              <li>JavaScript (kinda)</li>
              <li>Swearing at my computer</li>
              <li>Eating pizza</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSplitSection;