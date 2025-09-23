import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquareText } from "lucide-react";

const ContactSection = () => {
  const whatsappLink = "https://wa.me/6285217421701";

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-600 mb-12">
          Have a project in mind? Let's discuss how we can work together to bring
          your ideas to life.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          {/* Left Column: Let's Connect & Privacy */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h3>
            <p className="text-gray-700 mb-8">
              I'm always interested in hearing about new projects and opportunities. Whether
              you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
            <div className="space-y-4 mb-8">
              <Card className="p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <span className="font-medium text-gray-900">permanarifal269@gmail.com</span>
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <span className="font-medium text-gray-900">+6285217421701</span>
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <span className="font-medium text-gray-900">Pandeglang, Indonesia</span>
                </div>
              </Card>
            </div>
            <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Data Safety</h3>
              <p className="text-sm text-gray-600">
                This section provides direct contact links. No personal data is collected or stored through this page.
              </p>
            </Card>
          </div>

          {/* Right Column: WhatsApp Button */}
          <Card className="p-6 shadow-lg flex flex-col items-center justify-center"> {/* Mengurangi padding dari p-8 menjadi p-6 */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Me Directly</h3> {/* Mengurangi mb-6 menjadi mb-4 */}
            <p className="text-gray-700 text-center mb-6"> {/* Mengurangi mb-8 menjadi mb-6 */}
              Click the button below to send me a message on WhatsApp.
            </p>
            <Button
              asChild
              className="w-full max-w-xs bg-green-600 text-white hover:bg-green-700 flex items-center justify-center space-x-2 py-3 text-lg"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquareText className="h-5 w-5" />
                <span>Message on WhatsApp</span>
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;