import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TypesPeople } from "../../types/typesPiople";
interface PeopleState {
  isLoading: boolean;
  hasError: boolean;
  data: TypesPeople[];
}

const initialState: PeopleState = {
  isLoading: false,
  hasError: false,
  data: [],
};

export const fetchPeople = createAsyncThunk("peole/fetchPeople", async () => {
  const response = await fetch("http://localhost:5050/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
});

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = action.payload;
    });
    builder.addCase(fetchPeople.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});
export default peopleSlice.reducer;
