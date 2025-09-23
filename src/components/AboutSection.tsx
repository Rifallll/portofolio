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
          Get to know more about my journey and what drives me
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
            <p className="text-xl text-gray-700 mb-4">Full Stack Developer</p>
            <p className="text-md text-gray-600 max-w-xs">
              Passionate about crafting robust and scalable web applications.
            </p>
          </Card>

          {/* Right Column: My Story and Highlights */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-center"> {/* Added text-center here */}
            {/* My Story Card */}
            <Card className="p-8 shadow-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-bold text-gray-900">My Story</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hello! I'm Rifal Azhar Permana, a dedicated Full Stack Developer with a passion for building
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

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <Briefcase className="h-10 w-10 text-gray-700 mb-3" />
                  <p className="font-semibold text-xl text-gray-900">Experience</p>
                  <p className="text-gray-600">5+ Years</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <GraduationCap className="h-10 w-10 text-gray-700 mb-3" />
                  <p className="font-semibold text-xl text-gray-900">Education</p>
                  <p className="text-gray-600">Computer Science</p>
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="flex flex-col items-center p-0">
                  <HeartHandshake className="h-10 w-10 text-gray-700 mb-3" />
                  <p className="font-semibold text-xl text-gray-900">Collaboration</p>
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