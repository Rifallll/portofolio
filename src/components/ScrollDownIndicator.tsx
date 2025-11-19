"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

interface ScrollDownIndicatorProps {
  targetSectionId: string;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({ targetSectionId }) => {
  const scrollToSection = useSmoothScroll();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => scrollToSection(targetSectionId)}
        className="animate-bounce text-primary hover:text-primary/80"
        aria-label="Scroll down to next section"
      >
        <ChevronDown className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default ScrollDownIndicator;