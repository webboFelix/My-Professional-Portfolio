import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { type Project } from "../api";

interface ProjectsState {
  items: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  loading: false,
  error: null,
};

// Normalize backend project to frontend interface
function normalizeProject(raw: any): Project {
  return {
    id: raw.$id || raw.id,
    title: raw.title,
    description: raw.description,
    techStack: raw.technologies || raw.techStack || [],
    githubUrl: raw.githubLink || raw.githubUrl,
    liveUrl: raw.liveLink || raw.liveUrl,
    category: raw.category || "General",
    featured: raw.featured || false,
    createdAt: raw.date || raw.createdAt || new Date().toISOString(),
  };
}

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<any[]>("/api/projects?all=true");
      return response.data.map(normalizeProject);
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
