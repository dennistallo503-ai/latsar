import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for Diskominfo Kab. Timor Tengah Selatan
export const metadata: Metadata = {
  title: 'Diskominfo Kabupaten Timor Tengah Selatan',
  description:
    'Website resmi Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan. Menyediakan informasi publik, layanan digital, berita, dan dokumentasi kegiatan pemerintah daerah.',
  keywords: [
    'Diskominfo TTS',
    'Kabupaten Timor Tengah Selatan',
    'pemerintah daerah',
    'layanan publik',
    'informasi pemerintah',
    'berita TTS',
    'komunikasi informatika'
  ],
  openGraph: {
    title: 'Diskominfo Kabupaten Timor Tengah Selatan',
    description:
      'Portal resmi Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diskominfo Kabupaten Timor Tengah Selatan',
    description:
      'Portal resmi Dinas Komunikasi dan Informatika Kabupaten Timor Tengah Selatan.',
  },
}

export default function LandingPage() {
  return <LandingPageContent />
}