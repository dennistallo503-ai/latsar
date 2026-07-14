"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Building2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

import Lightbox from "yet-another-react-lightbox"

import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"

import "yet-another-react-lightbox/styles.css"

import { OfficialCard } from "./officialCard"

type OrganizationStructure = {
  structure_image: string

  kepala_dinas_name: string
  kepala_dinas_photo: string

  sekretaris_name: string
  sekretaris_photo: string

  kabid_ikp_name: string
  kabid_ikp_photo: string

  kabid_tik_name: string
  kabid_tik_photo: string

  kabid_ps_name: string
  kabid_ps_photo: string

  kasubag_tu_name: string
  kasubag_tu_photo: string

  kasubag_keuangan_name: string
  kasubag_keuangan_photo: string
}

export default function OrganizationStructurePage() {
  const [data, setData] = useState<OrganizationStructure | null>(null)
  const [loading, setLoading] = useState(true)
  const [openLightbox, setLightboxOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const openPhoto = (index: number) => {
  setCurrentSlide(index)
  setLightboxOpen(true)
}

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("organization_structure")
        .select("*")
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("FETCH ERROR:", error)
        setData(null)
        setLoading(false)
        return
      }

      const safeData: OrganizationStructure | null = data
        ? {
            structure_image: data.structure_image || "",

            kepala_dinas_name: data.kepala_dinas_name || "",
            kepala_dinas_photo: data.kepala_dinas_photo || "",

            sekretaris_name: data.sekretaris_name || "",
            sekretaris_photo: data.sekretaris_photo || "",

            kabid_ikp_name: data.kabid_ikp_name || "",
            kabid_ikp_photo: data.kabid_ikp_photo || "",

            kabid_tik_name: data.kabid_tik_name || "",
            kabid_tik_photo: data.kabid_tik_photo || "",

            kabid_ps_name: data.kabid_ps_name || "",
            kabid_ps_photo: data.kabid_ps_photo || "",

            kasubag_tu_name: data.kasubag_tu_name || "",
            kasubag_tu_photo: data.kasubag_tu_photo || "",

            kasubag_keuangan_name: data.kasubag_keuangan_name || "",
            kasubag_keuangan_photo: data.kasubag_keuangan_photo || "",
          }
        : null

      setData(safeData)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Data belum tersedia
      </div>
    )
  }

  const officials = [
  {
    position: "Kepala Dinas",
    name: data.kepala_dinas_name,
    photo: data.kepala_dinas_photo,
  },
  {
    position: "Sekretaris Dinas",
    name: data.sekretaris_name,
    photo: data.sekretaris_photo,
  },
  {
    position: "Kabid IKP",
    name: data.kabid_ikp_name,
    photo: data.kabid_ikp_photo,
  },
  {
    position: "Kabid TIK",
    name: data.kabid_tik_name,
    photo: data.kabid_tik_photo,
  },
  {
    position: "Kabid Persandian & Statistik",
    name: data.kabid_ps_name,
    photo: data.kabid_ps_photo,
  },
  {
    position: "Kasubag Tata Usaha",
    name: data.kasubag_tu_name,
    photo: data.kasubag_tu_photo,
  },
  {
    position: "Kasubag Keuangan",
    name: data.kasubag_keuangan_name,
    photo: data.kasubag_keuangan_photo,
  },
]

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO PAGE */}
      {/* panggil HeroPages di sini */}

      {/* STRUKTUR ORGANISASI */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">

          <div className="rounded-3xl border bg-card p-8 shadow-md">

            <div className="mb-8 flex items-center gap-3">

              <Building2 className="h-8 w-8 text-primary" />

              <div>
                <h2 className="text-3xl font-bold">
                  Struktur Organisasi
                </h2>

                <p className="text-muted-foreground">
                  Klik gambar untuk memperbesar
                </p>
              </div>

            </div>

            <div className="overflow-hidden rounded-2xl border bg-muted/30 p-4">

                <Image
                src={data.structure_image || "/placeholder.svg"}
                alt="Struktur Organisasi"
                width={1800}
                height={1200}
                priority
                onClick={() => setOpenLightbox(true)}
                className="w-full cursor-zoom-in object-contain transition duration-300 hover:scale-[1.02]"
                />

            </div>

          </div>

        </div>
      </section>
    <section className="pb-20">
        <div className="container mx-auto max-w-6xl px-4">

            <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold">
                Pimpinan Dinas
            </h2>

            <p className="mt-2 text-muted-foreground">
                Struktur Pimpinan Dinas Komunikasi dan Informatika Kab. Timor Tengah Selatan
            </p>

            </div>

        </div>
    </section>

      {/* CARD PEJABAT */}
      {/* Akan kita buat di Part 3 */}
        <Lightbox
            open={openLightbox}
            close={() => setLightboxOpen(false)}
            plugins={[Zoom, Fullscreen]}
            slides={[
                {
                src: data.structure_image,
                },
            ]}
        />
    </div>
  )
}