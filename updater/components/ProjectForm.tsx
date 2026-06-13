"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import CloudinaryUpload from "./CloudinaryUpload";
import { Input, Textarea } from "./ui/Input";
import { Button } from "./ui/Button";
import { FormSection } from "./ui/FormSection";
import { useToast } from "./providers/ToastProvider";
import { useStats } from "./providers/StatsProvider";
import { Briefcase, Code2, Link2, ImageIcon } from "lucide-react";

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
    writeUp: (initialData?.writeUp as string) || "",
    githubLink: (initialData?.githubLink as string) || "",
    liveLink: (initialData?.liveLink as string) || "",
    technologies: initialData?.technologies
      ? (initialData.technologies as string[]).join(", ")
      : "",
    coverImage: (initialData?.coverImage as string) || "",
    date:
      (initialData?.date as string)?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
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
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-xl border-2 border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/5 px-5 py-4 text-sm font-medium text-red-300 shadow-lg shadow-red-500/10">
            {error}
          </div>
        )}

        <FormSection
          title="Project Overview"
          description="Title, writeup file, and date"
          icon={Briefcase}
        >
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="My awesome project"
          />
          <CloudinaryUpload
            resourceType="markdown"
            initialPreview={formData.writeUp ? "writeup.md" : undefined}
            onUpload={(url) =>
              setFormData((prev) => ({ ...prev, writeUp: url }))
            }
            label="Upload Project Write-up (Markdown)"
          />
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormSection>

        <FormSection
          title="Links & Technology"
          description="GitHub, live link, and tech stack"
          icon={Link2}
        >
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
        </FormSection>

        <FormSection
          title="Cover Image"
          description="Project showcase image"
          icon={ImageIcon}
        >
          <CloudinaryUpload
            resourceType="image"
            initialPreview={formData.coverImage || undefined}
            onUpload={(url) =>
              setFormData((prev) => ({ ...prev, coverImage: url }))
            }
            label="Cover Image"
          />
        </FormSection>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : id ? "Update Project" : "Create Project"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
