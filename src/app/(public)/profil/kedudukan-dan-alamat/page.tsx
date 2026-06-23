export default function PositionAddressPage() {
  return (
    <div className="bg-background">

      {/* HEADER */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Kedudukan dan Alamat
          </h1>
          <p className="mt-4 text-white/90">
            Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl space-y-10">

          {/* KEDUDUKAN */}
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Kedudukan
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan
              merupakan unsur pelaksana urusan pemerintahan daerah di bidang
              komunikasi, informatika, persandian, dan statistik yang berada di bawah
              dan bertanggung jawab kepada Bupati melalui Sekretaris Daerah.
            </p>
          </div>

          {/* ALAMAT & KONTAK */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Alamat Kantor
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Jl. Gajah Mada, Soe, Kabupaten Timor Tengah Selatan,<br />
                Nusa Tenggara Timur, Indonesia
              </p>

              <div className="mt-6 text-sm text-muted-foreground space-y-2">
                <p>📞 (0388) xxxx xxx</p>
                <p>📧 diskominfo@ttskab.go.id</p>
                <p>🕒 Senin - Jumat | 08.00 - 16.00 WITA</p>
              </div>
            </div>

            <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.13938269727254!2d124.28800635290764!3d-9.858795731116475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c55ef0cbff7d2c9%3A0xb65d8c464334a0af!2sKantor%20Dinas%20KOMINFO%20TTS!5e1!3m2!1sen!2sid!4v1781615747162!5m2!1sen!2sid"
                width="100%"
                height="350"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}