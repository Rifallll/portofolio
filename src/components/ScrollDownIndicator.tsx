"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link

interface ScrollDownIndicatorProps {
  targetSectionId: string; // Now represents a path
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({ targetSectionId }) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <Button
        variant="ghost"
        size="icon"
        asChild // Use asChild to pass props to the Link component
        className="animate-bounce text-primary hover:text-primary/80"
        aria-label="Scroll down to next section"
      >
        <Link to={targetSectionId}>
          <ChevronDown className="h-8 w-8" />
        </Link>
      </Button>
    </div>
  );
};

export default ScrollDownIndicator;