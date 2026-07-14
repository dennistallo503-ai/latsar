"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { ChevronLeft, ChevronRight } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {Hero} from '@/components/hero/';

interface Item {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

const perPage = 6;

export default function PublicGallery({
  category,
  title,
  description,
}: {
  category: "galeri" | "layanan";
  title: string;
  description: string;
}) {

  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(-1);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  // ================= FETCH SUPABASE =================
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("media_content")
      .select("*")
      .eq("category", category);

    if (error) {
      console.log(error.message);
      return;
    }

    setItems(data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // reset page ketika category berubah
  useEffect(() => {
    setPage(1);
  }, [category]);

  // ================= SORT =================
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return sort === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [items, sort]);

  // ================= PAGINATION =================
  const totalPage = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // safety page fix
  useEffect(() => {
    if (page > totalPage && totalPage > 0) {
      setPage(1);
    }
  }, [totalPage]);

  // ================= LIGHTBOX =================
  const openLightbox = (item: Item) => {
    const realIndex = sorted.findIndex(
      (d) => d.id === item.id
    );
    setIndex(realIndex);
  };

  // ================= SCROLL TO TOP =================
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <Hero
        title={title}
        description={description}
      />

      {/* SORT */}
      <section className="py-6 border-b">
        <div className="container mx-auto max-w-6xl px-4 flex justify-end">

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as "newest" | "oldest");
              setPage(1);
            }}
            className="rounded-lg border bg-background px-4 py-2"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>

        </div>
      </section>

      {/* GRID */}
      <section className="py-10">
        <div className="container mx-auto max-w-6xl px-4">

        <StaggerContainer
          key={page}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >

          {paginated.map((item, index) => (

            <StaggerItem
              key={item.id}
              delay={index * 0.12}
            >

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-card
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                <div
                  onClick={() => openLightbox(item)}
                  className="
                    relative
                    h-52
                    cursor-pointer
                    overflow-hidden
                  "
                >

                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="
                      object-cover
                      transition
                      duration-500
                      hover:scale-110
                    "
                  />

                </div>


                <div className="p-4">

                  <h3 className="font-bold text-primary">
                    {item.title}
                  </h3>


                  {item.description && (

                    <p className="
                      mt-2
                      text-sm
                      text-muted-foreground
                    ">
                      {item.description}
                    </p>

                  )}

                </div>

              </div>

            </StaggerItem>

          ))}

        </StaggerContainer>

          {/* PAGINATION */}
          {totalPage > 1 && (() => {
            const maxVisible = 3;

            let start = Math.max(1, page - 1);
            let end = start + maxVisible - 1;

            if (end > totalPage) {
              end = totalPage;
              start = Math.max(1, end - maxVisible + 1);
            }

            return (
              <div className="mt-10 flex items-center justify-center gap-2">

                <button
                  onClick={() =>
                    setPage((p) => Math.max(p - 1, 1))
                  }
                  disabled={page === 1}
                  className="flex h-10 items-center rounded-lg border px-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from(
                  { length: end - start + 1 },
                  (_, i) => start + i
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-10 w-10 rounded-lg border ${
                      page === p
                        ? "bg-primary text-white"
                        : "hover:bg-accent"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, totalPage))
                  }
                  disabled={page === totalPage}
                  className="flex h-10 items-center rounded-lg border px-3"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

              </div>
            );
          })()}

        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        plugins={[Zoom, Captions, Thumbnails]}
        slides={sorted.map((item) => ({
          src: item.image_url,
          title: item.title,
          description: item.description || "",
        }))}
      />

    </div>
  );
}