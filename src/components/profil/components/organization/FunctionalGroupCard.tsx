"use client";

import { motion } from "framer-motion";

interface FunctionalMember {

  id: string;

  name: string;

  position?: string;

  category?: string;

}


interface FunctionalGroupCardProps {

  title?: string;

  members: FunctionalMember[];

  className?: string;

  compact?: boolean;

}

export default function FunctionalGroupCard({
  title = "Kelompok Jabatan Fungsional",
  members,
  className = "w-60",
  compact = false,
}: FunctionalGroupCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        ${className}
        rounded-2xl
        border
        bg-card
        shadow-md
        hover:shadow-xl
        transition-all
        overflow-hidden
      `}
    >
      {/* Header */}
      <div
        className={`
          border-b
          bg-muted/60
          px-4
          ${compact ? "py-2" : "py-3"}
        `}
      >
        <h3 className="text-center font-semibold text-sm">
          {title}
        </h3>
      </div>

      {/* Isi */}
      <div className={compact ? "p-3" : "p-4"}>
        <ul className={compact ? "space-y-1" : "space-y-2"}>
          {members.map((member) => (
            <li
              key={member.id}
              className={`
                flex items-center gap-2 rounded-md px-2
                ${
                  compact
                    ? "py-1"
                    : "py-1.5"
                }
                hover:bg-muted/50
                transition-colors
              `}
            >
              <span className="h-2 w-2 rounded-full bg-primary shrink-0" />

              <span
                className={`
                  text-sm
                  ${
                    compact
                      ? "leading-4"
                      : "leading-5"
                  }
                `}
              >
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}