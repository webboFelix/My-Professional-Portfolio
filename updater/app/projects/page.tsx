"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

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
    const res = await api.get("/projects");
    setProjects(res.data);
    setLoading(false);
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

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.$id} className="border border-gray-700 rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="text-gray-400 mt-1">
                  {project.description.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.featured && (
                  <span className="inline-block mt-2 bg-yellow-600 text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="space-x-2">
                <Link
                  href={`/projects/${project.$id}`}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project.$id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
