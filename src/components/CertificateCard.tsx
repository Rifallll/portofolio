import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  issuer,
  date,
  link,
}) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
          <Award className="h-5 w-5 text-gray-900" />
        </div>
        <CardDescription className="text-gray-600 text-left">
          {issuer} - {date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {link && (
          <Button variant="outline" className="flex items-center space-x-1 mt-auto" asChild>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span>View Certificate</span>
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificateCard;