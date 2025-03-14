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
export const registerSqlUser = createAsyncThunk(
  "authSql/registerUserSql",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:5013/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
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

const registerSqlSlice = createSlice({
  name: "registerSql",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerSqlUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSqlUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerSqlUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSqlSlice.reducer;
