"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useProjects } from "@/lib/hooks/useProjects";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";
import { Project3DCard } from "@/components/Effects/Project3DCard";
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

interface ProjectCardProps {
  project: any;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Project3DCard title={project.title} index={index}>
        <div className="space-y-4 cursor-pointer">
          {/* Image */}
          {project.coverImage && (
            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-cyan-500/30">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Badges */}
          <div className="flex gap-2 flex-wrap items-center">
            {project.featured && (
              <div className="inline-block px-2 py-1 bg-amber-500/20 text-amber-400 rounded-sm border border-amber-500/50 text-xs font-mono">
                ★ FEATURED
              </div>
            )}
            <div className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-sm border border-cyan-500/50 text-xs font-mono">
              {project.category || "Project"}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-cyan-400 hover:text-blue-300 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 hover:text-gray-300 line-clamp-3">
            {truncateToWords(project.description, 10)}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-sm border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Links */}
          <div className="pt-4 flex gap-3 border-t border-cyan-500/20">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-cyan-400 hover:text-blue-300 transition-colors font-mono"
              >
                $ github
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-cyan-400 hover:text-blue-300 transition-colors font-mono"
              >
                $ live
              </a>
            )}
            {project.createdAt && (
              <span className="ml-auto text-xs text-gray-500 font-mono">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </Project3DCard>
    </Link>
  );
}

export default function ProjectsPage() {
  const { projects = [], loading } = useProjects();
  const featured = projects.filter((p) => p.featured);

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
              $ ls /home/projects/
            </h1>
          </GlitchEffect>
          <p className="text-gray-400">
            Security-focused applications and tools
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
              <div className="text-cyber-green">
                $ find . -name "*.project" | wc -l
              </div>
              <div className="text-gray-400">
                Total projects:{" "}
                <span className="text-cyan-400">{projects.length}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {loading ? (
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-gray-500 font-mono">
              Loading projects... [███░░░░░░]
            </div>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featured.length > 0 && (
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyber-green">
                  ★ Featured Projects
                </h2>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 md:grid-cols-2"
                >
                  {featured.map((project, index) => (
                    <motion.div key={project.id} variants={item}>
                      <ProjectCard project={project} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* All Projects */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-gray-500">
                All Projects
              </h2>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project, index) => (
                  <motion.div key={project.id} variants={item}>
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}

        {!loading && projects.length === 0 && (
          <div className="mx-auto max-w-6xl text-center py-12">
            <GlassCard>
              <p className="font-mono text-sm text-gray-500">
                No projects found. Check back later.
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
