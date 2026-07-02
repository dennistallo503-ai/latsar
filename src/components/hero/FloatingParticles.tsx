"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 97) % 100}%`,
  top: `${(i * 53) % 100}%`,
  duration: 8 + (i % 5),
  delay: (i % 6) * 0.5,
  size: 2 + (i % 4),
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-40, -120],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          className="absolute rounded-full bg-cyan-400 blur-[1px]"
        />
      ))}
    </div>
  );
}