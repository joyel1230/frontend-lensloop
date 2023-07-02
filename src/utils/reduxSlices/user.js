import { createSlice } from "@reduxjs/toolkit";
import { authUrls } from "../../const/routesPath";
import { apiCall } from "../../services/apiCalls";
import { userAuth } from "../../const/localstorage";
let validUser, token,privateUser;
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
    console.log(response?.data)
    privateUser = response?.data?.user[0]?.private || false
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
    private:privateUser
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
    setPrivateUser: (state, action) => {
      if (action.payload===undefined) {
        action.payload=false
      }
      state.private = action.payload;
    },
  },
});

export const { setReduxUser, removeReduxUser, setEditedUser, setPrivateUser } = userSlice.actions;

export default userSlice.reducer;
