"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Trash } from "lucide-react"

export default function TaskFunctionAdmin() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<any>({
    id: null,
    tugas: "",
    fungsi: [],
  })

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("task_function")
        .select("*")
        .limit(1)
        .maybeSingle()

      if (data) {
        setForm({
          id: data.id,
          tugas: data.tugas || "",
          fungsi: Array.isArray(data.fungsi) ? data.fungsi : [],
        })
      }
    }

    fetchData()
  }, [])

  // UPDATE FUNGSI
  const updateFungsi = (i: number, value: string) => {
    const updated = [...form.fungsi]
    updated[i] = value
    setForm((p: any) => ({ ...p, fungsi: updated }))
  }

  const addFungsi = () => {
    setForm((p: any) => ({
      ...p,
      fungsi: [...p.fungsi, ""],
    }))

    alert("Fungsi baru ditambahkan ➕")
  }

  const removeFungsi = (i: number) => {
    const ok = confirm("Hapus fungsi ini?")
    if (!ok) return

    setForm((p: any) => ({
      ...p,
      fungsi: p.fungsi.filter((_: any, idx: number) => idx !== i),
    }))

    alert("Fungsi dihapus dari form 🗑️")
  }

  // SAVE
  const handleSave = async () => {
    setLoading(true)

    const payload = {
      tugas: form.tugas,
      fungsi: form.fungsi,
      updated_at: new Date(),
    }

    const query = form.id
      ? supabase.from("task_function").update(payload).eq("id", form.id)
      : supabase.from("task_function").insert(payload).select().single()

    const { data, error } = await query

    setLoading(false)

    if (error) {
      alert("Gagal menyimpan: " + error.message)
      return
    }

    if (data?.id) {
      setForm((p: any) => ({ ...p, id: data.id }))
    }

    alert(form.id ? "Data berhasil diperbarui ✏️" : "Data berhasil disimpan ✅")
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Edit Tugas & Fungsi</h1>
        <p className="text-muted-foreground">
          Kelola isi tugas dan fungsi perangkat daerah
        </p>
      </div>

      <Card>
        <CardContent className="space-y-5 pt-6">

          {/* TUGAS */}
          <div>
            <label className="text-sm font-medium">Tugas</label>
            <Textarea
              value={form.tugas}
              onChange={(e) =>
                setForm({ ...form, tugas: e.target.value })
              }
              rows={5}
            />
          </div>

          {/* FUNGSI */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Fungsi</label>

            {form.fungsi.map((item: string, i: number) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateFungsi(i, e.target.value)}
                />

                <Button
                  variant="destructive"
                  onClick={() => removeFungsi(i)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addFungsi}>
              + Tambah Fungsi
            </Button>
          </div>

          {/* SAVE */}
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Simpan"}
          </Button>

        </CardContent>
      </Card>

    </div>
  )
}