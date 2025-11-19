"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "./SectionHeader";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <SectionHeader
          title="About Me"
          description="Learn more about my journey and what drives me"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
          {/* Left Column: Profile Card */}
          <Card className="p-6 max-w-sm mx-auto shadow-xl rounded-2xl bg-card border-2 border-primary/30 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <img
              src="/profile-image-new.jpg"
              alt="Rifal Azhar Permana"
              className="w-32 h-32 rounded-lg object-cover border-4 border-primary/30 shadow-md"
            />
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-foreground mb-1">Rifal Azhar Permana</h3>
              <p className="text-lg text-muted-foreground mb-3">Web Developer</p>
              <p className="text-sm text-muted-foreground">
                Experienced in building responsive, high-performance, and user-friendly web applications.
              </p>
            </div>
          </Card>

          {/* Right Column: My Story and Feature Cards */}
          <div className="space-y-8">
            {/* My Story Card */}
            <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-bold text-primary">My Story</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg text-muted-foreground space-y-4">
                <p>Hello! I'm Rifal Azhar Permana, a Web Developer with experience in building responsive and high-performance web applications. I am passionate about creating innovative and efficient digital solutions.</p>
                <p>My expertise includes front-end and back-end development, with a focus on using modern technologies to deliver exceptional user experiences. I am always looking for new challenges and opportunities to continue learning and growing in the world of web development.</p>
              </CardContent>
            </Card>

            {/* Feature Cards (Experience, Education, Collaboration) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;