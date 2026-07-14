"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedNumberProps {
  value: number
  duration?: number
}

export function AnimatedNumber({
  value,
  duration = 1.5,
}: AnimatedNumberProps) {

  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
  })

  const [count, setCount] = useState(0)


  useEffect(() => {

    if (!isInView) {
      setCount(0)
      return
    }

    let start = 0

    const increment = value / (duration * 60)

    const timer = setInterval(() => {

      start += increment

      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }

    }, 1000 / 60)


    return () => clearInterval(timer)

  }, [isInView, value, duration])


  return (
    <motion.span ref={ref}>
      {count.toLocaleString("id-ID")}
    </motion.span>
  )
}