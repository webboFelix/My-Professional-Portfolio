"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loadingMarkdown, setLoadingMarkdown] = useState(false);

  useEffect(() => {
    if (post?.writeUp) {
      setLoadingMarkdown(true);
      fetch(post.writeUp)
        .then((res) => res.text())
        .then((content) => setMarkdownContent(content))
        .catch((err) => {
          console.error("Failed to load markdown:", err);
          setMarkdownContent("Failed to load content");
        })
        .finally(() => setLoadingMarkdown(false));
    } else if (post?.content) {
      // Fallback to old content field
      setMarkdownContent(post.content);
    }
  }, [post]);

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
                <p className="text-gray-400">
                  {error || "Could not load post"}
                </p>
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
                {new Date(post.date || post.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </span>
              <span>•</span>
              <span className="text-gray-400">
                {post.readTime ||
                  Math.ceil(
                    (markdownContent || "").split(" ").length / 200,
                  )}{" "}
                min read
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
            {loadingMarkdown ? (
              <GlassCard>
                <div className="text-center text-gray-500 font-mono">
                  Loading content...
                </div>
              </GlassCard>
            ) : (
              <GlassCard>
                <div className="prose prose-invert max-w-none text-gray-300">
                  <style>{`
                    .prose-invert h1, .prose-invert h2, .prose-invert h3, .prose-invert h4, .prose-invert h5, .prose-invert h6 {
                      color: #00ff88;
                      margin-top: 1.5em;
                      margin-bottom: 0.5em;
                      font-weight: 700;
                    }
                    .prose-invert p {
                      color: #e0e0e0;
                      line-height: 1.8;
                      margin-bottom: 1em;
                    }
                    .prose-invert code {
                      background: rgba(0, 0, 0, 0.3);
                      color: #00ff88;
                      padding: 2px 6px;
                      border-radius: 3px;
                      font-family: monospace;
                    }
                    .prose-invert pre {
                      background: rgba(0, 0, 0, 0.5);
                      border: 1px solid rgba(0, 255, 136, 0.2);
                      padding: 1em;
                      border-radius: 6px;
                      overflow-x: auto;
                    }
                    .prose-invert pre code {
                      background: none;
                      color: #00ff88;
                      padding: 0;
                    }
                    .prose-invert blockquote {
                      border-left: 4px solid #00ff88;
                      padding-left: 1em;
                      color: #a8dadc;
                      font-style: italic;
                    }
                    .prose-invert a {
                      color: #00ff88;
                      text-decoration: underline;
                      transition: color 0.2s;
                    }
                    .prose-invert a:hover {
                      color: #00ffaa;
                    }
                    .prose-invert ul, .prose-invert ol {
                      margin-bottom: 1em;
                    }
                    .prose-invert li {
                      margin-bottom: 0.5em;
                      color: #e0e0e0;
                    }
                  `}</style>
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
              </GlassCard>
            )}
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
