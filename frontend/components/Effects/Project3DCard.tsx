"use client";

import { motion } from "framer-motion";

interface Project3DCardProps {
  title: string;
  children: React.ReactNode;
  index: number;
}

export function Project3DCard({ title, children, index }: Project3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{
        rotateY: 10,
        rotateX: -5,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,255,255,0.4)",
      }}
      className="relative h-full overflow-hidden rounded-lg border border-cyber-cyan/40 bg-gradient-to-br from-cyber-cyan/10 to-transparent p-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: "inset 0 0 20px rgba(0,255,255,0.2)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 h-0.5 w-full bg-cyber-cyan/30 pointer-events-none"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
