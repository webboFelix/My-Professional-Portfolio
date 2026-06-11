import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { type Post } from "../api";

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

// Normalize backend post to frontend interface
function normalizePost(raw: any): Post {
  return {
    id: raw.$id || raw.id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt || raw.description || "",
    content: raw.content || "",
    tags: raw.tags || [],
    publishedAt: raw.date || raw.publishedAt || new Date().toISOString(),
    featured: raw.featured || false,
    coverImage: raw.coverImage || "",
  };
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<any[]>("/api/posts?all=true");
      return response.data.map(normalizePost);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`/api/posts/id/${id}`);
      return normalizePost(response.data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;
