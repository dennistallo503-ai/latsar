export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">
        Kebijakan Privasi
      </h1>

      <p className="mt-4 text-muted-foreground">
        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
      </p>

      <div className="prose prose-slate dark:prose-invert mt-10 max-w-none">
        <p>
          Dinas Komunikasi dan Informatika berkomitmen untuk melindungi
          privasi setiap pengguna yang mengakses website ini. Kebijakan
          Privasi ini menjelaskan bagaimana informasi dikumpulkan,
          digunakan, disimpan, dan dilindungi.
        </p>

        <h2>1. Informasi yang Dikumpulkan</h2>

        <p>
          Website dapat mengumpulkan informasi yang diberikan secara
          sukarela oleh pengguna, seperti:
        </p>

        <ul>
          <li>Nama</li>
          <li>Alamat email</li>
          <li>Nomor telepon</li>
          <li>Isi pesan atau pengaduan</li>
        </ul>

        <p>
          Selain itu, sistem dapat secara otomatis mencatat informasi
          teknis seperti alamat IP, jenis perangkat, browser, dan waktu
          akses untuk keperluan keamanan serta peningkatan layanan.
        </p>

        <h2>2. Penggunaan Informasi</h2>

        <p>Informasi yang diperoleh digunakan untuk:</p>

        <ul>
          <li>Memberikan layanan informasi kepada masyarakat.</li>
          <li>Menindaklanjuti pertanyaan atau pengaduan.</li>
          <li>Meningkatkan kualitas layanan digital.</li>
          <li>Menjaga keamanan sistem.</li>
        </ul>

        <h2>3. Perlindungan Data</h2>

        <p>
          Kami menerapkan langkah-langkah teknis dan administratif yang
          wajar untuk menjaga keamanan informasi dari akses yang tidak
          sah, penyalahgunaan, maupun perubahan data.
        </p>

        <h2>4. Pengungkapan Informasi</h2>

        <p>
          Informasi pribadi tidak akan diperjualbelikan maupun diberikan
          kepada pihak lain, kecuali diwajibkan oleh peraturan
          perundang-undangan.
        </p>

        <h2>5. Cookie</h2>

        <p>
          Website dapat menggunakan cookie untuk meningkatkan pengalaman
          pengguna, analisis statistik, dan optimalisasi layanan.
        </p>

        <h2>6. Tautan ke Situs Lain</h2>

        <p>
          Website ini dapat memuat tautan menuju website pemerintah atau
          pihak ketiga. Kami tidak bertanggung jawab atas kebijakan
          privasi maupun isi dari website tersebut.
        </p>

        <h2>7. Perubahan Kebijakan</h2>

        <p>
          Kebijakan Privasi dapat diperbarui sewaktu-waktu sesuai
          kebutuhan. Perubahan akan dipublikasikan pada halaman ini.
        </p>

        <h2>8. Kontak</h2>

        <p>
          Apabila terdapat pertanyaan mengenai Kebijakan Privasi ini,
          silakan menghubungi Dinas Komunikasi dan Informatika melalui
          kanal resmi yang tersedia pada website.
        </p>
      </div>
    </div>
  )
}