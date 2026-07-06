"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Menu,
  Moon,
  Sun,
  Search,
  ChevronDown,
  X,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { useTheme } from "@/hooks/use-theme"

/* ================= DATA ================= */

const profilItems = [
  { name: "Visi & Misi Pemda TTS", href: "/profil/visi-misi" },
  { name: "Tugas & Fungsi", href: "/profil/tugas-fungsi" },
  { name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
]

const informasiItems = [
  { title: "Sekretariat" },
  { name: "Sub Bagian Tata Usaha, Program & Pelaporan", href: "/informasi/tata-usaha" },
  { name: "Sub Bagian Keuangan & Perlengkapan", href: "/informasi/keuangan" },

  { title: "Bidang" },
  { name: "IKP / Informasi & Komunikasi Publik", href: "/informasi/ikp" },
  { name: "TIK / Teknologi Informasi & Komunikasi", href: "/informasi/tik" },
  { name: "PS / Persandian & Statistik", href: "/informasi/ps" },
  
  { title: "Lainnya" },
  { name: "Regulasi & Peraturan", href: "/informasi/regulasi" },
]

const lainnyaItems = [
  { name: "Layanan", href: "/menu-lainnya/layanan" },
  { name: "Galeri", href: "/menu-lainnya/galeri" },
]

const socialLinks = {
  facebook: "https://www.facebook.com/share/1CtruBivmg/",
  youtube: "https://youtube.com/@diskominfokabtts8341?si=N1_ruEEKsJma88dZ",
  instagram: "https://www.instagram.com/diskominfo_tts?igsh=cGxqbzljNDBkcGpi",
}

/* ================= COMPONENT ================= */

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [profilOpen, setProfilOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [lainnyaOpen, setLainnyaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showSocial, setShowSocial] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 20) {
        setShowSocial(true)
      } else if (currentScrollY > lastScrollY) {
        // Scroll ke bawah
        setShowSocial(false)
      } else {
        // Scroll ke atas
        setShowSocial(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    const keyword = query.trim()
    if (!keyword) return

    // Tutup menu mobile (jika sedang terbuka)
    setIsOpen(false)

    // Tutup search desktop (jika sedang terbuka)
    setSearchOpen(false)

    // Bersihkan input
    setQuery("")

    // Pindah ke halaman search
    router.push(`/search?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* ================= LOGO ================= */}
        <div className="flex items-center gap-3">

          {/* LOGO KOMINFO (internal link) */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/komin-logo-kecil-super.svg"
              alt="Logo Kominfo"
              width={42}
              height={42}
              priority
            />
          </Link>

          {/* Separator */}
          <div className="h-8 w-px bg-border" />

          {/* IDENTITAS (tidak clickable atau bisa ikut homepage jika mau) */}
          <div className="flex items-center gap-4">

            <div className="leading-tight">
              <p className="text-xs sm:text-sm font-semibold">
                Dinas Komunikasi dan Informatika
              </p>

              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Pemerintah Kab. Timor Tengah Selatan
              </p>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href={socialLinks.facebook}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-blue-600"
              >
                <Facebook className="h-5 w-5" />
              </Link>

              <Link
                href={socialLinks.youtube}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-red-600"
              >
                <Youtube className="h-5 w-5" />
              </Link>

              <Link
                href={socialLinks.instagram}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-pink-600"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>

          </div>

        </div>

        {/* ================= DESKTOP MENU ================= */}
        <NavigationMenu viewport={false} className="hidden xl:flex">
          <NavigationMenuList>

            {/* BERANDA */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="px-4 py-2 text-sm font-medium">
                  Beranda
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* PROFIL */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[260px]">
                <div className="w-72 p-2 space-y-1">
                  {profilItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm rounded hover:bg-accent"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* INFORMASI */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Informasi</NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[260px]">
                <div className="w-80 p-2 space-y-1">
                  {informasiItems.map((item, idx) => {
                    if ("title" in item) {
                      return (
                        <div
                          key={idx}
                          className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground"
                        >
                          {item.title}
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-sm rounded hover:bg-accent"
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* MENU LAINNYA */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu Lainnya</NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[260px]">
                <div className="w-64 p-2 space-y-1">
                  {lainnyaItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm rounded hover:bg-accent"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* KONTAK */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  onClick={() => {
                    setIsOpen(false)

                    setTimeout(() => {
                      document.getElementById("kontak")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }, 200)
                  }}
                  className="block py-2"
                >
                  Kontak
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
        

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden xl:flex items-center gap-2">

        {/* <div className="flex items-center gap-2">
          <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? "w-80 opacity-100" : "w-0 opacity-0"}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Cari informasi..."
                className="pl-10 pr-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                autoFocus={searchOpen}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => {
                  setSearchOpen(false)
                  setQuery("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div> */}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 dark:rotate-90 dark:scale-0 transition-all" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
          </Button>

          {/* <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button> */}

        </div>

        {/* ================= MOBILE MENU ================= */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="xl:hidden flex items-center gap-1">
            {/* DARK MODE TOGGLE (PINDAH KE SINI) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              <Sun className="h-5 w-5 dark:rotate-90 dark:scale-0 transition-all" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
            </Button>

            {/* HAMBURGER MENU */}
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

          </div>
          
          {/* <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger> */}

          <SheetContent side="right" className="w-full sm:w-[380px] p-0">

          <SheetHeader className="border-b px-5 py-4">
            <div className="border-b px-5 py-3">
              <div className="flex items-center justify-center gap-6">

                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Link>

                <Link
                  href={socialLinks.youtube}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-600 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </Link>

                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-pink-600 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Link>

              </div>
            </div>
            <div className="flex items-center gap-3">

              {/* Logo */}
              <div className="flex items-center gap-2 shrink-0">
                <Image
                  src="/logo/komin-logo-kecil-super.svg"
                  alt="Logo Kominfo"
                  width={34}
                  height={34}
                />

                {/* <Image
                  src="/logo/tts-logo.svg"
                  alt="Logo TTS"
                  width={32}
                  height={32}
                /> */}
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-border" />

              {/* Identity */}
              <div className="leading-tight text-left">
                <SheetTitle className="text-sm font-semibold p-0">
                  Dinas Komunikasi dan Informatika
                </SheetTitle>

                <p className="text-xs text-muted-foreground">
                  Kabupaten Timor Tengah Selatan
                </p>
              </div>

            </div>
          </SheetHeader>

            <div className="p-4 space-y-3">

              {/* 🔍 MOBILE SEARCH */}
              {/* <div className="relative">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Cari informasi..."
                  className="pl-10 pr-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />

                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                    onClick={() => setQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}

              </div> */}

              {/* BERANDA */}
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-2">
                Beranda
              </Link>

              {/* PROFIL */}
              <Collapsible open={profilOpen} onOpenChange={setProfilOpen}>
                <CollapsibleTrigger className="flex w-full justify-between py-2">
                  Profil <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 space-y-2">
                  {profilItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-1 text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* INFORMASI */}
              <Collapsible open={infoOpen} onOpenChange={setInfoOpen}>
                <CollapsibleTrigger className="flex w-full justify-between py-2">
                  Informasi <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 space-y-2">
                  {informasiItems.map((item, idx) => {
                    if ("title" in item) {
                      return (
                        <div key={idx} className="text-xs font-bold mt-2">
                          {item.title}
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-1 text-sm"
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>

              {/* MENU LAINNYA */}
              <Collapsible open={lainnyaOpen} onOpenChange={setLainnyaOpen}>
                <CollapsibleTrigger className="flex w-full justify-between py-2">
                  Menu Lainnya <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 space-y-2">
                  {lainnyaItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-1 text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <Link
                href="#"
                onClick={() => {
                  setIsOpen(false)

                  setTimeout(() => {
                    document.getElementById("kontak")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }, 200)
                }}
                className="block py-2"
              >
                Kontak
              </Link>

            </div>
          </SheetContent>
        </Sheet>

      </div>
      <div
        className={`xl:hidden border-t overflow-hidden transition-all duration-300 ${
          showSocial ? "max-h-16 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="container mx-auto flex justify-center items-center gap-6 py-2 px-4">

          <Link
            href={socialLinks.facebook}
            target="_blank"
            className="text-muted-foreground hover:text-blue-600 transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </Link>

          <Link
            href={socialLinks.youtube}
            target="_blank"
            className="text-muted-foreground hover:text-red-600 transition-colors"
          >
            <Youtube className="h-4 w-4" />
          </Link>

          <Link
            href={socialLinks.instagram}
            target="_blank"
            className="text-muted-foreground hover:text-pink-600 transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </Link>

        </div>
      </div>
    </header>
  )
}