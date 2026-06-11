"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { motion } from "framer-motion";

const nav = [
  { href: "/home", label: "Home", icon: "⌂" },
  { href: "/dashboard", label: "SOC Dashboard", icon: "◈" },
  { href: "/projects", label: "Projects", icon: "▣" },
  { href: "/labs", label: "Labs", icon: "⚗" },
  { href: "/videos", label: "Videos", icon: "▶" },
  { href: "/logs", label: "Live Logs", icon: "▤" },
  { href: "/contact", label: "Contact", icon: "✉" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sidebar-expanded");
    if (saved !== null) {
      setExpanded(JSON.parse(saved));
    }
  }, []);

  const handleToggle = () => {
    const newState = !expanded;
    setExpanded(newState);
    localStorage.setItem("sidebar-expanded", JSON.stringify(newState));
  };

  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ width: 224 }}
      animate={{ width: expanded ? 224 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden lg:flex flex-col border-r border-cyber-border bg-cyber-panel/50 backdrop-blur-sm relative group"
    >
      {/* Header */}
      <div className="border-b border-cyber-border p-4">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-display text-xs tracking-[0.3em] text-cyber-cyan">
              CYBER_OPS
            </p>
            <p className="font-mono text-lg text-cyber-green cyber-glow-text">
              {site.brand}
            </p>
          </motion.div>
        )}
        {!expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="font-mono text-xs text-cyber-green cyber-glow-text">
              OPS
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <motion.div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2.5 font-mono text-sm transition-all justify-center lg:justify-start",
                  expanded ? "w-full" : "w-14",
                  active
                    ? "bg-cyber-green/15 text-cyber-green border-l-2 border-cyber-green"
                    : "text-gray-400 hover:bg-white/5 hover:text-cyber-cyan",
                )}
                title={!expanded ? item.label : undefined}
              >
                <span className="text-lg opacity-70 flex-shrink-0">
                  {item.icon}
                </span>
                {expanded && <span className="truncate">{item.label}</span>}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className="border-t border-cyber-border p-3 font-mono text-[10px] text-gray-500">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>
              STATUS: <span className="text-cyber-green">SECURE</span>
            </p>
            <p className="mt-1">NODE: {site.handle}</p>
          </motion.div>
        )}
        {!expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-cyber-green">●</p>
          </motion.div>
        )}
      </div>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className="absolute -right-3 top-6 z-50 bg-cyber-green/80 hover:bg-cyber-green text-black rounded-full p-1.5 transition-colors opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <motion.span
          animate={{ rotate: expanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          ◀
        </motion.span>
      </motion.button>
    </motion.aside>
  );
}
