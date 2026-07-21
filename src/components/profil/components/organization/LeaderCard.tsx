"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface Leader {
  name: string;
  position: string;
  image: string;

  nip?: string;
  pangkat?: string;
  pendidikan?: string;
  email?: string;
  phone?: string;
  bio?: string;
}

interface LeaderCardProps {
  leader: Leader;
  onClick?: () => void;
  className?: string;
}

export default function LeaderCard({
  leader,
  onClick,
  className = "",
}: LeaderCardProps) {

  if (!leader) return null;
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className={`
        w-64
        rounded-2xl
        border
        bg-card
        p-6
        shadow-md
        transition-all
        hover:shadow-xl
        flex
        flex-col
        cursor-pointer
        ${className}
      `}
    >
      <div className="flex flex-1 flex-col items-center">

        {/* FOTO */}

        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-primary/20">

        {leader.image ? (

          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover"
            sizes="112px"
          />

        ) : (

          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-muted
              text-3xl
              font-bold
              text-muted-foreground
            "
          >
            {leader.name?.charAt(0)}
          </div>

        )}

        </div>

        {/* NAMA */}

        <h3 className="mt-5 flex min-h-[56px] items-center justify-center text-center text-lg font-bold leading-6">
          {leader.name}
        </h3>

        {/* JABATAN */}

        <p className="mt-2 flex min-h-[60px] items-center justify-center text-center text-sm leading-6 text-muted-foreground whitespace-pre-line">
          {leader.position}
        </p>

      </div>
    </motion.div>
  );
}