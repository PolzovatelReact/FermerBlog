import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TypesPeople } from "../../types/typesPiople";
interface PeopleState {
  isLoading: boolean;
  hasError: boolean;
  datas: TypesPeople[]; // Типизация значений
} // Типизация

const initialState: PeopleState = {
  isLoading: false,
  hasError: false,
  datas: [],
};

export const fetchPeople = createAsyncThunk<TypesPeople[]>(
  "peole/fetchPeople",
  async () => {
    const response = await fetch("http://localhost:5050/api/users"); // api  из базы данных. Выводим пользователя
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  }
);

const peopleSlice = createSlice({
  name: "people", // Имя
  initialState, // Начальное состояние
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.isLoading = true; // загрузка истина
      state.hasError = false; // Ошибка false
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.isLoading = false;
      state.datas = action.payload; // получение данных
    });
    builder.addCase(fetchPeople.rejected, (state, action) => {
      state.isLoading = false; // Загрузка лож
      state.hasError = true; // Ошибка истина
    });
  },
});
export default peopleSlice.reducer;
