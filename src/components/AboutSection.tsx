import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Briefcase, GraduationCap, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20"> {/* Menghapus bg-white */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2> {/* Mengubah text-gray-900 menjadi text-white */}
        <p className="text-lg text-gray-300 mb-12"> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
          Get to know more about my journey and what drives me
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-5xl mx-auto">
          <div className="lg:w-1/3 flex flex-col items-center text-center">
            <Avatar className="h-48 w-48 mb-6 border-4 border-gray-700 shadow-lg"> {/* Mengubah border-gray-200 menjadi border-gray-700 */}
              <AvatarImage src="/public/placeholder.svg" alt="John Doe" />
              <AvatarFallback className="text-6xl font-bold bg-gray-700 text-gray-200">JD</AvatarFallback> {/* Menyesuaikan warna fallback avatar */}
            </Avatar>
            <h3 className="text-3xl font-bold text-white mb-2">John Doe</h3> {/* Mengubah text-gray-900 menjadi text-white */}
            <p className="text-xl text-gray-200 mb-4">Full Stack Developer</p> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
            <p className="text-md text-gray-300 max-w-xs"> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
              Passionate about crafting robust and scalable web applications.
            </p>
          </div>

          <div className="lg:w-2/3 text-left">
            <Card className="p-8 shadow-lg mb-8 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-bold text-white">My Story</CardTitle> {/* Mengubah text-gray-900 menjadi text-white */}
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-200 leading-relaxed mb-4"> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
                  Hello! I'm John Doe, a dedicated Full Stack Developer with a passion for building
                  dynamic and user-friendly web experiences. My journey into development began
                  several years ago, driven by a curiosity to understand how digital products work
                  and a desire to create impactful solutions.
                </p>
                <p className="text-gray-200 leading-relaxed"> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
                  I specialize in modern web technologies, with a strong focus on React and Node.js.
                  I thrive in environments where I can continuously learn and apply new skills to
                  solve complex problems. My goal is always to write clean, efficient, and
                  maintainable code that delivers exceptional performance and user satisfaction.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
                <CardContent className="flex flex-col items-center p-0">
                  <Briefcase className="h-8 w-8 text-gray-200 mb-3" /> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
                  <p className="font-semibold text-lg text-white">Experience</p> {/* Mengubah text-gray-900 menjadi text-white */}
                  <p className="text-gray-300">5+ Years</p> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
                <CardContent className="flex flex-col items-center p-0">
                  <GraduationCap className="h-8 w-8 text-gray-200 mb-3" /> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
                  <p className="font-semibold text-lg text-white">Education</p> {/* Mengubah text-gray-900 menjadi text-white */}
                  <p className="text-gray-300">Computer Science</p> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
                </CardContent>
              </Card>
              <Card className="p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
                <CardContent className="flex flex-col items-center p-0">
                  <HeartHandshake className="h-8 w-8 text-gray-200 mb-3" /> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
                  <p className="font-semibold text-lg text-white">Collaboration</p> {/* Mengubah text-gray-900 menjadi text-white */}
                  <p className="text-gray-300">Team Player</p> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
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