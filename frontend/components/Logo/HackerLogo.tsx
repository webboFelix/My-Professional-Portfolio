"use client";

import { motion } from "framer-motion";

export function HackerLogo() {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.3 },
    },
  };

  const rotationVariants = {
    animate: {
      rotateX: [0, 360],
      rotateY: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const glowVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const nodeVariants = {
    animate: (i: number) => ({
      y: [0, -8, 0],
      transition: {
        duration: 4,
        delay: i * 0.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const coreVariants = {
    pulse: {
      r: [4, 5.5, 4],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="cursor-pointer relative"
      style={{
        perspective: "1000px",
        filter: "drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))",
      }}
    >
      {/* Outer glow layer */}
      <motion.div
        variants={glowVariants}
        animate="pulse"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* 3D rotating container */}
      <motion.div
        variants={rotationVariants}
        animate="animate"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer hexagon frame with gradient stroke */}
          <motion.polygon
            points="18,2 34,10 34,26 18,34 2,26 2,10"
            stroke="url(#glowGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0 0 8px rgba(0, 255, 136, 0.6))",
            }}
          />

          {/* Top-left circuit line */}
          <motion.line
            x1="10"
            y1="10"
            x2="26"
            y2="26"
            stroke="#00ff9d"
            strokeWidth="1.5"
            opacity="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
              filter: "drop-shadow(0 0 4px rgba(0, 255, 136, 0.8))",
            }}
          />

          {/* Top-right circuit line */}
          <motion.line
            x1="26"
            y1="10"
            x2="10"
            y2="26"
            stroke="#00ffff"
            strokeWidth="1.5"
            opacity="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              filter: "drop-shadow(0 0 4px rgba(0, 255, 255, 0.8))",
            }}
          />

          {/* Center circle (digital core) */}
          <motion.circle
            cx="18"
            cy="18"
            r="4"
            fill="#00ff9d"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              filter: "drop-shadow(0 0 12px rgba(0, 255, 136, 1))",
            }}
          />

          {/* Pulsing core glow */}
          <motion.circle
            cx="18"
            cy="18"
            r="4"
            fill="none"
            stroke="#00ff9d"
            strokeWidth="1"
            variants={coreVariants}
            animate="pulse"
            initial={{ r: 4, opacity: 0.6 }}
            style={{
              filter: "drop-shadow(0 0 8px rgba(0, 255, 136, 0.9))",
            }}
          />

          {/* Outer pulsing ring */}
          <motion.circle
            cx="18"
            cy="18"
            r="4"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.5"
            opacity="0.4"
            initial={{ r: 4, opacity: 0 }}
            animate={{ r: 12, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
            }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 255, 255, 0.6))",
            }}
          />

          {/* Corner dots (network nodes) with floating animation */}
          <motion.circle
            cx="18"
            cy="6"
            r="1.5"
            fill="#00ffff"
            custom={0}
            variants={nodeVariants}
            animate="animate"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 255, 255, 0.9))",
            }}
          />

          <motion.circle
            cx="30"
            cy="18"
            r="1.5"
            fill="#00ff9d"
            custom={1}
            variants={nodeVariants}
            animate="animate"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 255, 136, 0.9))",
            }}
          />

          <motion.circle
            cx="18"
            cy="30"
            r="1.5"
            fill="#00ffff"
            custom={2}
            variants={nodeVariants}
            animate="animate"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 255, 255, 0.9))",
            }}
          />

          <motion.circle
            cx="6"
            cy="18"
            r="1.5"
            fill="#00ff9d"
            custom={3}
            variants={nodeVariants}
            animate="animate"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 255, 136, 0.9))",
            }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="glowGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00ff9d" stopOpacity="1" />
              <stop offset="50%" stopColor="#00ffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00ff9d" stopOpacity="1" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      </motion.div>

      {/* Inner glow layer */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 60%)",
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
}
