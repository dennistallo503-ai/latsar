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

      {/* HERO */}
      {/* <section className="relative py-24 bg-gradient-to-r from-primary to-primary/70 text-white">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Visi & Misi
          </h1>
          <p className="mt-4 text-white/90">
            Dinas Kominfo Kabupaten TTS menjalankan Misi 5
          </p>
        </div>
      </section> */}
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