// features/posts/postsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface TypesPosts {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
}

interface PostsState {
  posts: TypesPosts[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

// Fetch posts using fetch API
export const fetchTestPosts = createAsyncThunk(
  "posts/fetchTestPosts",
  async () => {
    const response = await fetch("http://localhost:5050/api/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  }
);

const testpostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchTestPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default testpostsSlice.reducer;
