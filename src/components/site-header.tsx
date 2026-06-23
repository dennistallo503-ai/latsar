"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b">
      <div className="flex w-full items-center gap-2 px-4 py-3 lg:px-6">

        {/* Sidebar toggle */}
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="mx-2 h-4"
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Dark mode only */}
        <ModeToggle />

      </div>
    </header>
  )
}