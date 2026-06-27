"use client";

import {
  Globe,
  Shield,
  BarChart3,
  Building2,
  FileText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Image3D } from "@/components/image-3d";

const mainFunctions = [
  {
    icon: FileText,
    title: "Perumusan Kebijakan Teknis",
    description:
      "Perumusan kebijakan teknis di bidang komunikasi, informatika, persandian, dan statistik.",
  },
  {
    icon: Globe,
    title: "Pelaksanaan Kebijakan Teknis",
    description:
      "Pelaksanaan kebijakan teknis di bidang komunikasi, informatika, persandian, dan statistik.",
  },
  {
    icon: Building2,
    title: "Pelaksanaan Administrasi Dinas",
    description:
      "Pelaksanaan administrasi dinas sebagai pendukung penyelenggaraan urusan pemerintahan.",
  },
  {
    icon: BarChart3,
    title: "Evaluasi dan Pelaporan",
    description:
      "Pelaksanaan evaluasi serta pelaporan teknis di bidang komunikasi, informatika, persandian, dan statistik.",
  },
  {
    icon: Shield,
    title: "Pelaksanaan Fungsi Lain",
    description:
      "Melaksanakan fungsi lain yang diberikan oleh Bupati sesuai dengan tugas dan fungsi dinas.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">

          <Badge variant="outline" className="mb-4">
            Profil Diskominfo
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tugas dan Fungsi
            <br />
            Dinas Komunikasi dan Informatika
            <br />
            Kabupaten Timor Tengah Selatan
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Berdasarkan Peraturan Bupati Timor Tengah Selatan Nomor 11 Tahun
            2025, Dinas Komunikasi dan Informatika mempunyai tugas membantu
            Bupati melaksanakan urusan pemerintahan di bidang komunikasi,
            informatika, persandian, dan statistik serta tugas pembantuan yang
            diberikan kepada daerah.
          </p>

        </div>

        {/* Content */}
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <Image3D
            lightSrc="/hero/hero-1.jpeg"
            darkSrc="/hero/hero-1.jpeg"
            alt="Diskominfo Kabupaten Timor Tengah Selatan"
            direction="left"
          />

          <div>

            <h3 className="text-2xl font-semibold sm:text-3xl">
              Fungsi Dinas
            </h3>

            <p className="mt-3 mb-8 leading-7 text-muted-foreground">
              Dalam melaksanakan tugasnya, Dinas Komunikasi dan Informatika
              Kabupaten Timor Tengah Selatan menyelenggarakan fungsi sebagai
              berikut:
            </p>

            {/* Grid 2 Kolom */}
            <div className="grid gap-4 md:grid-cols-2">

              {mainFunctions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <div className="flex flex-col items-start">

                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>

                    <h4 className="font-semibold leading-6">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}