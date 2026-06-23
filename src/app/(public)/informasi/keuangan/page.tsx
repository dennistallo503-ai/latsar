"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FileText, X, Eye, Download } from "lucide-react";

type DokumenType = "pdf" | "image";

interface Dokumen {
  title: string;
  desc: string;
  type: DokumenType;
  file: string;
}

export default function KeuanganPage() {
  const [filter, setFilter] = useState<"all" | "pdf" | "image">("all");

  // MODAL
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalPdf, setModalPdf] = useState<string | null>(null);

  // IMAGE ZOOM + PAN
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const dokumen: Dokumen[] = [
    {
      title: "RPJMD",
      desc: "RPJMD Kab. TTS 2024-2029",
      type: "pdf",
      file: "/informasi/RPJMD-Kab-TTS-Tahun-2025-2029.pdf",
    },
    {
      title: "Infografis Keuangan",
      desc: "Infografis Keuangan",
      type: "image",
      file: "/informasi/keuangan.png",
    },
  ];

  const filtered =
    filter === "all" ? dokumen : dokumen.filter((d) => d.type === filter);

  // ESC CLOSE
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalImage(null);
        setModalPdf(null);
        resetView();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // RESET IMAGE
  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));

  // FIX DRAG (lebih stabil)
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;

    setDragging(true);
    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <section className="bg-primary py-20 text-center text-primary-foreground">
        <h1 className="text-4xl font-bold">
          Sub Bagian Keuangan dan Perlengkapan
        </h1>
        <p className="mt-3 font-bold">Dinas Komunikasi & Informatika Kab. Timor Tengah Selatan</p>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">

          {/* FILTER */}
          <div className="mb-8 flex justify-center gap-3">
            {[
              { label: "Semua", value: "all" },
              { label: "Dokumen", value: "pdf" },
              { label: "Infografis", value: "image" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value as any)}
                className={`rounded-full border px-4 py-2 text-sm transition
                ${
                  filter === btn.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-accent"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-md"
              >

                {/* IMAGE */}
                {item.type === "image" && (
                  <div
                    className="relative h-52 w-full cursor-pointer"
                    onClick={() => {
                      setModalImage(item.file);
                      resetView();
                    }}
                  >
                    <Image
                      src={item.file}
                      alt={item.title}
                      fill
                      className="object-cover transition hover:scale-105"
                    />
                  </div>
                )}

                {/* PDF */}
                {item.type === "pdf" && (
                  <div className="flex h-52 flex-col items-center justify-center gap-2 bg-muted">
                    <FileText className="h-12 w-12 text-primary" />

                    <button
                      onClick={() => setModalPdf(item.file)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Eye className="h-4 w-4" />
                      Preview PDF
                    </button>
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>

                  {item.type === "pdf" && (
                    <a
                      href={item.file}
                      download
                      className="mt-3 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* IMAGE MODAL */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => {
            setModalImage(null);
            resetView();
          }}
        >
          <button className="absolute right-6 top-6 text-white">
            <X />
          </button>

          {/* TOOLBAR */}
          <div className="absolute left-6 top-6 flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              className="rounded-md bg-white/10 px-3 py-1 text-white"
            >
              Zoom +
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              className="rounded-md bg-white/10 px-3 py-1 text-white"
            >
              Zoom -
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); resetView(); }}
              className="rounded-md bg-white/10 px-3 py-1 text-white"
            >
              Reset
            </button>

            <a
              href={modalImage}
              download
              onClick={(e) => e.stopPropagation()}
              className="rounded-md bg-primary px-3 py-1 text-white"
            >
              Download
            </a>
          </div>

          {/* IMAGE VIEWER */}
          <div
            className="relative h-[85vh] w-full max-w-5xl overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalImage}
              alt="preview"
              fill
              className="object-contain"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            />
          </div>
        </div>
      )}

      {/* PDF MODAL (FIXED VIEWER) */}
      {modalPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setModalPdf(null)}
        >
          <button className="absolute right-6 top-6 text-white">
            <X />
          </button>

          <div
            className="h-[85vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* FIX: pakai embed (lebih stabil dari iframe) */}
            <embed
              src={modalPdf}
              type="application/pdf"
              className="h-full w-full"
            />
          </div>
        </div>
      )}

    </div>
  );
}