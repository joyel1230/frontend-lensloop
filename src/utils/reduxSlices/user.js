import { createSlice } from "@reduxjs/toolkit";
import { authUrls } from "../../const/routesPath";
import { apiCall } from "../../services/apiCalls";
let validUser, token;
try {
  token = localStorage.getItem("UserAuth");
  if (token) {
    const data = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const response = await apiCall("get",authUrls.user, data);
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
