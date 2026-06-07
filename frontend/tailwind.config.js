/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050a0f',
          panel: '#0a1219',
          border: '#1a3a2e',
          green: '#00ff9d',
          cyan: '#00d4ff',
          magenta: '#ff00aa',
          amber: '#ffb800',
          red: '#ff3366',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'Consolas', 'monospace'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 255, 157, 0.35)',
        'neon-cyan': '0 0 20px rgba(0, 212, 255, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch-tw': 'glitch-tw 2.5s infinite',
        glitch: 'glitch-boot 2.5s steps(2) infinite',
      },
      keyframes: {
        'glitch-tw': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        'glitch-boot': {
          '0%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '50%': { transform: 'translate(1px, -1px)', filter: 'hue-rotate(90deg)' },
          '100%': { transform: 'translate(-1px, 1px)', filter: 'hue-rotate(-90deg)' },
        },
      },
    },
  },
  plugins: [],
};
