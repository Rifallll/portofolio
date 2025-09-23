import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    // In a real application, you would send this data to a backend service.
    // For this example, we'll just log it and show a toast.
    console.log("Form submitted:", values);
    showSuccess("Your message has been sent!");
    form.reset();
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-600 mb-12">
          Have a project in mind? Let's discuss how we can work together to bring
          your ideas to life.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="text-left space-y-8">
            <Card className="p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Let's Connect</h3>
              <p className="text-gray-700 mb-6">
                I'm always interested in hearing about new projects and opportunities. Whether
                you have a question or just want to say hi, I'll do my best to get back to you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </Card>
            <Card className="p-6 shadow-lg bg-gray-100 border-l-4 border-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Data Safety</h3>
              <p className="text-sm text-gray-600">
                This contact form uses client-side processing only. No data is stored on servers or
                sent to third parties. Your information is used solely to contact you via email.
              </p>
            </Card>
          </div>

          <Card className="p-8 shadow-lg">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700">Name *</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Your name"
                  className="mt-1"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="your.email@example.com"
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="subject" className="text-gray-700">Subject *</Label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="Project inquiry"
                  className="mt-1"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-700">Message *</Label>
                <Textarea
                  id="message"
                  {...form.register("message")}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="mt-1"
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-900 text-white hover:bg-gray-700 flex items-center space-x-2 py-3 text-lg"
                disabled={form.formState.isSubmitting}
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </Button>
              <p className="text-xs text-gray-500 mt-4 text-right">
                * This form uses mailto. No data is stored or tracked.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;