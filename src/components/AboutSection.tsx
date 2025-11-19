import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "./SectionHeader";
import { Mail, Phone, Instagram, Linkedin, GraduationCap, Code, Lightbulb, BookOpen, Tool, Globe } from "lucide-react";

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
              src="/profile-about.png" // Updated image path
              alt="Rifal Azhar Permana"
              className="h-64 w-full object-cover rounded-xl mb-6 border-4 border-primary/20"
            />
            <h3 className="text-3xl font-bold text-foreground mb-2">Rifal Azhar Permana</h3>
            <p className="text-xl text-muted-foreground mb-4">Web Developer</p>
            <p className="text-md text-muted-foreground max-w-xs">
              I am an ambitious and enthusiastic web developer passionate about creating innovative and efficient digital solutions.
            </p>
          </Card>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-left">
            {/* Education & Digital Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Education</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground space-y-2">
                  <div>
                    <p className="font-semibold text-foreground">High School</p>
                    <p>SMA Negeri 1 Pandeglang (2018-2021)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Undergraduate</p>
                    <p>Universitas Sultan Ageng Tirtayasa (2021-2025)</p>
                    <p>Computer Engineering</p>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Skills Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <Code className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Digital Skills</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground grid grid-cols-2 gap-y-2">
                  <span>Web Development</span>
                  <span>UI/UX Design</span>
                  <span>Database Management</span>
                  <span>Version Control (Git)</span>
                  <span>Cloud Platforms</span>
                  <span>API Integration</span>
                </CardContent>
              </Card>
            </div>

            {/* Interests, Soft Skills, Tools & Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Interests Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Interests</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground space-y-1">
                  <p>Web Development</p>
                  <p>Technology Trends</p>
                  <p>Reading</p>
                  <p>Gaming</p>
                  <p>Photography</p>
                </CardContent>
              </Card>

              {/* Soft Skills Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground space-y-1">
                  <p>Problem Solving</p>
                  <p>Critical Thinking</p>
                  <p>Teamwork</p>
                  <p>Communication</p>
                  <p>Adaptability</p>
                </CardContent>
              </Card>

              {/* Tools & Platforms Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <Tool className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Tools & Platforms</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground space-y-1">
                  <p>VS Code</p>
                  <p>Postman</p>
                  <p>Docker</p>
                  <p>Jira</p>
                  <p>Slack</p>
                </CardContent>
              </Card>
            </div>

            {/* Language & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Language</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground space-y-1">
                  <p>Indonesian (Native)</p>
                  <p>English (Intermediate)</p>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="p-6 shadow-lg bg-card border border-border">
                <CardHeader className="p-0 mb-4 flex flex-row items-center space-x-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Contact</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-lg text-muted-foreground space-y-2">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                    <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@your_instagram_handle</a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href="mailto:permanarifal269@gmail.com" className="hover:text-primary transition-colors">permanarifal269@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href="tel:+6285217421701" className="hover:text-primary transition-colors">+6285217421701</a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                    <a href="https://www.linkedin.com/in/rifalazharpermana" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Rifal Azhar Permana</a>
                  </div>
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