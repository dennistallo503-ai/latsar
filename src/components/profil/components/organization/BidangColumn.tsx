"use client";

import { motion } from "framer-motion";
import LeaderCard from "./LeaderCard";
import FunctionalGroupCard from "./FunctionalGroupCard";

interface Props {
  bidang: any;
  jfMembers: any[];
  onSelect: (leader: any) => void;
}

export default function BidangColumn({
  bidang,
  jfMembers,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-col items-center">

      <LeaderCard
        leader={bidang}
        onClick={() => onSelect(bidang)}
        className="w-60"
      />

      {/* Garis Vertikal */}
      <motion.div
        initial={{
          scaleY: 0,
          opacity: 0,
        }}

        whileInView={{
          scaleY: 1,
          opacity: 1,
        }}

        viewport={{
          once: true,
        }}

        animate={{
          filter: [
            "drop-shadow(0 0 4px #8b5cf6)",
            "drop-shadow(0 0 14px #8b5cf6)",
            "drop-shadow(0 0 4px #8b5cf6)",
          ],
        }}

        transition={{
          scaleY: {
            duration: 0.4,
            ease: "easeInOut",
          },

          opacity: {
            duration: 0.4,
            ease: "easeInOut",
          },

          filter: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}

        className="
          h-8
          w-0.5
          origin-top
          bg-primary
        "
      />

      <FunctionalGroupCard

        title={
          bidang.category === "bidang_ikp"
            ? "Kelompok JF IKP"
            : bidang.category === "bidang_tik"
            ? "Kelompok JF TIK"
            : "Kelompok JF PS"
        }

        className="w-60"

        members={jfMembers}

      />

    </div>
  );
}