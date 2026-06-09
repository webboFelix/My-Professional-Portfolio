"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import LabForm from "@/components/LabForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function EditLabPage() {
  const { id } = useParams();
  const [lab, setLab] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLab = async () => {
      const res = await api.get(`/labs/id/${id}`);
      setLab(res.data);
      setLoading(false);
    };
    if (id) fetchLab();
  }, [id]);

  if (loading) return <LoadingSkeleton rows={6} />;

  return (
    <div>
      <PageHeader title="Edit Lab" description="Update lab writeup" />
      <LabForm initialData={lab!} id={id as string} />
    </div>
  );
}
