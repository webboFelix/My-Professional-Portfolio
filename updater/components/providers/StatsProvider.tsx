"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "@/lib/api";

export interface Stats {
  posts: number;
  labs: number;
  projects: number;
  videos: number;
  contacts: number;
}

interface StatsContextValue {
  stats: Stats;
  loading: boolean;
  error: boolean;
  contentTotal: number;
  refresh: () => void;
}

const empty: Stats = {
  posts: 0,
  labs: 0,
  projects: 0,
  videos: 0,
  contacts: 0,
};

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<Stats>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = () => {
    setLoading(true);
    setError(false);
    api
      .get("/stats")
      .then((res) =>
        setStats({
          posts: res.data.posts ?? 0,
          labs: res.data.labs ?? 0,
          projects: res.data.projects ?? 0,
          videos: res.data.videos ?? 0,
          contacts: res.data.contacts ?? 0,
        }),
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const contentTotal =
    stats.posts + stats.labs + stats.projects + stats.videos;

  return (
    <StatsContext.Provider
      value={{ stats, loading, error, contentTotal, refresh: fetchStats }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used within StatsProvider");
  return ctx;
}
