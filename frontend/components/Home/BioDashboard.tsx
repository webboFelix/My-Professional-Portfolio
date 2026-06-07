'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassCard } from '@/components/UI/GlassCard';
import { NeonButton } from '@/components/UI/NeonButton';
import {
  profile,
  aboutBullets,
  skillGroups,
  focusAreas,
  tools,
  githubStats,
} from '@/lib/profile';
import { site } from '@/lib/site';
import { fadeInUp } from '@/lib/animations';

export function BioDashboard() {
  return (
    <motion.div {...fadeInUp} className="mx-auto max-w-6xl space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-cyber-green/20 bg-gradient-to-br from-[#0a0a0c] via-cyber-panel/80 to-black p-8 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,255,157,0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-gray-500">
              <span>
                <span className="text-cyber-green">{profile.handle}</span> / README.md
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber-green" />
                {profile.statusLine}
              </span>
            </div>
            <h1 className="font-display text-4xl text-white md:text-5xl">
              {profile.name}
              <span className="text-cyber-green animate-pulse">|</span>
            </h1>
            <p className="mt-2 font-mono text-sm tracking-wider text-cyber-green">{profile.headline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">{profile.bio}</p>
            <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-gray-500">
              <a href={`mailto:${profile.email}`} className="hover:text-cyber-green">
                ✉ {profile.email}
              </a>
              {profile.phone && <span>📞 {profile.phone}</span>}
              <span>📍 {profile.location}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <NeonButton href="/dashboard">SOC Dashboard</NeonButton>
              <NeonButton href="/projects" variant="cyan">
                Projects
              </NeonButton>
              <NeonButton href="/contact" variant="outline">
                Connect
              </NeonButton>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full bg-cyber-green/20 blur-2xl" />
              <div className="relative flex h-full flex-col items-center justify-end">
                <div className="h-14 w-16 rounded-t-full bg-gradient-to-b from-gray-600 to-gray-900" />
                <div className="relative -mt-1 flex h-20 w-28 items-center justify-center rounded-lg border border-cyber-green/50 bg-black shadow-neon">
                  <span className="text-2xl">🛡️</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mini widgets row */}
        <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-cyber-green/20 bg-black/50 p-3 font-mono text-[10px]">
            <p className="text-cyber-cyan">NMAP SCAN</p>
            <p className="mt-1 text-cyber-green">22/tcp ssh · 80/tcp http · 443/tcp https</p>
          </div>
          <div className="rounded-lg border border-cyber-amber/20 bg-black/50 p-3 font-mono text-[10px]">
            <p className="text-cyber-amber">BURP SUITE</p>
            <p className="mt-1 text-gray-500">⚡ Intercept → Proxy ACTIVE</p>
          </div>
          <div className="rounded-lg border border-cyber-cyan/20 bg-black/50 p-3 font-mono text-[10px]">
            <p className="text-cyber-cyan">KALI LINUX</p>
            <p className="mt-1 italic text-gray-600">&quot;The quieter you become...&quot;</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard title="About Me" className="lg:col-span-1">
          <ul className="space-y-2 text-sm text-gray-400">
            {aboutBullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-cyber-green">▸</span>
                {b}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard title="Skills & Expertise" glow="cyan" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <p className={`mb-2 font-mono text-[10px] uppercase ${g.color.split(' ')[1]}`}>
                  {g.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className={`rounded border px-2 py-0.5 text-[10px] transition-all hover:shadow-neon ${g.color}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard title="Focus Areas">
          <ul className="grid gap-2 sm:grid-cols-2">
            {focusAreas.map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-sm text-gray-400">
                <span>{f.icon}</span>
                {f.label}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard title="GitHub Stats" glow="cyan">
          <div className="grid grid-cols-2 gap-3 font-mono text-sm">
            <p>
              Repos: <span className="text-cyber-green">{githubStats.repositories}</span>
            </p>
            <p>
              Projects: <span className="text-cyber-green">{githubStats.projects}</span>
            </p>
            <p>
              Commits: <span className="text-cyber-green">{githubStats.commits}</span>
            </p>
            <p>
              Stars: <span className="text-cyber-green">{githubStats.stars}</span>
            </p>
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Tools I Work With">
        <div className="flex flex-wrap gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-cyber-border bg-black/40 px-4 py-2 font-mono text-xs text-gray-400 transition-colors hover:border-cyber-green hover:text-cyber-green"
            >
              {t}
            </span>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Let's Connect">
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <Link href={site.github} target="_blank" className="text-gray-400 hover:text-cyber-green">
            GitHub →
          </Link>
          <Link href={site.linkedin} target="_blank" className="text-gray-400 hover:text-cyber-cyan">
            LinkedIn →
          </Link>
          <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-cyber-amber">
            Email →
          </a>
        </div>
      </GlassCard>

      <footer className="flex flex-col justify-between gap-2 border-t border-cyber-border pt-6 font-mono text-[10px] text-gray-600 sm:flex-row">
        <p>{profile.footerLeft}</p>
        <p className="text-cyber-green">{profile.footerRight}</p>
      </footer>
    </motion.div>
  );
}
