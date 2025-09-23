import React from "react";
import { Progress as ShadcnProgress, ProgressProps } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps extends ProgressProps {
  indicatorClassName?: string;
}

const CustomProgress: React.FC<CustomProgressProps> = ({
  value,
  className,
  indicatorClassName,
  ...props
}) => {
  return (
    <ShadcnProgress
      value={value}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ShadcnProgress>
  );
};

export { CustomProgress };