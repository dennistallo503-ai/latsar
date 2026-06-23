import {
  User,
  Briefcase,
  Newspaper,
  Images,
  Phone,
} from "lucide-react";

export const quickLinks = [
  {
    title: "Profil",
    description: "Visi, Misi dan Struktur Organisasi",
    href: "/profil",
    icon: User,
  },
  {
    title: "Layanan",
    description: "Informasi Layanan Publik",
    href: "/menu-lainnya/layanan",
    icon: Briefcase,
  },
  {
    title: "Galeri",
    description: "Foto dan Video Kegiatan",
    href: "/menu-lainnya/galeri",
    icon: Images,
  },
  {
    title: "Kontak",
    description: "Hubungi Kami",
    href: "#kontak",
    icon: Phone,
  },
];