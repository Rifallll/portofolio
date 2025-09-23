import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillItemProps {
  title: string;
  proficiency: number; // Percentage from 0-100
  level: string; // e.g., "Expert"
}

const SkillItem: React.FC<SkillItemProps> = ({ title, proficiency, level }) => {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-600">PROFICIENCY LEVEL</span>
          <span className="text-lg font-bold text-gray-900">{proficiency}% {level}</span>
        </div>
        <Progress value={proficiency} className="h-2 bg-gray-200" indicatorClassName="bg-gray-900" />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
          <span>Expert</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillItem;