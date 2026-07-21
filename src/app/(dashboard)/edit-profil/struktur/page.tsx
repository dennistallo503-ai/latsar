"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import OrganizationTable from "./components/OrganizationTable";
import OrganizationForm from "./components/OrganizationForm";

export interface OrganizationMember {
  id: string;

  name: string;

  position: string;

  category: string;

  sort_order: number;

  image: string | null;

  nip: string | null;

  pangkat: string | null;

  pendidikan: string | null;

  bio: string | null;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

export default function OrganizationPage() {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [status, setStatus] = useState("all");

  const [openForm, setOpenForm] = useState(false);

  const [selected, setSelected] = useState<OrganizationMember | null>(null);

  async function loadMembers() {
    setLoading(true);

    const { data } = await supabase
      .from("organization_members")
      .select("*")
      .order("sort_order", { ascending: true });

    setMembers(data || []);

    setLoading(false);
  }

    // handle delete
async function handleDelete(member: OrganizationMember) {

  const confirmDelete = window.confirm(
    `Apakah Anda yakin ingin menghapus ${member.name}?`
  );


  if (!confirmDelete) return;


  try {


    // ======================
    // HAPUS GAMBAR
    // ======================

    if (member.image) {

      const path =
        member.image.split(
          "/organization/"
        )[1];


      if (path) {

        const { error: imageError } =
          await supabase.storage
            .from("organization")
            .remove([
              path
            ]);


        if (imageError) {

          console.error(
            "DELETE IMAGE ERROR:",
            imageError
          );

        }

      }

    }


    // ======================
    // HAPUS DATA TABLE
    // ======================

    const { error } =
      await supabase
        .from("organization_members")
        .delete()
        .eq(
          "id",
          member.id
        );


    if (error) {
      throw error;
    }


    toast.success(
      "Data berhasil dihapus"
    );


    loadMembers();


  } catch (err:any) {


    console.error(
      "DELETE ERROR:",
      err
    );


    toast.error(
      err.message ||
      "Gagal menghapus data"
    );


  }

}

  useEffect(() => {
    loadMembers();
  }, []);

  const filtered = useMemo(() => {
    return members.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.position.toLowerCase().includes(keyword) ||
        (item.nip || "").toLowerCase().includes(keyword);

      const matchCategory =
        category === "all" || item.category === category;

      const matchStatus =
        status === "all" ||
        (status === "active" && item.is_active) ||
        (status === "inactive" && !item.is_active);

      return matchSearch && matchCategory && matchStatus;
    });
  }, [members, search, category, status]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Struktur Organisasi
          </h1>

          <p className="text-muted-foreground">
            Kelola data struktur organisasi.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Anggota
        </Button>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <Input
          placeholder="Cari nama, jabatan atau NIP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger>

            <SelectValue placeholder="Kategori" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              Semua
            </SelectItem>

            <SelectItem value="Pimpinan">
              Pimpinan
            </SelectItem>

            <SelectItem value="Sekretariat">
              Sekretariat
            </SelectItem>

            <SelectItem value="Bidang">
              Bidang
            </SelectItem>

            <SelectItem value="Sub Bagian">
              Sub Bagian
            </SelectItem>

            <SelectItem value="Jabatan Fungsional">
              Jabatan Fungsional
            </SelectItem>

          </SelectContent>

        </Select>

        <Select
          value={status}
          onValueChange={setStatus}
        >

          <SelectTrigger>

            <SelectValue placeholder="Status" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              Semua
            </SelectItem>

            <SelectItem value="active">
              Aktif
            </SelectItem>

            <SelectItem value="inactive">
              Non Aktif
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

    <OrganizationTable
        data={filtered}
        loading={loading}
        onEdit={(item) => {
            setSelected(item);
            setOpenForm(true);
        }}
        onDelete={(item) => {
            handleDelete(item);
        }}
    />

      <OrganizationForm
        open={openForm}
        onOpenChange={setOpenForm}
        member={selected}
        onSuccess={loadMembers}
      />

    </div>
  );
}