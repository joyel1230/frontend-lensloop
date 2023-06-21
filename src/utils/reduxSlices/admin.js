import { createSlice } from "@reduxjs/toolkit";
import { adminAuth } from "../../const/localstorage";
const token = localStorage.getItem(adminAuth)
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminEmail: token,
  },
  reducers: {
    setAdmin: (state, action) => {
        const token = localStorage.getItem(adminAuth);
        state.adminEmail = token;
    },
    removeAdmin: (state, action) => {
        state.adminEmail = null;
        localStorage.removeItem(adminAuth);
    },
  },
});

export const { removeAdmin,setAdmin } = adminSlice.actions;

export default adminSlice.reducer;