"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  avatarSrc,
}) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border flex flex-col justify-between h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
        <Quote className="h-6 w-6 text-primary opacity-70 mb-2" />
      </CardHeader>
      <CardContent className="text-muted-foreground italic text-left flex-grow">
        "{quote}"
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;