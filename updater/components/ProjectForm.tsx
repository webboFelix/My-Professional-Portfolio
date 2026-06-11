"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Input, Textarea, Checkbox } from "./ui/Input";
import { Button } from "./ui/Button";
import { useToast } from "./providers/ToastProvider";
import { useStats } from "./providers/StatsProvider";

interface ProjectFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export default function ProjectForm({ initialData, id }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { refresh } = useStats();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: (initialData?.title as string) || "",
    description: (initialData?.description as string) || "",
    githubLink: (initialData?.githubLink as string) || "",
    liveLink: (initialData?.liveLink as string) || "",
    technologies: initialData?.technologies
      ? (initialData.technologies as string[]).join(", ")
      : "",
    date:
      (initialData?.date as string)?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    featured: (initialData?.featured as boolean) || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const dataToSend = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      date: new Date(`${formData.date}T00:00:00.000Z`).toISOString(),
    };
    try {
      if (id) {
        await api.put(`/projects/${id}`, dataToSend);
        toast("Project updated");
      } else {
        await api.post("/projects", dataToSend);
        toast("Project created");
      }
      refresh();
      router.push("/projects");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const msg = axiosErr.response?.data?.error || "Error saving project";
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5 rounded-xl border border-white/5 bg-white/[0.02] p-6"
    >
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Textarea
        label="Description"
        name="description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Input
        label="GitHub Link"
        name="githubLink"
        value={formData.githubLink}
        onChange={handleChange}
        placeholder="https://github.com/..."
      />
      <Input
        label="Live Link"
        name="liveLink"
        value={formData.liveLink}
        onChange={handleChange}
        placeholder="https://..."
      />
      <Input
        label="Technologies"
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        placeholder="React, Node.js, TypeScript"
        hint="Comma-separated"
        required
      />
      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <Checkbox
        label="Featured project"
        name="featured"
        checked={formData.featured}
        onChange={handleChange}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Project" : "Create Project"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
