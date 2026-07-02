"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroMap() {
  return (
    <motion.div
      className="absolute inset-0 -z-0 overflow-hidden"

      animate={{
        scale: [1, 1.03, 1],
        y: [-10, 10, -10],
      }}

      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-[180px]" />

      <Image
        src="/hero/peta-hero.png"
        alt="Hero Map"
        fill
        priority
        className="
          object-cover
          opacity-60
          scale-110
          drop-shadow-[0_0_120px_rgba(0,180,255,.7)]
        "
      />
    </motion.div>
  );
}