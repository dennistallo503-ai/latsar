"use client";

import Link from "next/link";
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem, SlideRight, SlideLeft, FadeIn } from "@/components/animations"

import {
  FileText,
  Wallet,
  Megaphone,
  Laptop,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const units = [
  {
    title: "Sub Bagian Tata Usaha, Program dan Pelaporan",
    description:
      "Mengoordinasikan administrasi umum, program kerja, serta pelaporan kinerja perangkat daerah.",
    icon: FileText,
    href: "/informasi/tata-usaha",
  },
  {
    title: "Sub Bagian Keuangan dan Perlengkapan",
    description:
      "Mengelola keuangan, aset, perlengkapan, dan kebutuhan operasional dinas.",
    icon: Wallet,
    href: "/informasi/keuangan",
  },
  {
    title: "Bidang Informasi dan Komunikasi Publik",
    description:
      "Mengelola informasi publik, publikasi kegiatan pemerintah, dan komunikasi dengan masyarakat.",
    icon: Megaphone,
    href: "/informasi/ikp",
  },
  {
    title: "Bidang Teknologi Informasi dan Komunikasi",
    description:
      "Mengembangkan infrastruktur teknologi dan mendukung transformasi digital daerah.",
    icon: Laptop,
    href: "/informasi/tik",
  },
  {
    title: "Bidang Persandian dan Statistik",
    description:
      "Melaksanakan urusan persandian serta pengelolaan statistik sektoral daerah.",
    icon: ShieldCheck,
    href: "/informasi/persandian-statistik",
  },
];

export function OrganizationSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <FadeUp once={true}>
            <Badge variant="outline" className="mb-4">
              Informasi Diskominfo Kab. Timor Tengah Selatan
            </Badge>
          </FadeUp>

          <FadeUp once={true} delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bidang dan Sub Bagian
            </h2>
          </FadeUp>

          <FadeUp once={true} delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground">
              Unit kerja yang mendukung pelaksanaan tugas dan fungsi
              Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan.
            </p>
          </FadeUp>
        </div>

        {/* Row 1 */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          {units.slice(0, 2).map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn
                key={item.title}
                once={false}
                delay={index * 0.15}
              >
                <Card
                  className="
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    border
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-primary
                    hover:shadow-xl
                  "
                >

                  <CardContent className="flex h-full flex-col p-8">

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex rounded-xl bg-primary/10 p-3">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>


                    {/* Judul */}
                    <h3 className="mb-4 text-xl font-semibold">
                      {item.title}
                    </h3>


                    {/* Deskripsi */}
                    <p className="mb-6 flex-1 leading-7 text-muted-foreground">
                      {item.description}
                    </p>


                    {/* Button */}
                    <Button
                      asChild
                      className="mt-auto w-fit"
                    >
                      <Link href={item.href}>
                        Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                  </CardContent>

                </Card>
              </FadeIn>
            );
          })}

        </div>

        {/* Row 2 */}
        <div className="grid gap-6 lg:grid-cols-3">

          {units.slice(2).map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn
                key={item.title}
                once={false}
                delay={index * 0.15}
              >
                <Card
                  className="
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    border
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-primary
                    hover:shadow-xl
                  "
                >

                  <CardContent className="flex h-full flex-col p-8">

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex rounded-xl bg-primary/10 p-3">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>


                    {/* Judul */}
                    <h3 className="mb-4 text-lg font-semibold">
                      {item.title}
                    </h3>


                    {/* Deskripsi */}
                    <p className="mb-6 flex-1 leading-7 text-muted-foreground">
                      {item.description}
                    </p>


                    {/* Button */}
                    <Button
                      asChild
                      className="mt-auto w-fit"
                    >
                      <Link href={item.href}>
                        Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                  </CardContent>

                </Card>
              </FadeIn>
            );
          })}

        </div>

      </div>
    </section>
  );
}