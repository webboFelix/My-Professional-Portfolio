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
  const [timerKey, setTimerKey] = useState(0);

  const recentPosts = posts.slice(0, 10);
  const recentPostsLength = recentPosts.length;
  const currentPost = recentPosts[currentIndex];

  useEffect(() => {
    if (!currentPost) return;

    const lines: TerminalLine[] = [
      { id: "1", text: "$ cat recent_activity.log", delay: 0 },
      {
        id: "2",
        text: `[${new Date(currentPost.publishedAt).toLocaleString()}] Loaded: ${currentPost.title}`,
        delay: 0.5,
      },
      {
        id: "3",
        text: `✓ Tags: ${currentPost.tags?.join(", ") || "N/A"}`,
        delay: 1.1,
      },
      { id: "4", text: "$ _", delay: 1.6 },
    ];

    setTerminalLines(lines);
  }, [currentIndex, posts]);

  useEffect(() => {
    if (recentPostsLength === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentPostsLength);
    }, 12000); // Auto-rotate every 12 seconds

    return () => clearInterval(timer);
  }, [timerKey, recentPostsLength]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + recentPosts.length) % recentPosts.length,
    );
    setTimerKey((k) => k + 1); // Reset timer
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recentPosts.length);
    setTimerKey((k) => k + 1); // Reset timer
  };

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
          webbo@pentester ~ [recent_posts]
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm space-y-2">
        <AnimatePresence>
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
            onClick={handlePrev}
            className="px-3 py-1 border border-cyber-green text-cyber-green font-mono text-xs hover:bg-cyber-green/10 rounded-sm transition-colors"
          >
            ◀ PREV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
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
        className="p-6 bg-cyber-green/5 border-t border-cyber-green/30 space-y-4"
      >
        {/* Image Display */}
        {currentPost.coverImage && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-cyber-green/30">
            <img
              src={currentPost.coverImage}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-cyber-green mb-2">
            {currentPost.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {currentPost.excerpt}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
