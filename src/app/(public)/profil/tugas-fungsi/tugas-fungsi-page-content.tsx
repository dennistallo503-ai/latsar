"use client"

import React from 'react'
import TaskFunctionPage from '@/components/profil/functions-content'
import {Hero} from '@/components/hero/';
import {
  LandingThemeCustomizer,
  LandingThemeCustomizerTrigger
} from '@/components/landing/landing-theme-customizer'

export function TaskFunctionPageContent() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">

      <main>
        <>
          <Hero 
            title="Tugas & Fungsi"
            description="Dinas Kominfo Kabupaten TTS"
          />
        </>
        <TaskFunctionPage />
      </main>

    </div>
  )
}