"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { slugify } from "@/lib/utils";
import CloudinaryUpload from "./CloudinaryUpload";
import { Input, Textarea, Select, Checkbox } from "./ui/Input";
import { Button } from "./ui/Button";
import { FormSection } from "./ui/FormSection";
import { useToast } from "./providers/ToastProvider";
import { useStats } from "./providers/StatsProvider";
import { BookOpen, Calendar, Zap, FileText, ImageIcon } from "lucide-react";

interface LabFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export default function LabForm({ initialData, id }: LabFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { refresh } = useStats();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: (initialData?.title as string) || "",
    slug: (initialData?.slug as string) || "",
    date:
      (initialData?.date as string)?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    writeUp: (initialData?.writeUp as string) || "",
    difficulty: (initialData?.difficulty as string) || "Easy",
    platform: (initialData?.platform as string) || "HTB",
    tags: initialData?.tags ? (initialData.tags as string[]).join(", ") : "",
    coverImage: (initialData?.coverImage as string) || "",
    published: (initialData?.published as boolean) || false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "title") {
        setFormData((prev) => ({
          ...prev,
          title: value,
          slug: slugify(value),
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const dataToSend = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      date: new Date(`${formData.date}T00:00:00.000Z`).toISOString(),
    };
    try {
      if (id) {
        await api.put(`/labs/${id}`, dataToSend);
        toast("Lab updated");
      } else {
        await api.post("/labs", dataToSend);
        toast("Lab created");
      }
      refresh();
      router.push("/labs");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const msg = axiosErr.response?.data?.error || "Error saving lab";
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
          title="Basic Info"
          description="Title, slug, and date"
          icon={BookOpen}
        >
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="My lab writeup..."
          />
          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            readOnly
            className="text-gray-500"
            hint="Auto-generated from title"
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
          title="Lab Details"
          description="Difficulty, platform, and tags"
          icon={Zap}
        >
          <div className="grid grid-cols-2 gap-5">
            <Select
              label="Difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Insane</option>
            </Select>
            <Select
              label="Platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
            >
              <option>HTB</option>
              <option>THM</option>
              <option>VulnHub</option>
              <option>Other</option>
            </Select>
          </div>
          <Input
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="linux, web, privilege-escalation"
            hint="Comma-separated"
          />
        </FormSection>

        <FormSection
          title="Write-up Content"
          description="Upload markdown writeup file"
          icon={FileText}
        >
          <CloudinaryUpload
            resourceType="markdown"
            initialPreview={formData.writeUp ? "writeup.md" : undefined}
            onUpload={(url) =>
              setFormData((prev) => ({ ...prev, writeUp: url }))
            }
            label="Upload Markdown File"
          />
        </FormSection>

        <FormSection
          title="Media & Publishing"
          description="Cover image and visibility"
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
          <Checkbox
            label="Published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
        </FormSection>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : id ? "Update Lab" : "Create Lab"}
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
