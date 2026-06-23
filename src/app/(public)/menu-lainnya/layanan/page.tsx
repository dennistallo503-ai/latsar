export default function LayananPage() {
  return (
    <div className="bg-background">

      {/* HEADER */}
      <section className="bg-primary py-20 text-white text-center">
        <h1 className="text-4xl font-bold">
          Layanan
        </h1>
        <p className="mt-3 text-white/90">
          Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* CARD */}
          <div className="rounded-2xl border bg-card p-8 shadow-sm">

            <h2 className="text-xl font-bold text-primary mb-4">
              Alur Kunjungan ke Diskominfo Kab. TTS
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Dalam rangka penerimaan kunjungan atau tamu ke Dinas Kominfo Kabupaten TTS,
              pelaksanaan dilakukan sesuai dengan tahapan yang telah ditetapkan.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Jika terdapat kendala dalam proses kunjungan, silakan menghubungi kami
              melalui kontak resmi atau media sosial yang tersedia.
            </p>

          </div>

        </div>
      </section>

    </div>
  );
}