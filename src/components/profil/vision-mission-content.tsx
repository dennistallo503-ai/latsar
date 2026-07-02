"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Target, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type VisionMission = {
  bupati_name: string
  bupati_image: string
  wakil_name: string
  wakil_image: string
  visi: string
  misi: string[]
  period: string 
}

export default function VisionMissionPage() {
  const [data, setData] = useState<VisionMission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("profile_visi_misi")
        .select("*")
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error("FETCH ERROR:", error)
        setData(null)
        setLoading(false)
        return
      }

      const safeData: VisionMission | null = data
        ? {
            bupati_name: data.bupati_name || "",
            bupati_image: data.bupati_image || "",
            wakil_name: data.wakil_name || "",
            wakil_image: data.wakil_image || "",
            visi: data.visi || "",
            misi: Array.isArray(data.misi) ? data.misi : [],
            period: data.period,
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

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* DISINI PANGGIL HERO-PAGES */}

      {/* PIMPINAN */}
      <section className="relative z-10 mt-8 pb-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border bg-card p-8 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">
                Bupati & Wakil Bupati Kabupaten Timor Tengah Selatan
              </h2>
              <p className="text-muted-foreground mt-2">
                {data.period}
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">

              {/* BUPATI */}
              <div className="text-center">
                <p className="mb-3 text-sm font-semibold text-primary">
                  Bupati Timor Tengah Selatan
                </p>
                <div className="relative mx-auto h-56 w-44 overflow-hidden rounded-2xl border">
                  <Image
                    src={data.bupati_image || "/placeholder.svg"}
                    alt="Bupati"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-primary">
                  {data.bupati_name || "-"}
                </h3>
              </div>

              {/* WAKIL */}
              <div className="text-center">
                <p className="mb-3 text-sm font-semibold text-primary">
                  Wakil Bupati Timor Tengah Selatan
                </p>
                <div className="relative mx-auto h-56 w-44 overflow-hidden rounded-2xl border">
                  <Image
                    src={data.wakil_image || "/placeholder.svg"}
                    alt="Wakil Bupati"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-primary">
                  {data.wakil_name || "-"}
                </h3>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 grid lg:grid-cols-5 gap-8">

          {/* VISI */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-3xl border bg-card p-8 shadow-md">

              <div className="flex items-center gap-3 mb-5">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Visi</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {data.visi || "-"}
              </p>

            </div>
          </div>

          {/* MISI */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border bg-card p-8 shadow-md">

              <h2 className="text-3xl font-bold mb-8">
                Misi
              </h2>

              <div className="space-y-4">
                {data.misi?.length ? (
                  data.misi.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-5 rounded-2xl border hover:border-primary transition"
                    >
                      <CheckCircle2 className="h-6 w-6 text-primary mt-1" />

                      <div>
                        <p className="font-semibold">
                          Misi {index + 1}
                        </p>
                        <p className="text-muted-foreground">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Belum ada data misi
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}