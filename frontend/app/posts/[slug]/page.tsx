"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePostBySlug } from "@/lib/hooks/usePosts";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { post, loading, error } = usePostBySlug(params.slug);

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <Matrix3D />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="text-center text-gray-500 font-mono">
            Loading post... [███░░░░░░]
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="relative min-h-screen">
        <Matrix3D />
        <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <GlassCard>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-red-400">
                  ❌ Post Not Found
                </h1>
                <p className="text-gray-400">{error || "Could not load post"}</p>
                <Link
                  href="/posts"
                  className="inline-block mt-4 px-4 py-2 bg-cyber-green/20 text-cyber-green rounded border border-cyber-green/50 hover:bg-cyber-green/30 transition-colors"
                >
                  Back to Posts
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link
              href="/posts"
              className="text-sm text-cyber-green hover:text-lime-300 font-mono transition-colors"
            >
              ← Back to Posts
            </Link>
            {post.featured && (
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-sm border border-amber-500/50 text-xs font-mono">
                ★ FEATURED
              </span>
            )}
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlitchEffect intensity="medium">
              <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-4">
                {post.title}
              </h1>
            </GlitchEffect>
            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
              <span className="font-mono">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="text-gray-400">
                {Math.ceil((post.content || "").split(" ").length / 200)} min read
              </span>
            </div>
          </motion.div>

          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard>
                <div className="relative w-full h-96 rounded-lg overflow-hidden border border-cyber-green/30">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-2 bg-cyber-green/20 text-cyber-green rounded border border-cyber-green/30 hover:bg-cyber-green/30 transition-colors text-sm font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                  {post.content || post.excerpt}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-cyber-green font-mono">
                    $ Summary
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
