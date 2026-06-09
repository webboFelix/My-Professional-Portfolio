"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface Lab {
  $id: string;
  title: string;
  slug: string;
  difficulty: string;
  platform: string;
  date: string;
  published: boolean;
}

export default function LabsPage() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLabs = async () => {
    const res = await api.get("/labs");
    setLabs(res.data);
    setLoading(false);
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

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Labs</h1>
        <Link
          href="/labs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Lab
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Difficulty</th>
              <th className="text-left p-2">Platform</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((lab) => (
              <tr key={lab.$id} className="border-b border-gray-800">
                <td className="p-2">{lab.title}</td>
                <td className="p-2">{lab.difficulty}</td>
                <td className="p-2">{lab.platform}</td>
                <td className="p-2">
                  {new Date(lab.date).toLocaleDateString()}
                </td>
                <td className="p-2">{lab.published ? "Published" : "Draft"}</td>
                <td className="p-2 space-x-2">
                  <Link
                    href={`/labs/${lab.$id}`}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteLab(lab.$id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
