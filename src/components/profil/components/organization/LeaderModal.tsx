"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  GraduationCap,
  BadgeCheck,
  User,
} from "lucide-react";

import { Leader } from "./types";

interface LeaderModalProps {
  leader: Leader | null;
  onClose: () => void;
}

export default function LeaderModal({
  leader,
  onClose,
}: LeaderModalProps) {
  return (
    <AnimatePresence>

      {leader && (

        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            initial={{
              scale: .85,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: .9,
              opacity: 0,
            }}
            transition={{
              duration: .25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-2xl"
          >

            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full bg-muted p-2 transition hover:bg-primary hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-[280px_1fr]">

              {/* FOTO */}

              <div className="flex items-center justify-center bg-muted p-8">

                <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-primary/20">

                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />

                </div>

              </div>

              {/* BIODATA */}

              <div className="p-8">

                <h2 className="text-3xl font-bold">
                  {leader.name}
                </h2>

                <p className="mt-2 text-lg font-medium text-primary">
                  {leader.position}
                </p>

                <div className="mt-8 space-y-5">

                  <InfoRow
                    icon={<BadgeCheck className="h-5 w-5 text-primary" />}
                    label="NIP"
                    value={leader.nip}
                  />

                  <InfoRow
                    icon={<User className="h-5 w-5 text-primary" />}
                    label="Pangkat"
                    value={leader.pangkat}
                  />

                  <InfoRow
                    icon={<GraduationCap className="h-5 w-5 text-primary" />}
                    label="Pendidikan"
                    value={leader.pendidikan}
                  />

                  <InfoRow
                    icon={<Mail className="h-5 w-5 text-primary" />}
                    label="Email"
                    value={leader.email}
                  />

                  <InfoRow
                    icon={<Phone className="h-5 w-5 text-primary" />}
                    label="Nomor Telepon"
                    value={leader.phone}
                  />

                </div>

              </div>

            </div>

            <div className="border-t p-8">

              <h3 className="mb-3 text-xl font-semibold">
                Profil Singkat
              </h3>

              <p className="leading-8 text-muted-foreground">
                {leader.bio}
              </p>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex gap-3">

      <div className="mt-1">
        {icon}
      </div>

      <div>

        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p>
          {value}
        </p>

      </div>

    </div>
  );
}