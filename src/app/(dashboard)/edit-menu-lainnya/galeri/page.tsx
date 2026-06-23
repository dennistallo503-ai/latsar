"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, ImageIcon, Video } from "lucide-react"

type GalleryItem = {
  id: number
  type: "image" | "video"
  title: string
  mediaUrl: string
  createdAt: string
}

export default function GaleriPageContent() {
  const [type, setType] = useState<"image" | "video">("image")

  // IMAGE
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageDesc, setImageDesc] = useState("")

  // VIDEO
  const [youtubeLink, setYoutubeLink] = useState("")
  const [videoTitle, setVideoTitle] = useState("")

  const [items, setItems] = useState<GalleryItem[]>([])

  const handleUpload = () => {
    if (type === "image") {
      if (!imageFile || !imageDesc) {
        alert("Gambar dan deskripsi wajib diisi")
        return
      }

      const newItem: GalleryItem = {
        id: Date.now(),
        type: "image",
        title: imageDesc,
        mediaUrl: URL.createObjectURL(imageFile),
        createdAt: new Date().toLocaleString(),
      }

      setItems([newItem, ...items])
      setImageFile(null)
      setImageDesc("")
    }

    if (type === "video") {
      if (!youtubeLink || !videoTitle) {
        alert("Judul dan link YouTube wajib diisi")
        return
      }

      const newItem: GalleryItem = {
        id: Date.now(),
        type: "video",
        title: videoTitle,
        mediaUrl: youtubeLink,
        createdAt: new Date().toLocaleString(),
      }

      setItems([newItem, ...items])
      setYoutubeLink("")
      setVideoTitle("")
    }
  }

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Galeri
        </h1>
        <p className="text-muted-foreground">
          Kelola foto dan video YouTube pada galeri website.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* FORM */}
        <Card>
          <CardContent className="space-y-4 pt-6">

            {/* SWITCH TYPE */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={type === "image" ? "default" : "outline"}
                onClick={() => setType("image")}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Foto
              </Button>

              <Button
                type="button"
                variant={type === "video" ? "default" : "outline"}
                onClick={() => setType("video")}
              >
                <Video className="mr-2 h-4 w-4" />
                Video
              </Button>
            </div>

            {/* IMAGE FORM */}
            {type === "image" && (
              <>
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
                  placeholder="Deskripsi foto"
                />
              </>
            )}

            {/* VIDEO FORM */}
            {type === "video" && (
              <>
                <Input
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Judul video"
                />

                <Input
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="Link YouTube"
                />
              </>
            )}

            <Button onClick={handleUpload} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Simpan
            </Button>
          </CardContent>
        </Card>

        {/* LIST */}
        <Card>
          <CardContent className="space-y-3 pt-6">

            <h2 className="font-semibold">
              Daftar Galeri
            </h2>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">

                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Judul</th>
                    <th className="p-3">Preview</th>
                    <th className="p-3">Waktu</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">

                      {/* TYPE */}
                      <td className="p-3">
                        {item.type === "image" ? "Foto" : "Video"}
                      </td>

                      {/* TITLE */}
                      <td className="p-3">
                        {item.title}
                      </td>

                      {/* PREVIEW */}
                      <td className="p-3">
                        {item.type === "image" ? (
                          <div className="relative h-12 w-12 overflow-hidden rounded">
                            <Image
                              src={item.mediaUrl}
                              alt="foto"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <a
                            href={item.mediaUrl}
                            target="_blank"
                            className="text-blue-500 underline"
                          >
                            YouTube
                          </a>
                        )}
                      </td>

                      {/* DATE */}
                      <td className="p-3 text-xs text-muted-foreground">
                        {item.createdAt}
                      </td>

                      {/* ACTION */}
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