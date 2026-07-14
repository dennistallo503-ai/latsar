import { Leader } from "./types";

export const kepalaDinas: Leader = {
  id: "kepala-dinas",

  name: "Nama Kepala Dinas",

  position: "Kepala Dinas",

  image: "/images/pimpinan/kepala-dinas.jpeg",

  nip: "1978xxxxxxxxxxxxx",

  pangkat: "Pembina Utama Muda",

  pendidikan: "S2 Ilmu Komunikasi",

  email: "kadis@tts.go.id",

  phone: "08123456789",

  bio:
    "Memimpin penyelenggaraan urusan pemerintahan bidang komunikasi, informatika, statistik dan persandian di Kabupaten Timor Tengah Selatan.",
};

export const kepalaBidang: Leader[] = [
  {
    id: "ikp",

    name: "Nama Kabid IKP",

    position: "Kepala Bidang Informasi dan Komunikasi Publik",

    image: "/images/pimpinan/kabid-ikp.jpeg",

    nip: "1980xxxxxxxx",

    pangkat: "Pembina",

    pendidikan: "S2",

    email: "ikp@tts.go.id",

    phone: "081111111",

    bio:
      "Bertanggung jawab terhadap pengelolaan informasi publik dan hubungan media.",
  },

  {
    id: "aptika",

    name: "Nama Kabid Aptika",

    position: "Kepala Bidang Aplikasi Informatika",

    image: "/images/pimpinan/kabid-tik.jpeg",

    nip: "1982xxxxxxxx",

    pangkat: "Pembina",

    pendidikan: "S2",

    email: "aptika@tts.go.id",

    phone: "082222222",

    bio:
      "Bertanggung jawab terhadap pengembangan SPBE, aplikasi dan infrastruktur digital.",
  },

  {
    id: "statistik",

    name: "Nama Kabid Statistik",

    position: "Kepala Bidang Statistik dan Persandian",

    image: "/images/pimpinan/kabid-ps.jpeg",

    nip: "1983xxxxxxxx",

    pangkat: "Pembina",

    pendidikan: "S2",

    email: "statistik@tts.go.id",

    phone: "083333333",

    bio:
      "Mengelola data statistik sektoral serta penyelenggaraan persandian daerah.",
  },
];

export const kepalaSubBagian: Leader[] = [
  {
    id: "umum",

    name: "Nama Kasubbag Umum",

    position: "Kepala Sub Bagian Umum dan Kepegawaian",

    image: "/images/pimpinan/kasubag-tu.jpeg",

    nip: "1984xxxxxxxx",

    pangkat: "Penata",

    pendidikan: "S1",

    email: "umum@tts.go.id",

    phone: "084444444",

    bio:
      "Mengelola administrasi umum, kepegawaian dan tata usaha.",
  },

  {
    id: "keuangan",

    name: "Nama Kasubbag Keuangan",

    position: "Kepala Sub Bagian Perencanaan dan Keuangan",

    image: "/images/pimpinan/kasubag-keuangan.jpeg",

    nip: "1985xxxxxxxx",

    pangkat: "Penata",

    pendidikan: "S1",

    email: "keuangan@tts.go.id",

    phone: "085555555",

    bio:
      "Mengelola perencanaan program, penganggaran dan keuangan dinas.",
  },
];