"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, Plus, Trash2 } from "lucide-react"

export default function TugasFungsiPageContent() {
  const [tugas, setTugas] = useState(
    "Membantu Bupati dalam melaksanakan urusan pemerintahan daerah di bidang komunikasi dan informatika, persandian dan statistik."
  )

  const [fungsi, setFungsi] = useState([
    "Perumusan kebijakan teknis bidang komunikasi dan informatika.",
    "Pelaksanaan urusan pemerintahan bidang komunikasi dan informatika.",
    "Pelaksanaan urusan persandian untuk pengamanan informasi.",
    "Pelaksanaan urusan statistik sektoral.",
  ])

  const updateFungsi = (index: number, value: string) => {
    const newFungsi = [...fungsi]
    newFungsi[index] = value
    setFungsi(newFungsi)
  }

  const addFungsi = () => {
    setFungsi([...fungsi, ""])
  }

  const removeFungsi = (index: number) => {
    setFungsi(fungsi.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const data = {
      tugas,
      fungsi,
    }

    console.log(data)
    alert("Data berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Tugas dan Fungsi
        </h1>
        <p className="text-muted-foreground">
          Kelola tugas dan fungsi perangkat daerah.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Tugas
              </label>

              <Textarea
                rows={5}
                value={tugas}
                onChange={(e) => setTugas(e.target.value)}
                placeholder="Masukkan tugas perangkat daerah"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Fungsi
              </label>

              {fungsi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateFungsi(index, e.target.value)
                    }
                    placeholder={`Fungsi ${index + 1}`}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFungsi(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addFungsi}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Fungsi
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
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  Tugas
                </h2>

                <p className="leading-relaxed">
                  {tugas}
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  Fungsi
                </h2>

                <ol className="space-y-3">
                  {fungsi.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3"
                    >
                      <span className="font-semibold">
                        {index + 1}.
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}