'use client';

import { motion } from 'framer-motion';
import { profile, skillGroups, tools, aboutBullets } from '@/lib/profile';

function FloatingWidget({
  title,
  children,
  className,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`pointer-events-none absolute rounded-lg border border-cyber-green/25 bg-[#0a0a0c]/90 p-3 font-mono text-[10px] shadow-[0_0_40px_rgba(0,255,157,0.08)] backdrop-blur-sm ${className}`}
      style={{ transform: 'translateZ(20px)' }}
    >
      <p className="mb-2 text-cyber-cyan">{title}</p>
      {children}
    </motion.div>
  );
}

export function GateDashboardBackdrop({ dimmed = false }: { dimmed?: boolean }) {
  const opacity = dimmed ? 'opacity-[0.35]' : 'opacity-100';
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0c] ${opacity}`}>
      {/* World map dots */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,255,157,0.8) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 45%, black, transparent)',
        }}
      />

      <div className="absolute inset-0 grid-bg opacity-[0.15]" />

      {/* Top status bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-cyber-green/10 px-6 py-3 opacity-40">
        <p className="font-mono text-[10px] text-gray-500">
          <span className="text-cyber-green">{profile.handle}</span> / README.md
        </p>
        <p className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber-green" />
          {profile.statusLine}
        </p>
      </div>

      {/* Hero bio — blurred behind challenge */}
      <div className="absolute inset-x-0 top-16 flex justify-center px-4 opacity-[0.22] blur-[1px]">
        <div className="max-w-4xl text-center">
          <h1 className="font-display text-4xl text-white md:text-5xl">
            {profile.name}
            <span className="animate-pulse text-cyber-green">|</span>
          </h1>
          <p className="mt-2 font-mono text-xs tracking-widest text-cyber-green md:text-sm">
            {profile.headline}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">{profile.bio}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 font-mono text-[10px] text-gray-500">
            <span>✉ {profile.email}</span>
            {profile.phone && <span>📞 {profile.phone}</span>}
            <span>📍 {profile.location}</span>
          </div>
        </div>
      </div>

      {/* Static silhouette — hidden when 3D scene is active */}
      {!dimmed && (
        <motion.div
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative h-48 w-48 md:h-64 md:w-64">
            <div className="absolute inset-0 rounded-full bg-cyber-green/10 blur-3xl" />
            <div className="flex h-full flex-col items-center justify-end">
              <div className="h-16 w-20 rounded-t-full bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg" />
              <div className="relative -mt-2 h-24 w-32 rounded-lg border border-cyber-green/30 bg-black/80">
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded border border-cyber-green bg-cyber-green/20 text-lg">
                  🛡️
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <FloatingWidget
        title="BURP SUITE"
        className={`right-[4%] top-[26%] hidden w-40 md:block ${dimmed ? 'opacity-60' : ''}`}
        delay={0.35}
      >
        <p className="text-cyber-amber">⚡ Intercept → Proxy</p>
        <p className="mt-1 text-gray-600">ACTIVE</p>
      </FloatingWidget>

      {!dimmed && (
        <FloatingWidget
          title="KALI LINUX"
          className="right-[8%] top-[52%] hidden w-48 md:block"
          delay={0.5}
        >
          <p className="text-2xl">🐉</p>
          <p className="mt-1 italic text-gray-500">
            &quot;The quieter you become, the more you are able to hear.&quot;
          </p>
        </FloatingWidget>
      )}

      <FloatingWidget
        title="ABOUT_ME"
        className="left-[3%] bottom-[22%] hidden max-w-[200px] lg:block"
        delay={0.4}
      >
        <ul className="list-inside list-disc space-y-1 text-gray-600">
          {aboutBullets.slice(0, 3).map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </FloatingWidget>

      {/* Skill panels — sides */}
      <div className="absolute bottom-[12%] left-[2%] right-[2%] hidden gap-2 opacity-25 lg:flex">
        {skillGroups.slice(0, 4).map((g) => (
          <div
            key={g.title}
            className={`flex-1 rounded border bg-black/60 p-2 ${g.color.split(' ')[0]}`}
          >
            <p className={`font-mono text-[9px] ${g.color.split(' ')[1]}`}>{g.title}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {g.skills.map((s) => (
                <span key={s} className="rounded bg-white/5 px-1 text-[8px] text-gray-500">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tools row */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-center gap-3 px-4 opacity-20">
        {tools.map((t) => (
          <span
            key={t}
            className="rounded border border-cyber-border px-3 py-1 font-mono text-[9px] text-gray-500"
          >
            {t}
          </span>
        ))}
      </div>

      {!dimmed && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0c_72%)]" />
      )}
    </div>
  );
}
