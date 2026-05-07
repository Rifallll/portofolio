import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import PremiumNavbar from "@/components/PremiumNavbar";
import Footer from "@/components/Footer";

const blogPosts = [
    {
        id: 1,
        title: "Building Scalable React Applications",
        excerpt: "Essential patterns and best practices for creating maintainable React apps that scale with your business needs.",
        content: "In this comprehensive guide, we'll explore the fundamental patterns that make React applications scalable and maintainable...",
        date: "Jan 25, 2024",
        readTime: "5 min read",
        category: "Development",
        author: "Rifal Azhar"
    },
    {
        id: 2,
        title: "Modern CSS Techniques You Should Know",
        excerpt: "Explore the latest CSS features including Grid, Flexbox, and custom properties to create stunning layouts.",
        content: "CSS has evolved tremendously over the years. Let's dive into modern techniques that will elevate your frontend skills...",
        date: "Jan 20, 2024",
        readTime: "7 min read",
        category: "Design",
        author: "Rifal Azhar"
    },
    {
        id: 3,
        title: "The Future of Web Development",
        excerpt: "Insights into emerging technologies and trends that will shape the future of web development in 2024.",
        content: "As we look ahead, several exciting trends are reshaping how we build for the web. From AI integration to edge computing...",
        date: "Jan 15, 2024",
        readTime: "6 min read",
        category: "Technology",
        author: "Rifal Azhar"
    },
    {
        id: 4,
        title: "Mastering TypeScript for React",
        excerpt: "Learn how to leverage TypeScript's power to write safer, more maintainable React applications.",
        content: "TypeScript has become essential for modern React development. Here's your complete guide to mastering it...",
        date: "Jan 10, 2024",
        readTime: "8 min read",
        category: "Development",
        author: "Rifal Azhar"
    },
    {
        id: 5,
        title: "UI/UX Design Principles",
        excerpt: "Core principles every developer should know to create better user experiences.",
        content: "Great design isn't just about aesthetics—it's about creating intuitive, delightful user experiences...",
        date: "Jan 5, 2024",
        readTime: "6 min read",
        category: "Design",
        author: "Rifal Azhar"
    },
    {
        id: 6,
        title: "Performance Optimization Tips",
        excerpt: "Proven strategies to make your web applications lightning-fast and user-friendly.",
        content: "Performance is crucial for user satisfaction. Let's explore practical optimization techniques...",
        date: "Jan 1, 2024",
        readTime: "7 min read",
        category: "Performance",
        author: "Rifal Azhar"
    }
];

const BlogPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">

            <div className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >

                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="text-gradient-ocean">Blog & Articles</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Thoughts, insights, and tutorials on web development, design, and technology
                        </p>
                    </motion.div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all duration-300"
                            >
                                {/* Category Badge */}
                                <div className="p-6 pb-0">
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-600 text-white">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Meta */}
                                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-cyan-300 transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-cyan-500/10">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{post.author}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPage;
