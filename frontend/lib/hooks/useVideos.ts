import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchVideos, fetchVideoById } from "@/lib/slices/videosSlice";

export function useVideos() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.videos);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchVideos());
    }
  }, [dispatch, items.length]);

  return { videos: items, loading, error };
}

export function useVideoById(id: string) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.videos);

  const video = items.find((v) => v.id === id);

  useEffect(() => {
    if (!video) {
      dispatch(fetchVideoById(id));
    }
  }, [id, video, dispatch]);

  return { video, loading, error };
}
