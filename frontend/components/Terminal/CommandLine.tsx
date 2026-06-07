'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

const COMMANDS: Record<string, string | (() => void)> = {
  help: 'Commands: help, about, skills, home, labs, projects, dashboard, logs, contact, clear',
  about: 'VAPT Engineer | Ethical Hacker | Pentester — offensive & defensive security.',
  skills: 'OWASP | VAPT | Cloud | Python | SIEM | Network Security',
  clear: () => {},
};

const ROUTES: Record<string, string> = {
  home: '/home',
  labs: '/labs',
  projects: '/projects',
  dashboard: '/dashboard',
  logs: '/logs',
  contact: '/contact',
};

export function CommandLine() {
  const [history, setHistory] = useState<string[]>(['Type "help" for available commands.']);
  const [input, setInput] = useState('');
  const router = useRouter();

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      setHistory((h) => [...h, `> ${raw}`]);

      if (cmd === 'clear') {
        setHistory([]);
        return;
      }

      if (ROUTES[cmd]) {
        router.push(ROUTES[cmd]);
        setHistory((h) => [...h, `Navigating to ${ROUTES[cmd]}...`]);
        return;
      }

      const response = COMMANDS[cmd];
      if (typeof response === 'string') {
        setHistory((h) => [...h, response]);
      } else if (response) {
        response();
      } else {
        setHistory((h) => [...h, `Unknown command: ${cmd}. Try "help".`]);
      }
    },
    [router]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    }
  };

  return (
    <div className="rounded-lg border border-cyber-green/30 bg-black/80 p-4 font-mono text-sm">
      <div className="mb-3 max-h-40 overflow-y-auto space-y-1 text-gray-400">
        {history.map((line, i) => (
          <p key={i} className={line.startsWith('>') ? 'text-cyber-cyan' : ''}>
            {line}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-cyber-border pt-3">
        <span className="text-cyber-green">guest@nexus:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent text-gray-200 outline-none"
          placeholder="enter command..."
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
