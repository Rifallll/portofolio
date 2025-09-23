import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50"> {/* Mengubah bg-white menjadi bg-gray-50 */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-lg text-gray-600 mb-12">
          Get to know more about my journey and what drives me
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-5xl mx-auto">
          {/* Kolom Kiri: Avatar dan Info Pribadi - Konten dipusatkan */}
          <div className="lg:w-1/3 flex flex-col items-center text-center"> {/* Menghapus lg:items-start dan lg:text-left untuk memusatkan konten */}
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 mb-6 border-4 border-gray-200 shadow-lg">
              <AvatarImage src="/public/placeholder.svg" alt="John Doe" />
              <AvatarFallback className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gray-200 text-gray-700">JD</AvatarFallback>
            </Avatar>
            <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">John Doe</h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-4">Full Stack Developer</p>
            <p className="text-md text-gray-600 max-w-xs">
              Passionate about crafting robust and scalable web applications.
            </p>
          </div>

          {/* Kolom Kanan: My Story dan Sorotan */}
          <div className="lg:w-2/3 text-left">
            <Card className="p-8 shadow-lg mb-8">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">My Story</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hello! I'm John Doe, a dedicated Full Stack Developer with a passion for building
                  dynamic and user-friendly web experiences. My journey into development began
                  several years ago, driven by a curiosity to understand how digital products work
                  and a desire to create impactful solutions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I specialize in modern web technologies, with a strong focus on React and Node.js.
                  I thrive in environments where I can continuously learn and apply new skills to
                  solve complex problems. My goal is always to write clean, efficient, and
                  maintainable code that delivers exceptional performance and user satisfaction.
                </p>
              </CardContent>
            </Card>

            {/* Bagian Sorotan dengan Kartu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <Briefcase className="h-8 w-8 text-gray-700 mb-3" />
                  <p className="font-semibold text-lg text-gray-900">Experience</p>
                  <p className="text-gray-600">5+ Years</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <GraduationCap className="h-8 w-8 text-gray-700 mb-3" />
                  <p className="font-semibold text-lg text-gray-900">Education</p>
                  <p className="text-gray-600">Computer Science</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <HeartHandshake className="h-8 w-8 text-gray-700 mb-3" />
                  <p className="font-semibold text-lg text-gray-900">Collaboration</p>
                  <p className="text-gray-600">Team Player</p>
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