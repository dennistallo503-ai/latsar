"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const news = [
  {
    title:
      "Diskominfo TTS Tingkatkan Pelayanan Informasi Publik Berbasis Digital",
    image: "/news/news-1.jpeg",
    date: "16 Juni 2026",
    href: "/berita/1",
  },
  {
    title:
      "Sosialisasi SPBE untuk Mendukung Transformasi Digital Daerah",
    image: "/news/news-2.jpeg",
    date: "12 Juni 2026",
    href: "/berita/2",
  },
  {
    title:
      "Penguatan Statistik Sektoral dalam Perencanaan Pembangunan",
    image: "/news/news-3.jpeg",
    date: "08 Juni 2026",
    href: "/berita/3",
  },
];

export function NewsSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        <div className="mb-12 flex items-center justify-between">

          <div>
            <Badge variant="outline">
              Berita
            </Badge>

            <h2 className="mt-3 text-3xl font-bold">
              Berita Terbaru
            </h2>
          </div>

          <Button asChild variant="outline">
            <Link href="/berita">
              Lihat Semua
            </Link>
          </Button>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Berita Utama */}
          <Link
            href={news[0].href}
            className="group lg:col-span-2"
          >
            <div className="overflow-hidden rounded-2xl">

              <Image
                src={news[0].image}
                alt={news[0].title}
                width={1200}
                height={800}
                className="h-[450px] w-full object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {news[0].date}
            </p>

            <h3 className="mt-2 text-2xl font-bold group-hover:text-primary">
              {news[0].title}
            </h3>

          </Link>

          {/* Berita Kecil */}
          <div className="space-y-6">

            {news.slice(1).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={180}
                  height={120}
                  className="rounded-xl object-cover"
                />

                <div>
                  <p className="text-xs text-muted-foreground">
                    {item.date}
                  </p>

                  <h4 className="mt-2 font-semibold group-hover:text-primary">
                    {item.title}
                  </h4>
                </div>

              </Link>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}