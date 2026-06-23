"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, FileText } from "lucide-react"

type RegulationItem = {
  id: number
  title: string
  fileUrl: string
  createdAt: string
}

export default function RegulasiPageContent() {
  const [title, setTitle] = useState("")
  const [fileLink, setFileLink] = useState("")

  const [items, setItems] = useState<RegulationItem[]>([])

  const handleUpload = () => {
    if (!title || !fileLink) {
      alert("Judul dan link PDF wajib diisi")
      return
    }

    const newItem: RegulationItem = {
      id: Date.now(),
      title,
      fileUrl: fileLink,
      createdAt: new Date().toLocaleString(),
    }

    setItems([newItem, ...items])

    setTitle("")
    setFileLink("")
  }

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Regulasi
        </h1>
        <p className="text-muted-foreground">
          Kelola dokumen regulasi dalam bentuk PDF.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* FORM */}
        <Card>
          <CardContent className="space-y-4 pt-6">

            <Input
              placeholder="Judul Regulasi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Link PDF (Google Drive / URL)"
              value={fileLink}
              onChange={(e) => setFileLink(e.target.value)}
            />

            <Button onClick={handleUpload} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Simpan Regulasi
            </Button>

          </CardContent>
        </Card>

        {/* TABLE */}
        <Card>
          <CardContent className="space-y-3 pt-6">

            <h2 className="font-semibold">
              Daftar Regulasi
            </h2>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">

                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-3">Judul</th>
                    <th className="p-3">File</th>
                    <th className="p-3">Waktu</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">

                      <td className="p-3">
                        {item.title}
                      </td>

                      <td className="p-3">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          Lihat PDF
                        </a>
                      </td>

                      <td className="p-3 text-xs text-muted-foreground">
                        {item.createdAt}
                      </td>

                      <td className="p-3 text-center">
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() =>
                            setItems(items.filter((i) => i.id !== item.id))
                          }
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