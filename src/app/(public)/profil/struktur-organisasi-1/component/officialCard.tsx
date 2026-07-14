"use client"

import Image from "next/image"
import { Camera } from "lucide-react"

type OfficialCardProps = {
  name: string
  position: string
  photo: string
  onClick?: () => void
}

export function OfficialCard({
  name,
  position,
  photo,
  onClick,
}: OfficialCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">

      {/* FOTO */}

      <div
        onClick={onClick}
        className="relative aspect-[3/4] cursor-zoom-in overflow-hidden bg-muted"
      >
        <Image
          src={photo || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

        {/* Zoom Icon */}

        <div className="absolute right-3 top-3 rounded-full bg-background/90 p-2 opacity-0 shadow transition-all group-hover:opacity-100">

          <Camera className="h-4 w-4" />

        </div>
      </div>

      {/* CONTENT */}

      <div className="space-y-3 p-6">

        <div className="flex justify-center">

          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">

            {position}

          </span>

        </div>

        <h3 className="text-center text-lg font-bold leading-snug">

          {name || "-"}

        </h3>

      </div>

    </div>
  )
}