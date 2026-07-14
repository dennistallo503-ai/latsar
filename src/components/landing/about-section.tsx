"use client";

import {
  Globe,
  Shield,
  BarChart3,
  Building2,
  FileText,
  Handshake,
  UserCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Image3D } from "@/components/image-3d";
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem, SlideRight, SlideLeft, FadeIn } from "@/components/animations"

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
    <section className="bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">

          <FadeUp once={true}>
          <Badge variant="outline" className="mb-4">
            Profil Diskominfo
          </Badge>
          </FadeUp>
          <FadeUp once={true} delay={0.1}>
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tugas dan Fungsi
            <br />
            Dinas Komunikasi dan Informatika
            <br />
            Kabupaten Timor Tengah Selatan
          </h3>
          </FadeUp>

        </div>

        {/* Content */}

        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          {/* Gambar */}
          <FadeUp once={true} delay={0.2}>
            <div className="h-full">
              <Image3D
                lightSrc="/hero/hero-6.jpeg"
                darkSrc="/hero/hero-6.jpeg"
                alt="Diskominfo Kabupaten Timor Tengah Selatan"
                direction="left"
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
          </FadeUp>

          {/* Card */}
          <div className="h-full">
            <div className="flex h-full flex-col rounded-3xl transition-all duration-300">
              <div className="space-y-5">

                {/* Tugas Dinas */}
                <FadeUp once={false}>
                  <div className="rounded-lg border border-border/20 bg-card p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary">

                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-20 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Handshake className="h-6 w-6 text-primary" />
                      </div>

                      <h3 className="text-2xl font-bold">
                        Tugas Dinas
                      </h3>
                    </div>

                    <p className="text-lg leading-8 text-muted-foreground">
                      Berdasarkan Peraturan Bupati Timor Tengah Selatan Nomor 11 Tahun
                      2025, Dinas Komunikasi dan Informatika mempunyai tugas membantu
                      Bupati melaksanakan urusan pemerintahan di bidang komunikasi,
                      informatika, persandian, dan statistik serta tugas pembantuan yang
                      diberikan kepada daerah.
                    </p>

                  </div>
                </FadeUp>

                {/* Garis Pemisah */}
                <div className="border-t border-border/50" />

                {/* Fungsi Dinas */}
                <FadeUp once={false} delay={0.1}>
                  <div className="rounded-lg border border-border/20 bg-card p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary">

                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-20 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>

                      <h3 className="text-2xl font-bold">
                        Fungsi Dinas
                      </h3>
                    </div>

                    <p className="text-lg leading-8 text-muted-foreground">
                      Dalam melaksanakan tugasnya, Dinas Komunikasi dan Informatika
                      Kabupaten Timor Tengah Selatan menyelenggarakan fungsi sebagai
                      berikut:
                    </p>

                  </div>
                </FadeUp>

              </div>

              <div className="mt-auto" />
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-5">
          {mainFunctions.map((item, index) => (
            <FadeIn
              key={item.title}
              once={false}
              delay={index * 0.15}
            >
              <div className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>

                <h4 className="font-semibold leading-6">
                  {item.title}
                </h4>

                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}