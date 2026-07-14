"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { ChevronLeft, ChevronRight, FileText, Download, Search } from "lucide-react"
import { FadeIn } from "@/components/animations"


import {Hero} from '@/components/hero/';


type Item = {
  id: string
  title: string
  description: string | null
  type: "pdf"
  pdf_url: string | null
  created_at: string
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
  const [filter, setFilter] = useState<"all" | "latest" | "oldest">("latest") 
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const ITEMS_PER_PAGE = 10

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

    let result = [...items]


    // SEARCH
    if (search.trim() !== "") {

      result = result.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
        ||
        item.description
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )

    }



    // SORT
    if (filter === "oldest") {

      result.sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      )

    } else {

      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )

    }


    return result


  }, [items, filter, search])

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  // ================= LIGHTBOX =================

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <Hero
        title={title}
        description={description}
      />
      {/* CONTENT */}
      <section className="py-16">

        <div className="container mx-auto max-w-6xl px-4">


          {/* FILTER */}
          <div className="mb-10 flex justify-center gap-3">

            {[
              { label: "Terbaru", value: "latest" },
              { label: "Terlama", value: "oldest" },
            ].map((btn) => (

              <button
                key={btn.value}
                onClick={() => {
                  setFilter(btn.value as any)
                  setPage(1)
                }}
                className={`
                  rounded-full
                  border
                  px-5
                  py-2
                  transition
                  ${
                    filter === btn.value
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }
                `}
              >

                {btn.label}

              </button>

            ))}

          </div>

          {/* SEARCH */}

          <div className="mb-6 flex justify-center">

            <div className="relative w-full max-w-xl">

              <Search className="
                absolute
                left-4
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-muted-foreground
              "/>


              <input
                type="text"
                placeholder="Cari dokumen..."
                value={search}
                onChange={(e)=>{
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  bg-background
                  py-3
                  pl-12
                  pr-5
                  outline-none
                  focus:border-primary
                "
              />

            </div>
          </div>

          {/* TABLE */}
          <FadeIn key={page}>
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-sm">


                {/* HEADER */}

                <thead className="bg-muted/50">

                  <tr className="border-b">


                    <th className="px-5 py-4 text-left font-semibold">
                      No
                    </th>


                    <th className="px-5 py-4 text-left font-semibold">
                      Nama Dokumen
                    </th>


                    <th className="px-5 py-4 text-left font-semibold">
                      Deskripsi
                    </th>


                    <th className="px-5 py-4 text-center font-semibold">
                      Aksi
                    </th>


                  </tr>

                </thead>





                {/* BODY */}

                <tbody>


                  {paginated.length ? (

                    paginated.map((item, index) => (

                      <tr
                        key={item.id}
                        className="
                          border-b
                          transition
                          hover:bg-muted/40
                        "
                      >



                        {/* NOMOR */}

                        <td className="px-5 py-4">

                          {(page - 1) * ITEMS_PER_PAGE + index + 1}

                        </td>





                        {/* DOKUMEN */}

                        <td className="px-5 py-4">


                          <div className="flex items-center gap-3">


                            <div
                              className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-lg
                                bg-blue-500/10
                              "
                            >

                              <FileText
                                className="
                                  h-6
                                  w-6
                                  text-blue-600
                                "
                              />

                            </div>



                            <div>


                              <p className="font-semibold text-primary">

                                {item.title}

                              </p>



                              <p className="text-xs text-muted-foreground">

                                Dokumen PDF

                              </p>


                            </div>


                          </div>


                        </td>







                        {/* DESKRIPSI */}

                        <td className="max-w-lg px-5 py-4">


                          <p className="line-clamp-2 text-muted-foreground">

                            {item.description}

                          </p>


                        </td>








                        {/* AKSI */}

                        <td className="px-5 py-4 text-center">


                          <a
                            href={item.pdf_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-lg
                              bg-primary
                              px-4
                              py-2
                              text-sm
                              text-primary-foreground
                              transition
                              hover:opacity-90
                            "
                          >

                            <Download
                              className="h-4 w-4"
                            />

                            Preview PDF


                          </a>


                        </td>




                      </tr>


                    ))


                  ) : (


                    <tr>

                      <td
                        colSpan={4}
                        className="
                          px-5
                          py-10
                          text-center
                          text-muted-foreground
                        "
                      >

                        Belum ada dokumen PDF

                      </td>


                    </tr>


                  )}



                </tbody>


              </table>


            </div>


          </div>
          </FadeIn>






          {/* PAGINATION */}

          {totalPages > 1 && (

            <div className="mt-10 flex justify-center gap-2">


              {/* PREV */}

              <button

                onClick={() => {

                  setPage((p) => Math.max(p - 1, 1))

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  })

                }}

                className="
                  rounded
                  border
                  px-3
                  py-2
                "

              >

                <ChevronLeft />

              </button>





              {/* NUMBER */}

              {Array.from(
                {
                  length: Math.min(3, totalPages)
                },
                (_, i) => i + 1

              ).map((p) => (

                <button

                  key={p}

                  onClick={() => {

                    setPage(p)

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    })

                  }}

                  className={`
                    rounded
                    border
                    px-3
                    py-2
                    ${
                      page === p
                        ? "bg-primary text-white"
                        : ""
                    }
                  `}

                >

                  {p}

                </button>


              ))}






              {/* NEXT */}

              <button

                onClick={() => {

                  setPage((p) =>
                    Math.min(
                      p + 1,
                      totalPages
                    )
                  )


                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  })


                }}

                className="
                  rounded
                  border
                  px-3
                  py-2
                "

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