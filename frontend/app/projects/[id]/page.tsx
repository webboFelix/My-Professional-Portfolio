"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useProjectById } from "@/lib/hooks/useProjects";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { project, loading, error } = useProjectById(params.id);

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <Matrix3D />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="text-center text-gray-500 font-mono">
            Loading project... [███░░░░░░]
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="relative min-h-screen">
        <Matrix3D />
        <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <GlassCard>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-red-400">
                  ❌ Project Not Found
                </h1>
                <p className="text-gray-400">
                  {error || "Could not load project"}
                </p>
                <Link
                  href="/projects"
                  className="inline-block mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors"
                >
                  Back to Projects
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
              href="/projects"
              className="text-sm text-cyan-400 hover:text-blue-300 font-mono transition-colors"
            >
              ← Back to Projects
            </Link>
            {project.featured && (
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
              <h1 className="text-4xl font-bold text-cyan-400 tracking-wider mb-4">
                {project.title}
              </h1>
            </GlitchEffect>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-mono">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-sm border border-cyan-500/50 font-mono">
                {project.category}
              </span>
            </div>
          </motion.div>

          {/* Cover Image */}
          {project.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard>
                <div className="relative w-full h-96 rounded-lg overflow-hidden border border-cyan-500/30">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard>
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-cyber-green font-mono">
                    $ Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard>
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-cyber-green font-mono">
                  $ Links
                </h2>
                <div className="flex flex-col gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors font-mono text-sm"
                    >
                      → GitHub Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-lime-500/20 text-lime-400 rounded border border-lime-500/50 hover:bg-lime-500/30 transition-colors font-mono text-sm"
                    >
                      → Live Demo
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
