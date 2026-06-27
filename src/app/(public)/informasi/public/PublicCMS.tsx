"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { FileText, Download, ChevronLeft, ChevronRight, X } from "lucide-react"

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
  const [lightbox, setLightbox] = useState({
    open: false,
    src: "",
    title: "",
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const [scale, setScale] = useState(1)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [lastDistance, setLastDistance] = useState<number | null>(null)

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
  const openImage = (item: Item) => {
    const index = imageList.findIndex((img) => img.id === item.id)

    setCurrentIndex(index)
    setScale(1)

    setLightbox({
      open: true,
      src: item.image_url || "",
      title: item.title,
    })
  }

  const nextImage = () => {
    if (!imageList.length) return

    const next = (currentIndex + 1) % imageList.length

    setCurrentIndex(next)
    setScale(1)

    setLightbox({
      open: true,
      src: imageList[next].image_url || "",
      title: imageList[next].title,
    })
  }

  const prevImage = () => {
    if (!imageList.length) return

    const prev =
      (currentIndex - 1 + imageList.length) % imageList.length

    setCurrentIndex(prev)
    setScale(1)

    setLightbox({
      open: true,
      src: imageList[prev].image_url || "",
      title: imageList[prev].title,
    })
  }

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <section className="bg-primary py-20 text-center text-primary-foreground">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4 opacity-80">{description}</p>
      </section>

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
                      Download PDF
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

      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"

          // ================= TOUCH START =================
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              setTouchStartX(e.touches[0].clientX)
            }

            if (e.touches.length === 2) {
              setLastDistance(getDistance(e.touches))
            }
          }}

          // ================= TOUCH MOVE =================
          onTouchMove={(e) => {
            if (e.touches.length === 2) {
              const newDistance = getDistance(e.touches)

              if (lastDistance) {
                const diff = newDistance - lastDistance

                setScale((prev) => {
                  let next = prev + diff * 0.005
                  if (next < 1) next = 1
                  if (next > 4) next = 4
                  return next
                })
              }

              setLastDistance(newDistance)
            }
          }}

          // ================= TOUCH END (SWIPE) =================
          onTouchEnd={(e) => {
            if (touchStartX !== null && e.changedTouches.length === 1) {
              const diff =
                e.changedTouches[0].clientX - touchStartX

              if (diff > 60) prevImage()
              if (diff < -60) nextImage()
            }

            setTouchStartX(null)
            setLastDistance(null)
          }}

          // ================= CLOSE BEHAVIOR =================
          onClick={() => {
            if (isMobile) {
              setLightbox({ open: false, src: "", title: "" })
            }
          }}
        >

          {/* CLOSE BUTTON (WAJIB UNTUK SEMUA) */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightbox({ open: false, src: "", title: "" })
            }}
            className="absolute right-4 top-4 z-50 text-white bg-black/60 p-2 rounded-full"
          >
            ✕
          </button>

          {/* LEFT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          >
            ›
          </button>

          {/* IMAGE */}
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain transition-transform duration-150"
              style={{
                transform: `scale(${scale})`,
              }}
            />

            <p className="mt-3 text-sm text-white/70 text-center">
              {lightbox.title}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}