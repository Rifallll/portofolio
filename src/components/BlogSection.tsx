import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
    {
        title: "Building Scalable React Applications",
        excerpt: "Essential patterns and best practices for creating maintainable React apps that scale with your business needs.",
        date: "Jan 25, 2024",
        readTime: "5 min read",
        category: "Development",
        image: "/api/placeholder/400/250",
        link: "#"
    },
    {
        title: "Modern CSS Techniques You Should Know",
        excerpt: "Explore the latest CSS features including Grid, Flexbox, and custom properties to create stunning layouts.",
        date: "Jan 20, 2024",
        readTime: "7 min read",
        category: "Design",
        image: "/api/placeholder/400/250",
        link: "#"
    },
    {
        title: "The Future of Web Development",
        excerpt: "Insights into emerging technologies and trends that will shape the future of web development in 2024.",
        date: "Jan 15, 2024",
        readTime: "6 min read",
        category: "Technology",
        image: "/api/placeholder/400/250",
        link: "#"
    }
];

const BlogSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-16"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6">
                            <BookOpen className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-medium text-cyan-300">Latest Insights</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient-ocean">Blog & Articles</span>
                        </h2>

                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Sharing knowledge and experience from the field
                        </p>
                    </div>

                    <Link to="/blog" className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 transition-all"
                        >
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-600 text-white">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Placeholder */}
                                <div className="w-full h-full flex items-center justify-center text-cyan-400/20 font-bold text-xl">
                                    ARTICLE
                                </div>
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
                                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-cyan-300 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Read More */}
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium group"
                                >
                                    Read More
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="md:hidden mt-8 text-center">
                    <Link to="/blog">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 transition-all mx-auto"
                        >
                            View All Articles
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
