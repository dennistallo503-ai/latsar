"use client";

import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const particles = [
  { left: "8%", top: "20%", delay: 0 },
  { left: "18%", top: "72%", delay: 0.8 },
  { left: "28%", top: "35%", delay: 1.5 },
  { left: "42%", top: "18%", delay: 2.3 },
  { left: "50%", top: "62%", delay: 1.2 },
  { left: "64%", top: "28%", delay: 2.7 },
  { left: "76%", top: "80%", delay: 1.8 },
  { left: "84%", top: "40%", delay: 0.5 },
  { left: "92%", top: "22%", delay: 2 },
  { left: "70%", top: "56%", delay: 1 },
];

export default function Hero({
  title,
  subtitle,
  description,
}: HeroProps) {
  return (
    <section
      className="
        relative
        h-[35vh]
        min-h-[220px]
        max-h-[350px]
        overflow-hidden
        bg-[#020817]
      "
    >
      {/* Background Image */}
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
          select-none
          opacity-70
        "
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -5, 0],
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

      {/* Animated Grid */}
      <motion.div
        className="
          absolute
          inset-0
          opacity-[0.08]
          bg-[linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Radial Glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(56,189,248,.15),transparent_70%)]
        "
      />

      {/* Scanner */}
      <motion.div
        className="
          absolute
          inset-y-0
          w-40
          bg-gradient-to-r
          from-transparent
          via-cyan-400/20
          to-transparent
          blur-xl
        "
        animate={{
          x: ["-25%", "125%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-slate-950/90
          via-slate-950/60
          to-slate-950/30
        "
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle,transparent_35%,rgba(2,8,23,.9)_100%)]
        "
      />

      {/* Particles */}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-2xl"
          >
            {subtitle && (
              <motion.span
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                }}
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-sky-400
                "
              >
                {subtitle}
              </motion.span>
            )}

            <motion.h1
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="
                mt-4
                text-4xl
                font-bold
                leading-tight
                text-white
                lg:text-6xl
              "
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                }}
                className="
                  mt-4
                  max-w-xl
                  text-base
                  leading-7
                  text-slate-300
                "
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}