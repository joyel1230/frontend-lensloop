import { createSlice } from "@reduxjs/toolkit";
import { authUrls } from "../../const/routesPath";
import { apiCall } from "../../services/apiCalls";
import { userAuth } from "../../const/localstorage";
let validUser, token;
try {
  token = localStorage.getItem(userAuth);
  if (token) {
    const data = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const response = await apiCall("get",authUrls.authUser, data);
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
      state.userData = localStorage.getItem(userAuth);
    },
    removeReduxUser: (state, action) => {
      state.userData = null;
      localStorage.removeItem(userAuth);
    },
    setEditedUser: (state, action) => {
      localStorage.removeItem(userAuth);
      localStorage.setItem(userAuth,action.payload?.token)
      state.userData = action.payload?.token;
    },
  },
});

export const { setReduxUser, removeReduxUser, setEditedUser } = userSlice.actions;

export default userSlice.reducer;
