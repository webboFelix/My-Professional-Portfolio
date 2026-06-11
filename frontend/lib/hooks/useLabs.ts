import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchLabs, fetchLabById } from "@/lib/slices/labsSlice";

export function useLabs() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.labs);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchLabs());
    }
  }, [dispatch, items.length]);

  return { labs: items, loading, error };
}

export function useLabById(id: string) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.labs);

  const lab = items.find((l) => l.id === id);

  useEffect(() => {
    if (!lab) {
      dispatch(fetchLabById(id));
    }
  }, [id, lab, dispatch]);

  return { lab, loading, error };
}
