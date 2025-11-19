"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyJourneySection = () => {
  return (
    <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-primary">My Journey</CardTitle>
      </CardHeader>
      <CardContent className="p-0 text-lg text-muted-foreground space-y-6">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <img
            src="/profile-about.png" // Pastikan gambar ini ada di folder public Anda
            alt="My Journey"
            className="w-full md:w-1/3 h-auto rounded-lg object-cover mb-6 md:mb-0 shadow-md border border-border"
          />
          <div className="md:w-2/3 space-y-4">
            <p>
              Hello! I'm Rifal Azhar Permana, a passionate Web Developer with a strong drive to create innovative and efficient digital solutions. My journey into web development began with a fascination for how technology can solve real-world problems and enhance user experiences.
            </p>
            <p>
              Over the years, I've honed my skills in both front-end and back-end development, focusing on building responsive, high-performance, and user-friendly web applications. I thrive on transforming complex requirements into scalable solutions using modern web technologies, always prioritizing code quality, security, and optimal user experience.
            </p>
            <p>
              I am a collaborative team player who enjoys working in Agile environments, constantly seeking to leverage the latest industry trends to deliver innovative digital products that drive business growth. I'm always looking for new challenges and opportunities to continue learning and growing in this dynamic field.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyJourneySection;