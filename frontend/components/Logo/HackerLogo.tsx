"use client";

import { motion } from "framer-motion";

export function HackerLogo() {
  return (
    <motion.svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Outer hexagon frame */}
      <motion.polygon
        points="18,2 34,10 34,26 18,34 2,26 2,10"
        stroke="url(#glowGradient)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Center circuit lines (X pattern) */}
      <motion.line
        x1="10"
        y1="10"
        x2="26"
        y2="26"
        stroke="#00ff9d"
        strokeWidth="1.5"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.line
        x1="26"
        y1="10"
        x2="10"
        y2="26"
        stroke="#00ffff"
        strokeWidth="1.5"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Center circle (digital core) */}
      <motion.circle
        cx="18"
        cy="18"
        r="4"
        fill="#00ff9d"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      {/* Pulsing glow effect */}
      <motion.circle
        cx="18"
        cy="18"
        r="4"
        fill="none"
        stroke="#00ff9d"
        strokeWidth="1"
        initial={{ r: 4, opacity: 0.8 }}
        animate={{ r: 8, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Corner dots (network nodes) */}
      <motion.circle
        cx="18"
        cy="6"
        r="1.5"
        fill="#00ffff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      <motion.circle
        cx="30"
        cy="18"
        r="1.5"
        fill="#00ff9d"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
      <motion.circle
        cx="18"
        cy="30"
        r="1.5"
        fill="#00ffff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="6"
        cy="18"
        r="1.5"
        fill="#00ff9d"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
