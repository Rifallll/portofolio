import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stamp, ExternalLink, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveDemoLink?: string;
  codeLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  liveDemoLink,
  codeLink,
}) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl flex flex-col justify-between h-full min-h-[250px] bg-gray-800 border-gray-700 text-white"> {/* Menyesuaikan latar belakang dan teks kartu */}
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle> {/* Mengubah text-gray-900 menjadi text-white */}
          <Stamp className="h-5 w-5 text-gray-200" /> {/* Mengubah text-gray-900 menjadi text-gray-200 */}
        </div>
        <CardDescription className="text-gray-300 text-left">{description}</CardDescription> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex flex-wrap gap-2 mb-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-100 text-xs font-medium px-2.5 py-0.5 rounded-full"
              // Menyesuaikan warna tag teknologi
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          {liveDemoLink && (
            <Button variant="outline" className="flex items-center space-x-1 border-gray-600 text-gray-200 hover:bg-gray-700" asChild> {/* Menyesuaikan warna tombol */}
              <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
          {codeLink && (
            <Button variant="outline" className="flex items-center space-x-1 border-gray-600 text-gray-200 hover:bg-gray-700" asChild> {/* Menyesuaikan warna tombol */}
              <a href={codeLink} target="_blank" rel="noopener noreferrer">
                <Code className="h-4 w-4" />
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