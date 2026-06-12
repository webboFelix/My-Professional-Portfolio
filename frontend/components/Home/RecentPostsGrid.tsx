"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePosts } from "@/lib/hooks/usePosts";
import { truncateToWords } from "@/lib/utils/textTruncate";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function RecentPostsGrid() {
  const { posts } = usePosts();
  const [showMore, setShowMore] = useState(false);

  const displayedPosts = showMore ? posts.slice(0, 20) : posts.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyber-green tracking-wider">
          $ ls -la recent_posts/
        </h2>
        <div className="text-sm text-gray-500 font-mono">
          {displayedPosts.length} files
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {displayedPosts.map((post, index) => (
          <motion.div key={post.id} variants={item}>
            <Link href={`/posts/${post.slug}`}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative h-full border border-cyber-green/30 rounded-lg p-4 bg-black/50 backdrop-blur-sm hover:border-cyber-green/60 transition-colors duration-300 cursor-pointer overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="w-full h-32 rounded-md overflow-hidden -m-4 mb-2 border border-cyber-green/30">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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

                  {/* Date */}
                  <div className="pt-2 flex items-center justify-between text-xs text-gray-500 group-hover:text-gray-400">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="text-cyber-green group-hover:text-lime-300">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Show More Button */}
      {posts.length > 10 && (
        <div className="flex justify-center pt-4">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-2 border-2 border-cyber-green text-cyber-green font-mono text-sm rounded-lg hover:bg-cyber-green/10 transition-all duration-300"
          >
            {showMore ? "[ SHOW LESS ]" : "[ SHOW MORE ]"}
          </motion.button>
        </div>
      )}
    </div>
  );
}
