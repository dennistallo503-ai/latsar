"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Upload, Trash2, Pencil, X } from "lucide-react"

type Item = {
  id: string
  kategori: string
  title: string
  pdf_url: string
  created_at: string
}

interface Props {
  title: string
  description: string
  category: string
}

const PAGE_SIZE = 5

export default function RegulasiModule({
  title,
  description,
  category,
}: Props) {

  // ================= SAFE CATEGORY =================
  const safeCategory = category?.trim()

  if (!safeCategory) {
    throw new Error("CATEGORY REGULASI TIDAK BOLEH NULL")
  }

  // ================= STATE =================
  const [items, setItems] = useState<Item[]>([])

  const [docTitle, setDocTitle] = useState("")
  const [docLink, setDocLink] = useState("")

  const [editId, setEditId] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  // ================= FETCH =================
  const fetchData = async (pageNumber = 1) => {
    const from = (pageNumber - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, count, error } = await supabase
      .from("informasi_bidang")
      .select("*", { count: "exact" })
      .eq("kategori", safeCategory)
      .eq("type", "pdf")
      .order("created_at", { ascending: false })
      .range(from, to)

    if (error) {
      console.log(error.message)
      return
    }

    setItems(data || [])
    setTotal(count || 0)
  }

  useEffect(() => {
    fetchData(page)
  }, [page, safeCategory])

  // ================= RESET =================
  const resetForm = () => {
    setDocTitle("")
    setDocLink("")
    setEditId(null)
  }

  // ================= SAVE =================
  const handleSave = async () => {
    if (!docTitle.trim() || !docLink.trim()) {
      return alert("Lengkapi data regulasi")
    }

    const payload = {
      kategori: safeCategory,
      type: "pdf",
      title: docTitle,
      pdf_url: docLink,
    }

    const query = editId
      ? supabase.from("informasi_bidang").update(payload).eq("id", editId)
      : supabase.from("informasi_bidang").insert(payload)

    const { error } = await query

    if (error) {
      alert(error.message)
      return
    }

    resetForm()
    fetchData(page)
  }

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("informasi_bidang")
      .delete()
      .eq("id", id)

    if (error) {
      alert(error.message)
      return
    }

    fetchData(page)
  }

  // ================= EDIT =================
  const handleEdit = (item: Item) => {
    setEditId(item.id)
    setDocTitle(item.title || "")
    setDocLink(item.pdf_url || "")
  }

  // ================= PAGINATION =================
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const getPages = () => {
    let start = Math.max(1, page - 1)
    let end = start + 2

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - 2)
    }

    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    )
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* FORM */}
      <Card>
        <CardContent className="space-y-3 pt-6">

          <Input
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="Judul Regulasi"
          />

          <Input
            value={docLink}
            onChange={(e) => setDocLink(e.target.value)}
            placeholder="Link Google Drive PDF"
          />

          <Button onClick={handleSave} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            {editId ? "Update" : "Simpan"}
          </Button>

          {editId && (
            <Button
              variant="secondary"
              onClick={resetForm}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel Edit
            </Button>
          )}

        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardContent className="pt-6">

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Judul</th>
                <th className="p-2">Link</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.title}</td>

                  <td className="p-2">
                    <a
                      href={item.pdf_url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Buka PDF
                    </a>
                  </td>

                  <td className="p-2 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-4">

            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ‹
            </Button>

            {getPages().map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              ›
            </Button>

          </div>

        </CardContent>
      </Card>

    </div>
  )
}