"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";

import { Images } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

export function GallerySection() {
  const [photos, setPhotos] = useState<Item[]>([]);
  const [index, setIndex] = useState(-1);

  // ================= FETCH 6 TERBARU =================
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("media_content")
        .select("*")
        .eq("category", "galeri")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.log(error.message);
        return;
      }

      setPhotos(data || []);
    };

    fetchData();
  }, []);

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            Dokumentasi
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Galeri Diskominfo
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Dokumentasi kegiatan Diskominfo Kabupaten TTS.
          </p>
        </div>

        {/* GRID */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Images className="h-5 w-5 text-primary" />
            </div>

            <h3 className="text-2xl font-semibold">
              Galeri Foto
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {photos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setIndex(i)}
                className="group cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <Image
                    src={photo.image_url}
                    alt={photo.title}
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {photo.title}
                  </h4>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/menu-lainnya/galeri">
              Lihat Semua Foto
            </Link>
          </Button>
        </div>

      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        plugins={[Zoom, Thumbnails, Captions]}
        slides={photos.map((p) => ({
          src: p.image_url,
          title: p.title,
          description: p.description || "",
        }))}
      />
    </section>
  );
}