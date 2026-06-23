"use client";

import Image from "next/image";
import Link from "next/link";

import { Play, Images, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
const photos = [
  "/gallery/1.jpeg",
  "/gallery/2.jpeg",
  "/gallery/3.jpeg",
  "/gallery/4.jpeg",
  "/gallery/5.jpeg",
  "/gallery/6.jpeg",
];

const videos = [
  {
    title: "Sosialisasi SPBE Kabupaten TTS",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    title: "Peluncuran Layanan Informasi Publik",
    youtubeId: "jNQXAC9IVRw",
  },
  {
    title: "Kegiatan Diskominfo Kabupaten TTS",
    youtubeId: "M7lc1UVf-VE",
  },
];

export function GallerySection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-16 text-center">

          <Badge variant="outline" className="mb-4">
            Dokumentasi
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Galeri Kegiatan
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Dokumentasi kegiatan, program, dan layanan
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan.
          </p>

        </div>

        {/* FOTO */}
        <div className="mb-20">

          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-lg bg-primary/10 p-2">
              <Images className="h-5 w-5 text-primary" />
            </div>

            <h3 className="text-2xl font-semibold">
              Galeri Foto
            </h3>

          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {photos.map((photo, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl"
              >
                <Image
                  src={photo}
                  alt={`Galeri Foto ${index + 1}`}
                  width={600}
                  height={400}
                  className="
                    h-[280px]
                    w-full
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-110
                  "
                />
              </div>
            ))}

          </div>

        </div>

        {/* VIDEO */}
        <div>

          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-lg bg-primary/10 p-2">
              <Video className="h-5 w-5 text-primary" />
            </div>

            <h3 className="text-2xl font-semibold">
              Video Kegiatan
            </h3>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            {videos.map((video, index) => (
              <Link
                key={index}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >

                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                  <div className="relative overflow-hidden">

                    <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="
                        h-64
                        w-full
                        object-cover
                        transition-all
                        duration-500
                        group-hover:scale-105
                    "
                    />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">

                      <div
                        className="
                          rounded-full
                          bg-white/90
                          p-4
                          shadow-lg
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      >
                        <Play className="h-8 w-8 fill-current text-primary" />
                      </div>

                    </div>

                  </div>

                  <div className="p-5">

                    <h4 className="line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                      {video.title}
                    </h4>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">

          <Button asChild size="lg">
            <Link href="/menu-lainnya/galeri">
              Lihat Semua Foto
            </Link>
          </Button>

          <Button variant="outline" asChild size="lg">
            <Link href="/menu-lainnya/galeri">
              Lihat Semua Video
            </Link>
          </Button>

        </div>

      </div>
    </section>
  );
}