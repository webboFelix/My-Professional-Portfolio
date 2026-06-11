import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { type Lab } from "../api";

interface LabsState {
  items: Lab[];
  loading: boolean;
  error: string | null;
}

const initialState: LabsState = {
  items: [],
  loading: false,
  error: null,
};

// Normalize backend lab to frontend interface
function normalizeLab(raw: any): Lab {
  return {
    id: raw.$id || raw.id,
    title: raw.title,
    description: raw.description || raw.content || "",
    difficulty: raw.difficulty || "Medium",
    category: raw.category || raw.platform || "General",
    status: raw.status || (raw.published ? "active" : "draft"),
    tools: raw.tools || [],
    url: raw.url || raw.link,
    createdAt: raw.date || raw.createdAt || new Date().toISOString(),
  };
}

export const fetchLabs = createAsyncThunk(
  "labs/fetchLabs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<any[]>("/api/labs?all=true");
      return response.data.map(normalizeLab);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchLabById = createAsyncThunk(
  "labs/fetchLabById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`/api/labs/id/${id}`);
      return normalizeLab(response.data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const labsSlice = createSlice({
  name: "labs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLabById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((l) => l.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchLabById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = labsSlice.actions;
export default labsSlice.reducer;
