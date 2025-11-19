import React from "react";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "./SectionHeader"; // Import SectionHeader

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <SectionHeader
          title="About Me"
          description="Learn more about my journey and what drives me"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mt-12 max-w-6xl mx-auto">
          {/* Left Column: Profile Card */}
          <Card className="lg:col-span-1 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center bg-card border border-border">
            <img
              src="/1.jpeg" // Ensure this path is correct to your image in the public folder
              alt="Rifal Azhar Permana"
              className="h-64 w-full object-cover rounded-xl mb-6 border-4 border-primary/20"
            />
            <h3 className="text-3xl font-bold text-foreground mb-2">Rifal Azhar Permana</h3>
            <p className="text-xl text-muted-foreground mb-4">Web Developer</p>
            <p className="text-md text-muted-foreground max-w-xs">
              Experienced in building responsive and high-performance web applications.
            </p>
          </Card>

          {/* Right Column: My Story and Highlights */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-left">
            {/* My Story Card */}
            <Card className="p-8 shadow-lg bg-card border border-border">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-bold text-primary">My Story</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg">
                <p className="text-foreground leading-relaxed mb-4">
                  Hello! I'm Rifal Azhar Permana, a Web Developer with experience in building responsive and high-performance web applications. I am passionate about creating innovative and efficient digital solutions.
                </p>
                <p className="text-foreground leading-relaxed">
                  My expertise includes front-end and back-end development, with a focus on using modern technologies to deliver exceptional user experiences. I am always looking for new challenges and opportunities to continue learning and growing in the world of web development.
                </p>
              </CardContent>
            </Card>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-card border border-border">
                <CardContent className="flex flex-col items-center p-0">
                  <Briefcase className="h-10 w-10 text-primary mb-3" />
                  <p className="font-bold text-xl text-foreground">Experience</p>
                  <p className="text-muted-foreground">Building Web Solutions</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-card border border-border">
                <CardContent className="flex flex-col items-center p-0">
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <p className="font-bold text-xl text-foreground">Education</p>
                  <p className="text-muted-foreground">Computer Engineering</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-card border border-border">
                <CardContent className="flex flex-col items-center p-0">
                  <HeartHandshake className="h-10 w-10 text-primary mb-3" />
                  <p className="font-bold text-xl text-foreground">Collaboration</p>
                  <p className="text-muted-foreground">Teamwork & Innovation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;