"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePosts } from "@/lib/hooks/usePosts";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";
import { Post3DCard } from "@/components/Effects/Post3DCard";
import { truncateToWords } from "@/lib/utils/textTruncate";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PostsPage() {
  const { posts = [], loading } = usePosts();

  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlitchEffect intensity="low">
            <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-2">
              $ cat all_posts.log
            </h1>
          </GlitchEffect>
          <p className="text-gray-400">
            Technical writeups, security research, and penetration testing
            articles
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-6xl"
        >
          <GlassCard>
            <div className="font-mono text-sm space-y-2">
              <div className="text-cyber-green">$ ls -la | wc -l</div>
              <div className="text-gray-400">
                Total Posts:{" "}
                <span className="text-cyan-400">{posts.length}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-gray-500 font-mono">
              Loading posts... [███░░░░░░]
            </div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-6xl grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post, index) => (
              <motion.div key={post.id} variants={item}>
                <Link href={`/posts/${post.slug}`}>
                  <Post3DCard index={index}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group relative h-full"
                    >
                      {/* Cover Image */}
                      {post.coverImage && (
                        <div className="w-full h-40 rounded-md overflow-hidden mb-3 border border-cyber-green/30">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="space-y-4">
                        {/* Featured badge */}
                        {post.featured && (
                          <div className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 rounded-sm border border-amber-500/50 text-xs font-mono">
                            ★ FEATURED
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-bold text-cyber-green group-hover:text-lime-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 line-clamp-3">
                          {truncateToWords(post.excerpt, 10)}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-cyber-green/20 text-cyber-green rounded-sm border border-cyber-green/30 group-hover:bg-cyber-green/30 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs text-gray-500">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="pt-3 flex items-center justify-between text-xs text-gray-500 group-hover:text-gray-400 border-t border-cyber-green/20">
                          <span className="font-mono">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                          <span className="text-cyber-green group-hover:text-lime-300 transition-colors">
                            Read →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Post3DCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && posts.length === 0 && (
          <div className="mx-auto max-w-6xl text-center py-12">
            <p className="text-gray-500 font-mono">
              No posts found. Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
