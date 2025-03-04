import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FarmersPostsTypes } from "../../types/typesFarmers";

interface PostsState {
  isLoading: boolean;
  hasError: boolean;
  datas: FarmersPostsTypes[];
}

const initialState: PostsState = {
  isLoading: false,
  hasError: false,
  datas: [],
};

export const fetchPostsFarmer = createAsyncThunk<FarmersPostsTypes[]>(
  "postsfarmer/fetchPostsFarmer",
  async () => {
    const response = await fetch("http://localhost:5013/posts");
    if (!response.ok) {
      throw new Error(" Filed to fetch posts");
    }
    return response.json();
  }
);

const farmersPostsSlices = createSlice({
  name: "postsfarmer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsFarmer.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPostsFarmer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.datas = action.payload;
      })
      .addCase(fetchPostsFarmer.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
export default farmersPostsSlices.reducer;
