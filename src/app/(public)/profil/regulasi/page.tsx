export default function RegulationPage() {
  const regulasi = [
    {
      title: "Peraturan Bupati TTS tentang SPBE",
      desc: "Pedoman pelaksanaan Sistem Pemerintahan Berbasis Elektronik di lingkungan Pemerintah Kabupaten TTS.",
    },
    {
      title: "Kebijakan Tata Kelola Informasi Publik",
      desc: "Mengatur keterbukaan informasi publik sesuai UU KIP.",
    },
    {
      title: "Standar Keamanan Informasi Daerah",
      desc: "Pedoman pengamanan data dan sistem informasi pemerintah daerah.",
    },
    {
      title: "Pedoman Statistik Sektoral",
      desc: "Pengelolaan dan pemanfaatan data statistik daerah secara terintegrasi.",
    },
  ];

  return (
    <div className="bg-background">

      {/* HEADER */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Regulasi
          </h1>
          <p className="mt-4 text-white/90">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* INTRO */}
          <div className="mb-10 text-center text-muted-foreground">
            Kumpulan regulasi, kebijakan, dan pedoman yang menjadi dasar pelaksanaan
            tugas Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan.
          </div>

          {/* LIST REGULASI */}
          <div className="space-y-5">

            {regulasi.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6 shadow-sm hover:bg-accent/5 transition"
              >
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}