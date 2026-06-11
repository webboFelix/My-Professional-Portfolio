"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { motion } from "framer-motion";
import { useSound } from "@/lib/hooks/useSound";

const links = [
  { href: "/home", label: "Home", icon: "⌂" },
  { href: "/about", label: "About", icon: "◆" },
  { href: "/posts", label: "Posts", icon: "✍" },
  { href: "/projects", label: "Projects", icon: "⚙" },
  { href: "/labs", label: "Labs", icon: "⚗" },
  { href: "/cheatsheet", label: "Cheatsheet", icon: "⚡" },
  { href: "/contact", label: "Contact", icon: "✉" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { playSound } = useSound();

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border bg-gradient-to-r from-cyber-bg/95 to-black/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo with glow effect */}
        <Link
          href="/home"
          onClick={() => playSound("navigate", 0.4)}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-lg tracking-widest text-cyber-green drop-shadow-lg"
            style={{
              textShadow: "0 0 20px rgba(0, 255, 136, 0.6)",
            }}
          >
            {site.brand}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-2 md:flex">
          {links.map((link) => (
            <motion.div
              key={link.href}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                onClick={() => playSound("navigate", 0.3)}
                className={cn(
                  "relative px-4 py-2 font-mono text-sm transition-all duration-300",
                  pathname === link.href
                    ? "text-cyber-green drop-shadow-lg"
                    : "text-gray-400 hover:text-cyber-green/80",
                )}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-cyber-green to-transparent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          onClick={() => {
            playSound("click", 0.3);
            setOpen(!open);
          }}
          className="md:hidden font-mono text-cyber-green hover:text-cyan-400 transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label="Menu"
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {open ? "[×]" : "[≡]"}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-cyber-border bg-black/80 backdrop-blur-md md:hidden"
        >
          <div className="px-4 py-4 space-y-2">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => {
                    playSound("navigate", 0.3);
                    setOpen(false);
                  }}
                  className={cn(
                    "block py-3 px-4 font-mono text-sm rounded-sm border border-transparent transition-all duration-300",
                    pathname === link.href
                      ? "text-cyber-green bg-cyber-green/10 border-cyber-green"
                      : "text-gray-400 hover:text-cyber-green hover:border-cyber-green",
                  )}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
