"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface Project {
  $id: string;
  title: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
  technologies: string[];
  date: string;
  featured: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id: string) => {
    if (confirm("Delete this project?")) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Showcase your development work"
        action={{ label: "New Project", href: "/projects/new" }}
      />

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to the portfolio"
          actionLabel="Create Project"
          actionHref="/projects/new"
        />
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.$id}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-white">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <Badge variant="info">Featured</Badge>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-3 text-xs text-gray-600">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-cyan-400"
                      >
                        <ExternalLink size={12} /> GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-cyan-400"
                      >
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 opacity-60 transition group-hover:opacity-100">
                  <Link
                    href={`/projects/${project.$id}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => deleteProject(project.$id)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
