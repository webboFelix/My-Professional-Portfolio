"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api, { listAll } from "@/lib/api";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SearchInput } from "@/components/ui/SearchInput";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import { useStats } from "@/components/providers/StatsProvider";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";

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
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const { refresh } = useStats();
  const { target, deleting, setDeleting, open, close } =
    useDeleteConfirm<Project>();

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

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)),
    );
  }, [projects, search]);

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      await api.delete(`/projects/${target.$id}`);
      toast("Project deleted");
      close();
      fetchProjects();
      refresh();
    } catch {
      toast("Failed to delete project", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Showcase your development work"
        action={{ label: "New Project", href: "/projects/new" }}
      />

      {!loading && projects.length > 0 && (
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search projects..."
          />
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to the portfolio"
          actionLabel="Create Project"
          actionHref="/projects/new"
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matches" description={`Nothing found for "${search}"`} />
      ) : (
        <div className="grid gap-4">
          {filtered.map((project) => (
            <div
              key={project.$id}
              className="group rounded-xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
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
                <div className="flex shrink-0 gap-1 opacity-60 transition group-hover:opacity-100">
                  <Link
                    href={`/projects/${project.$id}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => open(project)}
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

      <ConfirmDialog
        open={!!target}
        title="Delete project?"
        description={`"${target?.title}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={close}
        loading={deleting}
      />
    </div>
  );
}
