'use client';

import { useMemo, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard3D } from '@/components/Effects/TiltCard3D';
import { pickRandomChallenge, verifyChallenge, categoryLabel } from '@/lib/challenges';
import { grantGuestAccess, grantOperativeAccess } from '@/lib/access';
import { site } from '@/lib/site';
import { profile } from '@/lib/profile';

export function OperativeGate() {
  const router = useRouter();
  const challenge = useMemo(() => pickRandomChallenge(), []);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);

  const onVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 400));

    if (verifyChallenge(challenge, answer)) {
      setSuccess(true);
      grantOperativeAccess();
      setTimeout(() => router.push('/home'), 800);
    } else {
      setShake(true);
      setError('ACCESS DENIED — invalid solution');
      setTimeout(() => setShake(false), 500);
    }
    setVerifying(false);
  };

  const onGuest = () => {
    grantGuestAccess();
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <TiltCard3D className="w-full max-w-lg">
        <motion.div
          animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          className="overflow-hidden rounded-2xl border border-cyber-green/40 bg-gradient-to-b from-cyber-panel/95 to-black shadow-neon"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="border-b border-cyber-border bg-cyber-green/5 px-6 py-3 text-center">
            <p className="font-mono text-[10px] tracking-[0.4em] text-cyber-cyan">OPERATIVE PROFILE</p>
          </div>

          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyber-green bg-black text-3xl shadow-[0_0_30px_rgba(0,255,157,0.3)]">
              🛡️
            </div>
            <h2 className="font-display text-2xl text-cyber-green cyber-glow-text">{profile.name}</h2>
            <p className="font-mono text-xs text-cyber-cyan">@{site.handle}</p>
            <p className="mt-2 text-[10px] uppercase tracking-wider text-gray-400">{profile.headline}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 font-mono text-[10px]">
              <span className="rounded border border-cyber-green/40 px-2 py-1 text-cyber-green">
                CLEARANCE LVL {site.clearance}
              </span>
              <span className="rounded border border-cyber-cyan/40 px-2 py-1 text-cyber-cyan">
                STATUS: LOCKED
              </span>
            </div>
          </div>

          <div className="border-t border-cyber-red/40 bg-cyber-red/5 px-4 py-2 text-center font-mono text-[10px] text-cyber-red">
            LOCKED_CONTENT: ACCESS DENIED
          </div>
        </motion.div>
      </TiltCard3D>

      <TiltCard3D className="mt-8 w-full max-w-2xl" intensity={8}>
        <form
          onSubmit={onVerify}
          className="rounded-2xl border border-cyber-green/30 bg-black/80 p-6 backdrop-blur-xl"
        >
          <p className="font-mono text-xs text-cyber-cyan">
            [CHALLENGE] <span className="text-cyber-amber">{categoryLabel(challenge.category)}</span>
          </p>
          <p className="mt-2 font-mono text-sm text-gray-200">{challenge.prompt}</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="ENTER_SOLUTION..."
              disabled={success || verifying}
              className="flex-1 rounded-xl border border-cyber-border bg-black/60 px-4 py-3 font-mono text-sm text-cyber-green outline-none transition-all focus:border-cyber-green focus:shadow-neon disabled:opacity-50"
              autoComplete="off"
              spellCheck={false}
            />
            <motion.button
              type="submit"
              disabled={success || verifying}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,255,157,0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-cyber-green px-10 py-3 font-mono text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-cyber-green/90 disabled:opacity-50"
            >
              {verifying ? '...' : success ? 'GRANTED' : 'VERIFY'}
            </motion.button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 font-mono text-xs text-cyber-red"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </TiltCard3D>

      <motion.button
        type="button"
        onClick={onGuest}
        whileHover={{
          scale: 1.02,
          borderColor: 'rgba(255,51,102,0.8)',
          boxShadow: '0 0 24px rgba(255,51,102,0.25)',
        }}
        className="mt-8 w-full max-w-2xl rounded-xl border border-dashed border-cyber-red/50 bg-cyber-red/5 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-cyber-red transition-colors hover:bg-cyber-red/10"
      >
        [ EMERGENCY_OVERRIDE (GUEST) ]
      </motion.button>

      <p className="mt-4 font-mono text-[10px] text-gray-600">
        Challenge rotates on every refresh · Networking · Cloud · Pentest tools
      </p>
    </div>
  );
}
