import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "./SectionHeader";
import { MapPin, Phone, Mail, Instagram, Linkedin, GraduationCap, Code, Lightbulb, Wrench, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <SectionHeader
          title="About Me"
          description="Learn more about my journey and what drives me"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
          {/* Left Column: Profile Card & Contact Info */}
          <Card className="p-8 shadow-lg rounded-xl bg-card border border-border flex flex-col items-center">
            <img
              src="/profile-image-new.jpg"
              alt="Rifal Azhar Permana"
              className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-primary/20"
            />
            <h3 className="text-3xl font-bold text-foreground mb-2">Rifal Azhar Permana</h3>
            <p className="text-xl text-muted-foreground mb-4">Web Developer</p>

            <div className="space-y-4 w-full text-left mt-6">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Pandeglang, Indonesia</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+6285217421701" className="font-medium text-foreground hover:text-primary transition-colors">+6285217421701</a>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:permanarifal269@gmail.com" className="font-medium text-foreground hover:text-primary transition-colors">permanarifal269@gmail.com</a>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="h-5 w-5 text-primary" />
                <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">@your_instagram_handle</a>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="h-5 w-5 text-primary" />
                <a href="https://www.linkedin.com/in/rifalazharpermana" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">Rifal Azhar Permana</a>
              </div>
            </div>
          </Card>

          {/* Right Column: Main Content - Multiple Cards */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-bold text-primary">Rifal Azhar Permana</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg text-muted-foreground">
                <p>I am an ambitious and enthusiastic web developer passionate about creating innovative and efficient digital solutions. I believe that every space should tell a story, combining looks with functionality. I pay close attention to details and enjoy working with different textures and colors. My goal is to turn ordinary spaces into something special.</p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
              <CardHeader className="p-0 mb-4 flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold text-foreground">Education</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg text-muted-foreground space-y-4">
                <div>
                  <p className="font-semibold text-foreground">Universitas Sultan Ageng Tirtayasa</p>
                  <p>Computer Engineering (2021-2025)</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">SMA Negeri 1 Pandeglang</p>
                  <p>(2018-2021)</p>
                </div>
              </CardContent>
            </Card>

            {/* Soft Skills */}
            <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
              <CardHeader className="p-0 mb-4 flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold text-foreground">Soft Skills</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg text-muted-foreground grid grid-cols-2 gap-y-2">
                <span>Problem Solving</span>
                <span>Critical Thinking</span>
                <span>Teamwork</span>
                <span>Communication</span>
                <span>Adaptability</span>
                <span>Leadership</span>
                <span>Goal Oriented</span>
                <span>Eye for Detail</span>
              </CardContent>
            </Card>

            {/* Technical Skills (combining Digital Skills & Tools) */}
            <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
              <CardHeader className="p-0 mb-4 flex items-center space-x-2">
                <Wrench className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold text-foreground">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg text-muted-foreground grid grid-cols-2 gap-y-2">
                <span>Web Development</span>
                <span>UI/UX Design</span>
                <span>Database Management</span>
                <span>Version Control (Git)</span>
                <span>Cloud Platforms</span>
                <span>API Integration</span>
                <span>VS Code</span>
                <span>Postman</span>
                <span>Docker</span>
              </CardContent>
            </Card>

            {/* Language Proficiency */}
            <Card className="p-8 shadow-lg rounded-xl bg-card border border-border text-left">
              <CardHeader className="p-0 mb-4 flex items-center space-x-2">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold text-foreground">Language Proficiency</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg text-muted-foreground space-y-1">
                <p>Indonesian (Native)</p>
                <p>English (Intermediate)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;