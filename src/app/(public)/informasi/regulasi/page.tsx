"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

import {Hero} from '@/components/hero/';

import {
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type Item = {
  id: string
  title: string
  description: string | null
  type: "pdf"
  pdf_url: string | null
  created_at: string
}

const ITEMS_PER_PAGE = 6

type SortType = "desc" | "asc"

export default function RegulasiPage() {
  const [items, setItems] = useState<Item[]>([])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortType>("desc")

  // ================= SCROLL TO TOP =================
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // ================= FETCH DATA =================
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("informasi_bidang")
      .select("*")
      .eq("kategori", "regulasi")
      .eq("type", "pdf")

    if (error) {
      console.log(error.message)
      return
    }

    setItems(data || [])
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [page])

  // ================= SORT =================
  const sorted = useMemo(() => {
    const copy = [...items]

    return copy.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()

      return sort === "desc"
        ? dateB - dateA
        : dateA - dateB
    })
  }, [items, sort])

  // ================= PAGINATION =================
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return sorted.slice(start, start + ITEMS_PER_PAGE)
  }, [sorted, page])

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)

  // ================= HANDLE SORT =================
  const handleSort = (value: SortType) => {
    setSort(value)
    setPage(1)
    scrollToTop()
  }

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
              <>
                <Hero 
                  title="Regulasi"
                  description="Kumpulan Regulasi dalam format PDF"
                />
              </>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">

          {/* FILTER */}
          <div className="mb-6 flex justify-center gap-3">
            <button
              onClick={() => handleSort("desc")}
              className={`rounded-full border px-4 py-2 ${
                sort === "desc"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
            >
              Terbaru
            </button>

            <button
              onClick={() => handleSort("asc")}
              className={`rounded-full border px-4 py-2 ${
                sort === "asc"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
            >
              Terlama
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-4">
            {paginated.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border bg-card p-5"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <FileText className="h-10 w-10 text-primary" />

                  <div>
                    <h3 className="font-semibold text-primary">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* DOWNLOAD */}
                <a
                  href={item.pdf_url || "#"}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  Preview Dokumen
                </a>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">

              {/* PREV */}
              <button
                onClick={() => {
                  setPage((p) => Math.max(p - 1, 1))
                }}
                disabled={page === 1}
                className="rounded-lg border px-3 py-2 disabled:opacity-50"
              >
                <ChevronLeft />
              </button>

              {/* NUMBERS */}
              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              )
                .slice(
                  Math.max(0, page - 2),
                  Math.min(totalPages, page + 1)
                )
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPage(p)
                    }}
                    className={`h-10 w-10 rounded-lg border ${
                      page === p
                        ? "bg-primary text-white"
                        : "hover:bg-accent"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              {/* NEXT */}
              <button
                onClick={() => {
                  setPage((p) => Math.min(p + 1, totalPages))
                }}
                disabled={page === totalPages}
                className="rounded-lg border px-3 py-2 disabled:opacity-50"
              >
                <ChevronRight />
              </button>

            </div>
          )}

        </div>
      </section>
    </div>
  )
}