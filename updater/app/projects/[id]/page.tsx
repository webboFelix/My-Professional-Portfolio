"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import ProjectForm from "@/components/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
      setLoading(false);
    };
    if (id) fetchProject();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm initialData={project} id={id as string} />
    </div>
  );
}
