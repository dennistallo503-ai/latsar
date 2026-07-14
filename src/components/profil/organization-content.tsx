"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Mail, Phone, GraduationCap, BadgeCheck, User } from "lucide-react";

export default function OrganizationStructurePage() {
  const [open, setOpen] = useState(false);

  const [selectedLeader, setSelectedLeader] = useState<any>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSelectedLeader(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, []);

  // ==========================
  // DATA PIMPINAN
  // ==========================

  const kepalaDinas = {
    name: "Nama Kepala Dinas",
    position: "Kepala Dinas",

    image: "/images/pimpinan/kepala-dinas.jpeg",

    nip: "1978xxxxxxxxxxxxx",

    pangkat: "Pembina Utama Muda",

    pendidikan: "S2 Ilmu Komunikasi",

    email: "kadis@tts.go.id",

    phone: "08123456789",

    bio:
      "Memimpin penyelenggaraan urusan pemerintahan bidang komunikasi, informatika, statistik dan persandian di Kabupaten Timor Tengah Selatan.",
  };

  const kepalaBidang = [
    {
      name: "Nama Kabid IKP",

      position:
        "Kepala Bidang Informasi dan Komunikasi Publik",

      image: "/images/pimpinan/kabid-ikp.jpeg",

      nip: "1980xxxxxxxx",

      pangkat: "Pembina",

      pendidikan: "S2",

      email: "ikp@tts.go.id",

      phone: "081111111",

      bio:
        "Bertanggung jawab terhadap pengelolaan informasi publik dan hubungan media.",
    },

    {
      name: "Nama Kabid Aptika",

      position:
        "Kepala Bidang Aplikasi Informatika",

      image: "/images/pimpinan/kabid-tik.jpeg",

      nip: "1982xxxxxxxx",

      pangkat: "Pembina",

      pendidikan: "S2",

      email: "aptika@tts.go.id",

      phone: "082222222",

      bio:
        "Bertanggung jawab terhadap pengembangan SPBE, aplikasi dan infrastruktur digital.",
    },

    {
      name: "Nama Kabid Statistik",

      position:
        "Kepala Bidang Statistik dan Persandian",

      image: "/images/pimpinan/kabid-ps.jpeg",

      nip: "1983xxxxxxxx",

      pangkat: "Pembina",

      pendidikan: "S2",

      email: "statistik@tts.go.id",

      phone: "083333333",

      bio:
        "Mengelola data statistik sektoral serta penyelenggaraan persandian daerah.",
    },
  ];

  const kepalaSubBagian = [
    {
      name: "Nama Kasubbag Umum",

      position:
        "Kepala Sub Bagian Umum dan Kepegawaian",

      image: "/images/pimpinan/kasubag-tu.jpeg",

      nip: "1984xxxxxxxx",

      pangkat: "Penata",

      pendidikan: "S1",

      email: "umum@tts.go.id",

      phone: "084444444",

      bio:
        "Mengelola administrasi umum, kepegawaian dan tata usaha.",
    },

    {
      name: "Nama Kasubbag Keuangan",

      position:
        "Kepala Sub Bagian Perencanaan dan Keuangan",

      image: "/images/pimpinan/kasubag-keuangan.jpeg",

      nip: "1985xxxxxxxx",

      pangkat: "Penata",

      pendidikan: "S1",

      email: "keuangan@tts.go.id",

      phone: "085555555",

      bio:
        "Mengelola perencanaan program, penganggaran dan keuangan dinas.",
    },
  ];

  const LeaderCard = ({ leader, size = "md" }: any) => (
    <div
      onClick={() => setSelectedLeader(leader)}
      className="group cursor-pointer rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div
        className={`relative mx-auto overflow-hidden rounded-full border-4 border-primary/20 ${
          size === "lg"
            ? "h-40 w-40"
            : "h-28 w-28"
        }`}
      >
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-5 text-center">

        <h4 className="font-semibold">
          {leader.name}
        </h4>

        <p className="mt-2 text-sm text-muted-foreground">
          {leader.position}
        </p>

      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10" />

        <div className="container relative mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Struktur Organisasi
          </h1>

          <p className="mt-4 text-base md:text-lg text-primary-foreground/90">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section>

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
                src="/images/struktur-organisasi.jpeg"
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

          <section className="space-y-16">

            <div className="text-center">

              <h2 className="text-3xl font-bold">
                Profil Pimpinan
              </h2>

              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Klik pada foto pejabat untuk melihat profil lengkap.
              </p>

            </div>

            {/* ================= Kepala Dinas ================= */}

            <div className="flex justify-center">

              <div
                onClick={() => setSelectedLeader(kepalaDinas)}
                className="group cursor-pointer w-full max-w-sm rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-primary/20">

                  <Image
                    src={kepalaDinas.image}
                    alt={kepalaDinas.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="mt-6 text-center">

                  <h3 className="text-xl font-bold">
                    {kepalaDinas.name}
                  </h3>

                  <p className="mt-2 text-primary font-medium">
                    {kepalaDinas.position}
                  </p>

                </div>

              </div>

            </div>

            {/* ================= Kepala Bidang ================= */}

            <div>

              <h3 className="mb-8 text-center text-2xl font-semibold">
                Kepala Bidang
              </h3>

              <div className="grid gap-6 md:grid-cols-3">

                {kepalaBidang.map((item) => (

                  <div
                    key={item.name}
                    onClick={() => setSelectedLeader(item)}
                    className="group cursor-pointer rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                    </div>

                    <div className="mt-5 text-center">

                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {item.position}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* ================= Kepala Sub Bagian ================= */}

            <div>

              <h3 className="mb-8 text-center text-2xl font-semibold">
                Kepala Sub Bagian
              </h3>

              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">

                {kepalaSubBagian.map((item) => (

                  <div
                    key={item.name}
                    onClick={() => setSelectedLeader(item)}
                    className="group cursor-pointer rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                    </div>

                    <div className="mt-5 text-center">

                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {item.position}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

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
              src="/images/struktur-organisasi.jpeg"
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
                      <p className="text-sm text-muted-foreground">Pangkat</p>
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

                  <div className="flex gap-3">
                    <Mail className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{selectedLeader.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                      <p>{selectedLeader.phone}</p>
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