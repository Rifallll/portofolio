import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Import Separator
import SectionHeader from "./SectionHeader";
import { Mail, Phone, Instagram, Linkedin, GraduationCap, Code, Lightbulb, BookOpen, Wrench, Globe } from "lucide-react";

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
              src="/profile-about.png"
              alt="Rifal Azhar Permana"
              className="h-64 w-full object-cover rounded-xl mb-6 border-4 border-primary/20"
            />
            <h3 className="text-3xl font-bold text-foreground mb-2">Rifal Azhar Permana</h3>
            <p className="text-xl text-muted-foreground mb-4">Web Developer</p>
            <p className="text-md text-muted-foreground max-w-xs">
              I am an ambitious and enthusiastic web developer passionate about creating innovative and efficient digital solutions.
            </p>
          </Card>

          {/* Right Column: Integrated Details Block */}
          <Card className="lg:col-span-2 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col text-left bg-card border border-border">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold text-primary">My Journey & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span>Education</span>
                </h3>
                <div className="text-lg text-muted-foreground space-y-2">
                  <div>
                    <p className="font-semibold text-foreground">High School</p>
                    <p>SMA Negeri 1 Pandeglang (2018-2021)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Undergraduate</p>
                    <p>Universitas Sultan Ageng Tirtayasa (2021-2025)</p>
                    <p>Computer Engineering</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-border" /> {/* Separator */}

              {/* Digital Skills */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <Code className="h-6 w-6 text-primary" />
                  <span>Digital Skills</span>
                </h3>
                <div className="text-lg text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  <span>Web Development</span>
                  <span>UI/UX Design</span>
                  <span>Database Management</span>
                  <span>Version Control (Git)</span>
                  <span>Cloud Platforms</span>
                  <span>API Integration</span>
                </div>
              </div>

              <Separator className="my-6 bg-border" /> {/* Separator */}

              {/* Interests */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span>Interests</span>
                </h3>
                <div className="text-lg text-muted-foreground space-y-1">
                  <p>Web Development</p>
                  <p>Technology Trends</p>
                  <p>Reading</p>
                  <p>Gaming</p>
                  <p>Photography</p>
                </div>
              </div>

              <Separator className="my-6 bg-border" /> {/* Separator */}

              {/* Soft Skills */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <span>Soft Skills</span>
                </h3>
                <div className="text-lg text-muted-foreground space-y-1">
                  <p>Problem Solving</p>
                  <p>Critical Thinking</p>
                  <p>Teamwork</p>
                  <p>Communication</p>
                  <p>Adaptability</p>
                </div>
              </div>

              <Separator className="my-6 bg-border" /> {/* Separator */}

              {/* Tools & Platforms */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <Wrench className="h-6 w-6 text-primary" />
                  <span>Tools & Platforms</span>
                </h3>
                <div className="text-lg text-muted-foreground space-y-1">
                  <p>VS Code</p>
                  <p>Postman</p>
                  <p>Docker</p>
                  <p>Jira</p>
                  <p>Slack</p>
                </div>
              </div>

              <Separator className="my-6 bg-border" /> {/* Separator */}

              {/* Language */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <span>Language</span>
                </h3>
                <div className="text-lg text-muted-foreground space-y-1">
                  <p>Indonesian (Native)</p>
                  <p>English (Intermediate)</p>
                </div>
              </div>

              <Separator className="my-6 bg-border" /> {/* Separator */}

              {/* Contact */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>Contact</span>
                </h3>
                <div className="text-lg text-muted-foreground space-y-2">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;