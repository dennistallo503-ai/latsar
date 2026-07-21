"use client";

import { motion } from "framer-motion";

interface CommandLineProps {
  direction?: "vertical" | "horizontal";
  length?: number;
}

export default function CommandLine({
  direction = "vertical",
  length = 100,
}: CommandLineProps) {
  if (direction === "vertical") {
    return (
    <div
        className="relative flex justify-center"
        style={{
        height: `${length}px`,
        width: "20px",
        }}
    >
        {/* Garis */}
        <div className="absolute h-full w-[3px] rounded-full bg-primary" />

        {/* Cahaya */}
        <motion.div
        className="absolute h-6 w-6 rounded-full bg-primary blur-md"
        animate={{
            y: [0, length - 24],
            opacity: [0.3, 1, 0.3],
        }}
        transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "linear",
        }}
        />
    </div>
    );
  }

  return (
    <div
      className="relative"
      style={{
        width: `${length}px`,
        height: "24px",
      }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 bg-blue-600"
        style={{
          height: "4px",
          width: "100%",
        }}
      />

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-sm"
        style={{
          width: "24px",
          height: "10px",
        }}
        animate={{
          x: [0, length - 24],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}