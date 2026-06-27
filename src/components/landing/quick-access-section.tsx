"use client";

import Image from "next/image";

const quickAccess = [
  {
    title: "Kementerian Komunikasi dan Digital",
    description: "Website resmi Kementerian Komunikasi dan Digital Republik Indonesia.",
    href: "https://www.komdigi.go.id/",
    image: "/logo/komdigi-logo.svg",
  },
  {
    title: "Pemerintah Provinsi Nusa Tenggara Timur",
    description: "Website resmi Pemerintah Provinsi Nusa Tenggara Timur.",
    href: "https://nttprov.go.id/",
    image: "/logo/ntt.svg", 
  },
  {
    title: "Pemerintah Kabupaten Timor Tengah Selatan",
    description: "Website resmi Pemerintah Kabupaten Timor Tengah Selatan.",
    href: "https://ttskab.go.id/",
    image: "/logo/tts-logo.svg",
  },
  {
    title: "SIPD RI",
    description: "Sistem Informasi Pemerintahan Daerah Republik Indonesia.",
    href: "https://sipd-ri.kemendagri.go.id/auth/login",
    image: "/logo/sipd.svg",
  },
];

export function QuickAccessSection() {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">
            Akses Cepat
          </h2>

          <p className="mt-2 text-muted-foreground">
            Akses langsung ke website mitra dan layanan pemerintahan.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="mb-5 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={72}
                  height={72}
                  className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="text-center font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-center text-sm text-muted-foreground">
                {item.description}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}