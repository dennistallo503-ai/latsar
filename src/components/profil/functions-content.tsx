"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react"
import {
  FadeIn,
  FadeUp,
  SlideLeft,
  SlideRight,
} from "@/components/animations";

export default function TaskFunctionPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("task_function")
        .select("*")
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error(error)
        setData(null)
      } else {
        setData({
          ...data,
          fungsi: Array.isArray(data?.fungsi) ? data.fungsi : [],
        })
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Data belum tersedia</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">


      {/* CONTENT */}
      <section className="py-16">

        <div className="container mx-auto max-w-6xl px-4 grid gap-8 lg:grid-cols-5">



          {/* TUGAS */}

          <div className="lg:col-span-2">

            <SlideLeft
              once={false}
            >

              <div className="h-full rounded-3xl border bg-card p-8 shadow-md">


                <FadeUp
                  once={false}
                >

                  <div className="mb-5 flex items-center gap-3">

                    <BriefcaseBusiness
                      className="h-8 w-8 text-primary"
                    />


                    <h2 className="text-3xl font-bold">
                      Tugas
                    </h2>


                  </div>

                </FadeUp>



                <FadeIn
                  once={false}
                  delay={0.1}
                >

                  <p className="leading-relaxed text-muted-foreground">
                    {data.tugas || "-"}
                  </p>

                </FadeIn>



              </div>


            </SlideLeft>


          </div>






          {/* FUNGSI */}

          <div className="lg:col-span-3">


            <SlideRight
              once={false}
            >

              <div className="rounded-3xl border bg-card p-8 shadow-md">



                <FadeUp
                  once={false}
                >

                  <h2 className="mb-8 text-3xl font-bold">
                    Fungsi
                  </h2>

                </FadeUp>





                <div className="space-y-4">


                  {data.fungsi.length ? (

                    data.fungsi.map(
                      (item: string, index: number) => (

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
                          hover:shadow-sm
                          "
                        >


                          <CheckCircle2
                            className="
                            mt-1
                            h-6
                            w-6
                            shrink-0
                            text-primary
                            "
                          />



                          <div>


                            <p className="font-semibold">
                              Fungsi {index + 1}
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
                      Belum ada data fungsi.
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