import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface RegisterState {
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
};

// Асинхронный thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      name,
      login,
      email,
      password,
    }: { name: string; login: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:5050/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, login, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Ошибка регистрации");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
