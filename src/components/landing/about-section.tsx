"use client";

import Link from "next/link";

import {
  Globe,
  Shield,
  BarChart3,
  Radio,
  ArrowRight,
  Building2,
  FileText,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image3D } from "@/components/image-3d";

const mainFunctions = [
  {
    icon: Radio,
    title: "Informasi dan Komunikasi Publik",
    description:
      "Menyediakan layanan informasi publik yang transparan dan mudah diakses masyarakat.",
  },
  {
    icon: Globe,
    title: "Teknologi Informasi",
    description:
      "Mendukung transformasi digital dan pengembangan SPBE di lingkungan pemerintah daerah.",
  },
  {
    icon: Shield,
    title: "Persandian",
    description:
      "Menjaga keamanan informasi dan sistem elektronik pemerintah daerah.",
  },
  {
    icon: BarChart3,
    title: "Statistik Sektoral",
    description:
      "Menyediakan data statistik sebagai dasar perencanaan dan pengambilan keputusan.",
  },
];

const profileFeatures = [
  {
    icon: Building2,
    title: "Struktur Organisasi",
    description:
      "Mengenal susunan organisasi dan unit kerja Diskominfo Kabupaten TTS.",
  },
  {
    icon: FileText,
    title: "Regulasi",
    description:
      "Kumpulan regulasi, kebijakan, dan dokumen pendukung penyelenggaraan tugas.",
  },
  {
    icon: Users,
    title: "Visi dan Misi",
    description:
      "Arah pembangunan dan tujuan pelayanan Diskominfo Kabupaten TTS.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <Badge variant="outline" className="mb-4">
            Tentang Diskominfo
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mewujudkan Pelayanan Informasi yang
            Transparan dan Berbasis Digital
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
            berperan dalam pengelolaan informasi publik, teknologi informasi,
            persandian, dan statistik untuk mendukung tata kelola pemerintahan
            yang efektif dan modern.
          </p>

        </div>

        {/* Section 1 */}
        <div className="mb-24 grid items-center gap-12 lg:grid-cols-2">

          <Image3D
            lightSrc="/hero/hero-1.jpeg"
            darkSrc="/hero/hero-1.jpeg"
            alt="Diskominfo TTS"
            direction="left"
          />

          <div className="space-y-6">

            <div>
              <h3 className="text-2xl font-semibold sm:text-3xl">
                Tugas dan Fungsi Utama
              </h3>

              <p className="mt-3 text-muted-foreground">
                Diskominfo Kabupaten Timor Tengah Selatan mendukung pelayanan
                publik melalui pengelolaan informasi, teknologi digital,
                keamanan informasi, dan statistik sektoral.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">

              {mainFunctions.map((item, index) => (
                <li
                  key={index}
                  className="rounded-lg p-3 transition-colors hover:bg-accent/5"
                >
                  <div className="flex gap-3">

                    <item.icon className="mt-1 size-5 text-primary" />

                    <div>
                      <h4 className="font-medium">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </li>
              ))}

            </ul>

            <Button asChild size="lg">
              <Link href="/profil">
                Profil Dinas
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

          </div>

        </div>

        {/* Section 2 */}
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div className="space-y-6 order-2 lg:order-1">

            <div>
              <h3 className="text-2xl font-semibold sm:text-3xl">
                Profil Organisasi
              </h3>

              <p className="mt-3 text-muted-foreground">
                Pelajari visi, misi, regulasi, struktur organisasi,
                kedudukan dan tugas pokok Diskominfo Kabupaten Timor Tengah Selatan.
              </p>
            </div>

            <ul className="grid gap-4">

              {profileFeatures.map((item, index) => (
                <li
                  key={index}
                  className="rounded-lg p-3 transition-colors hover:bg-accent/5"
                >
                  <div className="flex gap-3">

                    <item.icon className="mt-1 size-5 text-primary" />

                    <div>
                      <h4 className="font-medium">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </li>
              ))}

            </ul>

            <Button asChild variant="outline" size="lg">
              <Link href="/profil">
                Lihat Selengkapnya
              </Link>
            </Button>

          </div>

          <Image3D
            lightSrc="/hero/hero-2.jpeg"
            darkSrc="/hero/hero-2.jpeg"
            alt="Profil Diskominfo"
            direction="right"
            className="order-1 lg:order-2"
          />

        </div>

      </div>
    </section>
  );
}