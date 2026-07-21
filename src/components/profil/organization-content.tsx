"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { X, Mail, Phone, GraduationCap, BadgeCheck, User } from "lucide-react";
import {Hero} from '@/components/hero/';
import OrganizationChart from "./components/organization/OrganizationChart";

interface OrganizationMember {

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

}

export default function OrganizationStructurePage() {

  const [open, setOpen] = useState(false);

  const [selectedLeader, setSelectedLeader] =
    useState<any>(null);


  const [members, setMembers] =
    useState<OrganizationMember[]>([]);


  const [loading, setLoading] =
    useState(true);



  // ==========================
  // LOAD DATA ORGANIZATION
  // ==========================

  async function loadOrganization() {

    try {

      const { data, error } =
        await supabase
          .from("organization_members")
          .select("*")
          .eq(
            "is_active",
            true
          )
          .order(
            "sort_order",
            {
              ascending: true,
            }
          );


      if (error)
        throw error;


      setMembers(
        data || []
      );


    } catch (error) {

      console.error(
        "LOAD ORGANIZATION ERROR",
        error
      );


    } finally {

      setLoading(false);

    }

  }



  // ==========================
  // ESC MODAL
  // ==========================

  useEffect(() => {

    const handleEsc = (
      e: KeyboardEvent
    ) => {

      if (e.key === "Escape") {

        setOpen(false);

        setSelectedLeader(null);

      }

    };


    window.addEventListener(
      "keydown",
      handleEsc
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };


  }, []);




  // ==========================
  // LOAD SUPABASE
  // ==========================

  useEffect(() => {

    loadOrganization();

  }, []);




  // ==========================
  // MAPPING ORGANIZATION
  // ==========================


  const kepalaDinas =
    members.find(
      item =>
        item.category === "pimpinan"
    );



  const sekretarisDinas =
    members.find(
      item =>
        item.category === "sekretariat"
    );



  const kasubbagProgram =
    members.find(
      item =>
        item.category === "kasubbag_program"
    );



  const kasubbagKeuangan =
    members.find(
      item =>
        item.category === "kasubbag_keuangan"
    );



  const kepalaBidang = [

    members.find(
      item =>
        item.category === "bidang_ikp"
    ),


    members.find(
      item =>
        item.category === "bidang_tik"
    ),


    members.find(
      item =>
        item.category === "bidang_ps"
    ),


  ].filter(Boolean);

  const jfSekretariat =
  members.filter(
    item =>
    item.category === "jf_sekretariat"
  );


  const jfIKP =
  members.filter(
    item =>
    item.category === "jf_ikp"
  );


  const jfTIK =
  members.filter(
    item =>
    item.category === "jf_tik"
  );


  const jfPS =
  members.filter(
    item =>
    item.category === "jf_ps"
  );




  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (
      <div className="py-10 text-center">
        Memuat struktur organisasi...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <>
        <Hero 
          title="Struktur Organisasi"
          description="Dinas Kominfo Kabupaten TTS"
        />
      </>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl space-y-12 px-4">

          {/* IMAGE CARD */}
          <div className="rounded-3xl border bg-card p-6 shadow-md transition hover:shadow-lg">
            <div
              className="relative h-[500px] w-full cursor-pointer md:h-[600px]"
              onClick={() => setOpen(true)}
            >
              <Image
                src="/images/struktur.jpeg"
                alt="Struktur Organisasi Diskominfo TTS"
                fill
                priority
                className="object-contain transition hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="text-center">
            <p className="mx-auto max-w-3xl leading-relaxed text-muted-foreground">
              Struktur organisasi Dinas Komunikasi dan Informatika Kabupaten
              Timor Tengah Selatan menggambarkan susunan jabatan, bidang,
              serta alur koordinasi dalam pelaksanaan tugas pemerintahan daerah.
            </p>
          </div>

          {/* ===================================== */}
          {/* PIMPINAN */}
          {/* ===================================== */}

          <OrganizationChart

            kepalaDinas={kepalaDinas}

            sekretarisDinas={sekretarisDinas}

            kasubbagProgram={kasubbagProgram}

            kasubbagKeuangan={kasubbagKeuangan}

            kepalaBidang={kepalaBidang}

            jfSekretariat={jfSekretariat}

            jfIKP={jfIKP}

            jfTIK={jfTIK}

            jfPS={jfPS}

            onSelect={setSelectedLeader}

            onOpenChart={() => setOpen(true)}

          />

        </div>
      </section>

      {/* MODAL */}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/images/struktur.jpeg"
              alt="Preview Struktur Organisasi"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      )}
      {/* ===================================================== */}
      {/* MODAL PROFIL PIMPINAN */}
      {/* ===================================================== */}

      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute right-5 top-5 rounded-full bg-muted p-2 transition hover:bg-primary hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-[280px_1fr]">

              {/* FOTO */}
              <div className="bg-muted p-8 flex items-center justify-center">

                <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-primary/20">

                  <Image
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    fill
                    className="object-cover"
                  />

                </div>

              </div>

              {/* BIODATA */}
              <div className="p-8">

                <h2 className="text-3xl font-bold">
                  {selectedLeader.name}
                </h2>

                <p className="mt-2 text-lg font-medium text-primary">
                  {selectedLeader.position}
                </p>

                <div className="mt-8 space-y-5">

                  <div className="flex gap-3">
                    <BadgeCheck className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">NIP</p>
                      <p>{selectedLeader.nip}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <User className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pangkat/Golongan</p>
                      <p>{selectedLeader.pangkat}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <GraduationCap className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pendidikan</p>
                      <p>{selectedLeader.pendidikan}</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Profil Singkat */}
            <div className="border-t p-8">

              <h3 className="mb-3 text-xl font-semibold">
                Profil Singkat
              </h3>

              <p className="leading-8 text-muted-foreground">
                {selectedLeader.bio}
              </p>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}