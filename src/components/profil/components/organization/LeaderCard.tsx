"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leader } from "./types";

interface LeaderCardProps {
  leader: Leader;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function LeaderCard({
  leader,
  size = "md",
  onClick,
}: LeaderCardProps) {
  const imageSize = {
    sm: "h-20 w-20",
    md: "h-28 w-28",
    lg: "h-40 w-40",
  };

  const cardWidth = {
    sm: "max-w-[220px]",
    md: "max-w-[260px]",
    lg: "max-w-sm",
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`group cursor-pointer rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-xl w-full ${cardWidth[size]}`}
    >
      <div
        className={`relative mx-auto overflow-hidden rounded-full border-4 border-primary/20 ${imageSize[size]}`}
      >
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-5 text-center">

        <h3 className="font-bold">
          {leader.name}
        </h3>

        <p className="mt-2 text-sm text-primary">
          {leader.position}
        </p>

      </div>
    </motion.div>
  );
}