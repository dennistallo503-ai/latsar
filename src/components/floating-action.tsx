"use client"

import { useEffect, useState } from "react"
import { ChevronUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface FloatingActionProps {
  phoneNumber: string
  message?: string
}

export function FloatingAction({
  phoneNumber,
  message = "Halo Admin Kominfo, saya ingin mendapatkan informasi.",
}: FloatingActionProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`

  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -5, 0],
          bottom: visible ? 96 : 24,
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
          bottom: {
            duration: 0.3,
            ease: "easeInOut",
          },
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="
          fixed
          right-6
          z-50
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_8px_24px_rgba(37,211,102,.25)]
          hover:bg-[#20bd5a]
          transition-all
          duration-300
          "
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30" />

        <MessageCircle className="h-5 w-5" />
      </motion.a>

      {/* Scroll To Top */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              delay: 0.15,
            }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="
              h-12
              w-12
              rounded-full

              border

              backdrop-blur-md

              text-white

              shadow-[0_8px_24px_rgba(0,0,0,.2)]
              hover:scale-105

              transition-all
              duration-300
              "
              aria-label="Scroll ke atas"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}