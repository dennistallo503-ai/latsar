"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function StrukturOrganisasiPageContent() {
  const [data, setData] = useState({
    image: "/placeholder.svg",
    description:
      "Struktur organisasi Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan merupakan susunan perangkat organisasi yang menggambarkan hubungan kerja, pembagian tugas, dan tanggung jawab dalam pelaksanaan tugas kedinasan.",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setData({
        ...data,
        image: URL.createObjectURL(file),
      })
    }
  }

  const handleSave = () => {
    console.log(data)
    alert("Struktur organisasi berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Struktur Organisasi
        </h1>
        <p className="text-muted-foreground">
          Kelola gambar dan deskripsi struktur organisasi.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Gambar Struktur Organisasi
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Deskripsi
              </label>

              <Textarea
                rows={8}
                value={data.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    description: e.target.value,
                  })
                }
                placeholder="Masukkan deskripsi struktur organisasi"
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>

        {/* PREVIEW */}
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold">
              Preview
            </h2>

            <div className="relative w-full overflow-hidden rounded-lg border">
              <div className="relative h-[420px] w-full">
                <Image
                  src={data.image}
                  alt="Struktur Organisasi"
                  fill
                  className="object-contain bg-white"
                />
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {data.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}