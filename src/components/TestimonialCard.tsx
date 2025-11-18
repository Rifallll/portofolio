"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  testimonial,
}) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border flex flex-col h-full">
      <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
        <Quote className="h-8 w-8 text-primary mb-4 opacity-70" />
        <p className="text-lg text-foreground italic mb-6 leading-relaxed">
          "{testimonial}"
        </p>
        <div className="flex items-center mt-auto">
          <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;