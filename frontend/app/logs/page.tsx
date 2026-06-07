'use client';

import { useEffect, useState, useRef } from 'react';
import { GlassCard } from '@/components/UI/GlassCard';
import type { LogEntry } from '@/lib/api';
import { cn } from '@/lib/utils';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const levelStyle: Record<string, string> = {
  INFO: 'text-cyber-green',
  WARN: 'text-cyber-amber',
  CRITICAL: 'text-cyber-red',
  ERROR: 'text-cyber-red',
};

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [paused, setPaused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API}/api/logs?limit=80`);
      if (res.ok) setLogs(await res.json());
    } catch {
      /* offline */
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(() => {
      if (!paused) fetchLogs();
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (!paused) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, paused]);

  const simulate = async () => {
    try {
      const res = await fetch(`${API}/api/logs/simulate`, { method: 'POST' });
      if (res.status === 401) {
        alert('Log injection requires admin API key (use the admin panel).');
        return;
      }
      if (res.ok) fetchLogs();
    } catch {
      /* offline */
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 lg:p-8">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-cyber-cyan">SIEM_STREAM</p>
          <h1 className="font-display text-3xl text-white">Live Security Logs</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            className="rounded border border-cyber-border px-4 py-2 font-mono text-xs text-cyber-green hover:bg-cyber-green/10"
          >
            {paused ? 'RESUME' : 'PAUSE'}
          </button>
          <button
            type="button"
            onClick={simulate}
            className="rounded border border-cyber-cyan/50 px-4 py-2 font-mono text-xs text-cyber-cyan hover:bg-cyber-cyan/10"
          >
            INJECT EVENT
          </button>
        </div>
      </header>

      <GlassCard className="flex flex-1 flex-col overflow-hidden !p-0" title="soc@live-feed">
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {logs.length === 0 ? (
            <p className="text-gray-500">Waiting for log stream... (start backend on :4000)</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="mb-1 flex flex-wrap gap-2 border-b border-cyber-border/30 py-1">
                <span className="text-gray-600">{log.timestamp}</span>
                <span className={cn('w-16', levelStyle[log.level] || 'text-gray-400')}>
                  [{log.level}]
                </span>
                <span className="text-cyber-cyan">{log.source}</span>
                <span className="text-gray-300">{log.message}</span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </GlassCard>
    </div>
  );
}
