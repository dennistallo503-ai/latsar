"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

import { toast } from "sonner";

import { OrganizationMember } from "../page";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: OrganizationMember | null;
  onSuccess: () => void;
}

export default function OrganizationForm({
  open,
  onOpenChange,
  member,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [name, setName] = useState("");

  const [nip, setNip] = useState("");

  const [position, setPosition] = useState("");

  const [category, setCategory] = useState("");

  const [sortOrder, setSortOrder] = useState(0);

  const [pangkat, setPangkat] = useState("");

  const [pendidikan, setPendidikan] = useState("");

  const [bio, setBio] = useState("");

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (member) {
      setImage(member.image || "");
      setOldImage(member.image || "");
      setName(member.name);
      setNip(member.nip || "");
      setPosition(member.position);
      setCategory(member.category);
      setSortOrder(member.sort_order);
      setPangkat(member.pangkat || "");
      setPendidikan(member.pendidikan || "");
      setBio(member.bio || "");
      setIsActive(member.is_active);
    } else {
      resetForm();
    }
  }, [member]);

  function resetForm() {
    setImage("");
    setName("");
    setNip("");
    setPosition("");
    setCategory("");
    setSortOrder(0);
    setPangkat("");
    setPendidikan("");
    setBio("");
    setIsActive(true);
  }

async function uploadImage(file: File) {
  try {
    setUploading(true);

    const ext = file.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;


    // Upload file
    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("organization")
        .upload(fileName, file);


    if (uploadError) {
      throw uploadError;
    }


    console.log("UPLOAD:", uploadData);


    // Ambil public URL
    const { data: urlData } =
      supabase.storage
        .from("organization")
        .getPublicUrl(fileName);


    console.log(
      "PUBLIC URL:",
      urlData.publicUrl
    );


    // hapus foto lama jika ada

    if (oldImage) {

    await deleteImage(oldImage);

    }


    // simpan foto baru

    setImage(
    urlData.publicUrl
    );


  } catch (error) {

    console.error(
      "UPLOAD ERROR:",
      error
    );

    toast.error(
      "Upload gambar gagal"
    );

  } finally {

    setUploading(false);

  }
}

    async function handleSubmit() {
    try {
        setLoading(true);

        if (!name.trim()) {
        toast.error("Nama wajib diisi");
        return;
        }

        if (!position.trim()) {
        toast.error("Jabatan wajib diisi");
        return;
        }

        if (!category.trim()) {
        toast.error("Kategori wajib dipilih");
        return;
        }

        const payload = {
        name,
        position,
        category,
        sort_order: sortOrder,
        image,
        nip,
        pangkat,
        pendidikan,
        bio,
        is_active: isActive,
        updated_at: new Date().toISOString(),
        };

        if (member) {

        const { data, error } = await supabase
            .from("organization_members")
            .update(payload)
            .eq("id", member.id)
            .select();

        console.log("PAYLOAD INSERT:", payload);
        console.log("UPDATE RESULT:", data);

        if (error) {
            console.error("UPDATE ERROR:", error);
            throw error;
        }

        } else {

  const { data, error } = await supabase
    .from("organization_members")
    .insert(payload)
    .select();

  console.log("INSERT RESULT:", data);

    if (error) {

    console.error("INSERT ERROR MESSAGE:", error.message);

    console.error("INSERT ERROR CODE:", error.code);

    console.error("INSERT ERROR DETAILS:", error.details);

    console.error("INSERT ERROR HINT:", error.hint);

    throw error;

    }

}

        resetForm();

        setImage("");

        setOldImage("");

        setName("");

        onOpenChange(false);

        onSuccess();
    } catch (err: any) {

    console.error("ERROR SUPABASE:", err);

    toast.error(
        err.message || "Terjadi kesalahan."
    );

    } finally {
        setLoading(false);
    }
    }

    async function deleteImage(url:string){

  if(!url) return;


  try{

    const path =
      url.split("/organization/")[1];


    if(path){

      const { error } =
        await supabase.storage
        .from("organization")
        .remove([
          path
        ]);


      if(error){

        console.error(
          "DELETE IMAGE ERROR",
          error
        );

      }

    }


  }catch(err){

    console.error(err);

  }

}

  return (
    <Dialog
    open={open}
    onOpenChange={(value) => {
        if (!value) {
        resetForm();
        }

        onOpenChange(value);
    }}
    >
      <DialogContent className="max-w-4xl">

        <DialogHeader>

          <DialogTitle>
            {member ? "Edit Anggota" : "Tambah Anggota"}
          </DialogTitle>

        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">

          {/* FOTO */}

          <div className="space-y-4">

            <Label>Foto</Label>

            {image ? (
              <Image
                src={image}
                alt="Preview"
                width={200}
                height={200}
                className="h-56 w-full rounded-lg border object-cover"
              />
            ) : (
              <div className="flex h-56 items-center justify-center rounded-lg border bg-muted">
                Belum ada gambar
              </div>
            )}

            <Input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={async (e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                await uploadImage(file);
            }}
            />
            {uploading && (
            <p className="text-sm text-muted-foreground">
                Mengupload gambar...
            </p>
            )}

          </div>

          {/* FORM */}

          <div className="space-y-4">

            <div>

              <Label>Nama</Label>

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

            </div>

            <div>

              <Label>NIP</Label>

              <Input
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />

            </div>

            <div>

              <Label>Jabatan</Label>

              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />

            </div>

            <div>

              <Label>Kategori</Label>

              <Select
                value={category}
                onValueChange={setCategory}
              >

                <SelectTrigger>

                  <SelectValue placeholder="Pilih kategori" />

                </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="pimpinan">
                      Kepala Dinas
                    </SelectItem>


                    <SelectItem value="sekretariat">
                      Sekretaris Dinas
                    </SelectItem>


                    <SelectItem value="kasubbag_program">
                      Kasubbag Program
                    </SelectItem>


                    <SelectItem value="kasubbag_keuangan">
                      Kasubbag Keuangan
                    </SelectItem>


                    <SelectItem value="bidang_ikp">
                      Kepala Bidang IKP
                    </SelectItem>


                    <SelectItem value="bidang_tik">
                      Kepala Bidang TIK
                    </SelectItem>


                    <SelectItem value="bidang_ps">
                      Kepala Bidang PS
                    </SelectItem>


                    <SelectItem value="jf_sekretariat">
                      Kelompok JF Sekretariat
                    </SelectItem>


                    <SelectItem value="jf_ikp">
                      Kelompok JF IKP
                    </SelectItem>


                    <SelectItem value="jf_tik">
                      Kelompok JF TIK
                    </SelectItem>


                    <SelectItem value="jf_ps">
                      Kelompok JF PS
                    </SelectItem>


                  </SelectContent>

              </Select>

            </div>

            <div>

              <Label>Urutan</Label>

              <Input
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />

            </div>

            <div>

              <Label>Pangkat</Label>

              <Input
                value={pangkat}
                onChange={(e) => setPangkat(e.target.value)}
              />

            </div>

            <div>

              <Label>Pendidikan</Label>

              <Input
                value={pendidikan}
                onChange={(e) => setPendidikan(e.target.value)}
              />

            </div>

            <div>

              <Label>Biografi</Label>

              <Textarea
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">

              <Label>Status Aktif</Label>

              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}