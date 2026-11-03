"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/UI/MarkdownRenderer";
import { useLabById } from "@/lib/hooks/useLabs";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";
import { RelativeTime } from "@/components/UI/RelativeTime";

const difficultyColors: Record<string, { bg: string; text: string }> = {
  easy: { bg: "bg-green-500/20", text: "text-green-400" },
  medium: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  hard: { bg: "bg-red-500/20", text: "text-red-400" },
  insane: { bg: "bg-purple-500/20", text: "text-purple-400" },
};

export default function LabDetailPage({ params }: { params: { id: string } }) {
  const { lab, loading, error } = useLabById(params.id);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loadingMarkdown, setLoadingMarkdown] = useState(false);

  useEffect(() => {
    if (lab?.published && lab.writeUp) {
      setLoadingMarkdown(true);
      fetch(lab.writeUp)
        .then((res) => res.text())
        .then((content) => setMarkdownContent(content))
        .catch((err) => {
          console.error("Failed to load markdown:", err);
          setMarkdownContent("Failed to load content");
        })
        .finally(() => setLoadingMarkdown(false));
    } else {
      setMarkdownContent("");
      setLoadingMarkdown(false);
    }
  }, [lab]);

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <Matrix3D />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="text-center text-gray-500 font-mono">
            Loading lab... [███░░░░░░]
          </div>
        </div>
      </div>
    );
  }

  if (error || !lab) {
    return (
      <div className="relative min-h-screen">
        <Matrix3D />
        <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <GlassCard>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-red-400">
                  ❌ Lab Not Found
                </h1>
                <p className="text-gray-400">{error || "Could not load lab"}</p>
                <Link
                  href="/labs"
                  className="inline-block mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors"
                >
                  Back to Labs
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  const difficulty = lab.difficulty?.toLowerCase() || "medium";
  const colors = difficultyColors[difficulty] || difficultyColors.medium;

  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/labs"
              className="text-sm text-cyan-400 hover:text-blue-300 font-mono transition-colors"
            >
              ← Back to Labs
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlitchEffect intensity="medium">
              <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-4">
                {lab.title}
              </h1>
            </GlitchEffect>
            <p className="text-gray-400 mb-4">{lab.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
              <span
                className={`px-2 py-1 ${colors.bg} ${colors.text} rounded-sm border font-mono uppercase`}
              >
                {lab.difficulty}
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-sm border border-blue-500/30 font-mono">
                {lab.category}
              </span>
              {lab.status && (
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-sm border border-cyan-500/30 font-mono text-xs">
                  {lab.status}
                </span>
              )}
              <span className="font-mono">
                <RelativeTime date={lab.createdAt} />
              </span>
            </div>
          </motion.div>

          {/* Cover Image */}
          {lab.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard>
                <div className="relative w-full h-96 rounded-lg overflow-hidden border border-white/30">
                  <img
                    src={lab.coverImage}
                    alt={lab.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Tools */}
          {lab.tools && lab.tools.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard>
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-cyber-green font-mono">
                    $ Tools & Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {lab.tools.map((tool: string) => (
                      <span
                        key={tool}
                        className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors text-sm font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Lab URL */}
          {lab.url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard>
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-cyber-green font-mono">
                    $ Access Lab
                  </h2>
                  <a
                    href={lab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-lime-500/20 text-lime-400 rounded border border-lime-500/50 hover:bg-lime-500/30 transition-colors font-mono text-sm"
                  >
                    → Start Lab
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Write-up Content */}
          {(markdownContent || !lab.published) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {!lab.published ? (
                <GlassCard>
                  <div className="space-y-3 text-center">
                    <h2 className="text-lg font-bold text-amber-400 font-mono">
                      Write-up unavailable
                    </h2>
                    <p className="text-gray-400">
                      This write-up is not published yet. It will be available
                      after the expiration period.
                    </p>
                  </div>
                </GlassCard>
              ) : loadingMarkdown ? (
                <GlassCard>
                  <div className="text-center text-gray-500 font-mono">
                    Loading content...
                  </div>
                </GlassCard>
              ) : (
                <GlassCard>
                  <MarkdownRenderer content={markdownContent} />
                </GlassCard>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
