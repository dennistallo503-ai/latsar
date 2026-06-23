"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, Upload } from "lucide-react"

export default function HeroContentPage() {
  const [heroData, setHeroData] = useState({
    image: "/placeholder.svg",
    heading: "Selamat Datang di Website Resmi DLH Kabupaten Timor Tengah Selatan",
    paragraph:
      "Menyediakan informasi, layanan, dan berbagai kegiatan Dinas Lingkungan Hidup Kabupaten Timor Tengah Selatan.",
  })

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (file) {
      setHeroData({
        ...heroData,
        image: URL.createObjectURL(file),
      })
    }
  }

  const handleSave = () => {
    console.log(heroData)

    alert("Data hero berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hero Beranda
        </h1>
        <p className="text-muted-foreground">
          Kelola gambar, judul dan deskripsi hero pada halaman beranda.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Gambar Hero
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Heading
              </label>

              <Input
                value={heroData.heading}
                onChange={(e) =>
                  setHeroData({
                    ...heroData,
                    heading: e.target.value,
                  })
                }
                placeholder="Masukkan judul hero"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Paragraph
              </label>

              <Textarea
                rows={6}
                value={heroData.paragraph}
                onChange={(e) =>
                  setHeroData({
                    ...heroData,
                    paragraph: e.target.value,
                  })
                }
                placeholder="Masukkan deskripsi hero"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-4 text-lg font-semibold">
              Preview Hero
            </h2>

            <div className="relative overflow-hidden rounded-xl border">
              <div className="relative h-[420px]">
                <Image
                  src={heroData.image}
                  alt="Preview Hero"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-2xl p-8 text-white">
                    <h1 className="mb-4 text-4xl font-bold">
                      {heroData.heading}
                    </h1>

                    <p className="text-lg leading-relaxed">
                      {heroData.paragraph}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              Tampilan ini merupakan simulasi hero pada halaman beranda.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}