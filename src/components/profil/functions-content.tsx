"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

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

      {/* HEADER */}
      <section className="relative bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Tugas dan Fungsi</h1>
          <p className="mt-4 text-primary-foreground/90">
            Dinas Kominfo Kabupaten TTS
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-8">

          {/* TUGAS */}
          <div className="rounded-3xl border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Tugas</h2>
            <p className="text-muted-foreground leading-relaxed">
              {data.tugas}
            </p>
          </div>

          {/* FUNGSI */}
          <div className="rounded-3xl border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Fungsi</h2>

            <ol className="space-y-3">
              {data.fungsi.map((item: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>

    </div>
  )
}