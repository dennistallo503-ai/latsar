"use client";

import { motion } from "framer-motion";

export default function BackgroundGlow() {
  return (
    <>

      <motion.div

        animate={{
          x: [-50, 50, -50],
          y: [20, -20, 20],
        }}

        transition={{
          duration: 18,
          repeat: Infinity,
        }}

        className="absolute left-0 top-0 h-[700px] w-[700px]
        rounded-full bg-cyan-500/20 blur-[180px]"
      />

      <motion.div

        animate={{
          x: [60, -60, 60],
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
        }}

        className="absolute bottom-0 right-0 h-[700px] w-[700px]
        rounded-full bg-blue-600/20 blur-[180px]"
      />

    </>
  );
}