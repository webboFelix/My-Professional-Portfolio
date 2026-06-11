"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Cyber3DInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  multiline?: boolean;
  rows?: number;
}

export function Cyber3DInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  multiline = false,
  rows = 3,
}: Cyber3DInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <label className="block mb-2 font-mono text-xs uppercase text-cyber-green tracking-widest">
        {label}
      </label>

      <motion.div
        className="relative overflow-hidden rounded-lg border border-cyber-green/30 bg-black/50 backdrop-blur-md shadow-[0_0_10px_rgba(0,255,157,0.2)]"
        whileFocus={{ boxShadow: "0 0 20px rgba(0,255,157,0.5)" }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 10px rgba(0,255,157,0.1)",
              "inset 0 0 20px rgba(0,255,157,0.3)",
              "inset 0 0 10px rgba(0,255,157,0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {multiline ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className="relative z-10 w-full bg-transparent px-4 py-3 font-mono text-sm text-cyber-green placeholder-gray-600 focus:outline-none resize-none"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="relative z-10 w-full bg-transparent px-4 py-3 font-mono text-sm text-cyber-green placeholder-gray-600 focus:outline-none"
          />
        )}

        {/* Scan line on focus */}
        <motion.div
          className="absolute inset-0 h-0.5 w-full bg-gradient-to-r from-transparent via-cyber-green to-transparent pointer-events-none"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Glow effect on focus */}
      <motion.div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-cyber-green/20 to-transparent opacity-0 group-focus-within:opacity-100 blur-md pointer-events-none transition-opacity" />
    </motion.div>
  );
}
