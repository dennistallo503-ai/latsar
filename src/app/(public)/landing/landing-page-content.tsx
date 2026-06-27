"use client"

import React from 'react'
import { HeroSection } from '@/components/landing/hero-section'
import { QuickAccessSection } from '@/components/landing/quick-access-section'
import { AboutSection } from '@/components/landing/about-section'
import { OrganizationSection } from "@/components/landing/organization-section";
import { GallerySection } from "@/components/landing/gallery-section";

export function LandingPageContent() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      {/* Main Content */}
      <main>
        <HeroSection />
        <QuickAccessSection />
        <AboutSection />
        <OrganizationSection />
        <GallerySection />
      </main>
    </div>
  )
}
