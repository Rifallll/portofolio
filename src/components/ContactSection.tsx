"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ShieldCheck, Terminal, Zap, Globe, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "IDENT_ERROR: Name too short" }),
  email: z.string().email({ message: "ADDR_ERROR: Invalid protocol" }),
  message: z.string().min(10, { message: "BUFFER_ERROR: Content insufficient" }),
});

const ContactSection = () => {
  const [isTransmitting, setIsTransmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsTransmitting(true);
    console.log("TRANSMITTING_DATA:", values);

    // Simulate data transmission
    setTimeout(() => {
      toast.success("UP-LINK ESTABLISHED", {
        description: "Message successfully transmitted to secure server.",
      });
      setIsTransmitting(false);
      form.reset();
    }, 2000);
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#020617]">
      {/* HUD Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-cyan-500/30 mb-6 bg-cyan-500/5"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">Comm_Link / Status: ONLINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-center"
          >
            Bridge The <span className="text-gradient-ocean">Circuit</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xl text-center font-mono text-sm leading-relaxed"
          >
            [SYSTEM_INFO]: Initializing secure communication protocol.
            Awaiting user input for project initiation or general inquiry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left: Contact Nodes */}
          <div className="lg:col-span-5 space-y-4">
            {[
              { icon: Mail, label: "SECURE_MAIL", value: "hello@rifalazhar.com", id: "NODE_01", color: "text-cyan-400" },
              { icon: Phone, label: "VOICE_LINK", value: "+62 812 3456 7890", id: "NODE_02", color: "text-blue-400" },
              { icon: MapPin, label: "GEO_LOC", value: "Bandung, Indonesia", id: "NODE_03", color: "text-indigo-400" },
            ].map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass-card p-6 rounded-2xl relative group cursor-pointer border-white/5 hover:border-cyan-500/50"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-xl bg-slate-950 border border-white/10 ${node.color} group-hover:scale-110 transition-transform`}>
                    <node.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-slate-500 tracking-widest mb-1">{node.label}</div>
                    <div className="font-bold text-white tracking-tight">{node.value}</div>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-500/30 font-bold">{node.id}</div>
                </div>
              </motion.div>
            ))}

            {/* Decorative System Card */}
            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 font-mono text-[10px] space-y-3 mt-8">
              <div className="flex items-center justify-between text-cyan-500/50">
                <span>ENCRYPTION: AES-256</span>
                <span>SIGNALA_STRENGTH: 98%</span>
              </div>
              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ["20%", "80%", "40%", "95%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-cyan-500/40"
                />
              </div>
              <div className="text-cyan-500/30 uppercase leading-tight animate-pulse">
                Awaiting transmission... <br />
                Ready for input...
              </div>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden shadow-2xl"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-[2.5rem] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-[2.5rem] pointer-events-none" />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] text-cyan-500 uppercase font-black tracking-widest">Input Name</FormLabel>
                          <FormControl>
                            <Input placeholder="DESIGNATION" {...field} className="h-14 bg-slate-950/50 border-white/5 focus:border-cyan-500/50 rounded-xl font-bold tracking-tight text-white placeholder:text-slate-700 transition-all" />
                          </FormControl>
                          <FormMessage className="font-mono text-[9px] uppercase" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] text-blue-500 uppercase font-black tracking-widest">Input Address</FormLabel>
                          <FormControl>
                            <Input placeholder="PROTOCOL://EMAIL" {...field} className="h-14 bg-slate-950/50 border-white/5 focus:border-cyan-500/50 rounded-xl font-bold tracking-tight text-white placeholder:text-slate-700 transition-all" />
                          </FormControl>
                          <FormMessage className="font-mono text-[9px] uppercase" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-[10px] text-indigo-500 uppercase font-black tracking-widest">Data Buffer</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="INITIALIZE_CONTENT_HERE..."
                            className="min-h-[180px] bg-slate-950/50 border-white/5 focus:border-cyan-500/50 rounded-[1.5rem] font-bold tracking-tight text-white placeholder:text-slate-700 resize-none p-6 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-mono text-[9px] uppercase" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full h-16 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-[0.2em] rounded-2xl group relative overflow-hidden transition-all shadow-xl shadow-cyan-500/20"
                  >
                    <AnimatePresence mode="wait">
                      {isTransmitting ? (
                        <motion.div
                          key="transmitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          TRANSMITTING...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="init"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          ESTABLISH_UPLINK
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
