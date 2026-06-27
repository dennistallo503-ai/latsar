"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Edit } from "lucide-react";

type Item = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  storage_path: string | null;
  category: "galeri" | "layanan";
  created_at: string;
};

interface Props {
  category: "galeri" | "layanan";
  title: string;
  description: string;
}

const ITEMS_PER_PAGE = 5;

export default function MediaCMS({ category, title, description }: Props) {
  // ================= STATE =================
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDesc, setImageDesc] = useState("");

  const [items, setItems] = useState<Item[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [oldPath, setOldPath] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  // ================= SCROLL =================
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= FETCH =================
  const fetchData = async () => {
    const { data } = await supabase
      .from("media_content")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    setItems(data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // ================= PAGINATION =================
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // ================= UPLOAD =================
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const path = `${category}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("media")
      .upload(path, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("media")
      .getPublicUrl(data.path);

    return {
      url: publicUrl.publicUrl,
      path: data.path,
    };
  };

  // ================= SAVE =================
  const handleUpload = async () => {
    if (!imageTitle) return alert("Judul wajib diisi");

    try {
      let url = "";
      let path = oldPath;

      // upload image jika ada
      if (imageFile) {
        const res = await uploadImage(imageFile);
        url = res.url;
        path = res.path;
      }

      // EDIT
      if (editId) {
        await supabase
          .from("media_content")
          .update({
            title: imageTitle,
            description: imageDesc,
            ...(url && { image_url: url }),
            ...(path && { storage_path: path }),
          })
          .eq("id", editId);

        // delete old image
        if (imageFile && oldPath) {
          await supabase.storage
            .from("media")
            .remove([oldPath]);
        }
      } else {
        // CREATE
        if (!imageFile) return alert("Gambar wajib diisi");

        await supabase.from("media_content").insert({
          category,
          title: imageTitle,
          description: imageDesc,
          image_url: url,
          storage_path: path,
        });
      }

      resetForm();
      fetchData();
      setPage(1);
      scrollToTop();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (item: Item) => {
    if (item.storage_path) {
      await supabase.storage
        .from("media")
        .remove([item.storage_path]);
    }

    await supabase
      .from("media_content")
      .delete()
      .eq("id", item.id);

    fetchData();
  };

  // ================= EDIT =================
  const handleEdit = (item: Item) => {
    setEditId(item.id);
    setImageTitle(item.title);
    setImageDesc(item.description || "");
    setOldPath(item.storage_path);

    setPage(1);
    scrollToTop();
  };

  // ================= RESET =================
  const resetForm = () => {
    setEditId(null);
    setImageFile(null);
    setImageTitle("");
    setImageDesc("");
    setOldPath(null);
  };

  // ================= RENDER =================
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* FORM */}
      <Card>
        <CardContent className="space-y-4 pt-6">

          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
          />

          <Input
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
            placeholder="Judul gambar"
          />

          <Input
            value={imageDesc}
            onChange={(e) => setImageDesc(e.target.value)}
            placeholder="Deskripsi gambar"
          />

          <Button onClick={handleUpload} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            {editId ? "Update" : "Upload"}
          </Button>

          {editId && (
            <Button
              variant="secondary"
              onClick={resetForm}
              className="w-full"
            >
              Cancel Edit
            </Button>
          )}

        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardContent className="pt-6">

          <h2 className="font-semibold mb-4">
            Daftar {category}
          </h2>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">

              <thead className="bg-muted">
                <tr>
                  <th className="p-3">Gambar</th>
                  <th className="p-3">Judul</th>
                  <th className="p-3">Deskripsi</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id} className="border-t">

                    <td className="p-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded">
                        <Image
                          src={item.image_url}
                          alt="img"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    <td className="p-3">{item.title}</td>

                    <td className="p-3 text-muted-foreground">
                      {item.description}
                    </td>

                    <td className="p-3 flex gap-2 justify-center">

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">

              <button
                onClick={() => {
                  setPage((p) => Math.max(p - 1, 1));
                  scrollToTop();
                }}
                className="border px-3 py-2 rounded"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 2), page + 1)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPage(p);
                      scrollToTop();
                    }}
                    className={`border px-3 py-2 rounded ${
                      page === p ? "bg-primary text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                onClick={() => {
                  setPage((p) => Math.min(p + 1, totalPages));
                  scrollToTop();
                }}
                className="border px-3 py-2 rounded"
              >
                Next
              </button>

            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}