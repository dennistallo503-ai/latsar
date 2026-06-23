import Image from "next/image";

export default function OrganizationStructurePage() {
  return (
    <div className="bg-background">

      {/* HEADER */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Struktur Organisasi
          </h1>
          <p className="mt-4 text-white/90">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* IMAGE CARD */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="relative w-full h-[500px]">
              <Image
                src="/images/struktur-organisasi.jpeg"
                alt="Struktur Organisasi Diskominfo TTS"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10 text-center text-muted-foreground">
            Struktur organisasi Dinas Komunikasi dan Informatika Kabupaten
            Timor Tengah Selatan menggambarkan susunan jabatan, bidang,
            serta alur koordinasi dalam pelaksanaan tugas pemerintahan daerah.
          </div>

        </div>
      </section>

    </div>
  );
}