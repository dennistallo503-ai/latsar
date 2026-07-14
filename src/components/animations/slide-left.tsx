"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SlideLeftProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export function SlideLeft({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: SlideLeftProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}