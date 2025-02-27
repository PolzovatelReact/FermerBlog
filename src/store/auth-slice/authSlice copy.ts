import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  loading: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  error: null,
  loading: false,
  isLoading: true, // Добавлено для загрузочного состояния
};

// Асинхронный thunk для авторизации
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:5050/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Ошибка авторизации");
      }

      return data.token;
    } catch (error) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false; // Завершаем загрузку
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.isLoading = false; // Завершаем загрузку
      localStorage.removeItem("authToken");
    },
    finishLoading: (state) => {
      state.isLoading = false; // Завершение загрузки, если токена нет
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
        localStorage.setItem("authToken", action.payload); // Сохраняем токен
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout, finishLoading } = authSlice.actions;
export default authSlice.reducer;
