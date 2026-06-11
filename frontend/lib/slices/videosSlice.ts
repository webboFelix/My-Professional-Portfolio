import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { type Video } from "../api";

interface VideosState {
  items: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: VideosState = {
  items: [],
  loading: false,
  error: null,
};

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
      const response = await api.get<any[]>("/api/videos?all=true");
      return response.data.map(normalizeVideo);
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
