"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
}

export function StaggerContainer({
  children,
  className,
}: StaggerContainerProps) {

  return (
    <motion.div

      className={className}

      initial="hidden"

      animate="visible"

      variants={{
        hidden: {},

        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}

    >
      {children}

    </motion.div>
  )
}