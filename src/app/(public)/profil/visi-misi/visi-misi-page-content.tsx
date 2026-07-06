"use client"

import React from 'react'
import VisionMissionPage from '@/components/profil/vision-mission-content'
import {Hero} from '@/components/hero/';
import {
  LandingThemeCustomizer,
  LandingThemeCustomizerTrigger
} from '@/components/landing/landing-theme-customizer'

export function VisiMisiPageContent() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">

      <main>
      <>
        <Hero 
          title="Visi & Misi"
          description="Dinas Kominfo Kabupaten TTS menjalankan Misi 5"
        />
      </>
        <VisionMissionPage />
      </main>
    </div>
  )
}