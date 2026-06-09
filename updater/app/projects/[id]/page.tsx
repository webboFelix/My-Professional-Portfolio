"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import ProjectForm from "@/components/ProjectForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
      setLoading(false);
    };
    if (id) fetchProject();
  }, [id]);

  if (loading) return <LoadingSkeleton rows={6} />;

  return (
    <div>
      <PageHeader title="Edit Project" description="Update project details" />
      <ProjectForm initialData={project!} id={id as string} />
    </div>
  );
}
