"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Server } from "lucide-react";

const WhatIDoSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <Card className="p-6 shadow-lg rounded-xl bg-card border border-border flex flex-col h-full">
        <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-3">
          <Code className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-bold text-foreground">Frontend Development</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-lg text-muted-foreground space-y-2">
          <p>I build engaging and responsive user interfaces that provide excellent user experiences.</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>UI/UX Implementation</li>
            <li>Responsive Design</li>
            <li>State Management</li>
            <li>API Integration</li>
            <li>Performance Optimization</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="p-6 shadow-lg rounded-xl bg-card border border-border flex flex-col h-full">
        <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-3">
          <Server className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-bold text-foreground">Backend Development</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-lg text-muted-foreground space-y-2">
          <p>I develop robust and scalable server-side logic and databases to power web applications.</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>API Design & Development</li>
            <li>Database Management</li>
            <li>Authentication & Authorization</li>
            <li>Server Deployment</li>
            <li>System Architecture</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatIDoSection;