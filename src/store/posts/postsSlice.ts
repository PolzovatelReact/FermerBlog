// features/posts/postsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TypesBlog } from "../../types/typesPosts";

interface PostsState {
  isLoading: boolean;
  hasError: boolean;
  data: TypesBlog[];
}

const initialState: PostsState = {
  isLoading: false,
  hasError: false,
  data: [],
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5013/blog`);
      const data = await response.json();
      console.log("Fetched posts:", data); // Логируем данные
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
