"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save } from "lucide-react"

type FormState = {
  id: string | null
  image_url: string
  description: string
}

export default function StrukturOrganisasiAdmin() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FormState>({
    id: null,
    image_url: "",
    description: "",
  })

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("struktur_organisasi")
        .select("*")
        .maybeSingle()

      if (error) {
        console.error(error)
        return
      }

      if (data) {
        setForm({
          id: data.id,
          image_url: data.image_url || "",
          description: data.description || "",
        })
      }
    }

    fetchData()
  }, [])

  // =========================
  // DELETE OLD IMAGE
  // =========================
  const deleteOldImage = async (imageUrl: string) => {
    if (!imageUrl) return

    try {
      const url = new URL(imageUrl)

      const marker = "/storage/v1/object/public/images/"
      const index = url.pathname.indexOf(marker)

      if (index === -1) return

      const filePath = decodeURIComponent(
        url.pathname.substring(index + marker.length)
      )

      const { error } = await supabase.storage
        .from("images")
        .remove([filePath])

      if (error) {
        console.log("Delete old image:", error.message)
      }
    } catch (err) {
      console.log("Delete image error:", err)
    }
  }

  // =========================
  // UPLOAD IMAGE
  // =========================
  const uploadImage = async (file: File) => {
    try {
      const oldImage = form.image_url

      const fileName = `${Date.now()}-${file.name}`

      // 1. upload dulu
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`struktur/${fileName}`, file)

      if (error) {
        alert(error.message)
        return
      }

      // 2. ambil public url
      const { data: url } = supabase.storage
        .from("images")
        .getPublicUrl(data.path)

      const newUrl = url.publicUrl

      // 3. update state dulu
      setForm((prev) => ({
        ...prev,
        image_url: newUrl,
      }))

      // 4. update DB dulu (WAJIB sukses dulu)
      const { error: dbError } = await supabase
        .from("struktur_organisasi")
        .update({
          image_url: newUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", form.id)

      if (dbError) {
        alert(dbError.message)
        return
      }

      // 5. baru hapus file lama
      if (oldImage) {
        await deleteOldImage(oldImage)
      }

    } catch (err) {
      console.error(err)
      alert("Gagal upload gambar.")
    }
  }

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    setLoading(true)

    const payload = {
      image_url: form.image_url,
      description: form.description,
      updated_at: new Date().toISOString(),
    }

    let result

    if (form.id) {
      result = await supabase
        .from("struktur_organisasi")
        .update(payload)
        .eq("id", form.id)
        .select()
        .single()
    } else {
      result = await supabase
        .from("struktur_organisasi")
        .insert([payload])
        .select()
        .single()
    }

    setLoading(false)

    if (result.error) {
      console.error(result.error)
      alert(result.error.message)
      return
    }

    if (result.data?.id) {
      setForm((prev) => ({
        ...prev,
        id: result.data.id,
      }))
    }

    alert("Berhasil disimpan")
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Struktur Organisasi
        </h1>

        <p className="text-muted-foreground">
          Kelola gambar dan deskripsi struktur organisasi.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">

          {/* Preview */}
          {form.image_url && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Gambar Saat Ini
              </label>

              <div className="relative h-[380px] w-full overflow-hidden rounded-lg border bg-white">
                <Image
                  src={form.image_url}
                  alt="Struktur Organisasi"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload / Ganti Gambar
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadImage(file)
              }}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Deskripsi
            </label>

            <Textarea
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Masukkan deskripsi struktur organisasi"
            />
          </div>

          {/* Save */}
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>

        </CardContent>
      </Card>

    </div>
  )
}