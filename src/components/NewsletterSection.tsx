import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate subscription
        setSubscribed(true);
        setTimeout(() => {
            setEmail("");
            setSubscribed(false);
        }, 3000);
    };

    return (
        <section className="py-20 relative overflow-hidden border-y border-cyan-500/10">
            {/* Premium Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 via-background to-cyan-600/5" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-cyan-400" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-gradient-deep">Stay Updated</span>
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8">
                            Get the latest insights, tips, and resources delivered to your inbox
                        </p>
                    </motion.div>

                    {/* Newsletter Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                required
                                className="w-full pl-12 pr-4 py-4 rounded-full glass border border-cyan-500/20 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={subscribed}
                            className="px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        >
                            {subscribed ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Subscribed!
                                </span>
                            ) : (
                                "Subscribe"
                            )}
                        </Button>
                    </motion.form>

                    {/* Privacy Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-xs text-muted-foreground"
                    >
                        🔒 Your privacy is important. No spam, unsubscribe anytime.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
