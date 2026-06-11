"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Lab3DCubeProps {
  difficulty: "easy" | "medium" | "hard" | "insane";
  children: ReactNode;
  index: number;
}

const difficultyConfig = {
  easy: {
    color: "border-green-500",
    glow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    bg: "from-green-500/10",
  },
  medium: {
    color: "border-yellow-500",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.4)]",
    bg: "from-yellow-500/10",
  },
  hard: {
    color: "border-red-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
    bg: "from-red-500/10",
  },
  insane: {
    color: "border-purple-500",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    bg: "from-purple-500/10",
  },
};

export function Lab3DCube({ difficulty, children, index }: Lab3DCubeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={{
        rotateX: 10,
        rotateY: -10,
        rotateZ: 5,
        scale: 1.08,
      }}
      className={`relative overflow-hidden rounded-lg border ${config.color} bg-gradient-to-br ${config.bg} to-transparent p-6 backdrop-blur-md ${config.glow} transition-all`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D cube effect with multiple faces */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: [
            `inset 0 0 20px ${difficulty === "easy" ? "rgba(34,197,94,0.2)" : difficulty === "medium" ? "rgba(234,179,8,0.2)" : difficulty === "hard" ? "rgba(239,68,68,0.2)" : "rgba(168,85,247,0.2)"}`,
            `inset 0 0 40px ${difficulty === "easy" ? "rgba(34,197,94,0.4)" : difficulty === "medium" ? "rgba(234,179,8,0.4)" : difficulty === "hard" ? "rgba(239,68,68,0.4)" : "rgba(168,85,247,0.4)"}`,
            `inset 0 0 20px ${difficulty === "easy" ? "rgba(34,197,94,0.2)" : difficulty === "medium" ? "rgba(234,179,8,0.2)" : difficulty === "hard" ? "rgba(239,68,68,0.2)" : "rgba(168,85,247,0.2)"}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
