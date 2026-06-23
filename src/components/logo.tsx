import * as React from "react"
import Image from "next/image"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      {...props}
    >
      <Image
        src="/logo/komin-logo-kecil-super.svg"
        alt="Logo"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  )
}