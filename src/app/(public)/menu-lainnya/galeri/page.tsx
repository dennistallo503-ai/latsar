"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

type MediaType = "image" | "video";

interface GaleriItem {
  title: string;
  desc?: string;
  type: MediaType;
  file: string;
}

export default function GaleriPage() {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const data: GaleriItem[] = [
    {
      title: "Kegiatan Diskominfo 1",
      desc: "Pelaksanaan rapat koordinasi di ruang utama",
      type: "image",
      file: "/hero/hero-1.jpeg",
    },
    {
      title: "Kegiatan Diskominfo 2",
      desc: "Sosialisasi SPBE kepada OPD",
      type: "image",
      file: "/hero/hero-2.jpeg",
    },
    {
      title: "Kegiatan Diskominfo 3",
      desc: "Monitoring jaringan daerah",
      type: "image",
      file: "/hero/hero-3.jpeg",
    },
    {
      title: "Kegiatan Diskominfo 4",
      desc: "Penguatan layanan informasi publik",
      type: "image",
      file: "/hero/hero-4.jpeg",
    },
    {
      title: "Kegiatan Diskominfo 5",
      desc: "Pelatihan digitalisasi layanan",
      type: "image",
      file: "/hero/hero-5.jpeg",
    },
    {
      title: "Kegiatan Diskominfo 6",
      desc: "Evaluasi sistem informasi daerah",
      type: "image",
      file: "/hero/hero-1.jpeg",
    },
    {
      title: "Video Dokumentasi 1",
      type: "video",
      file: "dQw4w9WgXcQ",
    },
  ];

  const filtered =
    filter === "all" ? data : data.filter((d) => d.type === filter);

  const totalPage = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const reset = () => {
    setZoom(1);
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        reset();
      }
    };

    window.addEventListener("keydown", esc);

    return () => window.removeEventListener("keydown", esc);
  }, []);

  const openModal = (item: GaleriItem) => {
    const index = filtered.findIndex((d) => d.file === item.file);
    setActiveIndex(index);
    reset();
  };

  const next = () => {
    if (activeIndex === null) return;

    setActiveIndex((p) =>
      p === filtered.length - 1 ? 0 : (p as number) + 1
    );

    reset();
  };

  const prev = () => {
    if (activeIndex === null) return;

    setActiveIndex((p) =>
      p === 0 ? filtered.length - 1 : (p as number) - 1
    );

    reset();
  };

  const zoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom((z) => Math.max(z - 0.25, 1));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <section className="bg-primary py-20 text-center text-primary-foreground">
        <h1 className="text-4xl font-bold">Galeri Kegiatan</h1>
        <p className="mt-3 text-white/80">
          Foto & Video Dokumentasi Kegiatan
        </p>
      </section>

      {/* FILTER */}
      <div className="mt-8 flex justify-center gap-3">
        {[
          { key: "all", label: "Semua" },
          { key: "image", label: "Foto" },
          { key: "video", label: "Video" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setFilter(f.key as any);
              setPage(1);
            }}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === f.key
                ? "bg-primary text-white"
                : "bg-card hover:bg-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* GRID */}
      <section className="py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {paginated.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border bg-card shadow-sm"
              >
                {item.type === "image" && (
                  <div
                    onClick={() => openModal(item)}
                    className="relative h-52 cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={item.file}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                )}

                {item.type === "video" && (
                  <a
                    href={`https://www.youtube.com/watch?v=${item.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block h-52"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${item.file}/hqdefault.jpg`}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </a>
                )}

                <div className="p-4">
                  <h3 className="font-bold text-primary">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}

          </div>

          {/* PAGINATION */}
          {totalPage > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-10 w-10 rounded-full border ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "hover:bg-accent"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {activeIndex !== null &&
        filtered[activeIndex]?.type === "image" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">

            {/* CLOSE */}
            <button
              onClick={() => {
                setActiveIndex(null);
                reset();
              }}
              className="absolute right-6 top-6 z-30 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <X size={26} />
            </button>

            {/* PREV */}
            <button
              onClick={prev}
              className="absolute left-4 z-30 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <ChevronLeft size={30} />
            </button>

            {/* NEXT */}
            <button
              onClick={next}
              className="absolute right-4 z-30 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <ChevronRight size={30} />
            </button>

            {/* ZOOM */}
            <div className="absolute left-6 top-6 z-30 flex gap-2">
              <button
                onClick={zoomIn}
                className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              >
                <ZoomIn size={20} />
              </button>

              <button
                onClick={zoomOut}
                className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              >
                <ZoomOut size={20} />
              </button>
            </div>

            {/* IMAGE WRAPPER */}
            <div className="relative h-[85vh] w-[95vw] overflow-hidden rounded-xl">

              {/* IMAGE */}
              <Image
                src={filtered[activeIndex].file}
                alt={filtered[activeIndex].title}
                fill
                priority
                className="object-contain"
                style={{
                  transform: `scale(${zoom})`,
                  transition: "transform 0.25s ease",
                }}
              />

              {/* CAPTION */}
              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/50 backdrop-blur-md px-6 py-5">

                <div className="mx-auto max-w-4xl">

                  <h2 className="text-center text-xl font-bold text-white md:text-3xl">
                    {filtered[activeIndex].title}
                  </h2>

                  {filtered[activeIndex].desc && (
                    <p className="mt-2 text-center text-sm text-white/80 md:text-base">
                      {filtered[activeIndex].desc}
                    </p>
                  )}

                </div>

              </div>
            </div>
          </div>
      )}
    </div>
  );
}