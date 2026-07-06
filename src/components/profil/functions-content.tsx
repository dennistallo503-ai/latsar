"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react"

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
        <div className="container mx-auto max-w-6xl px-4 grid lg:grid-cols-5 gap-8">

          {/* TUGAS */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-3xl border bg-card p-8 shadow-md">

              <div className="flex items-center gap-3 mb-5">
                <BriefcaseBusiness className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">
                  Tugas
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {data.tugas || "-"}
              </p>

            </div>
          </div>

          {/* FUNGSI */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border bg-card p-8 shadow-md">

              <h2 className="text-3xl font-bold mb-8">
                Fungsi
              </h2>

              <div className="space-y-4">
                {data.fungsi.length ? (
                  data.fungsi.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-2xl border p-5 transition hover:border-primary"
                    >
                      <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" />

                      <div>
                        <p className="font-semibold">
                          Fungsi {index + 1}
                        </p>

                        <p className="text-muted-foreground">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Belum ada data fungsi.
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