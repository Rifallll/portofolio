import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Card dan CardContent masih dibutuhkan untuk bagian lain
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-lg text-gray-600 mb-12">
          Get to know more about my journey and what drives me
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-5xl mx-auto">
          <div className="lg:w-1/3 flex flex-col items-center">
            <Avatar className="h-48 w-48 mb-6 border-4 border-gray-200 shadow-lg">
              <AvatarImage src="/public/placeholder.svg" alt="John Doe" />
              <AvatarFallback className="text-6xl font-bold bg-gray-200 text-gray-700">JD</AvatarFallback>
            </Avatar>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h3>
            <p className="text-xl text-gray-700 mb-4">Full Stack Developer</p>
            <p className="text-md text-gray-600 max-w-xs">
              Passionate about crafting robust and scalable web applications.
            </p>
          </div>

          <div className="lg:w-2/3 text-left p-8"> {/* Menambahkan padding di sini */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">My Story</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Hello! I'm John Doe, a dedicated Full Stack Developer with a passion for building
              dynamic and user-friendly web experiences. My journey into development began
              several years ago, driven by a curiosity to understand how digital products work
              and a desire to create impactful solutions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              I specialize in modern web technologies, with a strong focus on React and Node.js.
              I thrive in environments where I can continuously learn and apply new skills to
              solve complex problems. My goal is always to write clean, efficient, and
              maintainable code that delivers exceptional performance and user satisfaction.
            </p>

            <Separator className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-6 w-6 text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Experience</p>
                  <p className="text-gray-600">5+ Years</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-6 w-6 text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Education</p>
                  <p className="text-gray-600">Computer Science</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HeartHandshake className="h-6 w-6 text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Collaboration</p>
                  <p className="text-gray-600">Team Player</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;