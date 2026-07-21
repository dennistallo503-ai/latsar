"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { supabase } from "@/lib/supabaseClient"

export function HeroSection({ page = "home" }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // TRACK CAROUSEL
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // FETCH DATA (UPDATED + FIXED)
  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("hero_sections")
        .select("*")
        .eq("page", page)
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) {
        console.log("FETCH HERO ERROR:", error)
      }

      setSlides(data || [])
      setLoading(false)
    }

    fetchHero()
  }, [page])

  // LOADING
  if (loading) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        Memuat Gambar...
      </div>
    )
  }

  // EMPTY STATE
  if (!slides.length) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        Belum ada hero untuk halaman ini
      </div>
    )
  }

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

          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>

              <div className="relative h-[500px] md:h-[600px] overflow-hidden">

                {/* IMAGE */}
                {slide.image_url && (
                  <Image
                    src={slide.image_url}
                    alt={slide.heading || "hero"}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                )}

                {/* OVERLAY */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" /> */}

                {/* CONTENT */}
              <div className="relative z-10 flex h-full items-center justify-center px-4">
                <div className="max-w-4xl text-center text-white">

                  <h5 className="text-3xl font-bold leading-tight md:text-5xl">
                    {slide.heading}
                  </h5>

                  <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-200 md:text-lg md:leading-8">
                    {slide.paragraph}
                  </p>

                </div>
              </div>
              {/* MARQUEE */}
              <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden bg-black/70 backdrop-blur-sm">
                <div className="whitespace-nowrap py-3">
                  <div className="inline-block animate-marquee text-sm font-medium text-white md:text-base">
                    📢 Selamat Datang di Website Resmi Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
                  </div>
                </div>
              </div>
              </div>

            </CarouselItem>
          ))}

        </CarouselContent>

      </Carousel>

      {/* INDICATOR */}
      <div className="absolute bottom-8 left-0 right-0 z-20">

        <div className="container mx-auto flex items-center justify-between px-4">

          <div className="flex gap-3">
            {slides.map((_, index) => (
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

          {/* <div className="rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div> */}

        </div>

      </div>

    </section>
  )
}