"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchEffectProps {
  children: ReactNode;
  intensity?: "low" | "medium" | "high";
}

export function GlitchEffect({
  children,
  intensity = "medium",
}: GlitchEffectProps) {
  const glitchAnimation = {
    low: {
      x: [0, -1, 1, -1, 0],
      y: [0, -0.5, 0.5, -0.5, 0],
      opacity: [1, 0.95, 1, 0.95, 1],
    },
    medium: {
      x: [0, -2, 2, -2, 1, -1, 0],
      y: [0, -1, 1, -1, 0.5, -0.5, 0],
      opacity: [1, 0.9, 1, 0.9, 1, 0.95, 1],
    },
    high: {
      x: [0, -3, 3, -3, 2, -2, 1, -1, 0],
      y: [0, -2, 2, -2, 1, -1, 0.5, -0.5, 0],
      opacity: [1, 0.85, 1, 0.85, 1, 0.9, 1, 0.95, 1],
    },
  };

  return (
    <motion.div
      animate={glitchAnimation[intensity]}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2,
        type: "spring",
        stiffness: 100,
      }}
      className="relative"
    >
      {/* Original text */}
      <div className="relative z-10">{children}</div>

      {/* Glitch layers */}
      <motion.div
        className="absolute inset-0 text-red-500/50 opacity-0 z-0"
        animate={{
          opacity: [0, 0.3, 0],
          x: [0, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2.5,
        }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 text-cyan-500/50 opacity-0 z-0"
        animate={{
          opacity: [0, 0.3, 0],
          x: [0, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2.2,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
