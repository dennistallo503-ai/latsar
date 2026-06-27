"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import { Search } from "lucide-react"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

type Item = {
  id: string
  title: string
  description: string | null
  image_url: string | null
  file_url: string | null
  type: string | null
  source_table: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""

  const [input, setInput] = useState(q)
  const [results, setResults] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const isValidImage = async (url: string | null) => {
    if (!url) return false

    try {
      const res = await fetch(url, { method: "HEAD" })
      return res.ok
    } catch {
      return false
    }
  }

  // ================= SEARCH =================
  const fetchSearch = async (keyword: string) => {
    if (!keyword) return

    setLoading(true)

    const { data, error } = await supabase
      .from("global_search")
      .select("*")
      .textSearch("search_vector", keyword, {
        type: "websearch",
        config: "indonesian",
      })
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    // 🔥 FILTER OUT BROKEN FILES
    const filtered = await Promise.all(
      (data || []).map(async (item) => {
        if (item.image_url) {
          const ok = await isValidImage(item.image_url)
          if (!ok) item.image_url = null
        }

        if (item.file_url) {
          try {
            const res = await fetch(item.file_url, { method: "HEAD" })
            if (!res.ok) item.file_url = null
          } catch {
            item.file_url = null
          }
        }

        return item
      })
    )

    setResults(filtered)
    setLoading(false)
  }

  // ================= INIT =================
  useEffect(() => {
    if (q) fetchSearch(q)
  }, [q])

  // ================= ENTER SEARCH =================
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(input)}`)
  }

  // ================= GROUPING =================
  const images = results.filter((i) => i.image_url)
  const pdfs = results.filter((i) => i.file_url)
  const pages = results.filter((i) => !i.image_url && !i.file_url)

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= HEADER GOOGLE STYLE ================= */}
      <div className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">

          <h1
            onClick={() => router.push("/")}
            className="text-xl font-bold cursor-pointer shrink-0"
          >
            Diskominfo
          </h1>

          <form
            onSubmit={handleSearch}
            className="flex-1"
          >
            <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">

              <Search className="w-4 h-4 text-gray-500" />

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 ml-3 outline-none"
                placeholder="Cari layanan, informasi, dokumen..."
              />

            </div>
          </form>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* INFO */}
        <p className="text-sm text-gray-500 mb-4">
          {results.length} hasil ditemukan untuk <b>{q}</b>
        </p>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">Mencari...</p>
        )}

        {/* EMPTY */}
        {!loading && results.length === 0 && q && (
          <p className="text-gray-500">
            Tidak ada hasil ditemukan
          </p>
        )}

        {/* ================= IMAGE RESULTS ================= */}
        {images.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Gambar</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {images.map((item, i) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:shadow"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={item.image_url || ""}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-medium text-sm">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PDF RESULTS ================= */}
        {pdfs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-3">Dokumen</h2>

            <div className="space-y-3">
              {pdfs.map((item) => (
                <a
                  key={item.id}
                  href={item.file_url || "#"}
                  target="_blank"
                  className="block border rounded-lg p-3 hover:bg-gray-50"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE RESULTS ================= */}
        {pages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Halaman</h2>

            <div className="space-y-3">
              {pages.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className="block border rounded-lg p-3 hover:bg-gray-50"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ================= LIGHTBOX ================= */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={images.map((i) => ({
          src: i.image_url || "",
          title: i.title,
          description: i.description || "",
        }))}
        plugins={[Zoom]}
      />
    </div>
  )
}