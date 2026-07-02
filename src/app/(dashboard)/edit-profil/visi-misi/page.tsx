"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Trash } from "lucide-react"

type FormState = {
  id?: string
  bupati_name: string
  bupati_image: string
  wakil_name: string
  wakil_image: string
  visi: string
  misi: string[]
  period: string
}

export default function VisionMissionAdminPage() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FormState>({
    id: undefined,
    bupati_name: "",
    bupati_image: "",
    wakil_name: "",
    wakil_image: "",
    visi: "",
    misi: [],
    period: "",
  })

  // ========================
  // LOAD DATA (1 ROW ONLY)
  // ========================
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profile_visi_misi")
        .select("*")
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error(error)
        return
      }

      if (data) {
        setForm({
          id: data.id,
          bupati_name: data.bupati_name || "",
          bupati_image: data.bupati_image || "",
          wakil_name: data.wakil_name || "",
          wakil_image: data.wakil_image || "",
          visi: data.visi || "",
          misi: Array.isArray(data.misi) ? data.misi : [],
          period: data.period || "",
        })
      }
    }

    fetchData()
  }, [])

  // ========================
  // AUTO DELETE + UPLOAD IMAGE
  // ========================
  const uploadImage = async (
    file: File,
    field: "bupati_image" | "wakil_image"
  ) => {
    try {
      const oldUrl = form[field]

      const fileName = `${Date.now()}-${file.name}`
      const filePath = `vision/${fileName}`

      // upload new image
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file)

      if (error) {
        alert(error.message)
        return
      }

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(data.path)

      const newUrl = urlData.publicUrl

      // update UI first
      setForm((prev) => ({
        ...prev,
        [field]: newUrl,
      }))

      // delete old image
      if (oldUrl) {
        const oldPath = oldUrl.split(
          "/storage/v1/object/public/images/"
        )[1]

        if (oldPath) {
          await supabase.storage
            .from("images")
            .remove([oldPath])
        }
      }
    } catch (err) {
      console.error(err)
      alert("Upload gagal")
    }
  }

  // ========================
  // REMOVE IMAGE MANUAL
  // ========================
  const removeImage = async (
    field: "bupati_image" | "wakil_image"
  ) => {
    const url = form[field]

    if (url) {
      const path = url.split(
        "/storage/v1/object/public/images/"
      )[1]

      if (path) {
        await supabase.storage
          .from("images")
          .remove([path])
      }
    }

    setForm((prev) => ({
      ...prev,
      [field]: "",
    }))
  }

  // ========================
  // MISSION HANDLER
  // ========================
  const updateMission = (i: number, value: string) => {
    const updated = [...form.misi]
    updated[i] = value
    setForm((prev) => ({ ...prev, misi: updated }))
  }

  const addMission = () => {
    setForm((prev) => ({
      ...prev,
      misi: [...prev.misi, ""],
    }))
  }

  const removeMission = (i: number) => {
    setForm((prev) => ({
      ...prev,
      misi: prev.misi.filter((_, index) => index !== i),
    }))
  }

  // ========================
  // SAVE (UPSERT SAFE)
  // ========================
  const handleSave = async () => {
    setLoading(true)

    const payload = {
      id: form.id,
      bupati_name: form.bupati_name,
      bupati_image: form.bupati_image,
      wakil_name: form.wakil_name,
      wakil_image: form.wakil_image,
      visi: form.visi,
      misi: form.misi,
      period: form.period,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("profile_visi_misi")
      .upsert(payload)
      .select()
      .single()

    setLoading(false)

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    if (data?.id) {
      setForm((prev) => ({ ...prev, id: data.id }))
    }

    alert("Berhasil disimpan")
  }

  // ========================
  // UI
  // ========================
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Visi & Misi
        </h1>
        <p className="text-muted-foreground">
          Kelola data profil pimpinan dan visi misi
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* LEFT */}
        <div className="space-y-6">

          {/* BUPATI */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-semibold">Bupati</h2>

              <Input
                value={form.bupati_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bupati_name: e.target.value,
                  })
                }
                placeholder="Nama Bupati"
              />

              {form.bupati_image && (
                <div className="w-40 h-52 overflow-hidden rounded border">
                  <img
                    src={form.bupati_image}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file)
                    uploadImage(file, "bupati_image")
                }}
              />

              {form.bupati_image && (
                <Button
                  variant="destructive"
                  onClick={() =>
                    removeImage("bupati_image")
                  }
                >
                  Hapus Gambar
                </Button>
              )}
            </CardContent>
          </Card>

          {/* WAKIL */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-semibold">
                Wakil Bupati
              </h2>

              <Input
                value={form.wakil_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    wakil_name: e.target.value,
                  })
                }
                placeholder="Nama Wakil"
              />

              {form.wakil_image && (
                <div className="w-40 h-52 overflow-hidden rounded border">
                  <img
                    src={form.wakil_image}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file)
                    uploadImage(file, "wakil_image")
                }}
              />

              {form.wakil_image && (
                <Button
                  variant="destructive"
                  onClick={() =>
                    removeImage("wakil_image")
                  }
                >
                  Hapus Gambar
                </Button>
              )}
            </CardContent>
          </Card>
          {/* PERIODE */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-semibold">Periode</h2>

              <Input
                value={form.period}
                onChange={(e) =>
                  setForm({
                    ...form,
                    period: e.target.value,
                  })
                }
                placeholder="Contoh: 2024–2029"
              />
            </CardContent>
          </Card>
          {/* VISI */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-semibold">Visi</h2>

              <Textarea
                value={form.visi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    visi: e.target.value,
                  })
                }
              />
            </CardContent>
          </Card>

          {/* MISI */}
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-semibold">Misi</h2>

              {form.misi.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={m}
                    onChange={(e) =>
                      updateMission(i, e.target.value)
                    }
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeMission(i)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={addMission}>
                + Tambah Misi
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT */}
        <div>
          <Card>
            <CardContent className="pt-6 space-y-4">

              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Simpan Semua"}
              </Button>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}