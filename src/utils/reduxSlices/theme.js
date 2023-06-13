import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: "dark",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = state.currentTheme === "dark" ? "light" : "dark";
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
