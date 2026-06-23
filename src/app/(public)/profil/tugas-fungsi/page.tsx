import type { Metadata } from 'next'
import { TaskFunctionPageContent } from './tugas-fungsi-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: 'Diskominfo - Kab. Timor tengah Selatan',
  description: 'tugas dan fungsi diskominfo timor tengah selatan',
  keywords: ['admin dashboard', 'react', 'nextjs', 'typescript', 'shadcn/ui', 'tailwind css'],
  openGraph: {
    title: 'Diskominfo - Kab. Timor tengah Selatan',
    description: 'tugas dan fungsi diskominfo timor tengah selatan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diskominfo - Kab. Timor tengah Selatan',
    description: 'tugas dan fungsi diskominfo timor tengah selatan',
  },
}

export default function TaskFunctionPage() {
  return <TaskFunctionPageContent />
}
