"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SlideRightProps {
  children: ReactNode
  delay?: number
  once?: boolean
  className?: string
}

export function SlideRight({
  children,
  delay = 0,
  once = false,
  className,
}: SlideRightProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: 60,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}