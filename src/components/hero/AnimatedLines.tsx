"use client";

import { motion } from "framer-motion";

export default function AnimatedLines() {

  return (

    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
    >

      <defs>

        <linearGradient id="line">

          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />

          <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />

          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />

        </linearGradient>

      </defs>

      <motion.path

        d="M780 540 Q950 400 1130 270"

        stroke="url(#line)"

        strokeWidth="2"

        fill="none"

        strokeDasharray="12 12"

        animate={{
          strokeDashoffset: [-100, 0],
        }}

        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}

      />

      <motion.path

        d="M760 520 Q700 360 520 290"

        stroke="url(#line)"

        strokeWidth="2"

        fill="none"

        strokeDasharray="12 12"

        animate={{
          strokeDashoffset: [-120, 0],
        }}

        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}

      />

      <motion.path

        d="M760 520 Q900 560 1020 470"

        stroke="url(#line)"

        strokeWidth="2"

        fill="none"

        strokeDasharray="12 12"

        animate={{
          strokeDashoffset: [-140, 0],
        }}

        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}

      />

    </svg>

  );

}