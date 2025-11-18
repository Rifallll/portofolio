"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brush, Share2 } from "lucide-react"; // Icons for the features

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Generate unique anime characters with advanced AI algorithms, bringing your imagination to life.",
    },
    {
      icon: Brush,
      title: "Customizable Styles",
      description: "Choose from a wide range of artistic styles, colors, and attributes to perfectly match your vision.",
    },
    {
      icon: Share2,
      title: "Easy Sharing & Export",
      description: "Download your creations in high resolution and share them instantly across your favorite platforms.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Simple steps to create your perfect anime character
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border flex flex-col items-center text-center">
              <CardHeader className="p-0 mb-4">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl font-bold text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;