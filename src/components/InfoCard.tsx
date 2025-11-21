"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  description: string;
  stripeColor?: string; // Color for the diagonal stripe
  children?: React.ReactNode; // For additional content like buttons
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  stripeColor = "hsl(var(--primary))", // Default to primary color
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-xl mx-auto" {/* Changed max-w-3xl to max-w-xl */}
    >
      <Card className="relative p-6 rounded-xl shadow-lg overflow-hidden bg-card border border-border">
        {/* Diagonal Stripe */}
        <div
          className="absolute top-0 right-0 w-24 h-24 transform rotate-45 -mt-12 -mr-12"
          style={{ backgroundColor: stripeColor }}
        ></div>
        <CardHeader className="text-left mb-4 relative z-10">
          <CardTitle className="text-4xl font-bold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-left relative z-10">
          <p className="text-lg text-muted-foreground mb-4">{description}</p>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InfoCard;