import Image from "next/image";
import { Target, CheckCircle2 } from "lucide-react";

export default function VisionMissionPage() {
  const missions = [
    "Meningkatkan kualitas layanan informasi publik yang cepat dan akurat.",
    "Mengembangkan infrastruktur teknologi informasi dan komunikasi daerah.",
    "Mendorong implementasi Sistem Pemerintahan Berbasis Elektronik (SPBE).",
    "Meningkatkan keamanan informasi melalui sistem persandian yang andal.",
    "Mengoptimalkan data statistik sektoral untuk pengambilan kebijakan daerah.",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="relative z-0 overflow-hidden bg-gradient-to-r from-primary to-primary/70 py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-black/10" />

        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">
            Visi & Misi
          </h1>

          <p className="mt-4 text-lg text-primary-foreground/90">
            Pemerintah Daerah Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section>

      {/* FOTO PIMPINAN */}
      <section className="relative z-10 pt-8 pb-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">

            <div className="flex justify-center">
              <div className="text-center">

                <div className="mx-auto h-72 w-56 overflow-hidden rounded-2xl border border-border shadow">
                  <Image
                    src="/hero/hero-4.jpeg"
                    alt="Bupati dan Wakil Bupati TTS"
                    width={400}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-xl font-bold text-foreground">
                  Bupati & Wakil Bupati
                </h3>

                <p className="text-muted-foreground">
                  Kabupaten Timor Tengah Selatan
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-5">

            {/* VISI */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-md">

                <div className="mb-5 flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />

                  <h2 className="text-3xl font-bold text-primary">
                    Visi
                  </h2>
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Terwujudnya Tata Kelola Pemerintahan Berbasis Digital yang
                  Efektif, Transparan, dan Berdaya Saing di Kabupaten Timor
                  Tengah Selatan.
                </p>

              </div>
            </div>

            {/* MISI */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-md">

                <h2 className="mb-8 text-3xl font-bold text-foreground">
                  Misi
                </h2>

                <div className="space-y-4">
                  {missions.map((mission, index) => (
                    <div
                      key={index}
                      className="
                        flex gap-4 rounded-2xl border border-border
                        p-5 transition-all
                        hover:border-primary
                        hover:bg-accent/30
                        hover:shadow-md
                      "
                    >
                      <CheckCircle2 className="mt-1 h-6 w-6 text-primary" />

                      <div>
                        <span className="font-semibold text-foreground">
                          Misi {index + 1}
                        </span>

                        <p className="mt-1 text-muted-foreground">
                          {mission}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}