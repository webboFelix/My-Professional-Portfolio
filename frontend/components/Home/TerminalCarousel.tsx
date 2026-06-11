"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePosts } from "@/lib/hooks/usePosts";
import { type Post } from "@/lib/api";

interface TerminalLine {
  id: string;
  text: string;
  delay: number;
}

export function TerminalCarousel() {
  const { posts } = usePosts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);

  const recentPosts = posts.slice(0, 10);
  const currentPost = recentPosts[currentIndex];

  useEffect(() => {
    if (!currentPost) return;

    const lines: TerminalLine[] = [
      { id: "1", text: "$ whoami", delay: 0 },
      {
        id: "2",
        text: `connected_to@${currentPost.title.replace(/\s+/g, "_")}`,
        delay: 0.3,
      },
      { id: "3", text: "$ cat recent_activity.log", delay: 0.8 },
      {
        id: "4",
        text: `[${new Date(currentPost.publishedAt).toLocaleString()}] Loaded: ${currentPost.title}`,
        delay: 1.2,
      },
      {
        id: "5",
        text: `✓ Tags: ${currentPost.tags?.join(", ") || "N/A"}`,
        delay: 1.8,
      },
      { id: "6", text: "$ _", delay: 2.3 },
    ];

    setTerminalLines(lines);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentPosts.length);
    }, 8000); // Auto-rotate every 8 seconds

    return () => clearInterval(timer);
  }, [currentPost, recentPosts]);

  if (!currentPost || recentPosts.length === 0) {
    return (
      <div className="border border-cyber-green/50 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
        <div className="font-mono text-cyber-green text-sm">
          Loading recent activity...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-cyber-green/50 rounded-lg overflow-hidden bg-black/70 backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 bg-cyber-green/10 px-4 py-2 border-b border-cyber-green/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-cyber-green" />
        </div>
        <span className="font-mono text-xs text-cyber-green ml-2">
          user@portfolio ~ [recent_posts]
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm space-y-2">
        <AnimatePresence mode="wait">
          {terminalLines.map((line) => (
            <motion.div
              key={`${currentIndex}-${line.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: line.delay }}
              className="text-cyber-green"
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-cyber-green/30 bg-black/50">
        <div className="font-mono text-xs text-gray-500">
          {currentIndex + 1} / {recentPosts.length}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + recentPosts.length) % recentPosts.length,
              )
            }
            className="px-3 py-1 border border-cyber-green text-cyber-green font-mono text-xs hover:bg-cyber-green/10 rounded-sm transition-colors"
          >
            ◀ PREV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % recentPosts.length)
            }
            className="px-3 py-1 border border-cyber-green text-cyber-green font-mono text-xs hover:bg-cyber-green/10 rounded-sm transition-colors"
          >
            NEXT ▶
          </motion.button>
        </div>
      </div>

      {/* Post Preview */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-6 bg-cyber-green/5 border-t border-cyber-green/30"
      >
        <h3 className="text-lg font-bold text-cyber-green mb-2">
          {currentPost.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {currentPost.excerpt}
        </p>
      </motion.div>
    </motion.div>
  );
}
