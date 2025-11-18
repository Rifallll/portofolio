import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stamp, ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  categories: string[]; // Menambahkan properti categories
  liveDemoLink?: string;
  codeLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  categories, // Menerima properti categories
  liveDemoLink,
  codeLink,
}) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl flex flex-col justify-between h-full min-h-[250px] bg-card border border-border">
      <CardHeader className="pr-4"> {/* Menambahkan pr-4 di sini */}
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
          <Stamp className="h-5 w-5 text-primary" />
        </div>
        <CardDescription className="text-muted-foreground text-left mb-4">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          {liveDemoLink && (
            <Button variant="outline" className="flex items-center space-x-1 border-border text-foreground hover:bg-muted" asChild>
              <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
          {codeLink && (
            <Button variant="outline" className="flex items-center space-x-1 border-border text-foreground hover:bg-muted" asChild>
              <a href={codeLink} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span>Code</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;