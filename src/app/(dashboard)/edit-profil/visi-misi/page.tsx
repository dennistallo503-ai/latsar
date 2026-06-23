"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function VisionMissionContentPage() {
  const [data, setData] = useState({
    bupatiImage: "/placeholder.svg",
    bupatiName: "Nama Bupati",

    wakilImage: "/placeholder.svg",
    wakilName: "Nama Wakil Bupati",

    visi:
      "Terwujudnya Kabupaten Timor Tengah Selatan yang Maju, Sejahtera dan Berkelanjutan.",

    misi: [
      "Meningkatkan kualitas sumber daya manusia.",
      "Meningkatkan kualitas lingkungan hidup.",
      "Meningkatkan pelayanan publik yang profesional.",
      "Mendorong pertumbuhan ekonomi daerah.",
    ],
  })

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "bupatiImage" | "wakilImage"
  ) => {
    const file = e.target.files?.[0]

    if (file) {
      setData({
        ...data,
        [field]: URL.createObjectURL(file),
      })
    }
  }

  const updateMission = (index: number, value: string) => {
    const updated = [...data.misi]
    updated[index] = value

    setData({
      ...data,
      misi: updated,
    })
  }

  const addMission = () => {
    setData({
      ...data,
      misi: [...data.misi, ""],
    })
  }

  const removeMission = (index: number) => {
    setData({
      ...data,
      misi: data.misi.filter((_, i) => i !== index),
    })
  }

  const handleSave = () => {
    console.log(data)
    alert("Data visi misi berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Halaman Visi & Misi
        </h1>
        <p className="text-muted-foreground">
          Kelola foto pimpinan, visi dan misi daerah.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Form Pengaturan</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Bupati */}
            <div className="space-y-3">
              <h3 className="font-semibold">Bupati</h3>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, "bupatiImage")
                }
              />

              <Input
                placeholder="Nama Bupati"
                value={data.bupatiName}
                onChange={(e) =>
                  setData({
                    ...data,
                    bupatiName: e.target.value,
                  })
                }
              />
            </div>

            {/* Wakil */}
            <div className="space-y-3">
              <h3 className="font-semibold">
                Wakil Bupati
              </h3>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, "wakilImage")
                }
              />

              <Input
                placeholder="Nama Wakil Bupati"
                value={data.wakilName}
                onChange={(e) =>
                  setData({
                    ...data,
                    wakilName: e.target.value,
                  })
                }
              />
            </div>

            {/* Visi */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Visi
              </label>

              <Textarea
                rows={4}
                value={data.visi}
                onChange={(e) =>
                  setData({
                    ...data,
                    visi: e.target.value,
                  })
                }
              />
            </div>

            {/* Misi */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Misi
              </label>

              {data.misi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateMission(
                        index,
                        e.target.value
                      )
                    }
                  />

                  <Button
                    variant="destructive"
                    onClick={() =>
                      removeMission(index)
                    }
                  >
                    Hapus
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addMission}
              >
                Tambah Misi
              </Button>
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
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="relative mx-auto h-52 w-40 overflow-hidden rounded-lg border">
                  <Image
                    src={data.bupatiImage}
                    alt="Bupati"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-3 font-semibold">
                  {data.bupatiName}
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mx-auto h-52 w-40 overflow-hidden rounded-lg border">
                  <Image
                    src={data.wakilImage}
                    alt="Wakil Bupati"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-3 font-semibold">
                  {data.wakilName}
                </h3>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-center text-2xl font-bold">
                VISI
              </h2>

              <p className="text-center leading-relaxed">
                {data.visi}
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-center text-2xl font-bold">
                MISI
              </h2>

              <ol className="space-y-3">
                {data.misi.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3"
                  >
                    <span className="font-bold">
                      {index + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}