"use client";

import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";

const AboutFeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
      <Card className="p-6 shadow-lg rounded-xl bg-card border border-border flex flex-col items-center text-center">
        <Briefcase className="h-8 w-8 text-primary mb-3" />
        <CardTitle className="text-xl font-semibold text-foreground mb-1">Experience</CardTitle>
        <p className="text-sm text-muted-foreground">Building Web Solutions</p>
      </Card>
      <Card className="p-6 shadow-lg rounded-xl bg-card border border-border flex flex-col items-center text-center">
        <GraduationCap className="h-8 w-8 text-primary mb-3" />
        <CardTitle className="text-xl font-semibold text-foreground mb-1">Education</CardTitle>
        <p className="text-sm text-muted-foreground">Computer Engineering</p>
      </Card>
      <Card className="p-6 shadow-lg rounded-xl bg-card border border-border flex flex-col items-center text-center">
        <HeartHandshake className="h-8 w-8 text-primary mb-3" />
        <CardTitle className="text-xl font-semibold text-foreground mb-1">Collaboration</CardTitle>
        <p className="text-sm text-muted-foreground">Teamwork & Innovation</p>
      </Card>
    </div>
  );
};

export default AboutFeatureCards;