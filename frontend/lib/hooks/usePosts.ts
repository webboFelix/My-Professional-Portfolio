import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchPosts, fetchPostById, fetchPostBySlug } from "@/lib/slices/postsSlice";

export function usePosts() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, items.length]);

  return { posts: items, loading, error };
}

export function usePostById(id: string) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.posts);

  const post = items.find((p) => p.id === id);

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostById(id));
    }
  }, [id, post, dispatch]);

  return { post, loading, error };
}

export function usePostBySlug(slug: string) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.posts);

  const post = items.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostBySlug(slug));
    }
  }, [slug, post, dispatch]);

  return { post, loading, error };
}
