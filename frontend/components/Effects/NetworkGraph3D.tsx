'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
}

export function NetworkGraph3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let nodes: Node[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      frame++;
      ctx.fillStyle = 'rgba(5, 10, 15, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.35;
            ctx.strokeStyle = `rgba(0, 255, 157, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y - a.z * 8);
            ctx.lineTo(b.x, b.y - b.z * 8);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const size = 1.5 + n.z * 2;
        ctx.fillStyle = `rgba(0, 255, 157, ${0.4 + n.z * 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y - n.z * 8, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    const id = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden
    />
  );
}
