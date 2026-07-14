"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedModalProps {
  open: boolean
  children: ReactNode
}

export function AnimatedModal({
  open,
  children,
}: AnimatedModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{
              opacity: 0,
              scale: .9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .9,
              y: 30,
            }}
            transition={{
              duration: .25,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}