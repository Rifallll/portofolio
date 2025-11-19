"use client";

import React from "react";
import TestimonialCard from "./TestimonialCard";
import SectionHeader from "./SectionHeader";

const testimonialsData = [
  {
    quote: "Rifal is a highly dedicated and skilled web developer. His attention to detail and ability to deliver high-quality work on time is truly impressive. A great asset to any team!",
    name: "Jane Doe",
    title: "Project Manager at Tech Solutions",
    avatarSrc: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    quote: "Working with Rifal was a pleasure. He quickly understood our needs and translated them into a beautiful and functional website. Highly recommend his services!",
    name: "John Smith",
    title: "CEO of Creative Agency",
    avatarSrc: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    quote: "Rifal's problem-solving skills are exceptional. He tackled complex challenges with ease and always found elegant solutions. A true professional.",
    name: "Emily White",
    title: "Lead Developer at Innovate Corp",
    avatarSrc: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <SectionHeader
          title="What People Say"
          description="Hear from clients and colleagues about my work"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;