import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react"; // Import LucideIcon type

interface SkillItemProps {
  title: string;
  proficiency: number; // Percentage from 0-100
  level: string; // e.g., "Expert"
  icon: LucideIcon; // Add icon prop
}

const SkillItem: React.FC<SkillItemProps> = ({ title, proficiency, level, icon: Icon }) => {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full"> {/* Menambahkan flex flex-col h-full */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold text-gray-900">{title}</CardTitle>
        <Icon className="h-6 w-6 text-gray-700" /> {/* Render the icon */}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-end"> {/* Menambahkan flex flex-col flex-grow justify-end */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">PROFICIENCY LEVEL</span>
          <span className="text-lg font-bold text-gray-900">{proficiency}% {level}</span>
        </div>
        <Progress value={proficiency} className="h-2 bg-gray-200" />
        <div className="relative w-full mt-2 flex justify-between text-xs text-gray-500">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillItem;