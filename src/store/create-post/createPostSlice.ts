import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Post {
  _id?: string;
  title: string;
  text: string;
  type: string;
  createdAt?: string;
}

interface CreatePostState {
  isLoading: boolean;
  hasError: boolean;
  success: boolean;
}

const initialState: CreatePostState = {
  isLoading: false,
  hasError: false,
  success: false,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: Post, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5050/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.hasError = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
export const { resetState } = createPostSlice.actions;
export const selectCreatePost = (state: RootState) => state.createPost;
export default createPostSlice.reducer;
