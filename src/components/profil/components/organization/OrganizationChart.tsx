"use client";

import { motion } from "framer-motion";
import LeaderCard from "./LeaderCard";
import BidangColumn from "./BidangColumn";
import FunctionalGroupCard from "./FunctionalGroupCard";

interface OrganizationChartProps {

  kepalaDinas: any;

  sekretarisDinas: any;

  kasubbagProgram: any;

  kasubbagKeuangan: any;

  kepalaBidang: any[];

  jfSekretariat: any[];

  jfIKP: any[];

  jfTIK: any[];

  jfPS: any[];


  onSelect: (leader:any)=>void;

  onOpenChart: ()=>void;

}

export default function OrganizationChart({

  kepalaDinas,

  sekretarisDinas,

  kasubbagProgram,

  kasubbagKeuangan,

  kepalaBidang,

  jfSekretariat,

  jfIKP,

  jfTIK,

  jfPS,

  onSelect,

  onOpenChart,

}: OrganizationChartProps): import("react/jsx-runtime").JSX.Element {
  return (
    <section className="space-y-10">

      {/* ===================================================== */}
      {/* DESKTOP */}
      {/* ===================================================== */}

      <div className="hidden lg:block">
      
      {/* HEADER */}

      <div className="text-center">

        <h2 className="text-3xl font-bold">
          Struktur Organisasi
        </h2>

        <p className="mt-3 text-muted-foreground">
          Klik foto pejabat untuk melihat profil lengkap.
        </p>

      </div>

        <div className="relative mx-auto w-full max-w-[1700px] px-8">

          {/* ================= Kepala Dinas ================= */}

          {/* GARIS VERTIKAL UTAMA */}

          <motion.div
            initial={{ 
              scaleY: 0,
              opacity: 0
            }}

            whileInView={{ 
              scaleY: 1,
              opacity: 1
            }}

            animate={{
              boxShadow: [
                "0 0 5px #8b5cf6",
                "0 0 20px #8b5cf6",
                "0 0 5px #8b5cf6",
              ]
            }}

            viewport={{ once: true }}

            transition={{
              scaleY: {
                duration: 0.6,
                delay: 0.2,
                ease: "easeOut",
              },

              opacity: {
                duration: 0.6,
                delay: 0.2,
              },

              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}

            className="
              absolute
              left-1/2
              top-[170px]
              -translate-x-1/2
              w-0.5
              h-[1000px]
              origin-top
              bg-primary
              pointer-events-none
              z-0
            "
          />
          <div className="flex flex-col items-center">

            <div className="relative z-10">
              {kepalaDinas && (
                <LeaderCard
                  leader={kepalaDinas}
                  onClick={() => onSelect(kepalaDinas)}
                  className="w-72"
                />
              )}
            </div>

            {/* Jarak dari card */}
            <div className="h-4" />

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
                  "drop-shadow(0 0 4px hsl(var(--primary)))",
                  "drop-shadow(0 0 14px hsl(var(--primary)))",
                  "drop-shadow(0 0 4px hsl(var(--primary)))",
                ],
              }}

              transition={{
                scaleY: {
                  duration: 0.5,
                  ease: "easeOut",
                },

                opacity: {
                  duration: 0.5,
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

            {/* Garis Horizontal */}

            <motion.div
              initial={{
                scaleX: 0,
                opacity: 0,
              }}

              whileInView={{
                scaleX: 1,
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
                scaleX: {
                  duration: 0.5,
                  delay: 0.25,
                  ease: "easeInOut",
                },

                opacity: {
                  duration: 0.5,
                  delay: 0.25,
                  ease: "easeInOut",
                },

                filter: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}

              className="
                relative
                h-12
                w-[520px]
                origin-center
              "
            >

              {/* Horizontal */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-0.5
                  bg-primary
                "
              />


              {/* Cabang kiri */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-11
                  w-0.5
                  bg-primary
                "
              />


              {/* Cabang kanan */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-11
                  w-0.5
                  bg-primary
                "
              />

            </motion.div>

          </div>

          {/* ================= Baris Kedua ================= */}

          <div className="-mt-1 grid grid-cols-2 items-start">

            {/* Kelompok Jabatan Fungsional */}
            <div className="flex justify-center self-start">
              <FunctionalGroupCard

              compact

              className="w-60"

              title="Kelompok Jabatan Fungsional Sekretariat"

              members={jfSekretariat}

              />
            </div>

            {/* Sekretariat */}

            <div className="flex flex-col items-center">

              <div className="relative z-10">
                {sekretarisDinas && (
                  <LeaderCard
                    leader={sekretarisDinas}
                    onClick={() => onSelect(sekretarisDinas)}
                    className="w-72"
                  />
                )}
              </div>

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
                    duration: 0.35,
                    delay: 0.2,
                    ease: "easeInOut",
                  },

                  opacity: {
                    duration: 0.35,
                    delay: 0.2,
                    ease: "easeInOut",
                  },

                  filter: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}

                className="
                  h-15
                  w-0.5
                  origin-top
                  bg-primary
                "
              />


              {/* Garis Horizontal */}

              <motion.div
                initial={{
                  scaleX: 0,
                  opacity: 0,
                }}

                whileInView={{
                  scaleX: 1,
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
                  scaleX: {
                    duration: 0.4,
                    delay: 0.4,
                    ease: "easeInOut",
                  },

                  opacity: {
                    duration: 0.4,
                    delay: 0.4,
                    ease: "easeInOut",
                  },

                  filter: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}

                className="
                  relative
                  h-8
                  w-[300px]
                  origin-center
                "
              >

                {/* Horizontal */}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-0.5
                    bg-primary
                  "
                />


                {/* Cabang kiri */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-10
                    w-0.5
                    bg-primary
                  "
                />


                {/* Cabang kanan */}

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    h-10
                    w-0.5
                    bg-primary
                  "
                />

              </motion.div>

              {/* Kasubbag */}

              <div className="mt-2 flex justify-center gap-8 pl-10">


              <LeaderCard

                leader={kasubbagProgram}

                onClick={() =>
                  onSelect(kasubbagProgram)
                }

                className="w-56"

              />


              <LeaderCard

                leader={kasubbagKeuangan}

                onClick={() =>
                  onSelect(kasubbagKeuangan)
                }

                className="w-56"

              />


              </div>

            </div>
          </div>

          {/* GARIS KE KEPALA BIDANG */}

          <div className="relative flex justify-center">

            {/* Garis Vertikal pertama */}

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
                  duration: 0.35,
                  delay: 0.2,
                  ease: "easeInOut",
                },

                opacity: {
                  duration: 0.35,
                  delay: 0.2,
                  ease: "easeInOut",
                },

                filter: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}

              className="
                h-14
                w-0.5
                origin-top
                bg-primary
              "
            />

          </div>


          {/* Garis Horizontal + Cabang */}

          <div className="relative flex justify-center">

            <motion.div
              initial={{
                scaleX: 0,
                opacity: 0,
              }}

              whileInView={{
                scaleX: 1,
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
                scaleX: {
                  duration: 0.4,
                  delay: 0.45,
                  ease: "easeInOut",
                },

                opacity: {
                  duration: 0.4,
                  delay: 0.45,
                  ease: "easeInOut",
                },

                filter: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}

              className="
                relative
                h-12
                w-[980px]
                origin-center
              "
            >

              {/* Horizontal */}

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-0.5
                  w-[739px]
                  -translate-x-1/2
                  bg-primary
                "
              />


              {/* kiri */}

              <div
                className="
                  absolute
                  left-[120px]
                  top-0
                  h-12
                  w-0.5
                  bg-primary
                "
              />


              {/* tengah - vertikal kedua */}

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
                    duration: 0.35,
                    delay: 0.55,
                    ease: "easeInOut",
                  },

                  opacity: {
                    duration: 0.35,
                    delay: 0.55,
                    ease: "easeInOut",
                  },

                  filter: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}

                className="
                  absolute
                  left-1/2
                  top-0
                  h-12
                  w-0.5
                  -translate-x-1/2
                  origin-top
                  bg-primary
                "
              />


              {/* kanan */}

              <div
                className="
                  absolute
                  right-[120px]
                  top-0
                  h-12
                  w-0.5
                  bg-primary
                "
              />

            </motion.div>

          </div>

          {/* KEPALA BIDANG */}

          <div className="mt-0">

            <div className="grid grid-cols-3 items-start gap-14">

              {kepalaBidang.filter(Boolean).map((item) => (
                <div
                  key={item.name}
                  className="flex justify-center"
                >

                <BidangColumn

                  bidang={item}

                  jfMembers={
                    item.category === "bidang_ikp"
                      ? jfIKP
                      : item.category === "bidang_tik"
                      ? jfTIK
                      : jfPS
                  }

                  onSelect={onSelect}

                />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>



    </section>
  );
}