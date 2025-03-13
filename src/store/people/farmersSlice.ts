import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FarmersTypes } from "../../types/typesFarmers";

interface FarmersState {
  isLoading: boolean;
  hasError: boolean;
  datas: FarmersTypes[]; // Типизация значений
} // Типизация

const initialState: FarmersState = {
  isLoading: false,
  hasError: false,
  datas: [],
};

export const fetchFarmers = createAsyncThunk<FarmersTypes[]>(
  "farmers/fetchFarmers",
  async () => {
    const response = await fetch("http://localhost:5013/farmers"); // api  из базы данных. Выводим пользователя
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  }
);

const farmersSlice = createSlice({
  name: "farmers", // Имя
  initialState, // Начальное состояние
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFarmers.pending, (state) => {
      state.isLoading = true; // загрузка истина
      state.hasError = false; // Ошибка false
    });
    builder.addCase(fetchFarmers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.datas = action.payload; // получение данных
    });
    builder.addCase(fetchFarmers.rejected, (state, action) => {
      state.isLoading = false; // Загрузка лож
      state.hasError = true; // Ошибка истина
    });
  },
});
export default farmersSlice.reducer;
