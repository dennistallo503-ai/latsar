"use client"

import React from 'react'
import StrukutrOrganisasiPage from '@/components/profil/organization-content'
import {Hero} from '@/components/hero/';
import {
  LandingThemeCustomizer,
  LandingThemeCustomizerTrigger
} from '@/components/landing/landing-theme-customizer'

export function StrukturOrganisasiPageContent() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">

      <main>
        <>
          <Hero 
            title="Struktur Organisasi"
            description="Dinas Kominfo Kabupaten TTS"
          />
        </>
        <StrukutrOrganisasiPage />
      </main>

      {/* Theme Customizer */}
      {/* <LandingThemeCustomizerTrigger
        onClick={() => setThemeCustomizerOpen(true)}
      /> */}

      {/* <LandingThemeCustomizer
        open={themeCustomizerOpen}
        onOpenChange={setThemeCustomizerOpen}
      /> */}
    </div>
  )
}