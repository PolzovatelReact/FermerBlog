import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; email: string } | null;
  error: string | null;
  loading: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
  loading: false,
  isLoading: true, // Добавлено для загрузочного состояния
};

// Асинхронный thunk для авторизации
export const loginSqlUser = createAsyncThunk(
  "authsql/loginSqlUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("http://localhost:5013/login", {
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

      // Сохраняем токен и данные пользователя в localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue("Ошибка сервера");
    }
  }
);

const authSqlSlice = createSlice({
  name: "authsql",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isLoading = false; // Завершаем загрузку
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.isLoading = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    finishLoading: (state) => {
      state.isLoading = false; // Завершение загрузки, если токена нет
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSqlUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSqlUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(loginSqlUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout, finishLoading } = authSqlSlice.actions;
export default authSqlSlice.reducer;
