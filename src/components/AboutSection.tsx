import React from "react";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-lg text-gray-600 mb-12">
          Kenali lebih jauh perjalanan saya dan apa yang mendorong saya
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mt-12 max-w-6xl mx-auto">
          {/* Left Column: Profile Card */}
          <Card className="lg:col-span-1 p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <img
              src="/1.jpeg" // Ensure this path is correct to your image in the public folder
              alt="Rifal Azhar Permana"
              className="h-64 w-full object-cover rounded-xl mb-6 border-4 border-gray-200"
            />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Rifal Azhar Permana</h3>
            <p className="text-xl text-gray-700 mb-4">Social Media Specialist</p>
            <p className="text-md text-gray-600 max-w-xs">
              Berpengalaman dalam mengembangkan strategi konten dan meningkatkan kehadiran merek.
            </p>
          </Card>

          {/* Right Column: My Story and Highlights */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-center">
            {/* My Story Card */}
            <Card className="p-8 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-bold text-gray-900">My Story</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Halo! Saya Rifal Azhar Permana, seorang Spesialis Media Sosial berpengalaman dengan rekam jejak terbukti dalam mengembangkan dan melaksanakan strategi konten untuk meningkatkan keterlibatan dan mengembangkan kehadiran merek di Instagram, Facebook, dan TikTok.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Keahlian saya juga mencakup strategi Hubungan Masyarakat (PR), mengelola hubungan media, dan membuat kampanye untuk meningkatkan reputasi dan visibilitas merek. Saya bersemangat dalam menciptakan pengalaman digital yang berdampak dan terus belajar keterampilan baru untuk memecahkan masalah yang kompleks.
                </p>
              </CardContent>
            </Card>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <Briefcase className="h-10 w-10 text-gray-700 mb-3" />
                  <p className="font-semibold text-xl text-gray-900">Experience</p>
                  <p className="text-gray-600">Proven Track Record</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <GraduationCap className="h-10 w-10 text-gray-700 mb-3" />
                  <p className="font-semibold text-xl text-gray-900">Education</p>
                  <p className="text-gray-600">Computer Engineering</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <HeartHandshake className="h-10 w-10 text-gray-700 mb-3" />
                  <p className="font-semibold text-xl text-gray-900">Collaboration</p>
                  <p className="text-gray-600">Leadership & Teamwork</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;