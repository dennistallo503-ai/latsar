"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Target, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import {
  FadeIn,
  FadeUp,
  SlideLeft,
  SlideRight,
} from "@/components/animations";

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


      {/* PIMPINAN */}
      <section className="relative z-10 mt-8 pb-10">

        <div className="container mx-auto max-w-5xl px-4">

          <FadeIn once={false}>

            <div className="rounded-3xl border bg-card p-8 shadow-xl">


              {/* HEADER */}

              <div className="mb-10 text-center">

                <FadeUp once={false}>

                  <h2 className="text-2xl font-bold md:text-3xl">
                    Bupati & Wakil Bupati Kabupaten Timor Tengah Selatan
                  </h2>

                </FadeUp>


                <FadeUp
                  once={false}
                  delay={0.1}
                >

                  <p className="mt-2 text-muted-foreground">
                    {data.period}
                  </p>

                </FadeUp>


              </div>



              <div className="grid gap-10 md:grid-cols-2">


                {/* BUPATI */}

                <SlideLeft
                  once={false}
                  delay={0.2}
                >

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

                </SlideLeft>




                {/* WAKIL */}

                <SlideRight
                  once={false}
                  delay={0.2}
                >

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

                </SlideRight>


              </div>


            </div>

          </FadeIn>


        </div>

      </section>




      {/* VISI MISI */}

      <section className="py-16">


        <div className="container mx-auto max-w-6xl px-4 grid gap-8 lg:grid-cols-5">



          {/* VISI */}

          <div className="lg:col-span-2">


            <SlideLeft
              once={false}
            >

              <div className="h-full rounded-3xl border bg-card p-8 shadow-md">


                <div className="mb-5 flex items-center gap-3">

                  <Target className="h-8 w-8 text-primary" />

                  <h2 className="text-3xl font-bold">
                    Visi
                  </h2>

                </div>



                <FadeIn once={false} delay={0.1}>

                  <p className="leading-relaxed text-muted-foreground">
                    {data.visi || "-"}
                  </p>

                </FadeIn>



              </div>

            </SlideLeft>


          </div>





          {/* MISI */}

          <div className="lg:col-span-3">


            <SlideRight
              once={false}
            >

              <div className="rounded-3xl border bg-card p-8 shadow-md">


                <FadeUp once={false}>

                  <h2 className="mb-8 text-3xl font-bold">
                    Misi
                  </h2>

                </FadeUp>




                <div className="space-y-4">


                  {data.misi?.length ? (

                    data.misi.map((item, index) => (

                      <FadeIn
                        key={index}
                        once={false}
                        delay={index * 0.15}
                      >


                        <div
                          className="
                          flex
                          gap-4
                          rounded-2xl
                          border
                          p-5
                          transition
                          hover:border-primary
                          "
                        >


                          <CheckCircle2
                            className="
                            mt-1
                            h-6
                            w-6
                            text-primary
                            "
                          />



                          <div>

                            <p className="font-semibold">
                              Misi {index + 1}
                            </p>


                            <p className="text-muted-foreground">
                              {item}
                            </p>


                          </div>


                        </div>


                      </FadeIn>

                    ))


                  ) : (


                    <p className="text-muted-foreground">
                      Belum ada data misi
                    </p>


                  )}


                </div>


              </div>


            </SlideRight>


          </div>



        </div>


      </section>


    </div>
  )
  }