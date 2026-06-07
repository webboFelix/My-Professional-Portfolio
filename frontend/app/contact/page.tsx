'use client';

import { useState, FormEvent } from 'react';
import { GlassCard } from '@/components/UI/GlassCard';
import { NeonButton } from '@/components/UI/NeonButton';
import { site, githubLabel, linkedinLabel } from '@/lib/site';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
          website: fd.get('website'),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error((data as { error?: string }).error || 'Failed to send message');
      }

      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg((err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 p-4 lg:p-8">
      <header>
        <p className="font-mono text-xs text-cyber-cyan">SECURE_CHANNEL</p>
        <h1 className="font-display text-3xl text-white">Contact {site.name}</h1>
        <p className="text-sm text-gray-500">
          Messages are stored securely and emailed when Resend is configured on the API.
        </p>
      </header>

      <GlassCard title="transmit_message">
        {status === 'success' ? (
          <p className="font-mono text-cyber-green">
            [OK] Transmission received. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="relative space-y-4">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />
            <div>
              <label className="font-mono text-[10px] uppercase text-gray-500">Identity</label>
              <input
                required
                name="name"
                disabled={status === 'loading'}
                className="mt-1 w-full rounded border border-cyber-border bg-black/50 px-3 py-2 text-sm outline-none focus:border-cyber-green disabled:opacity-50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase text-gray-500">Email</label>
              <input
                required
                type="email"
                name="email"
                disabled={status === 'loading'}
                className="mt-1 w-full rounded border border-cyber-border bg-black/50 px-3 py-2 text-sm outline-none focus:border-cyber-green disabled:opacity-50"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase text-gray-500">Payload</label>
              <textarea
                required
                name="message"
                rows={5}
                disabled={status === 'loading'}
                className="mt-1 w-full rounded border border-cyber-border bg-black/50 px-3 py-2 text-sm outline-none focus:border-cyber-green disabled:opacity-50"
                placeholder="Your message..."
              />
            </div>
            {status === 'error' && (
              <p className="font-mono text-sm text-cyber-red">[ERR] {errorMsg}</p>
            )}
            <NeonButton type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Transmitting...' : 'Transmit'}
            </NeonButton>
          </form>
        )}
      </GlassCard>

      <div className="grid gap-4 font-mono text-sm">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-cyber-green transition-colors"
        >
          <span className="text-cyber-green">GitHub:</span> {githubLabel()}
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-cyber-cyan transition-colors"
        >
          <span className="text-cyber-cyan">LinkedIn:</span> {linkedinLabel()}
        </a>
        {site.email && (
          <a href={`mailto:${site.email}`} className="text-gray-500 hover:text-cyber-amber">
            <span className="text-cyber-amber">Email:</span> {site.email}
          </a>
        )}
      </div>
    </div>
  );
}
