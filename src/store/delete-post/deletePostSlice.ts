import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface DeletePostState {
  isLoading: boolean;
  hasError: boolean;
}

const initialState: DeletePostState = {
  isLoading: false,
  hasError: false,
};

// Асинхронный thunk для удаления поста
export const deletePost = createAsyncThunk(
  "deletePost/deletePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5050/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      return postId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
);

const deletePostSlice = createSlice({
  name: "deletePost",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { resetState } = deletePostSlice.actions;
export const selectDeletePost = (state: RootState) => state.deletePost;
export default deletePostSlice.reducer;
