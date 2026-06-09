"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api, { listAll } from "@/lib/api";
import { Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface Lab {
  $id: string;
  title: string;
  slug: string;
  difficulty: string;
  platform: string;
  date: string;
  published: boolean;
}

const difficultyColor: Record<string, "success" | "warning" | "default" | "info"> = {
  Easy: "success",
  Medium: "info",
  Hard: "warning",
  Insane: "default",
};

export default function LabsPage() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

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

  const deleteLab = async (id: string) => {
    if (confirm("Delete this lab?")) {
      await api.delete(`/labs/${id}`);
      fetchLabs();
    }
  };

  return (
    <div>
      <PageHeader
        title="Labs"
        description="CTF and lab writeups"
        action={{ label: "New Lab", href: "/labs/new" }}
      />

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : labs.length === 0 ? (
        <EmptyState
          title="No labs yet"
          description="Document your first lab walkthrough"
          actionLabel="Create Lab"
          actionHref="/labs/new"
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Difficulty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Platform
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab) => (
                <tr
                  key={lab.$id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{lab.title}</p>
                    <p className="text-xs text-gray-600">{lab.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={difficultyColor[lab.difficulty] || "default"}>
                      {lab.difficulty}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {lab.platform}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={lab.published ? "success" : "warning"}>
                      {lab.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/labs/${lab.$id}`}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-cyan-400"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => deleteLab(lab.$id)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
