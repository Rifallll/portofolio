"use client";

import React, { useState, useCallback, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonialsData = [
  {
    name: "Alice Smith",
    role: "Anime Enthusiast",
    avatar: "/placeholder.svg", // Ganti dengan path gambar avatar yang sebenarnya
    testimonial:
      "This app is a game-changer! The AI-powered generation creates stunning characters, and the customization options are endless. Highly recommend for any anime fan!",
  },
  {
    name: "Bob Johnson",
    role: "Digital Artist",
    avatar: "/placeholder.svg",
    testimonial:
      "As an artist, I'm always looking for new tools. AniMagi helps me quickly prototype character ideas and explore different styles. It's incredibly intuitive and powerful.",
  },
  {
    name: "Charlie Brown",
    role: "Content Creator",
    avatar: "/placeholder.svg",
    testimonial:
      "I use AniMagi to create unique characters for my social media content. The sharing features are super convenient, and my audience loves the results!",
  },
  {
    name: "Diana Prince",
    role: "Game Developer",
    avatar: "/placeholder.svg",
    testimonial:
      "AniMagi has streamlined my character design process for indie games. The quality and variety of generations are impressive, saving me a lot of time.",
  },
  {
    name: "Eve Adams",
    role: "Story Writer",
    avatar: "/placeholder.svg",
    testimonial:
      "Bringing my characters to life visually has never been easier. AniMagi perfectly captures the essence of my descriptions, inspiring new story ideas.",
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
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">What Our Users Say</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Hear from the community about their AniMagi experience
        </p>

        <div className="relative max-w-7xl mx-auto">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6 px-4 items-stretch">
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={index}
                  className="embla__slide flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 h-full"
                >
                  <TestimonialCard {...testimonial} />
                </div>
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