"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface ProjectFormProps {
  initialData?: any;
  id?: string;
}

export default function ProjectForm({ initialData, id }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    githubLink: initialData?.githubLink || "",
    liveLink: initialData?.liveLink || "",
    technologies: initialData?.technologies
      ? JSON.stringify(initialData.technologies)
      : "[]",
    date:
      initialData?.date?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    featured: initialData?.featured || false,
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
    const dataToSend = {
      ...formData,
      technologies: JSON.parse(formData.technologies),
    };
    try {
      if (id) {
        await api.put(`/projects/${id}`, dataToSend);
      } else {
        await api.post("/projects", dataToSend);
      }
      router.push("/projects");
    } catch (err) {
      console.error(err);
      alert("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label>GitHub Link</label>
        <input
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label>Live Link</label>
        <input
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label>Technologies (JSON array)</label>
        <input
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-700 rounded bg-gray-900"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />{" "}
          Featured
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : id ? "Update" : "Create"}
      </button>
    </form>
  );
}
