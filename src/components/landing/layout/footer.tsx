"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer id="kontak" className="border-t bg-muted/30">

      {/* Maps Section */}
      <div className="border-b bg-background/50">

        <div className="container mx-auto px-4 py-12">

          <div className="mb-6 text-center">

            <h3 className="text-2xl font-bold">
              Lokasi Kantor Diskominfo TTS
            </h3>

            <p className="mt-2 text-muted-foreground">
              Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
            </p>

          </div>

          <div className="overflow-hidden rounded-2xl border shadow-lg">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.13938269727254!2d124.28800635290764!3d-9.858795731116475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c55ef0cbff7d2c9%3A0xb65d8c464334a0af!2sKantor%20Dinas%20KOMINFO%20TTS!5e1!3m2!1sen!2sid!4v1781615747162!5m2!1sen!2sid"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-16">

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Profil */}
          <div>

            <div className="mb-4 flex items-center gap-3">

              <Image
                src="/logo/komin-logo-kecil-super.svg"
                alt="Diskominfo TTS"
                width={56}
                height={56}
                className="h-14 w-auto"
              />

              <div>

                <h3 className="font-bold text-lg">
                  Diskominfo TTS
                </h3>

                <p className="text-sm text-muted-foreground">
                  Kabupaten Timor Tengah Selatan
                </p>

              </div>

            </div>

            <p className="mb-6 text-muted-foreground leading-7">
              Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
              berkomitmen memberikan pelayanan informasi publik yang transparan,
              cepat, akurat, dan terpercaya kepada masyarakat.
            </p>

            <div className="flex gap-2">

              <Link
                href="#"
                className="rounded-lg border p-2 transition hover:bg-primary hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="rounded-lg border p-2 transition hover:bg-primary hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="rounded-lg border p-2 transition hover:bg-primary hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </Link>

            </div>

          </div>

          {/* Menu */}
          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Menu Utama
            </h3>

            <ul className="space-y-3 text-muted-foreground">

              <li>
                <Link href="/" className="hover:text-primary">
                  Beranda
                </Link>
              </li>

              <li>
                <Link href="/profil" className="hover:text-primary">
                  Profil
                </Link>
              </li>

              <li>
                <Link href="/layanan" className="hover:text-primary">
                  Layanan
                </Link>
              </li>

              <li>
                <Link href="/berita" className="hover:text-primary">
                  Berita
                </Link>
              </li>

              <li>
                <Link href="/galeri" className="hover:text-primary">
                  Galeri
                </Link>
              </li>

              <li>
                <Link href="/kontak" className="hover:text-primary">
                  Kontak
                </Link>
              </li>

            </ul>

          </div>

          {/* Kontak */}
          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Informasi Kontak
            </h3>

            <div className="space-y-4 text-muted-foreground">

              <div className="flex items-start gap-3">

                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <span>
                  Kantor Dinas Komunikasi dan Informatika
                  Kabupaten Timor Tengah Selatan,
                  Soe, Nusa Tenggara Timur
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone className="h-5 w-5 text-primary" />

                <span>(0388) xxxx xxx</span>

              </div>

              <div className="flex items-center gap-3">

                <Mail className="h-5 w-5 text-primary" />

                <span>diskominfo@ttskab.go.id</span>

              </div>

              <div className="flex items-center gap-3">

                <Clock className="h-5 w-5 text-primary" />

                <span>Senin - Jumat, 08.00 - 16.00 WITA</span>

              </div>

            </div>

          </div>

        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground lg:flex-row">

          <p>
            © {new Date().getFullYear()} Dinas Komunikasi dan Informatika
            Kabupaten Timor Tengah Selatan. All Rights Reserved.
          </p>

          <div className="flex gap-4">

            <Link
              href="/privacy"
              className="hover:text-primary"
            >
              Kebijakan Privasi
            </Link>

            <Link
              href="/disclaimer"
              className="hover:text-primary"
            >
              Disclaimer
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}