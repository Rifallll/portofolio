"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface RelatedPostProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const RelatedPostCard: React.FC<RelatedPostProps> = ({ title, description, image, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Card className="w-full h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
        <CardHeader className="flex-grow pb-2">
          <CardTitle className="text-xl font-semibold text-foreground text-left">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-grow pt-0">
          <p className="text-muted-foreground text-sm mb-4 text-left">{description}</p>
          <Link to={link} className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1 mt-auto self-start">
            <span>Read More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const relatedPostsData = [
  {
    title: "The Art of Digital Storytelling",
    description: "Discover how to craft compelling narratives in the digital age to captivate your audience.",
    image: "/placeholder-story-1.jpg", // Placeholder image
    link: "#", // Placeholder link
  },
  {
    title: "Mastering Social Media Engagement",
    description: "Strategies and tips to boost your social media presence and connect with your community.",
    image: "/placeholder-story-2.jpg", // Placeholder image
    link: "#", // Placeholder link
  },
  {
    title: "Web Development Trends 2024",
    description: "Stay updated with the latest technologies and practices shaping the future of web development.",
    image: "/placeholder-story-3.jpg", // Placeholder image
    link: "#", // Placeholder link
  },
];

const RelatedPostsSection = () => {
  return (
    <section id="related-posts" className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPostsData.map((post, index) => (
            <RelatedPostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPostsSection;