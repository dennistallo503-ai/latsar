"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Save, Trash } from "lucide-react"

export default function HeroAdminPage() {
  const [page, setPage] = useState("home")
  const [loading, setLoading] = useState(false)
  const [heroes, setHeroes] = useState<any[]>([])

  const [form, setForm] = useState({
    id: "",
    heading: "",
    paragraph: "",
    image: "",
    sort_order: 0,
  })

  // FETCH DATA
  const fetchHeroes = async (selectedPage = page) => {
    const { data } = await supabase
      .from("hero_sections")
      .select("*")
      .eq("page", selectedPage)
      .order("sort_order", { ascending: true })

    setHeroes(data || [])
  }

  useEffect(() => {
    fetchHeroes()
  }, [page])

  // UPLOAD IMAGE
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`hero/${fileName}`, file)

    if (error) {
      alert(error.message)
      return
    }

    const { data: url } = supabase.storage
      .from("images")
      .getPublicUrl(data.path)

    setForm((prev) => ({ ...prev, image: url.publicUrl }))
  }

  // SAVE
  const saveHero = async () => {
    setLoading(true)

    let query

    if (form.id) {
      query = supabase
        .from("hero_sections")
        .update({
          heading: form.heading,
          paragraph: form.paragraph,
          image_url: form.image,
          sort_order: form.sort_order,
          updated_at: new Date(),
        })
        .eq("id", form.id)
    } else {
      query = supabase.from("hero_sections").insert({
        page,
        heading: form.heading,
        paragraph: form.paragraph,
        image_url: form.image,
        sort_order: form.sort_order,
      })
    }

    const { error } = await query;

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // RESET FORM
    setForm({
      id: "",
      heading: "",
      paragraph: "",
      image: "",
      sort_order: 0,
    });

    fetchHeroes();

    alert(form.id ? "Hero berhasil diperbarui ✏️" : "Hero berhasil dibuat ✅");
  }

  // EDIT
  const editHero = (h: any) => {
    setForm({
      id: h.id,
      heading: h.heading,
      paragraph: h.paragraph,
      image: h.image_url,
      sort_order: h.sort_order,
    });

    alert("Mode edit aktif ✏️");
  };

  // DELETE
  const deleteHero = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus hero ini?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("hero_sections")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Hero berhasil dihapus 🗑️");

    fetchHeroes();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Edit Hero</h1>
        <p className="text-muted-foreground">
          Kelola hero section untuk halaman website
        </p>
      </div>

      {/* PAGE SWITCH (HANYA HOME) */}
      <div className="flex gap-3">
        <Button
          variant={page === "home" ? "default" : "outline"}
          onClick={() => setPage("home")}
        >
          HOME
        </Button>
      </div>

      {/* FORM */}
      <Card>
        <CardContent className="space-y-4 pt-6">

          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium">Gambar Hero</label>
            <Input type="file" onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) uploadImage(file)
            }} />
          </div>

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Judul Hero</label>
            <Input
              placeholder="Masukkan judul hero"
              value={form.heading}
              onChange={(e) =>
                setForm({ ...form, heading: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea
              placeholder="Masukkan deskripsi hero"
              value={form.paragraph}
              onChange={(e) =>
                setForm({ ...form, paragraph: e.target.value })
              }
            />
          </div>

          {/* SORT ORDER */}
          <div>
            <label className="text-sm font-medium">
              Urutan Tampilan (Sort Order)
            </label>
            <Input
              type="number"
              placeholder="Contoh: 1, 2, 3"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
            />
            <p className="text-xs text-muted-foreground mt-1">
              Angka kecil akan tampil lebih dulu
            </p>
          </div>

          {/* BUTTON */}
          <Button
            onClick={saveHero}
            disabled={loading}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            {form.id ? "Update Hero" : "Create Hero"}
          </Button>

        </CardContent>
      </Card>

      {/* LIST */}
      <div className="grid gap-4">

        {heroes.map((h) => (
          <Card key={h.id}>
            <CardContent className="flex justify-between items-center pt-6">

              <div>
                <p className="font-bold">{h.heading}</p>
                <p className="text-sm text-muted-foreground">
                  Order: {h.sort_order}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => editHero(h)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => deleteHero(h.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}

      </div>

    </div>
  )
}