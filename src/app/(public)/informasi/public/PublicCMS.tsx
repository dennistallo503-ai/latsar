"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { ChevronLeft, ChevronRight, FileText, Download } from "lucide-react"

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import {Hero} from '@/components/hero/';

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type Item = {
  id: string
  title: string
  description: string | null
  type: "pdf" | "image"
  image_url: string | null
  pdf_url: string | null
}

interface Props {
  title: string
  description: string
  category: string
}

const ITEMS_PER_PAGE = 6

export default function PublicCMS({
  title,
  description,
  category,
}: Props) {

  const [items, setItems] = useState<Item[]>([])
  const [filter, setFilter] = useState<"all" | "pdf" | "image">("all")
  const [page, setPage] = useState(1)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
    // LIGHTBOX STATE (FIX IMPORTANT)
const [index, setIndex] = useState(-1)

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches

  // ================= FETCH =================
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("informasi_bidang")
      .select("*")
      .eq("kategori", category)
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error.message)
      return
    }

    setItems(data || [])
  }

  useEffect(() => {
    fetchData()
  }, [category])

  // ================= FILTER =================
  const filtered = useMemo(() => {
    if (filter === "all") return items
    return items.filter((i) => i.type === filter)
  }, [filter, items])

  const imageList = useMemo(() => {
    return items.filter((i) => i.type === "image")
  }, [items])

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  // ================= LIGHTBOX =================

  // LIGHTBOX PAKAI DARI GALLERY DAN LAYANAN

const imageSlides = useMemo(() => {
  return imageList.map((item) => ({
    src: item.image_url || "",
    title: item.title,
    description: item.description ?? "",
  }))
}, [imageList])

const openImage = (item: Item) => {
  const i = imageList.findIndex((img) => img.id === item.id)
  setIndex(i)
}
  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <Hero
        title={title}
        description={description}
      />
      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">

          {/* FILTER */}
          <div className="mb-10 flex justify-center gap-3 flex-wrap">
            {[
              { label: "Semua", value: "all" },
              { label: "Dokumen", value: "pdf" },
              { label: "Gambar", value: "image" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => {
                  setFilter(btn.value as any)
                  setPage(1)
                }}
                className={`rounded-full border px-5 py-2 transition ${
                  filter === btn.value
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {paginated.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border bg-card overflow-hidden"
              >

                {/* IMAGE */}
                {item.type === "image" && (
                  <div
                    className="relative h-56 cursor-pointer"
                    onClick={() => openImage(item)}
                  >
                    <Image
                      src={item.image_url || "/placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* PDF */}
                {item.type === "pdf" && (
                  <div className="flex h-56 items-center justify-center bg-muted">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-bold text-primary">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  {item.type === "pdf" && (
                    <a
                      href={item.pdf_url || "#"}
                      target="_blank"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
                    >
                      <Download className="h-4 w-4" />
                      Preview Dokumen
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">

              {/* PREV */}
              <button
                onClick={() => {
                  setPage((p) => Math.max(p - 1, 1))
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="border px-3 py-2 rounded"
              >
                <ChevronLeft />
              </button>

              {/* NUMBER */}
              {Array.from(
                { length: Math.min(3, totalPages) },
                (_, i) => i + 1
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPage(p)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className={`border px-3 py-2 rounded ${
                    page === p ? "bg-primary text-white" : ""
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* NEXT */}
              <button
                onClick={() => {
                  setPage((p) => Math.min(p + 1, totalPages))
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="border px-3 py-2 rounded"
              >
                <ChevronRight />
              </button>

            </div>
          )}

        </div>
      </section>

<Lightbox
  open={index >= 0}
  close={() => setIndex(-1)}
  index={index}
  plugins={[Zoom, Captions, Thumbnails]}
  slides={imageSlides}
  carousel={{
    finite: false,
    preload: 2,
    padding: "16px",
    spacing: "12%",
  }}
  zoom={{
    maxZoomPixelRatio: 4,
    zoomInMultiplier: 2,
    wheelZoomDistanceFactor: 120,
    pinchZoomDistanceFactor: 120,
  }}
  captions={{
    descriptionTextAlign: "center",
    descriptionMaxLines: 3,
  }}
  thumbnails={{
    position: "bottom",
    width: 100,
    height: 70,
    borderRadius: 8,
    gap: 10,
  }}
/>

    </div>
  )
}