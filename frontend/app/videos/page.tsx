"use client";

import { motion } from "framer-motion";
import { useVideos } from "@/lib/hooks/useVideos";
import { GlassCard } from "@/components/UI/GlassCard";

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

export default function VideosPage() {
  const { videos = [], loading } = useVideos();

  const groupedByCategory = videos.reduce(
    (acc, video) => {
      const category = video.category || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(video);
      return acc;
    },
    {} as Record<string, typeof videos>,
  );

  return (
    <div className="px-4 py-8 lg:px-10 lg:py-12 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-2">
          $ cat videos.mp4
        </h1>
        <p className="text-gray-400">
          Security research videos, tutorials, and walkthroughs
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
            <div className="text-cyber-green">$ ffprobe videos/ | wc -l</div>
            <div className="text-gray-400">
              Total videos:{" "}
              <span className="text-cyan-400">{videos.length}</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {loading ? (
        <div className="mx-auto max-w-6xl">
          <div className="text-center text-gray-500 font-mono">
            Loading videos... [███░░░░░░]
          </div>
        </div>
      ) : (
        <motion.div className="mx-auto max-w-6xl space-y-8">
          {Object.entries(groupedByCategory).map(
            ([category, categoryVideos]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyber-green">
                  ▶ {category}
                </h2>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {categoryVideos.map((video) => (
                    <motion.div key={video.id} variants={item}>
                      <motion.a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4 }}
                        className="group relative block h-full border border-blue-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm hover:border-blue-500/60 transition-colors duration-300"
                      >
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="relative z-10 aspect-video flex flex-col items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors p-4 space-y-2">
                          <div className="text-4xl">▶</div>
                          {video.duration && (
                            <div className="text-xs text-gray-400 font-mono">
                              {Math.floor(video.duration / 60)}:
                              {(video.duration % 60)
                                .toString()
                                .padStart(2, "0")}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-2 border-t border-blue-500/30">
                          <h3 className="text-base font-bold text-blue-400 group-hover:text-blue-300 transition-colors line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 line-clamp-2">
                            {video.description}
                          </p>
                          <div className="text-xs text-gray-500 flex justify-between items-center pt-2 border-t border-blue-500/20">
                            <span className="font-mono">
                              {new Date(video.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                            <span className="text-blue-400">Watch →</span>
                          </div>
                        </div>
                      </motion.a>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ),
          )}
        </motion.div>
      )}

      {!loading && videos.length === 0 && (
        <div className="mx-auto max-w-6xl text-center py-12">
          <p className="text-gray-500 font-mono">
            No videos found. Check back later.
          </p>
        </div>
      )}
    </div>
  );
}
