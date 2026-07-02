"use client";

import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
}: HeroProps) {
  return (
    <section
      className="
      relative
      isolate

      h-[40vh]
      min-h-[300px]

      sm:h-[38vh]
      sm:min-h-[320px]

      lg:h-[35vh]
      lg:min-h-[230px]
      lg:max-h-[360px]

      overflow-hidden
      bg-[#020817]
      "
    >
      {/* ========================================= */}
      {/* BACKGROUND IMAGE */}
      {/* ========================================= */}

      <motion.img
        src="/hero/peta-hero.png"
        alt=""
        draggable={false}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          opacity-75
          select-none
        "
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -6, 0],
        }}
        transition={{
          opacity: {
            duration: 1,
          },
          scale: {
            duration: 8,
            ease: "easeOut",
          },
          y: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* ========================================= */}
      {/* OVERLAY */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#020817]
          via-[#04142c]/80
          to-[#020817]/20
        "
      />

      {/* ========================================= */}
      {/* RADIAL GLOW */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(56,189,248,.15),transparent_70%)]
        "
      />

      {/* ========================================= */}
      {/* VIGNETTE */}
      {/* ========================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle,transparent_30%,rgba(2,8,23,.92)_100%)]
        "
      />

    {/* ========================================= */}
    {/* DIGITAL GRID */}
    {/* ========================================= */}

    <motion.div
    className="
        absolute
        inset-0
        opacity-[0.06]
        [background-image:
        linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),
        linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
        bg-[size:40px_40px]
    "
    animate={{
        backgroundPosition: [
        "0px 0px",
        "40px 40px",
        ],
    }}
    transition={{
        duration: 16,
        repeat: Infinity,
        ease: "linear",
    }}
    />

    {/* ========================================= */}
    {/* SCANNER */}
    {/* ========================================= */}

    <motion.div
    className="
        absolute
        inset-y-0
        -left-32
        w-40
        rotate-12
        bg-gradient-to-r
        from-transparent
        via-cyan-300/20
        to-transparent
        blur-2xl
    "
    animate={{
        x: ["0%", "160%"],
    }}
    transition={{
        duration: 9,
        repeat: Infinity,
        ease: "linear",
    }}
    />

    {/* ========================================= */}
    {/* LIGHT BEAM */}
    {/* ========================================= */}

    <motion.div
    className="
        absolute
        -top-1/2
        right-0
        h-[250%]
        w-40
        -rotate-[25deg]
        bg-gradient-to-b
        from-transparent
        via-cyan-400/10
        to-transparent
        blur-3xl
    "
    animate={{
        x: [0, 60, 0],
        opacity: [0.15, 0.35, 0.15],
    }}
    transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
    }}
    />

    {/* ========================================= */}
    {/* NETWORK PULSE */}
    {/* ========================================= */}

    {[
    { left: "29%", top: "46%" },
    { left: "38%", top: "35%" },
    { left: "47%", top: "53%" },
    { left: "58%", top: "40%" },
    { left: "69%", top: "47%" },
    { left: "78%", top: "32%" },
    ].map((item, index) => (
    <motion.div
        key={index}
        className="absolute"
        style={{
        left: item.left,
        top: item.top,
        }}
    >
        <motion.div
        className="
            absolute
            h-2
            w-2
            rounded-full
            bg-cyan-300
        "
        animate={{
            opacity: [0.5, 1, 0.5],
        }}
        transition={{
            duration: 2,
            delay: index * 0.4,
            repeat: Infinity,
        }}
        />

        <motion.div
        className="
            absolute
            -left-2
            -top-2
            h-6
            w-6
            rounded-full
            border
            border-cyan-300/40
        "
        animate={{
            scale: [0.5, 2.2],
            opacity: [0.8, 0],
        }}
        transition={{
            duration: 2.4,
            delay: index * 0.4,
            repeat: Infinity,
        }}
        />
            </motion.div>
            ))}
            <div
        className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-500/10
            blur-3xl
        "
        />
      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
            w-full
            w-fit
            max-w-md
            sm:max-w-xl
            lg:max-w-[680px]
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-5
            sm:p-6
            lg:p-8
            "
          >
            {subtitle && (
              <motion.span
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                }}
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  sm:tracking-[0.35em]
                  text-sky-400
                "
              >
                {subtitle}
              </motion.span>
            )}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.7,
              }}
              className="
                mt-3
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-6xl
                "
            >
              {title}
            </motion.h1>

            {/* Decorative Line */}

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "120px",
              }}
              transition={{
                delay: 0.45,
                duration: 0.8,
              }}
              className="
                mt-5
                h-[3px]
                rounded-full
                bg-gradient-to-r
                from-sky-400
                to-cyan-300
              "
            />

            {description && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.7,
                }}
                className="
                    mt-5
                    max-w-md
                    text-sm
                    leading-6
                    text-slate-300
                    sm:max-w-lg
                    sm:text-base
                    sm:leading-7
                    "
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Divider */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-cyan-400/40
          to-transparent
        "
      />
    </section>
  );
}