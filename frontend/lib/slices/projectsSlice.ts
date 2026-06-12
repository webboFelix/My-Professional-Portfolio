import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { type Project } from "../api";
import { getFromCache, saveToCache } from "../cacheUtils";

interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

const CACHE_KEY = "portfolio_cache_projects";

// Normalize backend project to frontend interface
function normalizeProject(raw: any): Project {
  return {
    id: raw.$id || raw.id,
    title: raw.title,
    description: raw.description,
    techStack: raw.technologies || raw.techStack || [],
    githubUrl: raw.githubLink || raw.githubUrl,
    liveUrl: raw.liveLink || raw.liveUrl,
    coverImage: raw.coverImage,
    category: raw.category || "General",
    featured: raw.featured || false,
    createdAt: raw.date || raw.createdAt || new Date().toISOString(),
  };
}

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      // Try to get from cache first
      const cached = getFromCache<Project[]>(CACHE_KEY);
      if (cached) {
        return cached;
      }

      // If not in cache, fetch from backend
      const response = await api.get<any[]>("/api/projects?all=true");
      const normalized = response.data.map(normalizeProject);

      // Save to cache
      saveToCache(CACHE_KEY, normalized);

      return normalized;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`/api/projects/${id}`);
      return normalizeProject(response.data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = projectsSlice.actions;
export default projectsSlice.reducer;
