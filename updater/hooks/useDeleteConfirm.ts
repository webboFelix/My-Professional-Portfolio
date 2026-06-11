"use client";

import { useState } from "react";

export function useDeleteConfirm<T extends { $id: string }>() {
  const [target, setTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  const open = (item: T) => setTarget(item);
  const close = () => setTarget(null);

  return { target, deleting, setDeleting, open, close };
}
