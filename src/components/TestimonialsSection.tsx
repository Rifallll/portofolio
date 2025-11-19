"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./TestimonialCard"; // Assuming TestimonialCard already exists or will be created

const testimonialsData = [
  {
    quote: "Rifal is an exceptional web developer with a keen eye for detail and a strong commitment to delivering high-quality work. His ability to translate complex ideas into intuitive user interfaces is truly impressive.",
    name: "Jane Doe",
    title: "CTO, Tech Solutions Inc.",
    avatarSrc: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    quote: "Working with Rifal was a pleasure. He's not only highly skilled in front-end development but also a great communicator, ensuring that every step of the project was clear and aligned with our vision.",
    name: "John Smith",
    title: "Project Manager, Creative Agency",
    avatarSrc: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    quote: "Rifal's dedication to creating responsive and performant web applications is evident in every project. His problem-solving skills and proactive approach make him an invaluable asset to any team.",
    name: "Emily White",
    title: "Lead Designer, Digital Innovations",
    avatarSrc: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    quote: "I was thoroughly impressed by Rifal's ability to quickly grasp new technologies and apply them effectively. His work significantly improved our website's user experience and overall performance.",
    name: "Michael Brown",
    title: "Marketing Director, Global Brands",
    avatarSrc: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="py-20 bg-background"> {/* Changed to bg-background */}
      <div className="container mx-auto px-4 text-center max-w-screen-xl">
        <h2 className="text-4xl font-bold text-primary mb-4">What People Say</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Hear from clients and colleagues about my work and collaboration
        </p>

        <div className="relative mx-auto max-w-6xl">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6 items-stretch">
              {testimonialsData.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 min-w-0 px-2"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
          <Button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-card text-foreground border-border rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 md:-left-8 hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-card text-foreground border-border rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 md:-right-8 hover:bg-muted"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;