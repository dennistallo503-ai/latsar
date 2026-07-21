"use client"

import { useEffect, useState } from "react"
import {
  ChevronUp,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"


interface FloatingActionProps {
  phoneNumber: string
  message?: string

  facebookUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
}


export function FloatingAction({
  phoneNumber,

  message = 
  "Halo Admin Kominfo, saya ingin mendapatkan informasi.",

  facebookUrl = "https://www.facebook.com/share/1CtruBivmg/",

  instagramUrl = "https://www.instagram.com/diskominfo_tts?igsh=cGxqbzljNDBkcGpi",

  youtubeUrl = "https://youtube.com/@diskominfokabtts8341?si=N1_ruEEKsJma88dZ",

}: FloatingActionProps) {


  const [visible, setVisible] = useState(false)



  useEffect(() => {

    const handleScroll = () => {

      setVisible(
        window.scrollY > 300
      )

    }


    window.addEventListener(
      "scroll",
      handleScroll
    )


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )


  }, [])



  const scrollToTop = () => {

    window.scrollTo({
      top:0,
      behavior:"smooth",
    })

  }



  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`



  return (

    <div
      className="
      fixed
      bottom-6
      right-6
      z-50
      flex
      flex-col
      items-center
      gap-4
      "
    >








      {/* WHATSAPP */}

      <FloatingButton
        href={whatsappUrl}
        icon={
          <MessageCircle
            className="h-5 w-5"
          />
        }

        color="
        bg-[#25D366]
        hover:bg-[#20bd5a]
        "

        label="WhatsApp"
      />





      {/* FACEBOOK */}

      <FloatingButton

        href={facebookUrl}

        icon={
          <Facebook
            className="h-5 w-5"
          />
        }

        color="
        bg-[#1877F2]
        hover:bg-[#0d65d9]
        "

        label="Facebook"

      />





      {/* INSTAGRAM */}

      <FloatingButton

        href={instagramUrl}

        icon={
          <Instagram
            className="h-5 w-5"
          />
        }

        color="
        bg-gradient-to-tr
        from-yellow-400
        via-pink-500
        to-purple-600
        "

        label="Instagram"

      />





      {/* YOUTUBE */}

      <FloatingButton

        href={youtubeUrl}

        icon={
          <Youtube
            className="h-5 w-5"
          />
        }

        color="
        bg-red-600
        hover:bg-red-700
        "

        label="Youtube"

      />

      {/* BACK TO TOP */}

      <AnimatePresence>

      {visible && (

        <motion.div

          initial={{
            opacity:0,
            scale:0.8,
            y:20
          }}

          animate={{
            opacity:1,
            scale:1,
            y:0
          }}

          exit={{
            opacity:0,
            scale:0.8,
            y:20
          }}

          transition={{
            duration:0.25
          }}

        >

          <Button

            onClick={scrollToTop}

            size="icon"

            className="
            h-12
            w-12
            rounded-full
            shadow-lg
            backdrop-blur-md
            transition-all
            hover:scale-105
            "

          >

            <ChevronUp
              className="
              h-5
              w-5
              "
            />

          </Button>


        </motion.div>

      )}

      </AnimatePresence>

    </div>

  )

}





interface FloatingButtonProps {

  href:string

  icon:React.ReactNode

  color:string

  label:string

}



function FloatingButton({

href,
icon,
color,
label,

}:FloatingButtonProps){


return (

<motion.a

href={href}

target="_blank"

rel="noopener noreferrer"


initial={{
 opacity:0,
 scale:0.8
}}


animate={{

 opacity:1,

 scale:1,

 y:[
 0,
 -5,
 0
 ]

}}


transition={{

 opacity:{
 duration:0.4
},

 scale:{
 duration:0.4
},

 y:{
 duration:2.5,
 repeat:Infinity,
 ease:"easeInOut"
}

}}


whileHover={{
 scale:1.08
}}


whileTap={{
 scale:0.95
}}


aria-label={label}


className={`
h-12
w-12
rounded-full
flex
items-center
justify-center
text-white
shadow-lg
transition-all
duration-300
${color}
`}


>


{label==="WhatsApp" && (

<span
className="
absolute
inset-0
rounded-full
animate-ping
bg-[#25D366]/30
"
/>

)}


{icon}


</motion.a>


)

}