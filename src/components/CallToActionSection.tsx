"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquareText, Code } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Ready to Start a Project?</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Whether you have a question, a project idea, or just want to say hello, feel free to reach out. I'm always open to new opportunities and collaborations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <Link to="/contact">
              <MessageSquareText className="h-5 w-5" />
              <span>Contact Me</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <Link to="/projects">
              <Code className="h-5 w-5" />
              <span>View My Projects</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;