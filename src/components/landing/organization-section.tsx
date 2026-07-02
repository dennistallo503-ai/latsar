"use client";

import Link from "next/link";

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
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <Badge variant="outline" className="mb-4">
            Informasi Diskominfo Kab. Timor Tengah Selatan
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bidang dan Sub Bagian
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Unit kerja yang mendukung pelaksanaan tugas dan fungsi
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan.
          </p>

        </div>

        {/* Row 1 */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          {units.slice(0, 2).map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="
                  group
                  overflow-hidden
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-primary
                  hover:shadow-xl
                "
              >
                <CardContent className="py-1">

                  <div className="mb-6 flex items-center justify-between">

                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <span className="text-5xl font-bold text-primary/10">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mb-4 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mb-6 leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <Button variant="ghost" asChild className="px-0">
                    <Link href={item.href}>
                      Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                </CardContent>
              </Card>
            );
          })}

        </div>

        {/* Row 2 */}
        <div className="grid gap-6 lg:grid-cols-3">

          {units.slice(2).map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="
                  group
                  overflow-hidden
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-primary
                  hover:shadow-xl
                "
              >
                <CardContent className="py-1">

                  <div className="mb-6 flex items-center justify-between">

                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <span className="text-5xl font-bold text-primary/10">
                      0{index + 3}
                    </span>

                  </div>

                  <h3 className="mb-4 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mb-6 leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <Button variant="ghost" asChild className="px-0">
                    <Link href={item.href}>
                      Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                </CardContent>
              </Card>
            );
          })}

        </div>

      </div>
    </section>
  );
}