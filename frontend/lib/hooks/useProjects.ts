import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchProjects, fetchProjectById } from "@/lib/slices/projectsSlice";

export function useProjects() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, items.length]);

  return { projects: items, loading, error };
}

export function useProjectById(id: string) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.projects);

  const project = items.find((p) => p.id === id);

  useEffect(() => {
    if (!project) {
      dispatch(fetchProjectById(id));
    }
  }, [id, project, dispatch]);

  return { project, loading, error };
}
