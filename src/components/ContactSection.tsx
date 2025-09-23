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
    <section id="contact" className="py-20"> {/* Menghapus bg-gray-50 */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2> {/* Mengubah text-gray-900 menjadi text-white */}
        <p className="text-lg text-gray-300 mb-12"> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
          Have a project in mind? Let's discuss how we can work together to bring
          your ideas to life.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3> {/* Mengubah text-gray-900 menjadi text-white */}
            <p className="text-gray-200 mb-8"> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
              I'm always interested in hearing about new projects and opportunities. Whether
              you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
            <div className="space-y-4 mb-8">
              <Card className="p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
                <Mail className="h-5 w-5 text-gray-300" /> {/* Mengubah text-gray-500 menjadi text-gray-300 */}
                <div>
                  <p className="text-sm text-gray-400">Email</p> {/* Mengubah text-gray-500 menjadi text-gray-400 */}
                  <span className="font-medium text-white">permanarifal269@gmail.com</span> {/* Mengubah text-gray-900 menjadi text-white */}
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
                <Phone className="h-5 w-5 text-gray-300" /> {/* Mengubah text-gray-500 menjadi text-gray-300 */}
                <div>
                  <p className="text-sm text-gray-400">Phone</p> {/* Mengubah text-gray-500 menjadi text-gray-400 */}
                  <span className="font-medium text-white">+6285217421701</span> {/* Mengubah text-gray-900 menjadi text-white */}
                </div>
              </Card>
              <Card className="p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
                <MapPin className="h-5 w-5 text-gray-300" /> {/* Mengubah text-gray-500 menjadi text-gray-300 */}
                <div>
                  <p className="text-sm text-gray-400">Location</p> {/* Mengubah text-gray-500 menjadi text-gray-400 */}
                  <span className="font-medium text-white">Pandeglang, Indonesia</span> {/* Mengubah text-gray-900 menjadi text-white */}
                </div>
              </Card>
            </div>
            <Card className="p-6 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
              <h3 className="text-lg font-semibold text-white mb-2">Privacy & Data Safety</h3> {/* Mengubah text-gray-900 menjadi text-white */}
              <p className="text-sm text-gray-300"> {/* Mengubah text-gray-600 menjadi text-gray-300 */}
                This contact form uses client-side processing only. No data is stored on servers or
                sent to third parties. Your information is used solely to contact you via email.
              </p>
            </Card>
          </div>

          <Card className="p-8 shadow-lg bg-gray-800 border-gray-700"> {/* Menyesuaikan warna latar belakang dan border kartu */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-200">Name *</Label> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
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
                  <Label htmlFor="email" className="text-gray-200">Email *</Label> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
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
              </div>
              <div>
                <Label htmlFor="subject" className="text-gray-200">Subject *</Label> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
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
                <Label htmlFor="message" className="text-gray-200">Message *</Label> {/* Mengubah text-gray-700 menjadi text-gray-200 */}
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
                className="w-full bg-gray-900 text-white hover:bg-gray-700 flex items-center justify-center space-x-2 py-3 text-lg"
                disabled={form.formState.isSubmitting}
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </Button>
              <p className="text-xs text-gray-400 mt-4 text-right"> {/* Mengubah text-gray-500 menjadi text-gray-400 */}
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