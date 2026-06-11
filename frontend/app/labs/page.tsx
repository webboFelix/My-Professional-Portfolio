"use client";

import { motion } from "framer-motion";
import { useLabs } from "@/lib/hooks/useLabs";
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

const difficultyColors: Record<string, string> = {
  easy: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-400 border-red-500/30",
  insane: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function LabsPage() {
  const { labs = [], loading } = useLabs();

  const groupedByCategory = labs.reduce(
    (acc, lab) => {
      const category = lab.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(lab);
      return acc;
    },
    {} as Record<string, typeof labs>,
  );

  return (
    <div className="px-4 py-8 lg:px-10 lg:py-12 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-2">
          $ ls -la /home/labs/
        </h1>
        <p className="text-gray-400">
          Cybersecurity lab exercises and challenges
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
            <div className="text-cyber-green">$ find . -type f | wc -l</div>
            <div className="text-gray-400">
              Total labs: <span className="text-cyan-400">{labs.length}</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {loading ? (
        <div className="mx-auto max-w-6xl">
          <div className="text-center text-gray-500 font-mono">
            Loading labs... [███░░░░░░]
          </div>
        </div>
      ) : (
        <motion.div className="mx-auto max-w-6xl space-y-8">
          {Object.entries(groupedByCategory).map(([category, categoryLabs]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyber-green">
                ⚗ {category}
              </h2>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 md:grid-cols-2"
              >
                {categoryLabs.map((lab) => (
                  <motion.div key={lab.id} variants={item}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group relative h-full border border-purple-500/30 rounded-lg p-5 bg-black/50 backdrop-blur-sm hover:border-purple-500/60 transition-colors duration-300 overflow-hidden"
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10 space-y-3">
                        {/* Badges */}
                        <div className="flex gap-2 flex-wrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-sm border font-mono ${
                              difficultyColors[
                                lab.difficulty?.toLowerCase() || "medium"
                              ] ||
                              "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }`}
                          >
                            {lab.difficulty || "Medium"}
                          </span>
                          {lab.status && (
                            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-sm border border-blue-500/30 font-mono">
                              {lab.status}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-purple-400 group-hover:text-violet-300 transition-colors">
                          {lab.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 line-clamp-2">
                          {lab.description}
                        </p>

                        {/* Tools */}
                        {lab.tools && lab.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {lab.tools.slice(0, 4).map((tool) => (
                              <span
                                key={tool}
                                className="px-1.5 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-sm border border-purple-500/30 font-mono"
                              >
                                {tool}
                              </span>
                            ))}
                            {lab.tools.length > 4 && (
                              <span className="px-1.5 py-0.5 text-xs text-gray-500">
                                +{lab.tools.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        {lab.url && (
                          <div className="pt-3 border-t border-purple-500/20 flex justify-between items-center">
                            <a
                              href={lab.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-purple-400 hover:text-violet-300 transition-colors font-mono"
                            >
                              $ start_lab →
                            </a>
                            {lab.createdAt && (
                              <span className="text-xs text-gray-500 font-mono">
                                {new Date(lab.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                  },
                                )}
                              </span>
                            )}
                          </div>
                        )}
                        {!lab.url && lab.createdAt && (
                          <div className="pt-3 border-t border-purple-500/20 flex justify-end">
                            <span className="text-xs text-gray-500 font-mono">
                              {new Date(lab.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                },
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && labs.length === 0 && (
        <div className="mx-auto max-w-6xl text-center py-12">
          <p className="text-gray-500 font-mono">
            No labs found. Check back later.
          </p>
        </div>
      )}
    </div>
  );
}
