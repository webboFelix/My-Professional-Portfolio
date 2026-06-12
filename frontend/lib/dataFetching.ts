/**
 * Redux state management utilities for portfolio data fetching with caching
 * Provides functions to manually trigger refresh and manage cache
 */

import { AppDispatch } from "./store";
import { fetchPosts, fetchPostById } from "./slices/postsSlice";
import { fetchLabs, fetchLabById } from "./slices/labsSlice";
import { fetchProjects, fetchProjectById } from "./slices/projectsSlice";
import { fetchVideos, fetchVideoById } from "./slices/videosSlice";
import { clearAllCache, clearCache } from "./cacheUtils";

/**
 * Refresh all portfolio data from backend (bypasses cache)
 * Useful for "Refresh" button or manual updates
 */
export async function refreshAllData(dispatch: AppDispatch) {
  clearAllCache();
  await Promise.all([
    dispatch(fetchPosts()),
    dispatch(fetchLabs()),
    dispatch(fetchProjects()),
    dispatch(fetchVideos()),
  ]);
}

/**
 * Refresh specific data type from backend
 */
export async function refreshPosts(dispatch: AppDispatch) {
  clearCache("portfolio_cache_posts");
  return dispatch(fetchPosts());
}

export async function refreshLabs(dispatch: AppDispatch) {
  clearCache("portfolio_cache_labs");
  return dispatch(fetchLabs());
}

export async function refreshProjects(dispatch: AppDispatch) {
  clearCache("portfolio_cache_projects");
  return dispatch(fetchProjects());
}

export async function refreshVideos(dispatch: AppDispatch) {
  clearCache("portfolio_cache_videos");
  return dispatch(fetchVideos());
}

/**
 * Utility to fetch specific item by ID (with caching support)
 */
export async function fetchPostById_(dispatch: AppDispatch, id: string) {
  return dispatch(fetchPostById(id));
}

export async function fetchLabById_(dispatch: AppDispatch, id: string) {
  return dispatch(fetchLabById(id));
}

export async function fetchProjectById_(dispatch: AppDispatch, id: string) {
  return dispatch(fetchProjectById(id));
}

export async function fetchVideoById_(dispatch: AppDispatch, id: string) {
  return dispatch(fetchVideoById(id));
}
