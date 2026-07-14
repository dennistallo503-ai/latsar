"use client"

import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (value) => Math.round(value))

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
    })

    return () => controls.stop()
  }, [count, duration, to])

  return (
    <motion.span className={className}>
      {rounded}
    </motion.span>
  )
}