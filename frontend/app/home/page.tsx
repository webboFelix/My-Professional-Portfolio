"use client";

import { motion } from "framer-motion";
import { CommandLine } from "@/components/Terminal/CommandLine";
import { GlassCard } from "@/components/UI/GlassCard";
import { BioDashboard } from "@/components/Home/BioDashboard";
import { TerminalCarousel } from "@/components/Home/TerminalCarousel";
import { RecentPostsGrid } from "@/components/Home/RecentPostsGrid";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { CyberSecurityStats } from "@/components/Home/CyberSecurityStats";
import { CERTIFICATIONS, TIMELINE } from "@/lib/api";
import { getAccessMode } from "@/lib/access";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    setMode(getAccessMode());
  }, []);

  return (
    <>
      <Matrix3D />
      <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12">
        {mode === "guest" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-lg border border-dashed border-cyber-amber/50 bg-cyber-amber/5 px-4 py-2 font-mono text-xs text-cyber-amber"
          >
            Welcome Dear Guest, let's <code>Connect!</code>
            <a href="/contact" className="ml-1 text-cyber-amber/80 underline">
              Contact Me
            </a>
          </motion.div>
        )}

        {mode === "operative" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 font-mono text-xs text-cyber-green"
          >
            ✓ OPERATIVE CLEARANCE ACTIVE
          </motion.p>
        )}

        <BioDashboard />

        {/* Cybersecurity Metrics */}
        <div className="mt-12 mb-12">
          <CyberSecurityStats />
        </div>

        {/* Terminal Carousel Section */}
        <div className="mx-auto mt-10 max-w-6xl">
          <h2 className="mb-4 text-2xl font-bold text-cyber-green tracking-wider">
            $ cat recent_activity.log
          </h2>
          <TerminalCarousel />
        </div>

        {/* Recent Posts Grid */}
        <div className="mx-auto mt-12 max-w-6xl">
          <RecentPostsGrid />
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2">
          <GlassCard title="Interactive Terminal">
            <CommandLine />
          </GlassCard>
          <GlassCard title="Certifications" glow="cyan">
            <ul className="space-y-3">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c.name}
                  className="flex justify-between font-mono text-sm"
                >
                  <span className="text-cyber-cyan">{c.name}</span>
                  <span className="text-gray-500">
                    {c.status} · {c.year}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <a
                href="https://drive.google.com/drive/folders/1jF6q5K-4_kPe7Z76yrtoQiQ-zeZZpAAf?usp=sharing"
                className="inline-block rounded-md border border-cyber-cyan px-4 py-2 text-sm text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
              >
                View All Certifications
              </a>
            </div>
          </GlassCard>
        </div>

        <div className="mx-auto mt-6 max-w-6xl">
          <GlassCard title="Timeline">
            <div className="relative border-l border-cyber-green/30 pl-6">
              {TIMELINE.map((t) => (
                <div key={t.year} className="relative mb-6 last:mb-0">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-cyber-green bg-cyber-bg" />
                  <p className="font-display text-cyber-green">{t.year}</p>
                  <p className="text-sm text-gray-400">{t.event}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
