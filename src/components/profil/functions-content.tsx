export default function TaskFunctionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10" />

        <div className="container relative mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Tugas dan Fungsi
          </h1>

          <p className="mt-4 text-primary-foreground/90 text-base md:text-lg">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">

          <div className="grid gap-6 md:grid-cols-2">

            {/* TUGAS */}
            <div className="rounded-3xl border bg-card p-8 shadow-md transition hover:shadow-lg">

              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">
                Tugas
              </h2>

              <p className="leading-relaxed text-muted-foreground">
                Dinas Komunikasi dan Informatika mempunyai tugas membantu Bupati
                melaksanakan urusan pemerintahan di bidang komunikasi, informatika,
                persandian, dan statistik yang menjadi kewenangan daerah serta
                tugas pembantuan yang diberikan kepada daerah.
              </p>

            </div>

            {/* FUNGSI */}
            <div className="rounded-3xl border bg-card p-8 shadow-md transition hover:shadow-lg">

              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">
                Fungsi
              </h2>

              <ul className="space-y-4 text-muted-foreground">

                {[
                  "Perumusan kebijakan di bidang komunikasi dan informatika.",
                  "Pelaksanaan kebijakan di bidang teknologi informasi dan komunikasi.",
                  "Pengelolaan informasi publik dan komunikasi publik pemerintah daerah.",
                  "Pelaksanaan persandian dan keamanan informasi daerah.",
                  "Pelaksanaan statistik sektoral daerah.",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}

              </ul>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}