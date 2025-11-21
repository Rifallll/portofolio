"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BlogSidebarProps {
  sections: { id: string; title: string; category: string }[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ sections }) => {
  const categories = Array.from(new Set(sections.map(s => s.category)));

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full lg:w-64 p-4 lg:p-0 sticky top-24 self-start" // Sticky sidebar
    >
      <Card className="bg-card border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">My Journey Chapters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-lg font-semibold text-primary mb-2">{category}</h3>
              <ul className="space-y-1">
                {sections
                  .filter(s => s.category === category)
                  .map((section, secIndex) => (
                    <li key={secIndex}>
                      <Link
                        to={`#${section.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base block py-1"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
              </ul>
              {catIndex < categories.length - 1 && <Separator className="my-4 bg-border" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.aside>
  );
};

export default BlogSidebar;