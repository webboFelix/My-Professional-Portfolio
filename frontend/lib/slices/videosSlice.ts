import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { type Video } from "../api";
import { getFromCache, saveToCache } from "../cacheUtils";

interface VideosState {
  items: Video[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: VideosState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

const CACHE_KEY = "portfolio_cache_videos";

// Normalize backend video to frontend interface
function normalizeVideo(raw: any): Video {
  return {
    id: raw.$id || raw.id,
    title: raw.title,
    description: raw.description,
    url: raw.cloudinaryUrl || raw.url,
    thumbnail: raw.thumbnailUrl || raw.thumbnail,
    duration: raw.duration,
    category: raw.category || "General",
    tags: raw.tags || [],
    createdAt: raw.date || raw.createdAt || new Date().toISOString(),
  };
}

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      // Try to get from cache first
      const cached = getFromCache<Video[]>(CACHE_KEY);
      if (cached) {
        return cached;
      }

      // If not in cache, fetch from backend
      const response = await api.get<any[]>("/api/videos?all=true");
      const normalized = response.data.map(normalizeVideo);

      // Save to cache
      saveToCache(CACHE_KEY, normalized);

      return normalized;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchVideoById = createAsyncThunk(
  "videos/fetchVideoById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`/api/videos/id/${id}`);
      return normalizeVideo(response.data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((v) => v.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = videosSlice.actions;
export default videosSlice.reducer;
