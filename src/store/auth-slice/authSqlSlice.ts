import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; email: string } | null;
  error: string | null;
  loading: boolean;
  isLoading: boolean;
}

// Функция для загрузки данных из localStorage при старте
const loadAuthState = (): AuthState => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");

  return {
    isAuthenticated: !!token,
    token: token || null,
    user: user ? JSON.parse(user) : null,
    error: null,
    loading: false,
    isLoading: false, // Завершаем загрузку после проверки
  };
};

const initialState: AuthState = loadAuthState();

// Асинхронный thunk для авторизации
export const loginSqlUser = createAsyncThunk(
  "authsql/loginSqlUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
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

      // ✅ Немедленно обновляем состояние, чтобы UI сразу изменился
      dispatch(setToken({ token: data.token, user: data.user }));

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
      state.isLoading = false;
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
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSqlUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSqlUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginSqlUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout, finishLoading } = authSqlSlice.actions;
export default authSqlSlice.reducer;
