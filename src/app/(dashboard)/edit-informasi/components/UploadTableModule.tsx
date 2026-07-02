"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Upload, Trash2, Pencil, X } from "lucide-react"

type Item = {
  id: string
  kategori: string
  title: string
  description: string | null
  type: "pdf" | "image"
  image_url: string | null
  pdf_url: string | null
  created_at: string
}

interface Props {
  title: string
  description: string
  category: string
}

const PAGE_SIZE = 5

export default function UploadTableModule({
  title,
  description,
  category,
}: Props) {
  // ================= SAFE STATE =================
  const [docDesc, setDocDesc] = useState<string>("")
  const [docTitle, setDocTitle] = useState<string>("")
  const [docLink, setDocLink] = useState<string>("")

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imgTitle, setImgTitle] = useState("")
  const [imageDesc, setImageDesc] = useState<string>("")

  const [items, setItems] = useState<Item[]>([])

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
      .eq("kategori", category)
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
  }, [page, category])

  // ================= RESET =================
  const resetForm = () => {
    setDocTitle("")
    setDocLink("")
    setImageFile(null)
    setImageDesc("")
    setEditId(null)
  }

  // ================= IMAGE UPLOAD =================
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`informasi/${fileName}`, file)

    if (error) throw error

    const { data: url } = supabase.storage
      .from("images")
      .getPublicUrl(data.path)

    return {
      url: url.publicUrl,
      path: data.path,
    }
  }

  // ================= SAVE =================
  const handleUpload = async () => {
    // ================= PDF =================
    if (!docTitle.trim() || !docLink.trim()) {
      return alert("Lengkapi data PDF")
    }

    if (!editId) {
      const { error } = await supabase.from("informasi_bidang").insert({
        kategori: category,
        type: "pdf",
        title: docTitle,
        description: docDesc,
        pdf_url: docLink,
      })

      if (error) return alert(error.message)
    } else {
      const { error } = await supabase
        .from("informasi_bidang")
        .update({
          title: docTitle,
          description: docDesc, // ✅ FIX
          pdf_url: docLink,
        })
        .eq("id", editId)

      if (error) return alert(error.message)
    }

    resetForm()
    fetchData(page)
  }

  const handleUploadImage = async () => {
    if (!imageFile || !imageDesc.trim()) {
      return alert("Lengkapi data gambar")
    }

    try {
      const { url } = await uploadImage(imageFile)

      if (!editId) {
        const { error } = await supabase.from("informasi_bidang").insert({
          kategori: category,
          type: "image",
          title: imgTitle,
          description: imageDesc,
          image_url: url,
        })

        if (error) return alert(error.message)
      } else {
        const { error } = await supabase
          .from("informasi_bidang")
          .update({
            title: imgTitle,
            description: imageDesc,
            image_url: url,
          })
          .eq("id", editId)

        if (error) return alert(error.message)
      }

      resetForm()
      fetchData(page)
    } catch (err: any) {
      alert(err.message)
    }
  }

  // ================= DELETE =================
  const handleDelete = async (item: Item) => {
    if (item.type === "image" && item.image_url) {
      const path = item.image_url.split(
        "/storage/v1/object/public/images/"
      )[1]

      if (path) {
        await supabase.storage.from("images").remove([path])
      }
    }

    await supabase.from("informasi_bidang").delete().eq("id", item.id)

    fetchData(page)
  }

  // ================= PAGINATION =================
  const totalPages = Math.ceil(total / PAGE_SIZE)

  const getPages = () => {
    const max = 3
    let start = Math.max(1, page - 1)
    let end = start + max - 1

    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - max + 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* FORM PDF */}
        <Card>
          <CardContent className="space-y-3 pt-6">
            <h2 className="font-semibold">PDF</h2>

            <Input
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="Judul PDF"
            />

            <Input
              value={docLink}
              onChange={(e) => setDocLink(e.target.value)}
              placeholder="Link Google Drive"
            />

            <Textarea
              value={docDesc}
              onChange={(e) => setDocDesc(e.target.value)}
              placeholder="Deskripsi PDF"
            />

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Simpan PDF
              </Button>

              {editId && (
                <Button
                  variant="destructive"
                  onClick={resetForm}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* FORM IMAGE */}
        <Card>
          <CardContent className="space-y-3 pt-6">
            <h2 className="font-semibold">Gambar</h2>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
            />

            <Input
              value={imageDesc}
              onChange={(e) => setImageDesc(e.target.value)}
              placeholder="Deskripsi gambar"
            />

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleUploadImage}
              >
                <Upload className="h-4 w-4 mr-2" />
                Simpan Gambar
              </Button>

              {editId && (
                <Button
                  variant="destructive"
                  onClick={resetForm}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= TABLE (DI BAWAH) ================= */}
      <Card>
        <CardContent className="pt-6 space-y-4">

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Tipe</th>
                <th className="p-2">Judul</th>
                <th className="p-2">Link</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.type}</td>

                  <td className="p-2">{item.title}</td>

                  <td className="p-2">
                    {item.type === "pdf" ? (
                      <a
                        href={item.pdf_url || "#"}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Buka PDF
                      </a>
                    ) : (
                      <a
                        href={item.image_url || "#"}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Lihat Gambar
                      </a>
                    )}
                  </td>

                  <td className="p-2 flex gap-2">
                    <Button
                      size="icon"
                      onClick={() => {
                        if (item.type === "pdf") {
                          setDocTitle(item.title)
                          setDocLink(item.pdf_url || "")
                          setDocDesc(item.description || "")
                        } else {
                          setImgTitle(item.title)
                          setImageDesc(item.description || "")
                        }
                        setEditId(item.id)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 pt-4">

            <Button
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