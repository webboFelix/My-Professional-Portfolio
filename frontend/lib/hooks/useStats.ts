import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchStats } from "@/lib/slices/statsSlice";

export function useStats() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.stats);

  useEffect(() => {
    if (!data) {
      dispatch(fetchStats());
    }
  }, [dispatch, data]);

  return { stats: data, loading, error };
}
