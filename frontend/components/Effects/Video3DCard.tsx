"use client";

import { motion } from "framer-motion";

interface Video3DCardProps {
  children: React.ReactNode;
  index: number;
}

export function Video3DCard({ children, index }: Video3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, z: -100, rotateY: -45 }}
      animate={{ opacity: 1, z: 0, rotateY: 0 }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      whileHover={{
        rotateX: 8,
        rotateY: -8,
        z: 30,
        scale: 1.05,
      }}
      className="relative overflow-hidden rounded-lg border border-cyber-amber/40 bg-gradient-to-br from-cyber-amber/10 to-transparent p-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,165,0,0.3)]"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Parallax depth effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-cyber-amber/5 via-transparent to-transparent pointer-events-none"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Film strip effect */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyber-amber to-transparent opacity-50" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
