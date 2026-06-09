"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import LabForm from "@/components/LabForm";

export default function EditLabPage() {
  const { id } = useParams();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLab = async () => {
      const res = await api.get(`/labs/${id}`);
      setLab(res.data);
      setLoading(false);
    };
    if (id) fetchLab();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Lab</h1>
      <LabForm initialData={lab} id={id as string} />
    </div>
  );
}
