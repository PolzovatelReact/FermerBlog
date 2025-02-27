import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark";
};

const initialState: ThemeState = {
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
