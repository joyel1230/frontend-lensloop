import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import { authUrls } from "../../const/routesPath";
let validUser, token;
try {
  token = localStorage.getItem("UserAuth");
  if (token) {
    const headers = {
      Authorization: `${token}`
    };
    const response = await api.get(authUrls.user, { headers });
    validUser = response?.data?.valid;
  } else {
    validUser = false;
  }
} catch (error) {
  token = null;
  validUser = false;
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: token,
    validUser: validUser,
  },
  reducers: {
    setReduxUser: (state, action) => {
      state.userData = localStorage.getItem("UserAuth");
    },
    removeReduxUser: (state, action) => {
      state.userData = null;
      localStorage.clear();
    },
  },
});

export const { setReduxUser, removeReduxUser } = userSlice.actions;

export default userSlice.reducer;
