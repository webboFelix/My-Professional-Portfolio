"use client";

import { motion } from "framer-motion";
import { AutoTypingTerminal } from "@/components/About/AutoTypingTerminal";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl"
        >
          <GlitchEffect intensity="low">
            <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-2">
              About Me
            </h1>
          </GlitchEffect>
          <p className="text-gray-400">
            Cybersecurity Professional & Security Researcher
          </p>
        </motion.div>

        {/* Auto-Typing Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <AutoTypingTerminal />
        </motion.div>

        {/* Sections */}
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard title="Education" glow="green">
              <div className="space-y-4">
                <div>
                  <h3 className="text-cyber-green font-bold">
                    BSc Applied Physics & Computer Science
                  </h3>
                  <p className="text-sm text-gray-400">
                    Multimedia University of Kenya · 2021-2025
                  </p>
                  <p className="text-sm text-cyber-green mt-1">
                    First Class Honor
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard title="Certifications" glow="cyan">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-cyber-green">✓</span>
                  <span>
                    Cloud and Network Security Analyst (Cyber Shujaa · Apr 2026)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyber-green">✓</span>
                  <span>Ethical Hacker (Cisco · Apr 2026)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyber-green">✓</span>
                  <span>
                    Fortinet Certified Associate in Cybersecurity (Apr 2026)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyber-green">✓</span>
                  <span>Cybersecurity (IBM Skillbuild · Jun 2025)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyber-green">✓</span>
                  <span>Networking Basics (Cisco · Apr 2025)</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto max-w-6xl"
        >
          <GlassCard title="Technical Arsenal">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-cyber-green font-bold mb-3">
                  Security Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Kali Linux",
                    "Burp Suite",
                    "Nmap",
                    "Wireshark",
                    "Metasploit",
                    "Hashcat",
                    "Proxychains",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-xs bg-cyber-green/20 text-cyber-green rounded-sm border border-cyber-green/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-cyber-green font-bold mb-3">
                  Platforms & Services
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AWS",
                    "Azure",
                    "Docker",
                    "Linux",
                    "Windows Server",
                    "Active Directory",
                    "SIEM",
                  ].map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-sm border border-cyan-500/30"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-6xl"
        >
          <GlassCard title="Interests & Hobbies">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-cyber-green font-bold mb-2">Research</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• APT Detection & Analysis</li>
                  <li>• Active Directory Security</li>
                  <li>• Malware Analysis</li>
                </ul>
              </div>
              <div>
                <p className="text-cyber-green font-bold mb-2">Learning</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Networking Labs</li>
                  <li>• Tech Podcasts</li>
                  <li>• Security Webinars</li>
                </ul>
              </div>
              <div>
                <p className="text-cyber-green font-bold mb-2">Community</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• CTF Competitions</li>
                  <li>• Technical Writeups</li>
                  <li>• Bug Bounty Programs</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
