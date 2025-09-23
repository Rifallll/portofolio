import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SkillItemProps {
  title: string;
  proficiency: number; // Percentage from 0-100
  level: string; // e.g., "Expert"
  icon: LucideIcon; // Add icon prop
}

const SkillItem: React.FC<SkillItemProps> = ({ title, proficiency, level, icon: Icon }) => {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] bg-gray-800 border-gray-700 text-white"> {/* Menyesuaikan latar belakang dan teks kartu */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold text-white">{title}</CardTitle> {/* Mengubah text-gray-900 menjadi text-white */}
        <Icon className="h-6 w-6 text-gray-200" /> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-400">PROFICIENCY LEVEL</span> {/* Mengubah text-gray-600 menjadi text-gray-400 */}
          <span className="text-lg font-bold text-white">{proficiency}% {level}</span> {/* Mengubah text-gray-900 menjadi text-white */}
        </div>
        <Progress value={proficiency} className="h-2 bg-gray-700" /> {/* Menghapus indicatorClassName */}
        <div className="relative w-full mt-2 flex justify-between text-xs text-gray-400"> {/* Mengubah text-gray-500 menjadi text-gray-400 */}
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillItem;