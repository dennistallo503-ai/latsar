"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StaggerItemProps {
  children: ReactNode
  className?: string
  delay?: number
}


export function StaggerItem({
  children,
  className,
  delay = 0,
}: StaggerItemProps) {

  return (

    <motion.div

      className={className}

      variants={{
        hidden:{
          opacity:0,
          scale:0.95,
          y:20,
        },

        visible:{
          opacity:1,
          scale:1,
          y:0,

          transition:{
            duration:0.5,
            delay,
            ease:[0.22,1,0.36,1],
          },
        },
      }}

    >

      {children}

    </motion.div>

  )
}