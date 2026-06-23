"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

import { heroSlides } from "./home/hero-slides";

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return (
    <section className="relative">

      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>

          {heroSlides.map((slide, index) => (

            <CarouselItem key={index}>

              <div className="relative h-[500px] md:h-[600px] overflow-hidden">

                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />

                <div className="relative z-10 container mx-auto flex h-full items-center px-4">

                  <div className="relative z-20 max-w-4xl text-white">

                    {/* Badge */}
                    <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur">
                      Website Resmi Diskominfo TTS
                    </span>

                    <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">

                      {slide.title}

                      <br />

                      <span className="text-white">
                        {slide.highlight}
                      </span>

                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 md:text-xl">

                      {slide.description}

                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                    </div>

                  </div>

                </div>

              </div>

            </CarouselItem>

          ))}

        </CarouselContent>

      </Carousel>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20">

        <div className="container mx-auto flex items-center justify-between px-4">

          {/* Indicators */}
          <div className="flex gap-3">

            {heroSlides.map((_, index) => (

              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-10 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />

            ))}

          </div>

          {/* Counter */}
          <div className="rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur">

            {String(current + 1).padStart(2, "0")} /{" "}
            {String(heroSlides.length).padStart(2, "0")}

          </div>

        </div>

      </div>

    </section>
  );
}