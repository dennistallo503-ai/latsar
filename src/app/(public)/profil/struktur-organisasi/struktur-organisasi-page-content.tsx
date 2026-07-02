"use client"

import React from 'react'
// import StrukutrOrganisasiPage from '@/components/profil/organization-content'
import {Hero} from '@/components/hero/';
import PublicCMS from "../../informasi/public/PublicCMS"

export function StrukturOrganisasiPageContent() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">

      <main>
        <PublicCMS
            title="Struktur Organisasi"
            description="Dinas Kominfo Kabupaten TTS"
            category="struktur-organisasi"
          />
        {/* <StrukutrOrganisasiPage /> */}
      </main>
    </div>
  )
}