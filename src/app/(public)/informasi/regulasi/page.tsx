"use client";

import { useState } from "react";
import {
  FileText,
  X,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Dokumen {
  title: string;
  desc: string;
  file: string;
}

export default function RegulasiPage() {
  // MODAL PDF
  const [modalPdf, setModalPdf] = useState<string | null>(null);

  // PAGINATION
  const [page, setPage] = useState(1);
  const perPage = 6; // ✅ MAKSIMAL 6 PER HALAMAN

  const dokumen: Dokumen[] = [
    {
      title: "RPJMD",
      desc: "RPJMD Kab. TTS 2024-2029",
      file: "/informasi/RPJMD-Kab-TTS-Tahun-2025-2029.pdf",
    },
    {
      title: "RENSTRA",
      desc: "Rencana Strategis",
      file: "/informasi/renstra.pdf",
    },
    {
      title: "RENJA",
      desc: "Rencana Kerja",
      file: "/informasi/renja.pdf",
    },
    {
      title: "RKA",
      desc: "Rencana Kerja Anggaran",
      file: "/informasi/rka.pdf",
    },
    {
      title: "DPA",
      desc: "Dokumen Pelaksanaan Anggaran",
      file: "/informasi/dpa.pdf",
    },
    {
      title: "LKPJ",
      desc: "Laporan Kinerja Pemerintah Daerah",
      file: "/informasi/lkpj.pdf",
    },
    {
      title: "LAKIP",
      desc: "Laporan Akuntabilitas Kinerja",
      file: "/informasi/lakip.pdf",
    },
  ];

  // PAGINATION LOGIC
  const totalPages = Math.ceil(dokumen.length / perPage);

  const paginated = dokumen.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <section className="bg-primary py-20 text-center text-primary-foreground">
        <h1 className="text-4xl font-bold">
          Regulasi & Peraturan
        </h1>
        <p className="mt-3 font-bold">
          Dinas Komunikasi & Informatika Kab. Timor Tengah Selatan
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {paginated.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md"
              >

                {/* ICON */}
                <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl bg-muted">
                  <FileText className="h-12 w-12 text-primary" />

                  <button
                    onClick={() => setModalPdf(item.file)}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Eye className="h-4 w-4" />
                    Preview PDF
                  </button>
                </div>

                {/* CONTENT */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>

                  <a
                    href={item.file}
                    download
                    className="mt-3 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">

              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="rounded-md border px-3 py-2 hover:bg-accent"
              >
                <ChevronLeft />
              </button>

              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-md border px-3 py-2 hover:bg-accent"
              >
                <ChevronRight />
              </button>

            </div>
          )}

        </div>
      </section>

      {/* PDF MODAL */}
      {modalPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setModalPdf(null)}
        >
          <button className="absolute right-6 top-6 text-white">
            <X />
          </button>

          <div
            className="h-[85vh] w-full max-w-5xl overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <embed
              src={modalPdf}
              type="application/pdf"
              className="h-full w-full"
            />
          </div>
        </div>
      )}

    </div>
  );
}