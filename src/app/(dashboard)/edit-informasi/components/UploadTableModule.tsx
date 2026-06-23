"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, FileText, ImageIcon } from "lucide-react"

type Item = {
  id: number
  type: "pdf" | "image"
  title: string
  fileUrl: string
  createdAt: string
}

interface Props {
  title: string
  description: string
}

export default function UploadTableModule({ title, description }: Props) {
  const [type, setType] = useState<"pdf" | "image">("pdf")

  const [docTitle, setDocTitle] = useState("")
  const [docLink, setDocLink] = useState("")

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageDesc, setImageDesc] = useState("")

  const [items, setItems] = useState<Item[]>([])

  const handleUpload = () => {
    if (type === "pdf") {
      if (!docTitle || !docLink) return alert("Lengkapi data PDF")

      const newItem: Item = {
        id: Date.now(),
        type: "pdf",
        title: docTitle,
        fileUrl: docLink,
        createdAt: new Date().toLocaleString(),
      }

      setItems([newItem, ...items])
      setDocTitle("")
      setDocLink("")
    }

    if (type === "image") {
      if (!imageFile || !imageDesc) return alert("Lengkapi data gambar")

      const newItem: Item = {
        id: Date.now(),
        type: "image",
        title: imageDesc,
        fileUrl: URL.createObjectURL(imageFile),
        createdAt: new Date().toLocaleString(),
      }

      setItems([newItem, ...items])
      setImageFile(null)
      setImageDesc("")
    }
  }

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* FORM */}
        <Card>
          <CardContent className="space-y-4 pt-6">

            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === "pdf" ? "default" : "outline"}
                onClick={() => setType("pdf")}
              >
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </Button>

              <Button
                type="button"
                variant={type === "image" ? "default" : "outline"}
                onClick={() => setType("image")}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Gambar
              </Button>
            </div>

            {type === "pdf" ? (
              <>
                <Input
                  placeholder="Judul dokumen"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                />
                <Input
                  placeholder="Link dokumen"
                  value={docLink}
                  onChange={(e) => setDocLink(e.target.value)}
                />
              </>
            ) : (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(e.target.files?.[0] || null)
                  }
                />
                <Input
                  placeholder="Deskripsi gambar"
                  value={imageDesc}
                  onChange={(e) => setImageDesc(e.target.value)}
                />
              </>
            )}

            <Button onClick={handleUpload} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Simpan
            </Button>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h2 className="font-semibold">Daftar Data</h2>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Judul</th>
                    <th className="p-3">Link</th>
                    <th className="p-3">Waktu</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">
                        {item.type === "pdf" ? "PDF" : "Gambar"}
                      </td>
                      <td className="p-3">{item.title}</td>
                      <td className="p-3">
                        <a
                          className="text-blue-500 underline"
                          href={item.fileUrl}
                          target="_blank"
                        >
                          Buka
                        </a>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {item.createdAt}
                      </td>
                      <td className="p-3 text-center">
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}