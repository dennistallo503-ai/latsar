"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function OrganizationStructurePage() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<any | null>(null)

  // ESC close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // FETCH SUPABASE
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("struktur_organisasi")
        .select("*")
        .maybeSingle()

      if (error) {
        console.log("FETCH ERROR:", error.message)
        return
      }

      setData(data ?? null)
    }

    fetchData()
  }, [])

  const imageUrl =
    data?.image_url && data.image_url.length > 0
      ? data.image_url
      : "/placeholder.svg"

  const description =
    data?.description?.length > 0
      ? data.description
      : "Struktur organisasi Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan menggambarkan susunan jabatan, bidang, serta alur koordinasi dalam pelaksanaan tugas pemerintahan daerah."

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      {/* <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10" />

        <div className="container relative mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Struktur Organisasi
          </h1>

          <p className="mt-4 text-primary-foreground/90 text-base md:text-lg">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section> */}

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 space-y-10">

          {/* IMAGE CARD */}
          <div className="rounded-3xl border bg-card p-6 shadow-md transition hover:shadow-lg">

            <div
              className="relative w-full h-[500px] md:h-[600px] cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Image
                src={imageUrl}
                alt="Struktur Organisasi Diskominfo TTS"
                fill
                className="object-contain transition hover:scale-[1.02]"
                priority
              />
            </div>

          </div>

          {/* DESCRIPTION (TETAP STYLE LAMA) */}
          <div className="text-center">
            <p className="mx-auto max-w-3xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

        </div>
      </section>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt="Preview Struktur Organisasi"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

    </div>
  )
}