"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api, { listAll } from "@/lib/api";
import { Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SearchInput } from "@/components/ui/SearchInput";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import { useStats } from "@/components/providers/StatsProvider";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";

interface Lab {
  $id: string;
  title: string;
  slug: string;
  difficulty: string;
  platform: string;
  coverImage?: string;
  date: string;
  published: boolean;
}

const difficultyColor: Record<
  string,
  "success" | "warning" | "default" | "info"
> = {
  Easy: "success",
  Medium: "info",
  Hard: "warning",
  Insane: "default",
};

export default function LabsPage() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const { refresh } = useStats();
  const { target, deleting, setDeleting, open, close } =
    useDeleteConfirm<Lab>();

  const fetchLabs = async () => {
    try {
      const res = await listAll("/labs");
      setLabs(res.data);
    } catch {
      setLabs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return labs;
    return labs.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.platform.toLowerCase().includes(q),
    );
  }, [labs, search]);

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      await api.delete(`/labs/${target.$id}`);
      toast("Lab deleted");
      close();
      fetchLabs();
      refresh();
    } catch {
      toast("Failed to delete lab", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Labs"
        description="CTF and lab writeups"
        action={{ label: "New Lab", href: "/labs/new" }}
      />

      {!loading && labs.length > 0 && (
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search labs..."
          />
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : labs.length === 0 ? (
        <EmptyState
          title="No labs yet"
          description="Document your first lab walkthrough"
          actionLabel="Create Lab"
          actionHref="/labs/new"
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matches"
          description={`Nothing found for "${search}"`}
        />
      ) : (
        <div className="content-grid">
          {filtered.map((lab) => (
            <div
              key={lab.$id}
              className="group flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30"
            >
              <div className="content-card-media relative shrink-0 overflow-hidden bg-slate-800/80">
                {lab.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={lab.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500/10 via-slate-900 to-fuchsia-500/10 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Lab notes
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-white">
                      {lab.title}
                    </h2>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {lab.slug}
                    </p>
                  </div>
                  <Badge variant={lab.published ? "success" : "warning"}>
                    {lab.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                  <Badge variant={difficultyColor[lab.difficulty] || "default"}>
                    {lab.difficulty}
                  </Badge>
                  <span className="text-slate-500">{lab.platform}</span>
                </div>
                <div className="mt-auto flex justify-end gap-1 border-t border-white/10 pt-4 opacity-70 transition group-hover:opacity-100">
                  <Link
                    href={`/labs/${lab.$id}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                    aria-label={`Edit ${lab.title}`}
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => open(lab)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                    aria-label={`Delete ${lab.title}`}
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
        title="Delete lab?"
        description={`"${target?.title}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={close}
        loading={deleting}
      />
    </div>
  );
}
