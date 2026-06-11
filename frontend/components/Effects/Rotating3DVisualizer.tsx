"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface Rotating3DVisualizerProps {
  data: DataPoint[];
  title: string;
}

export function Rotating3DVisualizer({
  data,
  title,
}: Rotating3DVisualizerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const radius = 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="font-mono text-sm font-bold text-cyber-green tracking-wider">
        {title}
      </h3>

      {/* 3D rotating container */}
      <motion.div
        className="relative w-64 h-64"
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Wireframe sphere */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 300 300">
            {/* Latitude lines */}
            {[...Array(5)].map((_, i) => (
              <circle
                key={`lat-${i}`}
                cx="150"
                cy="150"
                r={150 - i * 30}
                fill="none"
                stroke="rgba(0,255,157,0.1)"
                strokeWidth="1"
              />
            ))}
            {/* Longitude lines */}
            {[...Array(12)].map((_, i) => (
              <line
                key={`lon-${i}`}
                x1="150"
                y1="0"
                x2="150"
                y2="300"
                stroke="rgba(0,255,157,0.1)"
                strokeWidth="1"
                transform={`rotate(${(i * 360) / 12} 150 150)`}
              />
            ))}
          </svg>
        </div>

        {/* Data points on sphere */}
        {data.map((point, index) => {
          const angle = (index / data.length) * Math.PI * 2;
          const heightFactor = Math.sin((index / data.length) * Math.PI);
          const scale = point.value / maxValue;

          return (
            <motion.div
              key={`point-${index}`}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                width: "100%",
                height: "100%",
              }}
              animate={{
                rotateZ: angle * (180 / Math.PI),
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
              }}
            >
              <motion.div
                className="absolute origin-center"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius * scale}px)`,
                  top: `calc(50% + ${heightFactor * radius * scale}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: point.color,
                    boxShadow: `0 0 10px ${point.color}`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                />
                <div className="absolute whitespace-nowrap text-[10px] text-gray-400 font-mono mt-2 -ml-6">
                  {point.label}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Data list */}
      <div className="w-full space-y-2 mt-4">
        {data.map((point) => (
          <div key={point.label} className="flex items-center gap-3 text-xs">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: point.color,
                boxShadow: `0 0 5px ${point.color}`,
              }}
            />
            <span className="text-gray-400">{point.label}</span>
            <span
              className="font-mono font-bold ml-auto"
              style={{ color: point.color }}
            >
              {point.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
