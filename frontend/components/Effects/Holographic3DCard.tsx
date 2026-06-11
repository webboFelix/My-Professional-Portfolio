"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Holographic3DCardProps {
  children: ReactNode;
  className?: string;
  variant?: "green" | "cyan" | "amber";
}

const colorMap = {
  green: {
    border: "border-cyber-green/40",
    glow: "shadow-[0_0_20px_rgba(0,255,157,0.3)]",
    bg: "bg-gradient-to-br from-cyber-green/10 to-transparent",
  },
  cyan: {
    border: "border-cyber-cyan/40",
    glow: "shadow-[0_0_20px_rgba(0,255,255,0.3)]",
    bg: "bg-gradient-to-br from-cyber-cyan/10 to-transparent",
  },
  amber: {
    border: "border-cyber-amber/40",
    glow: "shadow-[0_0_20px_rgba(255,165,0,0.3)]",
    bg: "bg-gradient-to-br from-cyber-amber/10 to-transparent",
  },
};

export function Holographic3DCard({
  children,
  className = "",
  variant = "green",
}: Holographic3DCardProps) {
  const colors = colorMap[variant];

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 5, rotateY: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative overflow-hidden rounded-lg border ${colors.border} ${colors.bg} ${colors.glow} backdrop-blur-md p-6 transition-all duration-300 ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Holographic shine effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${
            variant === "green"
              ? "rgba(0,255,157,0.2)"
              : variant === "cyan"
                ? "rgba(0,255,255,0.2)"
                : "rgba(255,165,0,0.2)"
          }`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
