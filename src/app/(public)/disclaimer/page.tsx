export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">
        Disclaimer
      </h1>

      <p className="mt-4 text-muted-foreground">
        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
      </p>

      <div className="prose prose-slate dark:prose-invert mt-10 max-w-none">
        <p>
          Seluruh informasi yang tersedia pada website ini disediakan
          sebagai media informasi publik dan pelayanan kepada masyarakat.
        </p>

        <h2>1. Akurasi Informasi</h2>

        <p>
          Kami berupaya menyajikan informasi yang akurat, lengkap, dan
          terbaru. Namun demikian, tidak terdapat jaminan bahwa seluruh
          informasi akan selalu bebas dari kesalahan maupun keterlambatan
          pembaruan.
        </p>

        <h2>2. Penggunaan Informasi</h2>

        <p>
          Pengguna bertanggung jawab atas penggunaan informasi yang
          diperoleh dari website ini. Segala risiko yang timbul akibat
          penggunaan informasi menjadi tanggung jawab pengguna.
        </p>

        <h2>3. Tautan Eksternal</h2>

        <p>
          Website ini dapat menyediakan tautan menuju website instansi
          pemerintah maupun pihak ketiga. Kami tidak bertanggung jawab
          atas isi, layanan, maupun kebijakan pada website tersebut.
        </p>

        <h2>4. Hak Kekayaan Intelektual</h2>

        <p>
          Seluruh konten berupa teks, gambar, dokumen, logo, dan
          informasi lainnya merupakan milik Dinas Komunikasi dan
          Informatika atau pihak terkait sesuai ketentuan yang berlaku,
          kecuali dinyatakan lain.
        </p>

        <h2>5. Perubahan Layanan</h2>

        <p>
          Kami berhak melakukan perubahan terhadap konten, fitur, maupun
          layanan website tanpa pemberitahuan terlebih dahulu apabila
          diperlukan.
        </p>

        <h2>6. Pembatasan Tanggung Jawab</h2>

        <p>
          Dinas Komunikasi dan Informatika tidak bertanggung jawab atas
          kerugian langsung maupun tidak langsung yang timbul akibat
          penggunaan website ini, termasuk gangguan layanan, kehilangan
          data, maupun kerusakan perangkat yang disebabkan oleh faktor di
          luar kendali kami.
        </p>

        <h2>7. Persetujuan</h2>

        <p>
          Dengan mengakses dan menggunakan website ini, pengguna dianggap
          telah memahami dan menyetujui seluruh ketentuan yang tercantum
          dalam halaman Disclaimer ini.
        </p>
      </div>
    </div>
  )
}