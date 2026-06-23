"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import {
  Menu,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

/* ===================== MENU DATA ===================== */
const navigationItems = [
  { name: "Beranda", href: "/" },
  { name: "Profil", href: "/profil" },
  { name: "Informasi", href: "/informasi" },
  { name: "Menu Lainnya", href: "/menu" },
  { name: "Kontak", href: "/kontak" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">

      <div className="container mx-auto px-4 lg:px-8">

        {/* ===================== TOP BAR ===================== */}
        <div className="flex h-20 items-center justify-between">

          {/* ===================== LEFT LOGO ===================== */}
          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/logo/logo-kominfo.png"
              alt="Kominfo"
              width={50}
              height={50}
            />

            <div className="hidden lg:block">
              <h1 className="font-bold leading-none">
                DISKOMINFO
              </h1>
              <p className="text-xs text-muted-foreground">
                Kab. Timor Tengah Selatan
              </p>
            </div>

          </Link>

          {/* ===================== DESKTOP MENU ===================== */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">

            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary transition"
              >
                {item.name}
              </Link>
            ))}

          </nav>

          {/* ===================== RIGHT ACTION ===================== */}
          <div className="hidden xl:flex items-center gap-3">

            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            <ModeToggle />

            <Image
              src="/logo/logo-tts.png"
              alt="TTS"
              width={44}
              height={44}
            />

            <Button>
              Login
            </Button>

          </div>

          {/* ===================== MOBILE ===================== */}
          <div className="flex xl:hidden w-full items-center">

            {/* LEFT */}
            <div className="flex-1">
              <Image
                src="/logo/logo-kominfo.png"
                alt="Kominfo"
                width={42}
                height={42}
              />
            </div>

            {/* CENTER MENU */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* RIGHT */}
            <div className="flex-1 flex justify-end">
              <Image
                src="/logo/logo-tts.png"
                alt="TTS"
                width={42}
                height={42}
              />
            </div>

          </div>

        </div>

        {/* ===================== MOBILE MENU (BELOW NAVBAR) ===================== */}
        {mobileOpen && (
          <div className="xl:hidden border-t bg-background">

            <div className="flex flex-col py-3">

              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 hover:bg-accent rounded-md"
                >
                  {item.name}
                </Link>
              ))}

              <div className="px-4 pt-3 flex gap-3">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>

                <ModeToggle />

                <Button className="w-full">
                  Login
                </Button>
              </div>

            </div>

          </div>
        )}

      </div>

    </header>
  )
}