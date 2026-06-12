"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "GitHub", href: "https://github.com/webboFelix" },
    { label: "LinkedIn", href: "https://linkedin.com/in/webbofelix" },
    { label: "Email", href: "mailto:felixwebbo.fw@gmail.com" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Posts", href: "/posts" },
    { label: "Projects", href: "/projects" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ];

  return (
    <footer className="relative border-t border-cyber-green/20 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-10">
        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 mb-8">
          {/* Branding Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-cyber-green tracking-widest">
              FELIX
            </h3>
            <p className="text-sm text-gray-400">
              Cybersecurity Analyst | Penetration Tester | Security Researcher
            </p>
            <p className="text-xs text-gray-500 font-mono">
              $ sudo execute_portfolio.sh
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-mono uppercase text-cyber-green tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyber-green transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-mono uppercase text-cyber-green tracking-widest">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-green transition-colors"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-mono uppercase text-cyber-green tracking-widest">
              Status
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-400">System Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-gray-400">Accepting Work</span>
              </div>
              <div className="text-gray-500 font-mono">v1.0.0</div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent mb-8 origin-left"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500"
        >
          {/* Copyright */}
          <div className="font-mono">
            <span className="text-cyber-green">$</span> © {currentYear} Felix
            Webbo. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyber-green transition-colors text-xs"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Terminal Status */}
          <div className="font-mono text-xs text-gray-600">
            Terminal: <span className="text-cyan-500">connected</span>
          </div>
        </motion.div>

        {/* Bottom Border Animation */}
        <motion.div
          className="mt-8 h-0.5 w-full bg-gradient-to-r from-cyber-green via-cyan-500 to-transparent"
          animate={{
            backgroundPosition: ["0% center", "100% center"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </footer>
  );
}
